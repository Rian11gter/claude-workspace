/* Perhitungan yang mendasari Laporan Ahli — dihitung, bukan ditulis tangan. */

const DPP = 765765766, PPN = 84234234, TOTAL = 850000000;

// [no, nama, nilai DPP]
const ITEMS = [
  [1,  'Pembongkaran interior lama',                                      45000000],
  [2,  'Penyesuaian struktur bangunan',                                  108000000],
  [3,  'Pekerjaan dinding, plester dan finishing',                        54000000],
  [4,  'Pekerjaan lantai dan keramik',                                    80000000],
  [5,  'Pekerjaan plafon',                                                58000000],
  [6,  'Pintu dan jendela',                                               36000000],
  [7,  'Instalasi listrik dan pencahayaan',                               58000000],
  [8,  'Plumbing dan sanitasi',                                           36000000],
  [9,  'Kitchen dan bar',                                                 80000000],
  [10, 'Pengecatan',                                                      40000000],
  [11, 'Fasad dan area luar',                                             31000000],
  [12, 'Furniture/built-in',                                              49000000],
  [13, 'Finishing akhir dan pembersihan',                                 31000000],
  [14, 'Desain, engineering, mobilisasi, overhead dan manajemen proyek',   59765766],
];

// pembulatan setengah ke atas (toFixed tidak dapat diandalkan untuk .xx5)
const r2 = x => Math.round((x + Number.EPSILON) * 100) / 100;

// Bobot TERIKAT pada tabel Rekapitulasi dalam dokumen RAB yang sudah diterbitkan.
// Item 14 memikul sisa pembulatan (7,80473% -> 7,81%) agar kolom berjumlah 100,00%.
const bobot = {1:5.88, 2:14.10, 3:7.05, 4:10.45, 5:7.57, 6:4.70, 7:7.57,
               8:4.70, 9:10.45, 10:5.22, 11:4.05, 12:6.40, 13:4.05, 14:7.81};

// pastikan bobot yang dipakai memang berasal dari nilai RAB (toleransi pembulatan 0,01)
ITEMS.forEach(([no, nama, v]) => {
  const tepat = v / DPP * 100;
  if (Math.abs(bobot[no] - tepat) > 0.011)
    throw new Error(`bobot item ${no} (${nama}) = ${bobot[no]}, seharusnya ~${tepat.toFixed(4)}`);
});

// realisasi fisik item 1-13 pada dua tanggal
const REAL_1MEI   = {1:1.00, 2:1.00, 3:1.00, 4:0, 5:0.85, 6:0.80, 7:0.75, 8:0.90, 9:0.55, 10:0.45, 11:0.30, 12:0.50, 13:0};
const REAL_25JUNI = {1:1.00, 2:1.00, 3:1.00, 4:0, 5:0.85, 6:0.85, 7:0.75, 8:0.90, 9:0.55, 10:0.60, 11:0.30, 12:0.55, 13:0};

const BOBOT_FISIK = r2(100 - bobot[14]);

function hitung(real, label) {
  const rows = [];
  let fisik = 0;
  for (let no = 1; no <= 13; no++) {
    const kontribusi = r2(bobot[no] * real[no]);
    fisik += kontribusi;
    rows.push({ no, bobot: bobot[no], real: Math.round(real[no] * 100), kontribusi });
  }
  fisik = r2(fisik);
  const rasio = fisik / BOBOT_FISIK;
  const it14 = r2(bobot[14] * rasio);
  const total = r2(fisik + it14);
  const nilai = Math.round(TOTAL * total / 100);
  return { label, rows, fisik, rasio, it14, total, nilai };
}

const A = hitung(REAL_1MEI,   '1 Mei 2026');
const B = hitung(REAL_25JUNI, '25 Juni 2026');

// ---- metode alternatif: sub-item 14.1-14.3 diakui 100% ----
const SUB_DESAIN = 16500000 + 4500000 + 6850000;          // 27.850.000
const B_DESAIN   = r2(SUB_DESAIN / DPP * 100);
const B_SISA14   = r2(bobot[14] - B_DESAIN);
const ALT_TOTAL  = r2(A.fisik + B_DESAIN + B_SISA14 * A.rasio);

// ---- pengujian klaim 85% ----
const TANPA_4      = r2(100 - bobot[4]);
const RATA_DIPERLUKAN = Math.round(85 / TANPA_4 * 1000) / 10;
const MAKS_TEKNIS  = r2(100 - bobot[4] - bobot[13]);

// ---- biaya bongkar & pasang ulang keramik ----
const KERAMIK = [
  ['Bongkar keramik hitam terpasang',            100, 'm²',  45000,  4500000, true],
  ['Angkut dan buang puing',                       1, 'ls', 2000000, 2000000, true],
  ['Perbaikan dan leveling screed',              100, 'm²',  35000,  3500000, true],
  ['Pengadaan keramik cokelat 60x60 matte',      105, 'm²', 185000, 19425000, false],
  ['Perekat dan grouting',                       100, 'm²',  30000,  3000000, false],
  ['Upah pemasangan keramik',                    100, 'm²',  65000,  6500000, false],
];
const K_TOTAL = KERAMIK.reduce((a, r) => a + r[4], 0);
const K_INKREMENTAL = KERAMIK.filter(r => r[5]).reduce((a, r) => a + r[4], 0);
const K_LINGKUP = K_TOTAL - K_INKREMENTAL;

// ---- taksiran biaya penyelesaian sisa pekerjaan (basis 25 Juni) ----
const SISA_PCT   = r2(100 - B.total);
const SISA_DPP   = Math.round(DPP * SISA_PCT / 100);
const SUB1       = SISA_DPP + K_INKREMENTAL;
const ESKALASI   = Math.round(SUB1 * 0.12);
const JML_DPP    = SUB1 + ESKALASI;
const JML_PPN    = Math.round(JML_DPP * 0.11);
const TAKSIRAN   = JML_DPP + JML_PPN;
const DANA_SISA  = 250000000;
const KEKURANGAN = TAKSIRAN - DANA_SISA;

// ---- ganti rugi (basis 25 Juni) ----
const KELEBIHAN = 600000000 - B.nilai;
const DENDA     = Math.round(TOTAL * 0.05);
const HARI_PLAFON = DENDA / Math.round(TOTAL * 0.001);
const C_INCL    = Math.round(K_INKREMENTAL * 1.11);
const D_INCL    = Math.round(ESKALASI * 1.11);
const GANTI     = KELEBIHAN + DENDA + C_INCL + D_INCL;

// ---- lingkup yang ditagih Rp85 juta ----
const KLAIM85 = [
  ['Perubahan rancangan plafon',                       'Item 5',    58000000],
  ['Penambahan titik dan fixture pencahayaan',         'Item 7',    58000000],
  ['Perubahan tata ruang dan perkerasan area luar',    'Item 11',   31000000],
  ['Penyesuaian desain dan gambar revisi',             'Item 14.2',  4500000],
];
const KLAIM85_TOTAL = KLAIM85.reduce((a, r) => a + r[2], 0);

/* -------------------- VALIDASI -------------------- */
const err = [];
const sumBobot = r2(Object.values(bobot).reduce((a, b) => a + b, 0));
if (sumBobot !== 100) err.push(`jumlah bobot = ${sumBobot}, bukan tepat 100`);
if (DPP + PPN !== TOTAL) err.push('DPP + PPN != TOTAL');
if (ITEMS.reduce((a, i) => a + i[2], 0) !== DPP) err.push('jumlah item != DPP');
if (A.total !== 64.70) err.push(`progres 1 Mei = ${A.total}, diharapkan tepat 64,70`);
if (B.total !== 66.16) err.push(`progres 25 Juni = ${B.total}, diharapkan tepat 66,16`);
if (BOBOT_FISIK !== 92.19) err.push(`bobot fisik = ${BOBOT_FISIK}, diharapkan 92,19`);
if (ALT_TOTAL !== 65.99) err.push(`metode alternatif = ${ALT_TOTAL}, diharapkan 65,99`);
if (MAKS_TEKNIS !== 85.50) err.push(`maks teknis = ${MAKS_TEKNIS}, diharapkan 85,50`);
if (KELEBIHAN + DENDA + C_INCL + D_INCL !== GANTI) err.push('rincian ganti rugi tidak tutup');
if (SISA_DPP + K_INKREMENTAL !== SUB1) err.push('subtotal penyelesaian tidak tutup');
if (TAKSIRAN - DANA_SISA !== KEKURANGAN) err.push('kekurangan dana tidak tutup');
if (Math.abs(+(B_DESAIN + B_SISA14).toFixed(2) - bobot[14]) > 0.01) err.push('pecahan bobot item 14 tidak tutup');
if (K_INKREMENTAL + K_LINGKUP !== K_TOTAL) err.push('pecahan biaya keramik tidak tutup');
if (JML_DPP + JML_PPN !== TAKSIRAN) err.push('taksiran tidak tutup');
if (err.length) { console.error('VALIDASI GAGAL:'); err.forEach(e => console.error('  - ' + e)); process.exit(1); }

/* -------------------- CETAK -------------------- */
const f = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
const pc = n => String(n.toFixed(2)).replace('.', ',');

console.log('VALIDASI: LULUS\n');
console.log('=== BOBOT PER ITEM ===');
ITEMS.forEach(([no, nama]) => console.log(`  ${String(no).padStart(2)}  ${nama.slice(0,48).padEnd(48)} ${pc(bobot[no]).padStart(6)}%`));
console.log(`      ${'JUMLAH'.padEnd(48)} ${pc(sumBobot).padStart(6)}%`);
console.log(`      Bobot fisik item 1-13: ${pc(BOBOT_FISIK)}%\n`);

for (const R of [A, B]) {
  console.log(`=== REALISASI PER ${R.label.toUpperCase()} ===`);
  R.rows.forEach(r => console.log(`  item ${String(r.no).padStart(2)}  bobot ${pc(r.bobot).padStart(6)}%  x ${String(r.real).padStart(3)}%  = ${pc(r.kontribusi).padStart(6)}`));
  console.log(`  subtotal fisik (item 1-13)        = ${pc(R.fisik)}`);
  console.log(`  item 14 pro rata (${pc(R.rasio*100)}%)      = ${pc(R.it14)}`);
  console.log(`  REALISASI                         = ${pc(R.total)}%`);
  console.log(`  Nilai pekerjaan terpasang         = Rp${f(R.nilai)}\n`);
}

console.log('=== METODE ALTERNATIF (sub-item 14.1-14.3 diakui 100%) ===');
console.log(`  Nilai sub-item 14.1-14.3          = Rp${f(SUB_DESAIN)}  (bobot ${pc(B_DESAIN)}%)`);
console.log(`  Sisa bobot item 14                = ${pc(B_SISA14)}%`);
console.log(`  Realisasi per 1 Mei 2026          = ${pc(ALT_TOTAL)}%`);
console.log(`  Selisih terhadap metode utama     = ${pc(ALT_TOTAL - A.total)} poin\n`);

console.log('=== PENGUJIAN KLAIM PROGRES 85% ===');
console.log(`  Bobot seluruh item selain item 4  = ${pc(TANPA_4)}%`);
console.log(`  Realisasi rata-rata yang dituntut = ${String(RATA_DIPERLUKAN).replace('.',',')}%`);
console.log(`  Maks teknis (item 4 & 13 nol)     = ${pc(MAKS_TEKNIS)}%\n`);

console.log('=== BIAYA BONGKAR DAN PASANG ULANG KERAMIK ===');
KERAMIK.forEach(r => console.log(`  ${r[5]?'[tambahan]':'[lingkup] '} ${r[0].padEnd(42)} ${String(r[1]).padStart(4)} ${r[2].padEnd(3)} x ${f(r[3]).padStart(9)} = ${f(r[4]).padStart(11)}`));
console.log(`  Jumlah (DPP)                                                      = Rp${f(K_TOTAL)}`);
console.log(`  -> biaya tambahan akibat ketidaksesuaian  = Rp${f(K_INKREMENTAL)}`);
console.log(`  -> biaya yang memang lingkup pekerjaan    = Rp${f(K_LINGKUP)}\n`);

console.log('=== TAKSIRAN BIAYA PENYELESAIAN SISA PEKERJAAN (basis 25 Juni 2026) ===');
console.log(`  Sisa pekerjaan ${pc(SISA_PCT)}% x DPP          = Rp${f(SISA_DPP)}`);
console.log(`  Biaya bongkar/screed keramik              = Rp${f(K_INKREMENTAL)}`);
console.log(`  Subtotal                                  = Rp${f(SUB1)}`);
console.log(`  Eskalasi dan mobilisasi 12%               = Rp${f(ESKALASI)}`);
console.log(`  Jumlah (DPP)                              = Rp${f(JML_DPP)}`);
console.log(`  PPN 11%                                   = Rp${f(JML_PPN)}`);
console.log(`  TAKSIRAN BIAYA PENYELESAIAN               = Rp${f(TAKSIRAN)}`);
console.log(`  Dana kontrak tersisa                      = Rp${f(DANA_SISA)}`);
console.log(`  KEKURANGAN DANA                           = Rp${f(KEKURANGAN)}\n`);

console.log('=== LINGKUP YANG DITAGIH Rp85.000.000 ===');
KLAIM85.forEach(r => console.log(`  ${r[0].padEnd(46)} ${r[1].padEnd(10)} Rp${f(r[2])}`));
console.log(`  ${'Jumlah yang sudah dianggarkan dalam RAB'.padEnd(46)} ${''.padEnd(10)} Rp${f(KLAIM85_TOTAL)}\n`);

console.log('=== GANTI RUGI (basis 25 Juni 2026, termasuk pajak) ===');
console.log(`  A. Kelebihan pembayaran                   = Rp${f(KELEBIHAN)}`);
console.log(`  B. Denda keterlambatan 5%                 = Rp${f(DENDA)}   (plafon tercapai hari ke-${HARI_PLAFON})`);
console.log(`  C. Biaya bongkar/screed keramik           = Rp${f(C_INCL)}`);
console.log(`  D. Eskalasi dan mobilisasi                = Rp${f(D_INCL)}`);
console.log(`  TOTAL KERUGIAN MATERIIL                   = Rp${f(GANTI)}`);

require('fs').writeFileSync(
  '/tmp/claude-0/-home-user-claude-workspace/f49cad35-176c-5236-8a09-c38e581efaca/scratchpad/angka-ahli.json',
  JSON.stringify({ bobot, BOBOT_FISIK, A, B, SUB_DESAIN, B_DESAIN, B_SISA14, ALT_TOTAL,
    TANPA_4, RATA_DIPERLUKAN, MAKS_TEKNIS, KERAMIK, K_TOTAL, K_INKREMENTAL, K_LINGKUP,
    SISA_PCT, SISA_DPP, SUB1, ESKALASI, JML_DPP, JML_PPN, TAKSIRAN, DANA_SISA, KEKURANGAN,
    KELEBIHAN, DENDA, HARI_PLAFON, C_INCL, D_INCL, GANTI, KLAIM85, KLAIM85_TOTAL, ITEMS }, null, 1));
