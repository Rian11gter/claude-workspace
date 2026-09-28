const { Packer } = require('docx');
const fs = require('fs');
const L = require('./lib.js');
const { rp, pc, num, p, pj, h1, h2, cell, tbl, kv, numlist, ltrlist, rows2,
        build, AlignmentType, TableRow, HEAD, TOTL, WARN } = L;
const D = JSON.parse(fs.readFileSync(__dirname + '/angka-ahli.json', 'utf8'));
const nm = no => D.ITEMS.find(i => i[0] === no)[1];

const B = [];

B.push(p('LAPORAN PEMERIKSAAN DAN PENDAPAT AHLI', { bold: true, size: 28, align: AlignmentType.CENTER, after: 60 }));
B.push(p('BIDANG KONSTRUKSI DAN PENAKSIRAN PEKERJAAN', { bold: true, size: 23, align: AlignmentType.CENTER, after: 60 }));
B.push(p('Nomor: 01/LPA-F/XI/2026', { size: 20, align: AlignmentType.CENTER, after: 40 }));
B.push(p('dalam perkara perdata Nomor ......../Pdt.G/2026/PN Skt', { italics: true, size: 20, align: AlignmentType.CENTER, after: 240 }));

B.push(h1('I. IDENTITAS AHLI'));
B.push(kv([
  ['Nama', 'Fauzi, S.T., M.T.'],
  ['Tempat/Tanggal Lahir', '............................., ..............................'],
  ['Pekerjaan', 'Konsultan manajemen konstruksi dan penaksir pekerjaan'],
  ['Pendidikan', 'Sarjana Teknik Sipil; Magister Teknik bidang Manajemen Konstruksi'],
  ['Sertifikat Kompetensi', 'SKK Konstruksi Ahli Manajemen Konstruksi Jenjang 8, Nomor ........................'],
  ['Pengalaman', '15 (lima belas) tahun dalam pelaksanaan, pengawasan, dan penilaian pekerjaan konstruksi bangunan gedung'],
  ['Alamat', '.................................................................., Kota Surakarta'],
]));

B.push(h1('II. DASAR PENUNJUKAN'));
B.push(pj('Laporan ini disusun berdasarkan Penetapan Majelis Hakim Pengadilan Negeri Surakarta Nomor ......../Pdt.G/2026/PN Skt tanggal .............................., yang menunjuk Ahli untuk melakukan pemeriksaan dan memberikan pendapat atas hal-hal teknis dalam perkara antara Raka sebagai Penggugat melawan PT Arunika Kreasi sebagai Tergugat.'));
B.push(pj('Penunjukan tersebut didasarkan pada Pasal 154 Reglemen Indonesia yang Diperbaharui, yang memberi kewenangan kepada Majelis Hakim untuk meminta pendapat ahli, baik atas permintaan para pihak maupun karena jabatan, apabila Majelis memandang perlu memperoleh keterangan atas hal yang menuntut keahlian khusus.'));

B.push(h1('III. PERTANYAAN YANG DIAJUKAN KEPADA AHLI'));
B.push.apply(B, numlist([
  'Bagaimana metode pengukuran realisasi progres pekerjaan yang lazim digunakan dalam praktik pelaksanaan pekerjaan konstruksi?',
  'Berapa realisasi progres pekerjaan renovasi pada tanggal 1 Mei 2026 dan pada tanggal 25 Juni 2026?',
  'Apakah keramik lantai yang terpasang sesuai dengan spesifikasi teknis yang diperjanjikan, dan apabila tidak sesuai, apa konsekuensi teknis serta biayanya?',
  'Apakah pekerjaan yang ditagih sebesar Rp85.000.000,00 merupakan pekerjaan di dalam atau di luar lingkup Rencana Anggaran Biaya?',
  'Berapa taksiran biaya yang diperlukan untuk menyelesaikan sisa pekerjaan?',
]));

B.push(h1('IV. DOKUMEN DAN BAHAN YANG DIPERIKSA'));
B.push.apply(B, ltrlist([
  'Perjanjian Pemborongan Pekerjaan Nomor 001/PPP/AK-RK/I/2026 tanggal 12 Januari 2026 beserta seluruh lampirannya;',
  'Rencana Anggaran Biaya sebagai Lampiran I Perjanjian, memuat 14 item pekerjaan dengan jumlah Dasar Pengenaan Pajak Rp765.765.766,00, Pajak Pertambahan Nilai 11% sebesar Rp84.234.234,00, dan nilai kontrak Rp850.000.000,00 termasuk pajak;',
  'Lampiran Spesifikasi Teknis, khususnya spesifikasi keramik lantai area utama;',
  'Gambar kerja awal dan gambar revisi yang dibuat pelaksana pekerjaan;',
  'Bukti pembayaran Termin I sampai dengan Termin III seluruhnya Rp600.000.000,00 beserta nota yang diterbitkan pelaksana pekerjaan;',
  'Percakapan pesan elektronik antara para pihak pada 16 Januari 2026 dan 20 Februari 2026;',
  'Surat tagihan pelaksana pekerjaan tanggal 8 Mei 2026 sebesar Rp185.000.000,00;',
  'Surat penolakan pemberi tugas tanggal 15 Mei 2026 dan surat-surat somasi;',
  'Dokumentasi foto pekerjaan yang memuat penanda tanggal;',
  'Hasil pemeriksaan lapangan yang dilakukan Ahli pada tanggal .............................. di lokasi pekerjaan.',
]));

B.push(h1('V. METODE PENILAIAN'));
B.push(pj('Penilaian realisasi progres pekerjaan dilakukan dengan metode bobot pekerjaan, yaitu metode yang mengukur capaian setiap item pekerjaan terhadap bobotnya di dalam Rencana Anggaran Biaya. Bobot setiap item dihitung dari perbandingan nilai item tersebut terhadap jumlah Dasar Pengenaan Pajak, sehingga jumlah seluruh bobot adalah 100%.'));
B.push(pj('Metode ini dipilih karena metode persentase datar terhadap nilai kontrak tidak memiliki tolok ukur yang dapat diuji. Dengan metode persentase datar, angka progres apa pun dapat dinyatakan tanpa dapat diperiksa kebenarannya. Sebaliknya, dengan metode bobot, setiap angka dapat diuji baris per baris terhadap item pekerjaan yang bersangkutan.'));
B.push(h2('Prinsip penilaian yang diterapkan'));
B.push.apply(B, numlist([
  'Harga satuan yang digunakan untuk menilai pekerjaan terpasang adalah harga satuan yang tercantum dalam Rencana Anggaran Biaya, yaitu harga satuan yang disusun pelaksana pekerjaan sendiri dan disetujui pemberi tugas. Ahli tidak menggunakan harga satuan sendiri untuk menilai pekerjaan terpasang, guna menghindari perdebatan mengenai kewajaran harga.',
  'Pekerjaan yang dilaksanakan tidak sesuai dengan spesifikasi teknis yang diperjanjikan dan karena itu harus dibongkar, tidak diperhitungkan sebagai realisasi progres. Pekerjaan demikian tidak memberikan manfaat kepada pemberi tugas, bahkan menimbulkan biaya pembongkaran. Memperhitungkannya sebagai progres berarti membebankan biaya pekerjaan yang gagal kepada pemberi tugas dua kali.',
  'Item 14 bukan merupakan pekerjaan fisik sehingga tidak dapat diukur melalui pengamatan lapangan. Item tersebut diakui secara proporsional terhadap realisasi fisik Item 1 sampai dengan Item 13, karena manfaat biaya penunjang melekat pada penyelesaian pekerjaan fisik.',
  'Pekerjaan yang secara urutan pelaksanaan belum dapat dimulai karena pekerjaan pendahulunya belum selesai, dinilai 0%.',
]));

B.push(h1('VI. HASIL PEMERIKSAAN DAN ANALISIS'));

B.push(h2('A. Bobot pekerjaan berdasarkan Rencana Anggaran Biaya'));
(function () {
  const cw = [620, 4934, 1900, 1900];
  const rows = [new TableRow({ tableHeader: true, children: [
    cell('Item', cw[0], { bold: true, fill: HEAD, align: AlignmentType.CENTER }),
    cell('Uraian Pekerjaan', cw[1], { bold: true, fill: HEAD, align: AlignmentType.CENTER }),
    cell('Nilai (DPP)', cw[2], { bold: true, fill: HEAD, align: AlignmentType.CENTER }),
    cell('Bobot', cw[3], { bold: true, fill: HEAD, align: AlignmentType.CENTER }),
  ] })];
  D.ITEMS.forEach(function (it) {
    rows.push(new TableRow({ children: [
      cell(String(it[0]), cw[0], { align: AlignmentType.CENTER }),
      cell(it[1], cw[1]),
      cell(rp(it[2]), cw[2], { align: AlignmentType.RIGHT }),
      cell(pc(D.bobot[it[0]]), cw[3], { align: AlignmentType.CENTER }),
    ] }));
  });
  rows.push(new TableRow({ children: [
    cell('JUMLAH (DPP)', cw[0] + cw[1], { bold: true, fill: TOTL, span: 2, align: AlignmentType.RIGHT }),
    cell(rp(765765766), cw[2], { bold: true, fill: TOTL, align: AlignmentType.RIGHT }),
    cell('100,00%', cw[3], { bold: true, fill: TOTL, align: AlignmentType.CENTER }),
  ] }));
  B.push(tbl(cw, rows));
})();
B.push(p('Bobot Item 14 memikul sisa pembulatan sehingga kolom bobot berjumlah tepat 100,00%. Bobot pekerjaan fisik Item 1 sampai dengan Item 13 seluruhnya ' + pc(D.BOBOT_FISIK) + '.', { italics: true, size: 19, before: 100 }));

function tabelProgres(R) {
  const cw = [620, 3634, 1300, 1400, 2400];
  const rows = [new TableRow({ tableHeader: true, children: [
    cell('Item', cw[0], { bold: true, fill: HEAD, align: AlignmentType.CENTER }),
    cell('Uraian Pekerjaan', cw[1], { bold: true, fill: HEAD, align: AlignmentType.CENTER }),
    cell('Bobot', cw[2], { bold: true, fill: HEAD, align: AlignmentType.CENTER }),
    cell('Realisasi', cw[3], { bold: true, fill: HEAD, align: AlignmentType.CENTER }),
    cell('Bobot x Realisasi', cw[4], { bold: true, fill: HEAD, align: AlignmentType.CENTER }),
  ] })];
  R.rows.forEach(function (r) {
    const z = (r.no === 4 || r.no === 13) ? WARN : undefined;
    rows.push(new TableRow({ children: [
      cell(String(r.no), cw[0], { align: AlignmentType.CENTER, fill: z, bold: !!z }),
      cell(nm(r.no), cw[1], { fill: z, bold: !!z }),
      cell(pc(r.bobot), cw[2], { align: AlignmentType.CENTER, fill: z, bold: !!z }),
      cell(r.real + '%', cw[3], { align: AlignmentType.CENTER, fill: z, bold: !!z }),
      cell(num(r.kontribusi), cw[4], { align: AlignmentType.RIGHT, fill: z, bold: !!z }),
    ] }));
  });
  function add(label, val, fill) {
    rows.push(new TableRow({ children: [
      cell(label, cw[0] + cw[1] + cw[2] + cw[3], { bold: true, fill: fill, span: 4, align: AlignmentType.RIGHT }),
      cell(val, cw[4], { bold: true, fill: fill, align: AlignmentType.RIGHT }),
    ] }));
  }
  add('Subtotal realisasi fisik Item 1 s.d. 13 (bobot ' + pc(D.BOBOT_FISIK) + ')', num(R.fisik), TOTL);
  add('Item 14 diakui pro rata: ' + pc(R.rasio * 100) + ' x ' + pc(D.bobot['14']), num(R.it14), TOTL);
  add('REALISASI PROGRES PEKERJAAN', pc(R.total), HEAD);
  return tbl(cw, rows);
}

B.push(h2('B. Realisasi progres pekerjaan pada tanggal 1 Mei 2026'));
B.push(pj('Tanggal 1 Mei 2026 adalah tanggal batas akhir penyerahan pekerjaan menurut Perjanjian, yaitu 105 hari kalender terhitung sejak dimulainya pekerjaan pada 16 Januari 2026.'));
B.push(tabelProgres(D.A));
B.push(pj('Realisasi progres pekerjaan pada tanggal 1 Mei 2026 adalah ' + pc(D.A.total) + '. Nilai pekerjaan terpasang pada tanggal tersebut adalah ' + pc(D.A.total) + ' x Rp850.000.000,00 = ' + rp(D.A.nilai) + '.', { before: 120 }));

B.push(h2('C. Realisasi progres pekerjaan pada tanggal 25 Juni 2026'));
B.push(pj('Tanggal 25 Juni 2026 adalah tanggal pelaksana pekerjaan menghentikan seluruh pekerjaan dan menarik para pekerjanya dari lokasi. Pada rentang 1 Mei 2026 sampai dengan 25 Juni 2026, penambahan realisasi terbatas pada tiga item, yaitu pintu dan jendela, pengecatan, serta furniture built-in, sejalan dengan berkurangnya aktivitas dan jumlah pekerja di lokasi.'));
B.push(tabelProgres(D.B));
B.push(pj('Realisasi progres pekerjaan pada tanggal 25 Juni 2026 adalah ' + pc(D.B.total) + ', dengan nilai pekerjaan terpasang ' + rp(D.B.nilai) + '. Dalam rentang 55 hari tersebut penambahan realisasi hanya ' + num(D.B.total - D.A.total) + ' poin.', { before: 120 }));

B.push(h2('D. Metode alternatif atas Item 14'));
B.push(pj('Ahli memandang perlu menyampaikan bahwa terhadap Item 14 terbuka perlakuan lain yang juga dapat dipertanggungjawabkan secara teknis. Sub-item 14.1 berupa jasa desain interior dan gambar kerja, sub-item 14.2 berupa gambar revisi dan penyesuaian desain lapangan, serta sub-item 14.3 berupa engineering dan perhitungan struktur, seluruhnya ' + rp(D.SUB_DESAIN) + ' atau bobot ' + pc(D.B_DESAIN) + ', secara teknis memang telah selesai. Gambar kerja telah dibuat, gambar revisi telah dibuat, dan perhitungan struktur telah dilaksanakan.'));
(function () {
  const cw = [5354, 4000];
  B.push(tbl(cw, rows2(cw, [
    ['Realisasi fisik Item 1 s.d. 13', num(D.A.fisik), 0],
    ['Sub-item 14.1 s.d. 14.3 diakui 100% (bobot ' + pc(D.B_DESAIN) + ')', num(D.B_DESAIN), 0],
    ['Sisa Item 14 (bobot ' + pc(D.B_SISA14) + ') diakui pro rata ' + pc(D.A.rasio * 100), num(D.B_SISA14 * D.A.rasio), 0],
    ['REALISASI MENURUT METODE ALTERNATIF', pc(D.ALT_TOTAL), 2],
  ])));
})();
B.push(pj('Metode utama menghasilkan ' + pc(D.A.total) + ' dan metode alternatif menghasilkan ' + pc(D.ALT_TOTAL) + '. Selisih kedua metode hanya ' + num(D.ALT_TOTAL - D.A.total) + ' poin. Kedua metode menempatkan realisasi progres pada kisaran 65%, dan tidak satu pun mendekati 85%.', { before: 120 }));

B.push(h2('E. Pengujian terhadap klaim progres 85%'));
B.push(pj('Ahli menguji apakah angka 85% dapat dicapai dengan metode bobot. Pengujian dilakukan sebagai berikut.'));
B.push.apply(B, numlist([
  'Apabila Item 4 berupa pekerjaan lantai dan keramik dengan bobot ' + pc(D.bobot['4']) + ' tidak diperhitungkan karena harus dibongkar, maka bobot seluruh item lainnya adalah ' + pc(D.TANPA_4) + '.',
  'Agar tercapai realisasi 85% dari bobot ' + pc(D.TANPA_4) + ' tersebut, seluruh item lain harus terealisasi rata-rata ' + String(D.RATA_DIPERLUKAN).replace('.', ',') + '%.',
  'Item 13 berupa finishing akhir dan pembersihan dengan bobot ' + pc(D.bobot['13']) + ' secara urutan pelaksanaan tidak dapat dimulai sebelum seluruh pekerjaan pendahulunya selesai, sehingga pada 1 Mei 2026 item tersebut belum dapat dikerjakan.',
  'Dengan Item 4 dan Item 13 dikeluarkan dari perhitungan, batas maksimum realisasi yang secara teknis mungkin dicapai adalah ' + pc(D.MAKS_TEKNIS) + '. Angka tersebut hanya dapat dicapai apabila kedua belas item lainnya terealisasi 100% tanpa kecuali.',
]));
B.push(pj('Keadaan kedua belas item terealisasi 100% tanpa kecuali tidak mungkin terjadi pada bangunan yang belum dapat digunakan sebagai kafe. Menurut pendapat Ahli, angka progres 85% hanya dapat diperoleh apabila pekerjaan keramik yang tidak sesuai spesifikasi diperhitungkan sebagai prestasi yang sah, disertai pembulatan item-item yang belum tuntas menjadi selesai.', { before: 60 }));

B.push(h2('F. Kesesuaian spesifikasi keramik lantai dan konsekuensi teknisnya'));
B.push(pj('Spesifikasi keramik lantai area utama menurut Rencana Anggaran Biaya butir 4.4 adalah keramik berukuran 60 cm x 60 cm, berwarna cokelat, permukaan matte, harga satuan Rp185.000,00 per meter persegi, volume pengadaan 105 meter persegi termasuk cadangan 5%. Keramik yang terpasang di lokasi berwarna hitam.'));
B.push.apply(B, numlist([
  'Warna keramik merupakan sifat bahan yang tidak dapat diubah setelah terpasang. Tidak terdapat metode perbaikan yang dapat menyesuaikan warna keramik terpasang kepada spesifikasi yang diperjanjikan.',
  'Satu-satunya cara memenuhi spesifikasi adalah pembongkaran seluruh keramik terpasang, perbaikan lapisan dasar, dan pemasangan ulang dengan keramik yang sesuai spesifikasi.',
  'Keramik berukuran 60 cm x 60 cm berwarna cokelat dengan permukaan matte merupakan produk reguler yang diproduksi beberapa produsen nasional dan tersedia melalui jaringan distributor. Untuk volume 105 meter persegi, yang termasuk volume kecil, waktu pengadaan yang lazim adalah 2 sampai dengan 4 minggu. Ahli tidak menemukan dasar teknis bagi waktu pengadaan yang tidak dapat ditentukan.',
]));
B.push(p('Taksiran biaya pembongkaran dan pemasangan ulang keramik', { bold: true, before: 160, after: 80 }));
(function () {
  const cw = [3554, 900, 800, 1600, 1600, 900];
  const rows = [new TableRow({ tableHeader: true, children: [
    cell('Uraian', cw[0], { bold: true, fill: HEAD, align: AlignmentType.CENTER }),
    cell('Volume', cw[1], { bold: true, fill: HEAD, align: AlignmentType.CENTER }),
    cell('Satuan', cw[2], { bold: true, fill: HEAD, align: AlignmentType.CENTER }),
    cell('Harga Satuan', cw[3], { bold: true, fill: HEAD, align: AlignmentType.CENTER }),
    cell('Jumlah', cw[4], { bold: true, fill: HEAD, align: AlignmentType.CENTER }),
    cell('Sifat', cw[5], { bold: true, fill: HEAD, align: AlignmentType.CENTER }),
  ] })];
  D.KERAMIK.forEach(function (r) {
    const z = r[5] ? WARN : undefined;
    rows.push(new TableRow({ children: [
      cell(r[0], cw[0], { fill: z }),
      cell(String(r[1]), cw[1], { align: AlignmentType.CENTER, fill: z }),
      cell(r[2], cw[2], { align: AlignmentType.CENTER, fill: z }),
      cell(rp(r[3]), cw[3], { align: AlignmentType.RIGHT, fill: z }),
      cell(rp(r[4]), cw[4], { align: AlignmentType.RIGHT, fill: z }),
      cell(r[5] ? 'tambahan' : 'lingkup', cw[5], { align: AlignmentType.CENTER, fill: z }),
    ] }));
  });
  rows.push(new TableRow({ children: [
    cell('JUMLAH (DPP)', cw[0] + cw[1] + cw[2] + cw[3], { bold: true, fill: TOTL, span: 4, align: AlignmentType.RIGHT }),
    cell(rp(D.K_TOTAL), cw[4], { bold: true, fill: TOTL, align: AlignmentType.RIGHT }),
    cell('', cw[5], { fill: TOTL }),
  ] }));
  B.push(tbl(cw, rows));
})();
B.push(pj('Dari jumlah ' + rp(D.K_TOTAL) + ' tersebut Ahli membedakan dua sifat biaya. Pertama, ' + rp(D.K_INKREMENTAL) + ' berupa pembongkaran keramik terpasang, pengangkutan puing, dan perbaikan lapisan dasar, merupakan biaya yang tidak akan timbul apabila keramik dipasang sesuai spesifikasi sejak semula. Kedua, ' + rp(D.K_LINGKUP) + ' berupa pengadaan keramik, perekat, dan upah pemasangan, merupakan biaya yang memang menjadi bagian dari lingkup pekerjaan sebagaimana telah dianggarkan dalam Item 4, sehingga tidak boleh diperhitungkan dua kali.', { before: 120 }));

B.push(h2('G. Analisis lingkup pekerjaan yang ditagih sebesar Rp85.000.000,00'));
B.push(pj('Ahli memeriksa apakah komponen pekerjaan yang ditagih berada di dalam atau di luar lingkup Rencana Anggaran Biaya.'));
(function () {
  const cw = [4254, 1600, 2000, 1500];
  const rows = [new TableRow({ tableHeader: true, children: [
    cell('Komponen yang ditagih', cw[0], { bold: true, fill: HEAD, align: AlignmentType.CENTER }),
    cell('Item RAB', cw[1], { bold: true, fill: HEAD, align: AlignmentType.CENTER }),
    cell('Nilai Dianggarkan', cw[2], { bold: true, fill: HEAD, align: AlignmentType.CENTER }),
    cell('Status', cw[3], { bold: true, fill: HEAD, align: AlignmentType.CENTER }),
  ] })];
  D.KLAIM85.forEach(function (r) {
    rows.push(new TableRow({ children: [
      cell(r[0], cw[0]),
      cell(r[1], cw[1], { align: AlignmentType.CENTER }),
      cell(rp(r[2]), cw[2], { align: AlignmentType.RIGHT }),
      cell('di dalam lingkup', cw[3], { align: AlignmentType.CENTER }),
    ] }));
  });
  rows.push(new TableRow({ children: [
    cell('JUMLAH YANG TELAH DIANGGARKAN DALAM RAB', cw[0] + cw[1], { bold: true, fill: TOTL, span: 2, align: AlignmentType.RIGHT }),
    cell(rp(D.KLAIM85_TOTAL), cw[2], { bold: true, fill: TOTL, align: AlignmentType.RIGHT }),
    cell('', cw[3], { fill: TOTL }),
  ] }));
  B.push(tbl(cw, rows));
})();
B.push(pj('Keempat komponen yang ditagih berada di dalam lingkup Rencana Anggaran Biaya, dengan nilai yang telah dianggarkan seluruhnya ' + rp(D.KLAIM85_TOTAL) + '. Karena itu, untuk dapat dinilai sebagai pekerjaan tambahan, yang harus ditunjukkan bukanlah adanya perubahan, melainkan adanya selisih volume atau selisih spesifikasi di atas volume dan spesifikasi yang telah dianggarkan, disertai perhitungan yang dapat diperiksa.', { before: 120 }));
B.push(p('Volume menurut Rencana Anggaran Biaya yang dapat digunakan sebagai tolok ukur pengujian:', { before: 140, after: 80 }));
B.push.apply(B, ltrlist([
  'Item 5: plafon gypsum 108 meter persegi, plafon kalsiboard 22 meter persegi, drop ceiling dan up-stand ornamen 32 meter lari, list profil gypsum 96 meter lari;',
  'Item 7: 48 titik lampu, 36 titik stop kontak dan saklar, 22 unit spotlight LED track, 12 unit lampu dekoratif gantung, 18 unit downlight LED, 8 unit lampu area luar;',
  'Item 11: panel fasad 24 meter persegi, kanopi 14 meter persegi, pagar pembatas 8 meter lari.',
]));
B.push(pj('Sampai dengan selesainya pemeriksaan ini, Ahli tidak menemukan berita acara perubahan pekerjaan, addendum, gambar perubahan yang ditandatangani kedua pihak, maupun perhitungan volume tambahan yang menunjukkan selisih di atas volume tersebut.', { before: 100 }));

B.push(h2('H. Taksiran biaya penyelesaian sisa pekerjaan'));
B.push(pj('Taksiran disusun atas dasar keadaan pekerjaan pada tanggal 25 Juni 2026, yaitu keadaan pada saat pelaksana pekerjaan meninggalkan lokasi.'));
(function () {
  const cw = [6354, 3000];
  B.push(tbl(cw, rows2(cw, [
    ['Nilai sisa pekerjaan: ' + pc(D.SISA_PCT) + ' x Rp765.765.766', rp(D.SISA_DPP), 0],
    ['Biaya pembongkaran keramik, pengangkutan puing, dan perbaikan lapisan dasar', rp(D.K_INKREMENTAL), 0],
    ['Subtotal', rp(D.SUB1), 1],
    ['Eskalasi harga dan biaya mobilisasi pelaksana pengganti, 12%', rp(D.ESKALASI), 0],
    ['Jumlah (DPP)', rp(D.JML_DPP), 1],
    ['Pajak Pertambahan Nilai 11%', rp(D.JML_PPN), 0],
    ['TAKSIRAN BIAYA PENYELESAIAN SISA PEKERJAAN', rp(D.TAKSIRAN), 2],
    ['Dana kontrak yang belum dibayarkan (Termin IV)', rp(D.DANA_SISA), 0],
    ['KEKURANGAN DANA', rp(D.KEKURANGAN), 2],
  ])));
})();
B.push(pj('Eskalasi sebesar 12% diperhitungkan karena pelaksana pengganti harus melakukan mobilisasi baru, memeriksa serta menanggung risiko atas mutu pekerjaan yang tidak ia kerjakan sendiri, dan menanggung kenaikan harga bahan serta upah dibandingkan harga pada Januari 2026. Dalam pengambilalihan pekerjaan yang terhenti, tambahan biaya pada kisaran 10% sampai 15% merupakan kisaran yang lazim, dan Ahli mengambil angka pada bagian bawah kisaran tersebut.', { before: 120 }));

B.push(h1('VII. KESIMPULAN'));
B.push.apply(B, numlist([
  'Metode pengukuran progres yang lazim dan dapat diuji adalah metode bobot pekerjaan berdasarkan Rencana Anggaran Biaya, bukan metode persentase datar terhadap nilai kontrak.',
  'Realisasi progres pekerjaan pada tanggal 1 Mei 2026 adalah ' + pc(D.A.total) + ' menurut metode utama, atau ' + pc(D.ALT_TOTAL) + ' menurut metode alternatif, dengan nilai pekerjaan terpasang ' + rp(D.A.nilai) + '. Realisasi pada tanggal 25 Juni 2026 adalah ' + pc(D.B.total) + ' dengan nilai pekerjaan terpasang ' + rp(D.B.nilai) + '.',
  'Angka progres 85% tidak dapat dicapai dengan metode bobot, kecuali dengan memperhitungkan pekerjaan keramik yang tidak sesuai spesifikasi sebagai prestasi yang sah. Batas maksimum realisasi yang secara teknis mungkin dicapai dengan mengeluarkan Item 4 dan Item 13 adalah ' + pc(D.MAKS_TEKNIS) + '.',
  'Keramik yang terpasang tidak sesuai dengan spesifikasi teknis yang diperjanjikan. Ketidaksesuaian warna keramik tidak dapat diperbaiki selain dengan pembongkaran seluruhnya. Taksiran biaya pembongkaran dan pemasangan ulang adalah ' + rp(D.K_TOTAL) + ', dan di dalamnya ' + rp(D.K_INKREMENTAL) + ' merupakan biaya yang tidak akan timbul apabila keramik dipasang sesuai spesifikasi sejak semula.',
  'Keempat komponen pekerjaan yang ditagih sebesar Rp85.000.000,00 berada di dalam lingkup Rencana Anggaran Biaya, dengan nilai yang telah dianggarkan seluruhnya ' + rp(D.KLAIM85_TOTAL) + '. Ahli tidak menemukan dokumen yang menunjukkan selisih volume atau spesifikasi di atas yang telah dianggarkan.',
  'Taksiran biaya penyelesaian sisa pekerjaan adalah ' + rp(D.TAKSIRAN) + ', sedangkan dana kontrak yang belum dibayarkan adalah ' + rp(D.DANA_SISA) + ', sehingga terdapat kekurangan dana sebesar ' + rp(D.KEKURANGAN) + '.',
]));

B.push(h1('VIII. KETERBATASAN DAN PERNYATAAN AHLI'));
B.push.apply(B, numlist([
  'Ahli tidak berada di lokasi pekerjaan pada tanggal 1 Mei 2026 maupun pada tanggal 25 Juni 2026. Penilaian atas kedua tanggal tersebut merupakan rekonstruksi yang disusun dari dokumentasi foto bertanggal, dokumen progres dan pembayaran, serta keadaan terpasang yang Ahli periksa di lapangan. Rekonstruksi demikian merupakan metode yang lazim dalam penilaian pekerjaan konstruksi apabila penilai tidak hadir pada tanggal yang dipersoalkan. Ahli menyampaikan keterbatasan ini secara terbuka untuk dipertimbangkan Majelis Hakim.',
  'Harga satuan untuk pos pembongkaran keramik dan pos eskalasi tidak terdapat dalam Rencana Anggaran Biaya, sehingga Ahli menggunakan harga pasar yang lazim. Kedua pos tersebut telah Ahli tandai secara terpisah dalam laporan ini.',
  'Laporan ini terbatas pada hal-hal teknis dan penaksiran nilai pekerjaan. Ahli tidak memberikan pendapat mengenai ada atau tidaknya wanprestasi, ada atau tidaknya keadaan memaksa, siapa pihak yang bertanggung jawab secara hukum, maupun besarnya ganti kerugian yang patut. Hal-hal tersebut merupakan kewenangan Majelis Hakim.',
  'Ahli tidak mempunyai hubungan keluarga, hubungan pekerjaan, maupun kepentingan keuangan dengan Penggugat maupun Tergugat, selain honorarium sebagai ahli yang besarnya tidak bergantung pada hasil putusan.',
  'Laporan ini disusun dengan kejujuran dan menurut pengetahuan Ahli sebaik-baiknya, dan Ahli bersedia mempertanggungjawabkannya di bawah sumpah di muka persidangan.',
]));

B.push(p('Surakarta, .............................. 2026', { align: AlignmentType.RIGHT, before: 400, after: 200 }));
B.push(tbl([4677, 4677], [new TableRow({ children: [
  cell([''], 4677),
  cell(['Ahli,', '', '', '', '', 'Fauzi, S.T., M.T.', 'SKK Konstruksi Ahli Manajemen Konstruksi Jenjang 8'], 4677, { align: AlignmentType.CENTER }),
] })], { plain: true }));

Packer.toBuffer(build(B, 'Laporan Pemeriksaan dan Pendapat Ahli')).then(function (b) {
  const out = '/home/user/claude-workspace/Laporan-Ahli-Konstruksi-Fauzi.docx';
  fs.writeFileSync(out, b);
  console.log('Laporan-Ahli-Konstruksi-Fauzi.docx  ' + (b.length / 1024).toFixed(1) + ' KB');
});
