const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  WidthType, AlignmentType, BorderStyle, ShadingType, VerticalAlign,
  TabStopType, TabStopPosition, HeadingLevel,
} = require('docx');
const fs = require('fs');

/* ------------------------------------------------------------------ */
/* DATA                                                                */
/* ------------------------------------------------------------------ */

const FONT = 'Times New Roman';
const W = 9354;                       // usable page width in DXA

// Rekapitulasi: [no, uraian, anggaran DPP, bobot]
const REKAP = [
  [1,  'Pembongkaran interior lama',                                        45000000, '5,88%'],
  [2,  'Penyesuaian struktur bangunan',                                    108000000, '14,10%'],
  [3,  'Pekerjaan dinding, plester dan finishing',                          54000000, '7,05%'],
  [4,  'Pekerjaan lantai dan keramik',                                      80000000, '10,45%'],
  [5,  'Pekerjaan plafon',                                                  58000000, '7,57%'],
  [6,  'Pintu dan jendela',                                                 36000000, '4,70%'],
  [7,  'Instalasi listrik dan pencahayaan',                                 58000000, '7,57%'],
  [8,  'Plumbing dan sanitasi',                                             36000000, '4,70%'],
  [9,  'Kitchen dan bar',                                                   80000000, '10,45%'],
  [10, 'Pengecatan',                                                        40000000, '5,22%'],
  [11, 'Fasad dan area luar',                                               31000000, '4,05%'],
  [12, 'Furniture/built-in',                                                49000000, '6,40%'],
  [13, 'Finishing akhir dan pembersihan',                                   31000000, '4,05%'],
  [14, 'Desain, engineering, mobilisasi, overhead dan manajemen proyek',    59765766, '7,81%'],
];

// Rincian: uraian, volume, satuan, harga satuan, jumlah
const RINCIAN = {
  1: [
    ['Bongkar partisi dan dinding interior lama',            '85',  'm²',    48000,  4080000],
    ['Bongkar plafon lama',                                  '120', 'm²',    32000,  3840000],
    ['Bongkar lantai keramik lama',                          '120', 'm²',    42000,  5040000],
    ['Bongkar instalasi listrik lama',                       '1',   'ls',  3500000,  3500000],
    ['Bongkar instalasi plumbing dan sanitasi lama',         '1',   'ls',  3200000,  3200000],
    ['Bongkar kusen, pintu dan jendela lama',                '14',  'unit', 285000,  3990000],
    ['Bongkar furniture dan fixture lama',                   '1',   'ls',  4500000,  4500000],
    ['Angkut dan buang puing ke TPA',                        '38',  'm³',   285000, 10830000],
    ['Pembersihan lokasi pasca bongkaran',                   '120', 'm²',    25000,  3000000],
    ['Perlengkapan K3 dan pengamanan area bongkaran',        '1',   'ls',  3020000,  3020000],
  ],
  2: [
    ['Bongkar dan perbaikan sebagian dinding struktural',    '22',  'm²',   385000,  8470000],
    ['Kolom praktis beton bertulang K-225',                  '14',  'titik',1850000,25900000],
    ['Balok latei dan ring balk beton bertulang',            '38',  "m'",   625000, 23750000],
    ['Perkuatan dan perbaikan pelat serta sloof',            '1',   'ls', 12500000, 12500000],
    ['Pembuatan bukaan baru pada dinding dan struktur',      '6',   'unit',2150000, 12900000],
    ['Perbaikan dan penyesuaian rangka atap serta kanopi',   '1',   'ls',  9800000,  9800000],
    ['Pekerjaan bekisting dan perancah',                     '1',   'ls',  6400000,  6400000],
    ['Penyesuaian struktur akibat kondisi lapangan (pos cadangan)', '1', 'ls', 8280000, 8280000],
  ],
  3: [
    ['Pasang dinding bata ringan tebal 10 cm',               '95',  'm²',   185000, 17575000],
    ['Plesteran dinding',                                    '190', 'm²',    62000, 11780000],
    ['Acian dinding',                                        '190', 'm²',    38000,  7220000],
    ['Partisi gypsum rangka hollow area servis',             '28',  'm²',   244000,  6832000],
    ['Dinding aksen bata ekspos dan finishing tekstur',      '24',  'm²',   315000,  7560000],
    ['Waterproofing dinding area basah',                     '18',  'm²',   168500,  3033000],
  ],
  4: [
    ['Rabat beton dan perbaikan lantai dasar',               '120', 'm²',    95000, 11400000],
    ['Waterproofing area dapur, bar dan toilet',             '35',  'm²',   145000,  5075000],
    ['Screed dan leveling lantai',                           '120', 'm²',    35000,  4200000],
    ['Keramik 60x60 cm warna cokelat matte, area utama (termasuk cadangan 5%)', '105', 'm²', 185000, 19425000],
    ['Keramik anti-slip area dapur dan toilet',              '22',  'm²',   165000,  3630000],
    ['Perekat dan grouting',                                 '120', 'm²',    30000,  3600000],
    ['Upah pemasangan keramik',                              '120', 'm²',    65000,  7800000],
    ['Plint/skirting keramik',                               '85',  "m'",    55000,  4675000],
    ['Perkerasan lantai area luar',                          '45',  'm²',   285000, 12825000],
    ['Floor hardener area servis',                           '18',  'm²',   175000,  3150000],
    ['Nat, trim dan aksesoris lantai',                       '1',   'ls',  4220000,  4220000],
  ],
  5: [
    ['Rangka hollow galvanis plafon',                        '120', 'm²',   118000, 14160000],
    ['Plafon gypsum board 9 mm',                             '108', 'm²',   132000, 14256000],
    ['Plafon kalsiboard area basah',                         '22',  'm²',   145000,  3190000],
    ['Drop ceiling dan up-stand ornamen',                    '32',  "m'",   285000,  9120000],
    ['List profil gypsum',                                   '96',  "m'",    68000,  6528000],
    ['Compound, sealant dan finishing plafon',               '130', 'm²',    42000,  5460000],
    ['Manhole dan akses inspeksi',                           '4',   'unit', 385500,  1542000],
    ['Plafon area luar (kanopi)',                            '18',  'm²',   208000,  3744000],
  ],
  6: [
    ['Pintu utama kaca tempered dengan frame alumunium',     '1',   'unit',8500000,  8500000],
    ['Pintu panel kayu solid area dapur dan servis',         '3',   'unit',2850000,  8550000],
    ['Pintu toilet PVC',                                     '2',   'unit',1450000,  2900000],
    ['Jendela alumunium dengan kaca 5 mm',                   '14',  'm²',   685000,  9590000],
    ['Kusen alumunium',                                      '38',  "m'",   145000,  5510000],
    ['Aksesoris: handle, kunci, hinge dan door closer',      '1',   'ls',   950000,   950000],
  ],
  7: [
    ['Panel listrik utama, MCB dan pembagi',                 '1',   'unit',8500000,  8500000],
    ['Instalasi titik lampu (kabel NYM 3x2,5 mm²)',          '48',  'titik', 285000,13680000],
    ['Instalasi titik stop kontak dan saklar',               '36',  'titik', 245000, 8820000],
    ['Instalasi daya kitchen dan bar (jalur khusus)',        '8',   'titik', 485000, 3880000],
    ['Lampu spotlight LED track',                            '22',  'unit', 385000,  8470000],
    ['Lampu dekoratif gantung area makan dan bar',           '12',  'unit', 525000,  6300000],
    ['Lampu downlight LED',                                  '18',  'unit', 165000,  2970000],
    ['Lampu area luar dan fasad',                            '8',   'unit', 295000,  2360000],
    ['Grounding, pengujian dan sertifikasi instalasi',       '1',   'ls',  3020000,  3020000],
  ],
  8: [
    ['Instalasi air bersih pipa PPR diameter ½"–¾"',         '65',  "m'",   125000,  8125000],
    ['Instalasi air kotor dan air buangan pipa PVC',         '55',  "m'",    98000,  5390000],
    ['Closet duduk',                                         '2',   'unit',2450000,  4900000],
    ['Wastafel dan kran',                                    '3',   'unit',1285000,  3855000],
    ['Sink stainless dapur 2 bak dan kran',                  '2',   'unit',2150000,  4300000],
    ['Floor drain, kran dan aksesoris',                      '12',  'unit', 185000,  2220000],
    ['Grease trap dapur',                                    '1',   'unit',3850000,  3850000],
    ['Pompa air dan tandon 1.000 liter',                     '1',   'ls',  2360000,  2360000],
    ['Pengujian tekanan dan kebocoran',                      '1',   'ls',  1000000,  1000000],
  ],
  9: [
    ['Meja bar beton dengan finishing solid surface',        '6,5', "m'",  3250000, 21125000],
    ['Back bar dan rak display',                             '4,5', "m'",  2450000, 11025000],
    ['Kitchen set bawah (base cabinet) finishing HPL',       '7,2', "m'",  2150000, 15480000],
    ['Kitchen set atas (wall cabinet) finishing HPL',        '4,8', "m'",  1450000,  6960000],
    ['Meja kerja stainless steel',                           '3,5', "m'",  2350000,  8225000],
    ['Exhaust hood stainless dan ducting',                   '1',   'ls',  8750000,  8750000],
    ['Pelapis dinding stainless area masak',                 '12',  'm²',   385000,  4620000],
    ['Instalasi gas dapur dan perlengkapan pengaman',        '1',   'ls',  3815000,  3815000],
  ],
  10: [
    ['Cat dasar dan plamir dinding interior',                '210', 'm²',    32000,  6720000],
    ['Cat akhir dinding interior (2 lapis)',                 '210', 'm²',    58000, 12180000],
    ['Cat plafon',                                           '130', 'm²',    48000,  6240000],
    ['Cat dinding eksterior dan fasad (weathershield)',      '68',  'm²',    78000,  5304000],
    ['Cat dekoratif dan aksen (tekstur serta motif)',        '26',  'm²',   165000,  4290000],
    ['Cat duco dan finishing kayu serta besi',               '22',  'm²',   185000,  4070000],
    ['Perlengkapan, scaffolding dan proteksi area',          '1',   'ls',  1196000,  1196000],
  ],
  11: [
    ['Rangka dan panel fasad (ACP/kayu komposit)',           '24',  'm²',   685000, 16440000],
    ['Signage dan letter box nama kafe',                     '1',   'ls',  4250000,  4250000],
    ['Kanopi area luar rangka besi dengan penutup',          '14',  'm²',   485000,  6790000],
    ['Penataan taman dan planter box',                       '1',   'ls',  2320000,  2320000],
    ['Pagar dan pembatas area luar',                         '8',   "m'",   150000,  1200000],
  ],
  12: [
    ['Bench seating built-in dengan dudukan busa dan fabric','12,5',"m'",  1850000, 23125000],
    ['Meja makan built-in/fixed top',                        '8',   'unit',1450000, 11600000],
    ['Rak dinding dan display built-in',                      '6,5', "m'",   984000,  6396000],
    ['Kasir dan counter order',                              '1',   'unit',5850000,  5850000],
    ['Partisi dekoratif built-in',                           '1',   'ls',  2029000,  2029000],
  ],
  13: [
    ['Perbaikan dan penyempurnaan (touch-up) menyeluruh',    '120', 'm²',    85000, 10200000],
    ['Pembersihan akhir menyeluruh',                         '120', 'm²',    45000,  5400000],
    ['Poles dan sealing lantai serta permukaan',             '120', 'm²',    38000,  4560000],
    ['Pemasangan aksesoris dan perlengkapan akhir',          '1',   'ls',  4650000,  4650000],
    ['Testing dan commissioning seluruh instalasi',          '1',   'ls',  3850000,  3850000],
    ['Dokumentasi as-built drawing dan manual',              '1',   'ls',  2340000,  2340000],
  ],
  14: [
    ['Jasa desain interior dan gambar kerja',                '1',   'ls', 16500000, 16500000],
    ['Gambar revisi dan penyesuaian desain lapangan',        '1',   'ls',  4500000,  4500000],
    ['Engineering dan perhitungan struktur',                 '1',   'ls',  6850000,  6850000],
    ['Mobilisasi dan demobilisasi peralatan',               '1',   'ls',  5250000,  5250000],
    ['Direksi keet, listrik dan air kerja',                  '1',   'ls',  4850000,  4850000],
    ['Manajemen proyek dan pengawasan lapangan',             '3,5', 'bulan',4250000,14875000],
    ['K3 dan asuransi proyek',                               '1',   'ls',  3850000,  3850000],
    ['Overhead kantor dan administrasi proyek',              '1',   'ls',  3090766,  3090766],
  ],
};

const TERMIN = [
  ['I',   'Setelah perjanjian ditandatangani dan pekerjaan dimulai', 450000000],
  ['II',  'Setelah pekerjaan mencapai progres sekitar 40%',           50000000],
  ['III', 'Setelah pekerjaan mencapai progres sekitar 70%',          100000000],
  ['IV',  'Setelah pekerjaan selesai 100% dan dilakukan serah terima dalam kondisi siap beroperasi', 250000000],
];

const DPP   = 765765766;
const PPN   = 84234234;
const TOTAL = 850000000;

/* ------------------------------------------------------------------ */
/* VALIDASI ARITMETIKA                                                 */
/* ------------------------------------------------------------------ */

let errors = [];
let grand = 0;
for (const [no, nama, anggaran] of REKAP) {
  const det = RINCIAN[no];
  const sum = det.reduce((a, r) => a + r[4], 0);
  if (sum !== anggaran) {
    errors.push(`Item ${no} (${nama}): rincian ${sum} != rekap ${anggaran} (selisih ${anggaran - sum})`);
  }
  for (const r of det) {
    const vol = parseFloat(String(r[1]).replace(',', '.'));
    if (r[2] !== 'ls' && Math.abs(vol * r[3] - r[4]) > 1) {
      errors.push(`Item ${no} "${r[0]}": ${vol} x ${r[3]} = ${vol * r[3]} != ${r[4]}`);
    }
  }
  grand += anggaran;
}
if (grand !== DPP) errors.push(`Jumlah 14 item = ${grand} != DPP ${DPP}`);
if (DPP + PPN !== TOTAL) errors.push(`DPP + PPN = ${DPP + PPN} != TOTAL ${TOTAL}`);
if (Math.abs(Math.round(DPP * 0.11) - PPN) > 1) errors.push(`PPN 11% x DPP = ${Math.round(DPP * 0.11)} != ${PPN}`);
const terminSum = TERMIN.reduce((a, t) => a + t[2], 0);
if (terminSum !== TOTAL) errors.push(`Jumlah termin = ${terminSum} != TOTAL ${TOTAL}`);

if (errors.length) {
  console.error('VALIDASI GAGAL:');
  errors.forEach(e => console.error('  - ' + e));
  process.exit(1);
}
console.log('Validasi aritmetika: LULUS');
console.log(`  Jumlah 14 item (DPP) = ${DPP}`);
console.log(`  PPN 11%              = ${PPN}`);
console.log(`  Total nilai kontrak  = ${TOTAL}`);
console.log(`  Jumlah termin I-IV   = ${terminSum}`);

/* ------------------------------------------------------------------ */
/* HELPER                                                              */
/* ------------------------------------------------------------------ */

const fmt = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
const rp  = n => 'Rp' + fmt(n);

const NB = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const NO_BORDERS = { top: NB, bottom: NB, left: NB, right: NB };

function run(text, o = {}) {
  return new TextRun({
    text, font: FONT, size: o.size || 20,
    bold: !!o.bold, italics: !!o.italics, allCaps: !!o.caps,
    color: o.color, underline: o.underline ? {} : undefined,
  });
}

function p(text, o = {}) {
  return new Paragraph({
    children: Array.isArray(text) ? text : [run(text, o)],
    alignment: o.align || AlignmentType.LEFT,
    spacing: { before: o.before || 0, after: o.after === undefined ? 60 : o.after, line: o.line || 240 },
    indent: o.indent,
  });
}

function cell(text, width, o = {}) {
  const paras = (Array.isArray(text) ? text : [text]).map(t =>
    new Paragraph({
      children: [run(t, o)],
      alignment: o.align || AlignmentType.LEFT,
      spacing: { before: 20, after: 20, line: 240 },
    })
  );
  return new TableCell({
    children: paras,
    width: { size: width, type: WidthType.DXA },
    shading: o.fill ? { type: ShadingType.CLEAR, color: 'auto', fill: o.fill } : undefined,
    verticalAlign: o.valign || VerticalAlign.CENTER,
    margins: { top: 40, bottom: 40, left: 80, right: 80 },
    columnSpan: o.span,
  });
}

function table(columnWidths, rows) {
  return new Table({
    columnWidths,
    width: { size: W, type: WidthType.DXA },
    rows,
  });
}

const HEAD = 'D9D9D9';
const SUB  = 'F2F2F2';
const TOTL = 'E8E8E8';

/* ------------------------------------------------------------------ */
/* ISI DOKUMEN                                                         */
/* ------------------------------------------------------------------ */

const body = [];

// ---------- KOP ----------
body.push(p('RENCANA ANGGARAN BIAYA (RAB)', { bold: true, size: 28, align: AlignmentType.CENTER, after: 40 }));
body.push(p('PEKERJAAN RENOVASI BANGUNAN KOMERSIAL MENJADI KAFE', { bold: true, size: 22, align: AlignmentType.CENTER, after: 40 }));
body.push(p('Lampiran I Perjanjian Pemborongan Pekerjaan Nomor 001/PPP/AK-RK/I/2026', { italics: true, size: 19, align: AlignmentType.CENTER, after: 200 }));

const IW = [2600, 300, 6454];
body.push(table(IW, [
  ['Nama Pekerjaan',    'Renovasi bangunan komersial menjadi kafe dalam kondisi siap beroperasi'],
  ['Lokasi Pekerjaan',  'Jalan ......................... Nomor ....., Kota Surakarta, Provinsi Jawa Tengah'],
  ['Luas Bangunan',     '120 m² (12 meter x 10 meter)'],
  ['Pemberi Tugas',     'Raka, bertempat tinggal di Kota Surakarta'],
  ['Pelaksana Pekerjaan','PT Arunika Kreasi, berkedudukan di ......................., Kota Surakarta'],
  ['Nilai Kontrak',     'Rp850.000.000,00 (delapan ratus lima puluh juta rupiah), termasuk pajak'],
  ['Jangka Waktu',      '105 (seratus lima) hari kalender terhitung sejak 16 Januari 2026'],
  ['Batas Akhir',       '1 Mei 2026'],
  ['Tanggal RAB',       '12 Januari 2026'],
].map(([k, v]) => new TableRow({
  children: [
    cell(k, IW[0], { bold: true }),
    cell(':', IW[1], { align: AlignmentType.CENTER }),
    cell(v, IW[2]),
  ],
}))));
body.forEach(() => {});
// hilangkan garis tabel identitas
body[body.length - 1] = new Table({
  columnWidths: IW,
  width: { size: W, type: WidthType.DXA },
  borders: NO_BORDERS,
  rows: [
    ['Nama Pekerjaan',    'Renovasi bangunan komersial menjadi kafe dalam kondisi siap beroperasi'],
    ['Lokasi Pekerjaan',  'Jalan ......................... Nomor ....., Kota Surakarta, Provinsi Jawa Tengah'],
    ['Luas Bangunan',     '120 m² (12 meter x 10 meter)'],
    ['Pemberi Tugas',     'Raka, bertempat tinggal di Kota Surakarta'],
    ['Pelaksana Pekerjaan','PT Arunika Kreasi, berkedudukan di ......................., Kota Surakarta'],
    ['Nilai Kontrak',     'Rp850.000.000,00 (delapan ratus lima puluh juta rupiah), termasuk pajak'],
    ['Jangka Waktu',      '105 (seratus lima) hari kalender terhitung sejak 16 Januari 2026'],
    ['Batas Akhir Penyerahan', '1 Mei 2026'],
    ['Tanggal Penyusunan RAB', '12 Januari 2026'],
  ].map(([k, v]) => new TableRow({
    children: [
      cell(k, IW[0], { bold: true }),
      cell(':', IW[1], { align: AlignmentType.CENTER }),
      cell(v, IW[2]),
    ],
  })),
});

/* ---------- BAGIAN I : REKAPITULASI ---------- */
body.push(p('BAGIAN I — REKAPITULASI RENCANA ANGGARAN BIAYA', { bold: true, size: 22, before: 320, after: 120 }));

const RW = [680, 5074, 2000, 1600];
const rekapRows = [
  new TableRow({
    tableHeader: true,
    children: [
      cell('No.', RW[0], { bold: true, fill: HEAD, align: AlignmentType.CENTER }),
      cell('Uraian Pekerjaan', RW[1], { bold: true, fill: HEAD, align: AlignmentType.CENTER }),
      cell('Anggaran (DPP)', RW[2], { bold: true, fill: HEAD, align: AlignmentType.CENTER }),
      cell('Bobot', RW[3], { bold: true, fill: HEAD, align: AlignmentType.CENTER }),
    ],
  }),
];
for (const [no, nama, anggaran, bobot] of REKAP) {
  rekapRows.push(new TableRow({
    children: [
      cell(String(no), RW[0], { align: AlignmentType.CENTER }),
      cell(nama, RW[1]),
      cell(rp(anggaran), RW[2], { align: AlignmentType.RIGHT }),
      cell(bobot, RW[3], { align: AlignmentType.CENTER }),
    ],
  }));
}
rekapRows.push(new TableRow({
  children: [
    cell('JUMLAH (DPP)', RW[0] + RW[1], { bold: true, fill: TOTL, span: 2, align: AlignmentType.RIGHT }),
    cell(rp(DPP), RW[2], { bold: true, fill: TOTL, align: AlignmentType.RIGHT }),
    cell('100,00%', RW[3], { bold: true, fill: TOTL, align: AlignmentType.CENTER }),
  ],
}));
rekapRows.push(new TableRow({
  children: [
    cell('PPN 11%', RW[0] + RW[1], { bold: true, fill: TOTL, span: 2, align: AlignmentType.RIGHT }),
    cell(rp(PPN), RW[2], { bold: true, fill: TOTL, align: AlignmentType.RIGHT }),
    cell('', RW[3], { fill: TOTL }),
  ],
}));
rekapRows.push(new TableRow({
  children: [
    cell('TOTAL NILAI KONTRAK', RW[0] + RW[1], { bold: true, fill: HEAD, span: 2, align: AlignmentType.RIGHT }),
    cell(rp(TOTAL), RW[2], { bold: true, fill: HEAD, align: AlignmentType.RIGHT }),
    cell('', RW[3], { fill: HEAD }),
  ],
}));
body.push(table(RW, rekapRows));

body.push(p('Nilai kontrak dibulatkan: Rp850.000.000,00 (delapan ratus lima puluh juta rupiah), termasuk pajak.',
  { italics: true, size: 19, before: 120 }));

/* ---------- BAGIAN II : RINCIAN ---------- */
body.push(p('BAGIAN II — RINCIAN RENCANA ANGGARAN BIAYA', { bold: true, size: 22, before: 320, after: 120 }));

const DW = [580, 3574, 800, 800, 1750, 1850];
for (const [no, nama, anggaran] of REKAP) {
  const rows = [
    new TableRow({
      children: [
        cell(`ITEM ${no} — ${nama.toUpperCase()}`, DW.reduce((a, b) => a + b, 0),
          { bold: true, fill: HEAD, span: 6 }),
      ],
    }),
    new TableRow({
      tableHeader: true,
      children: [
        cell('No.',           DW[0], { bold: true, fill: SUB, align: AlignmentType.CENTER }),
        cell('Uraian',        DW[1], { bold: true, fill: SUB, align: AlignmentType.CENTER }),
        cell('Volume',        DW[2], { bold: true, fill: SUB, align: AlignmentType.CENTER }),
        cell('Satuan',        DW[3], { bold: true, fill: SUB, align: AlignmentType.CENTER }),
        cell('Harga Satuan',  DW[4], { bold: true, fill: SUB, align: AlignmentType.CENTER }),
        cell('Jumlah',        DW[5], { bold: true, fill: SUB, align: AlignmentType.CENTER }),
      ],
    }),
  ];
  RINCIAN[no].forEach((r, i) => {
    rows.push(new TableRow({
      children: [
        cell(`${no}.${i + 1}`, DW[0], { align: AlignmentType.CENTER }),
        cell(r[0], DW[1]),
        cell(r[1], DW[2], { align: AlignmentType.CENTER }),
        cell(r[2], DW[3], { align: AlignmentType.CENTER }),
        cell(rp(r[3]), DW[4], { align: AlignmentType.RIGHT }),
        cell(rp(r[4]), DW[5], { align: AlignmentType.RIGHT }),
      ],
    }));
  });
  rows.push(new TableRow({
    children: [
      cell(`JUMLAH ITEM ${no}`, DW[0] + DW[1] + DW[2] + DW[3] + DW[4],
        { bold: true, fill: TOTL, span: 5, align: AlignmentType.RIGHT }),
      cell(rp(anggaran), DW[5], { bold: true, fill: TOTL, align: AlignmentType.RIGHT }),
    ],
  }));
  body.push(table(DW, rows));
  body.push(p('', { after: 160 }));
}

/* ---------- BAGIAN III : PERHITUNGAN PENDUKUNG ---------- */
body.push(p('BAGIAN III — PERHITUNGAN PENDUKUNG', { bold: true, size: 22, before: 200, after: 120 }));

body.push(p('A. Luas Bangunan', { bold: true, before: 80, after: 60 }));
const CW = [5354, 4000];
body.push(table(CW, [
  ['Panjang bangunan', '12 meter'],
  ['Lebar bangunan', '10 meter'],
  ['Luas bangunan = 12 m x 10 m', '120 m²'],
  ['Luas lantai berkeramik area utama', '100 m²'],
  ['Luas lantai keramik anti-slip (dapur dan toilet)', '22 m²'],
  ['Luas perkerasan lantai area luar', '45 m²'],
].map(([k, v], i) => new TableRow({
  children: [
    cell(k, CW[0], { bold: i === 2 }),
    cell(v, CW[1], { bold: i === 2, align: AlignmentType.RIGHT }),
  ],
}))));

body.push(p('B. Perhitungan Kebutuhan Keramik Lantai Area Utama', { bold: true, before: 200, after: 60 }));
body.push(table(CW, [
  ['Spesifikasi keramik', 'Ukuran 60 cm x 60 cm, warna cokelat, permukaan matte'],
  ['Ukuran satu keping = 0,60 m x 0,60 m', '0,36 m²'],
  ['Luas area berkeramik', '100 m²'],
  ['Kebutuhan teoritis = 100 m² : 0,36 m²', '277,78 keping'],
  ['Pembulatan kebutuhan teoritis', '278 keping'],
  ['Cadangan pemotongan dan kerusakan 5% = 100 m² x 5%', '5 m²'],
  ['Kebutuhan pengadaan = 100 m² + 5 m²', '105 m²'],
  ['Jumlah keping untuk 105 m² = 105 : 0,36', '292 keping'],
  ['Harga satuan keramik', 'Rp185.000,00 per m²'],
  ['Nilai pengadaan keramik = 105 m² x Rp185.000', 'Rp19.425.000,00'],
].map(([k, v], i) => new TableRow({
  children: [
    cell(k, CW[0], { bold: i === 9 }),
    cell(v, CW[1], { bold: i === 9, align: AlignmentType.RIGHT }),
  ],
}))));

body.push(p('C. Perhitungan Dasar Pengenaan Pajak dan Pajak Pertambahan Nilai', { bold: true, before: 200, after: 60 }));
body.push(table(CW, [
  ['Nilai kontrak termasuk pajak', 'Rp850.000.000,00'],
  ['DPP = Rp850.000.000 : 1,11', 'Rp765.765.765,77'],
  ['DPP dibulatkan', 'Rp765.765.766,00'],
  ['PPN = 11% x Rp765.765.766', 'Rp84.234.234,00'],
  ['Total = DPP + PPN', 'Rp850.000.000,00'],
].map(([k, v], i) => new TableRow({
  children: [
    cell(k, CW[0], { bold: i === 4 }),
    cell(v, CW[1], { bold: i === 4, align: AlignmentType.RIGHT }),
  ],
}))));

body.push(p('D. Rencana Termin Pembayaran', { bold: true, before: 200, after: 60 }));
const TW = [1200, 4954, 3200];
const terminRows = [
  new TableRow({
    tableHeader: true,
    children: [
      cell('Termin', TW[0], { bold: true, fill: HEAD, align: AlignmentType.CENTER }),
      cell('Kondisi Pembayaran', TW[1], { bold: true, fill: HEAD, align: AlignmentType.CENTER }),
      cell('Jumlah', TW[2], { bold: true, fill: HEAD, align: AlignmentType.CENTER }),
    ],
  }),
];
for (const [t, kondisi, nilai] of TERMIN) {
  terminRows.push(new TableRow({
    children: [
      cell(t, TW[0], { align: AlignmentType.CENTER }),
      cell(kondisi, TW[1]),
      cell(rp(nilai), TW[2], { align: AlignmentType.RIGHT }),
    ],
  }));
}
terminRows.push(new TableRow({
  children: [
    cell('JUMLAH', TW[0] + TW[1], { bold: true, fill: TOTL, span: 2, align: AlignmentType.RIGHT }),
    cell(rp(TOTAL), TW[2], { bold: true, fill: TOTL, align: AlignmentType.RIGHT }),
  ],
}));
body.push(table(TW, terminRows));

/* ---------- BAGIAN IV : CATATAN ---------- */
body.push(p('BAGIAN IV — CATATAN DAN KETENTUAN', { bold: true, size: 22, before: 320, after: 120 }));

const catatan = [
  'Nilai setiap item pekerjaan dalam Rekapitulasi merupakan Dasar Pengenaan Pajak (DPP), belum termasuk Pajak Pertambahan Nilai. Pajak Pertambahan Nilai diperhitungkan tersendiri pada Rekapitulasi.',
  'Nilai setiap item pekerjaan telah termasuk biaya bahan, upah tenaga kerja, alat bantu, biaya umum, Keselamatan dan Kesehatan Kerja, serta keuntungan pelaksana pekerjaan yang dibebankan secara proporsional, termasuk pembulatan nilai kontrak.',
  'Bobot pekerjaan dihitung dari perbandingan nilai setiap item terhadap jumlah DPP, dan digunakan sebagai dasar pengukuran progres pekerjaan serta penentuan hak pembayaran termin.',
  'Progres pekerjaan diukur berdasarkan realisasi bobot setiap item pekerjaan, bukan berdasarkan persentase datar terhadap nilai kontrak. Item 14 tidak merupakan pekerjaan fisik sehingga diakui secara proporsional (pro rata) terhadap realisasi fisik Item 1 sampai dengan Item 13.',
  'Pekerjaan yang dilaksanakan tidak sesuai dengan spesifikasi teknis dan karena itu harus dibongkar, tidak diperhitungkan sebagai realisasi progres pekerjaan.',
  'Setiap perubahan lingkup, volume, spesifikasi, nilai, maupun jangka waktu pekerjaan hanya berlaku apabila dituangkan dalam addendum tertulis yang ditandatangani kedua pihak. Kesepakatan lisan tidak menimbulkan hak tagih atas pekerjaan tambahan.',
  'Spesifikasi keramik lantai area utama ditetapkan berukuran 60 cm x 60 cm, warna cokelat, permukaan matte, dengan harga satuan Rp185.000,00 per m². Penggantian spesifikasi hanya dapat dilakukan atas persetujuan tertulis Pemberi Tugas.',
  'Pengadaan peralatan dapur dan peralatan usaha yang bersifat bergerak (antara lain mesin pendingin, mesin kopi, dan peralatan masak) tidak termasuk dalam lingkup Rencana Anggaran Biaya ini dan menjadi tanggung jawab Pemberi Tugas.',
  'Harga satuan dalam Rencana Anggaran Biaya ini merupakan harga satuan simulasi pada bulan Januari 2026 dan bersifat tetap (lump sum fixed price) selama jangka waktu pelaksanaan pekerjaan.',
  'Keterlambatan penyelesaian pekerjaan dikenakan denda sebesar 1‰ (satu per mil) per hari kalender dari nilai kontrak, dengan jumlah denda paling banyak 5% (lima persen) dari nilai kontrak.',
  'Tarif Pajak Pertambahan Nilai yang digunakan adalah tarif efektif sebesar 11% sebagai asumsi simulasi perkara. Dalam penerbitan faktur pajak, nilai tersebut dapat disajikan sebagai Pajak Pertambahan Nilai 12% atas Dasar Pengenaan Pajak nilai lain sebesar 11/12 dari harga jual, dengan hasil nominal yang sama.',
];
catatan.forEach((t, i) => {
  body.push(new Paragraph({
    children: [run(t)],
    numbering: { reference: 'catatan-num', level: 0 },
    spacing: { before: 40, after: 40, line: 260 },
    alignment: AlignmentType.JUSTIFIED,
  }));
});

/* ---------- TANDA TANGAN ---------- */
body.push(p('Surakarta, 12 Januari 2026', { align: AlignmentType.RIGHT, before: 400, after: 200 }));

const SW = [4677, 4677];
body.push(new Table({
  columnWidths: SW,
  width: { size: W, type: WidthType.DXA },
  borders: NO_BORDERS,
  rows: [
    new TableRow({
      children: [
        cell(['Pemberi Tugas,', '', '', '', '', '( R A K A )'], SW[0], { align: AlignmentType.CENTER }),
        cell(['Pelaksana Pekerjaan,', 'PT ARUNIKA KREASI', '', '', '', '( ................................. )', 'Direktur'], SW[1], { align: AlignmentType.CENTER }),
      ],
    }),
  ],
}));

body.push(p('Disusun oleh PT Arunika Kreasi dan disetujui oleh Pemberi Tugas sebagai Lampiran I Perjanjian Pemborongan Pekerjaan Nomor 001/PPP/AK-RK/I/2026.',
  { italics: true, size: 18, align: AlignmentType.CENTER, before: 400 }));

/* ------------------------------------------------------------------ */
/* DOKUMEN                                                             */
/* ------------------------------------------------------------------ */

const doc = new Document({
  creator: 'Praktik Peradilan Perdata',
  title: 'Rencana Anggaran Biaya - Renovasi Bangunan Komersial Menjadi Kafe',
  description: 'RAB Lampiran I Perjanjian Pemborongan Pekerjaan Raka - PT Arunika Kreasi',
  numbering: {
    config: [{
      reference: 'catatan-num',
      levels: [{
        level: 0,
        format: 'decimal',
        text: '%1.',
        alignment: AlignmentType.START,
        style: { paragraph: { indent: { left: 420, hanging: 300 } } },
      }],
    }],
  },
  styles: {
    default: {
      document: { run: { font: FONT, size: 20 } },
    },
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 },   // A4 portrait
        margin: { top: 1134, right: 1134, bottom: 1134, left: 1418 },
      },
    },
    children: body,
  }],
});

const out = '/home/user/claude-workspace/RAB-Renovasi-Kafe-Raka-vs-PT-Arunika-Kreasi.docx';
Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(out, buf);
  console.log('\nFile ditulis: ' + out);
  console.log('Ukuran: ' + (buf.length / 1024).toFixed(1) + ' KB');
});
