const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, Footer,
  WidthType, AlignmentType, BorderStyle, ShadingType, VerticalAlign,
  PageNumber, TabStopType,
} = require('docx');
const fs = require('fs');
const D = JSON.parse(fs.readFileSync(__dirname + '/angka-ahli.json', 'utf8'));

const FONT = 'Times New Roman', SZ = 24, W = 9354;
const HEAD = 'D9D9D9', TOTL = 'E8E8E8';
const NB = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const NO_BORDERS = { top: NB, bottom: NB, left: NB, right: NB };

const f  = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
const rp = n => 'Rp' + f(n) + ',00';
const pc = n => String(n.toFixed(2)).replace('.', ',') + '%';

const run = (t, o = {}) => new TextRun({
  text: t, font: FONT, size: o.size || SZ,
  bold: !!o.bold, italics: !!o.italics,
});
function P(parts, o = {}) {
  return new Paragraph({
    children: (Array.isArray(parts) ? parts : [run(parts, o)]),
    alignment: o.align || AlignmentType.JUSTIFIED,
    spacing: { before: o.before || 0, after: o.after === undefined ? 120 : o.after, line: o.line || 280 },
    indent: o.indent, tabStops: o.tabStops,
  });
}
const Pl = (t, o = {}) => P(t, Object.assign({ align: AlignmentType.LEFT }, o));
const Pr = (t, o = {}) => P(t, Object.assign({ align: AlignmentType.RIGHT }, o));

let N = 0, M = 0;
function item(parts, counter) {
  const n = counter === 'p' ? (M += 1) : (N += 1);
  const kids = [run(n + '.'), new TextRun({ text: '\t', font: FONT, size: SZ })];
  (Array.isArray(parts) ? parts : [run(parts)]).forEach(k => kids.push(k));
  return new Paragraph({
    children: kids, alignment: AlignmentType.JUSTIFIED,
    spacing: { before: 60, after: 120, line: 280 },
    indent: { left: 620, hanging: 620 },
    tabStops: [{ type: TabStopType.LEFT, position: 620 }],
  });
}
const bahwa   = p => item(p, 'n');
const petitum = p => item(p, 'p');
function sub(letter, text) {
  return new Paragraph({
    children: [run(letter + '.'), new TextRun({ text: '\t', font: FONT, size: SZ }), run(text)],
    alignment: AlignmentType.JUSTIFIED,
    spacing: { before: 40, after: 80, line: 280 },
    indent: { left: 1180, hanging: 560 },
    tabStops: [{ type: TabStopType.LEFT, position: 1180 }],
  });
}
function kv(label, value) {
  const cw = [2700, 260, W - 2960];
  return new TableRow({ children: [
    cellR(label, cw[0]), cellR(':', cw[1], { align: AlignmentType.CENTER }), cellR(value, cw[2]),
  ] });
}
function cellR(text, width, o = {}) {
  return new TableCell({
    children: [new Paragraph({
      children: [run(text, { size: o.size || SZ, bold: o.bold })],
      alignment: o.align || AlignmentType.LEFT,
      spacing: { before: 10, after: 10, line: 280 },
    })],
    width: { size: width, type: WidthType.DXA },
    verticalAlign: VerticalAlign.TOP,
    margins: { top: 20, bottom: 20, left: 0, right: 60 },
  });
}
function cell(text, width, o = {}) {
  return new TableCell({
    children: (Array.isArray(text) ? text : [text]).map(t => new Paragraph({
      children: [run(t, { size: o.size || 21, bold: o.bold })],
      alignment: o.align || AlignmentType.LEFT,
      spacing: { before: 30, after: 30, line: 250 },
    })),
    width: { size: width, type: WidthType.DXA },
    shading: o.fill ? { type: ShadingType.CLEAR, color: 'auto', fill: o.fill } : undefined,
    verticalAlign: VerticalAlign.CENTER,
    margins: { top: 50, bottom: 50, left: 100, right: 100 },
    columnSpan: o.span,
  });
}
const tbl = (cw, rows, o = {}) => new Table({
  columnWidths: cw, width: { size: W, type: WidthType.DXA },
  borders: o.plain ? NO_BORDERS : undefined, rows,
});

const B = [];

/* ============ KOP ============ */
B.push(Pr('Surakarta, 15 September 2026', { after: 240 }));
B.push(Pl('Kepada Yth.', { after: 0 }));
B.push(Pl('Ketua Pengadilan Negeri Surakarta', { after: 0 }));
B.push(Pl('Di-', { after: 0 }));
B.push(Pl([run('SURAKARTA', { bold: true })], { after: 240 }));
B.push(Pl([run('Perihal: '), run('Gugatan Wanprestasi', { bold: true })], { after: 240 }));
B.push(Pl('Assalamu’alaikum warrahmatullahi wabarakatuh,', { after: 120 }));
B.push(Pl('Dengan Hormat,', { after: 120 }));
B.push(Pl('Kami yang bertanda tangan di bawah ini:', { after: 120 }));
B.push(Pl([run('BRIAN ERLANGGA, S.H., M.H.', { bold: true })], { after: 0 }));
B.push(Pl([run('MOHAMMAD NAUFAL FARELLI, S.H., M.H.', { bold: true })], { after: 120 }));
B.push(Pl('Advokat dan Penasihat Hukum pada:', { after: 0 }));
B.push(Pl([run('NAWASENA LAW FIRM', { bold: true })], { after: 0 }));
B.push(Pl('Berkantor di Jalan Slamet Riyadi Nomor 280, Kelurahan Sriwedari, Kecamatan Laweyan 57141, Kota Surakarta, Provinsi Jawa Tengah;', { after: 120 }));
B.push(Pl('Bertindak baik sendiri-sendiri maupun bersama-sama, berdasarkan Surat Kuasa Khusus bermeterai Nomor 45/SKK/RMR/IX/2026 tertanggal 8 September 2026, bertindak untuk dan atas nama:', { after: 160 }));

B.push(tbl([2700, 260, W - 2960], [
  kv('Nama', 'RAKA'),
  kv('Tempat/Tanggal Lahir', 'Surakarta, 20 September 1998'),
  kv('Pekerjaan', 'Wiraswasta'),
  kv('Nomor Induk Kependudukan', '390188764453'),
  kv('Alamat', 'Jalan Karagan Nomor 18, Kelurahan Panularan, Kecamatan Laweyan, Kota Surakarta, Provinsi Jawa Tengah'),
], { plain: true }));
B.push(Pl('Selaku pemilik bangunan komersial yang terletak di Jalan Ahmad Yani Nomor 21, Kota Surakarta;', { before: 120, after: 120 }));
B.push(Pl([run('Selanjutnya disebut sebagai '), run('PENGGUGAT', { bold: true }), run(';')], { after: 200 }));

B.push(Pl([run('Dengan ini mengajukan '), run('Gugatan Wanprestasi', { bold: true }), run(' terhadap:')], { after: 140 }));
B.push(tbl([2700, 260, W - 2960], [
  kv('Nama', 'PT ARUNIKA KREASI'),
  kv('Bidang Usaha', 'Desain interior dan pengelolaan usaha kuliner'),
  kv('Kedudukan', 'Jalan Anggrek Nomor 7, RT 01, RW 02, Kelurahan Nyawiji, Kecamatan Polanharjo, Kabupaten Klaten, Provinsi Jawa Tengah'),
  kv('Diwakili oleh', 'ARYA DAMAR PRAYOGA, S.H., M.H., dalam kedudukannya sebagai Direktur, yang berwenang mewakili perseroan berdasarkan Anggaran Dasar perseroan'),
], { plain: true }));
B.push(Pl([run('Selanjutnya disebut sebagai '), run('TERGUGAT', { bold: true }), run(';')], { before: 120, after: 200 }));

B.push(Pl('Bahwa adapun dalil gugatan ini kami ajukan berdasarkan hal-hal sebagai berikut:', { after: 160 }));

/* ============ POSITA ============ */

B.push(bahwa('Bahwa Penggugat adalah pemilik sah atas sebuah bangunan komersial yang terletak di Jalan Ahmad Yani Nomor 21, Kota Surakarta, berukuran kurang lebih 12 meter kali 10 meter atau seluas kurang lebih 120 m², yang sebelumnya digunakan sebagai bangunan usaha;'));

B.push(bahwa('Bahwa pada tanggal 12 Januari 2026 Penggugat dan Tergugat menandatangani Perjanjian Pemborongan Pekerjaan Nomor 001/PPP/AK-RK/I/2026 beserta seluruh lampirannya (Bukti P-1), yang mewajibkan Tergugat merenovasi bangunan tersebut menjadi sebuah kafe dalam kondisi siap beroperasi. Perjanjian tersebut telah memenuhi syarat sah Pasal 1320 Kitab Undang-Undang Hukum Perdata sehingga berlaku sebagai undang-undang bagi para pihak menurut Pasal 1338 Kitab Undang-Undang Hukum Perdata, dan merupakan perjanjian pemborongan pekerjaan sebagaimana Pasal 1601b juncto Pasal 1604 sampai dengan Pasal 1616 Kitab Undang-Undang Hukum Perdata;'));

B.push(bahwa('Bahwa nilai pekerjaan disepakati sebesar Rp850.000.000,00 (delapan ratus lima puluh juta rupiah) termasuk pajak, yang menurut Rencana Anggaran Biaya sebagai Lampiran I Perjanjian (Bukti P-2) terdiri atas Dasar Pengenaan Pajak Rp765.765.766,00 dan Pajak Pertambahan Nilai 11% sebesar Rp84.234.234,00. Rencana Anggaran Biaya tersebut disusun oleh Tergugat sendiri dan disetujui Penggugat, serta merinci lingkup pekerjaan menjadi 14 (empat belas) item pekerjaan beserta bobotnya masing-masing;'));

B.push(bahwa('Bahwa Perjanjian menentukan hal-hal pokok sebagai berikut: jangka waktu pelaksanaan 105 (seratus lima) hari kalender terhitung sejak dimulainya pekerjaan pada tanggal 16 Januari 2026, sehingga batas akhir penyerahan pekerjaan dalam kondisi siap beroperasi adalah tanggal 1 Mei 2026; spesifikasi keramik lantai area utama berupa keramik berukuran 60 cm x 60 cm berwarna cokelat permukaan matte dengan harga satuan Rp185.000,00 per meter persegi dan volume 105 meter persegi (Rencana Anggaran Biaya butir 4.4 dan Lampiran Spesifikasi Teknis, Bukti P-3); bahwa setiap perubahan lingkup, volume, spesifikasi, nilai, maupun jangka waktu pekerjaan hanya berlaku apabila dituangkan dalam addendum tertulis yang ditandatangani kedua pihak; serta klausula domisili hukum yang menetapkan Pengadilan Negeri Surakarta sebagai pengadilan yang berwenang menyelesaikan perselisihan yang timbul dari Perjanjian;'));

B.push(bahwa('Bahwa pembayaran disepakati dalam 4 (empat) termin, dan Penggugat telah memenuhi seluruh kewajiban pembayaran yang telah jatuh tempo, yaitu Termin I sebesar Rp450.000.000,00 pada tanggal 16 Januari 2026 (Bukti P-4), Termin II sebesar Rp50.000.000,00 pada tanggal 5 Maret 2026 atas dasar klaim progres 40% yang disampaikan Tergugat sendiri (Bukti P-5), dan Termin III sebesar Rp100.000.000,00 pada tanggal 10 April 2026 atas dasar klaim progres 70% yang juga disampaikan Tergugat sendiri (Bukti P-6), sehingga seluruhnya Penggugat telah membayar Rp600.000.000,00. Adapun Termin IV sebesar Rp250.000.000,00 sampai gugatan ini diajukan belum jatuh tempo, karena syarat pembayarannya adalah pekerjaan selesai 100% dan diserahterimakan dalam kondisi siap beroperasi, dan syarat tersebut tidak pernah terpenuhi;'));

B.push(bahwa('Bahwa sepanjang pelaksanaan pekerjaan Penggugat senantiasa membayar melebihi nilai prestasi yang dikerjakan Tergugat, bahkan apabila diukur dengan klaim progres Tergugat sendiri, sebagaimana tabel berikut:'));
(function () {
  const cw = [1650, 1900, 2604, 1600, 1600];
  const rows = [new TableRow({ tableHeader: true, children: [
    cell('Tanggal', cw[0], { bold: true, fill: HEAD, align: AlignmentType.CENTER }),
    cell('Dibayar Penggugat (kumulatif)', cw[1], { bold: true, fill: HEAD, align: AlignmentType.CENTER }),
    cell('Dasar Penilaian Prestasi', cw[2], { bold: true, fill: HEAD, align: AlignmentType.CENTER }),
    cell('Nilai Prestasi', cw[3], { bold: true, fill: HEAD, align: AlignmentType.CENTER }),
    cell('Kelebihan Bayar', cw[4], { bold: true, fill: HEAD, align: AlignmentType.CENTER }),
  ] })];
  [
    ['16 Januari 2026', 450000000, 'Pekerjaan baru dimulai', 0],
    ['5 Maret 2026',    500000000, 'Klaim progres Tergugat 40%', 340000000],
    ['10 April 2026',   600000000, 'Klaim progres Tergugat 70%', 595000000],
    ['1 Mei 2026',      600000000, 'Realisasi menurut Ahli ' + pc(D.A.total), D.A.nilai],
    ['25 Juni 2026',    600000000, 'Realisasi menurut Ahli ' + pc(D.B.total), D.B.nilai],
  ].forEach(r => rows.push(new TableRow({ children: [
    cell(r[0], cw[0], { align: AlignmentType.CENTER }),
    cell(rp(r[1]), cw[1], { align: AlignmentType.RIGHT }),
    cell(r[2], cw[2]),
    cell(rp(r[3]), cw[3], { align: AlignmentType.RIGHT }),
    cell(rp(r[1] - r[3]), cw[4], { align: AlignmentType.RIGHT, bold: true }),
  ] })));
  B.push(tbl(cw, rows));
})();
B.push(Pl('', { after: 160 }));

B.push(bahwa('Bahwa Tergugat mulai melaksanakan pekerjaan pada tanggal 16 Januari 2026 dengan pembongkaran interior lama, dan setelah pembongkaran tersebut Tergugat sendiri yang mengusulkan penyesuaian desain dan tata ruang bangunan melalui percakapan pesan elektronik kepada Penggugat (Bukti P-7). Dengan demikian penyesuaian desain tersebut berasal dari usulan Tergugat sendiri, bukan dari permintaan Penggugat;'));

B.push(bahwa('Bahwa pada tanggal 20 Februari 2026 Penggugat menemukan keramik lantai yang dipasang Tergugat berwarna hitam, menyimpang dari spesifikasi yang diperjanjikan yaitu berwarna cokelat, dan Penggugat menyampaikan keberatan atas hal tersebut (Bukti P-8 dan Bukti P-9). Atas keberatan itu Tergugat berdalih keramik cokelat sedang tidak tersedia, namun Tergugat tetap memasang keramik hitam secara sepihak tanpa persetujuan tertulis Penggugat, dan menyatakan pemesanan keramik yang sesuai memerlukan waktu sekitar 6 (enam) minggu;'));

B.push(bahwa('Bahwa pada tanggal 18 Maret 2026 diadakan pertemuan di lokasi antara Penggugat, Direktur Tergugat, dan pelaksana lapangan yang membahas beberapa perubahan mengenai plafon, pencahayaan, dan tata ruang area luar, namun perubahan tersebut hanya disepakati secara lisan dan tidak pernah dituangkan dalam addendum tertulis maupun berita acara perubahan pekerjaan, sehingga sesuai Perjanjian tidak mengubah lingkup, nilai, maupun jangka waktu pekerjaan;'));

B.push(bahwa('Bahwa pada tanggal 22 April 2026 Penggugat mengingatkan Tergugat mengenai batas akhir penyelesaian pekerjaan pada tanggal 1 Mei 2026 (Bukti P-11), namun Tergugat justru menyampaikan bahwa waktu pengadaan keramik yang semula 6 minggu berubah menjadi waktu yang tidak dapat ditentukan;'));

B.push(bahwa([
  run('Bahwa '), run('BENTUK WANPRESTASI PERTAMA', { bold: true }),
  run(' yang dilakukan Tergugat adalah terlambat memenuhi prestasi. Pada tanggal 1 Mei 2026 pekerjaan belum selesai dan bangunan belum dapat digunakan sebagai kafe, sedangkan menurut Laporan Pemeriksaan dan Pendapat Ahli (Bukti P-15) realisasi progres pekerjaan pada tanggal tersebut hanya ' + pc(D.A.total) + ' dengan nilai pekerjaan terpasang ' + rp(D.A.nilai) + ', diukur dengan metode bobot pekerjaan berdasarkan Rencana Anggaran Biaya yang disusun Tergugat sendiri. Oleh karena tidak pernah ada addendum tertulis yang mengubah jangka waktu, batas akhir tanggal 1 Mei 2026 tetap berlaku dan mengikat Tergugat, sehingga sejak tanggal 2 Mei 2026 Tergugat berada dalam keadaan lalai '),
  run('berdasarkan kekuatan perikatan itu sendiri', { italics: true }),
  run(' sebagaimana Pasal 1238 Kitab Undang-Undang Hukum Perdata, yaitu karena lewatnya waktu yang telah ditentukan dalam Perjanjian;'),
]));

B.push(bahwa([
  run('Bahwa '), run('BENTUK WANPRESTASI KEDUA', { bold: true }),
  run(' yang dilakukan Tergugat adalah memenuhi prestasi tetapi tidak sebagaimana mestinya, yaitu memasang keramik lantai yang menyimpang dari spesifikasi. Warna keramik merupakan sifat bahan yang tidak dapat diubah setelah terpasang, sehingga satu-satunya cara memenuhi spesifikasi adalah pembongkaran seluruh keramik terpasang, perbaikan lapisan dasar, dan pemasangan ulang, dengan taksiran biaya ' + rp(D.K_TOTAL) + ' yang di dalamnya ' + rp(D.K_INKREMENTAL) + ' merupakan biaya yang tidak akan timbul apabila Tergugat memasang keramik sesuai spesifikasi sejak semula. Adapun dalih ketidaktersediaan keramik tidak dapat diterima, karena keramik berukuran 60 cm x 60 cm berwarna cokelat permukaan matte merupakan produk reguler yang tersedia melalui jaringan distributor dengan waktu pengadaan lazim 2 sampai 4 minggu untuk volume 105 meter persegi, dan karena Tergugat telah menerima Termin I sebesar Rp450.000.000,00 yang di dalamnya termasuk dana pengadaan material;'),
]));

B.push(bahwa('Bahwa pada tanggal 8 Mei 2026, yaitu setelah Tergugat berada dalam keadaan lalai, Tergugat justru mengirimkan surat tagihan kepada Penggugat sebesar Rp185.000.000,00 (Bukti P-12), terdiri atas Rp100.000.000,00 sebagai pembayaran pekerjaan dan Rp85.000.000,00 sebagai biaya tambahan karena permintaan perpanjangan waktu selama 45 (empat puluh lima) hari;'));

B.push(bahwa('Bahwa tagihan Tergugat tersebut tidak mempunyai dasar hukum, dengan alasan:'));
B.push(sub('a', 'Tagihan Rp100.000.000,00 merupakan bagian dari Termin IV yang belum jatuh tempo, karena pekerjaan belum selesai dan belum pernah diserahterimakan dalam kondisi siap beroperasi;'));
B.push(sub('b', 'Tagihan Rp85.000.000,00 tidak pernah disepakati dalam addendum tertulis, sedangkan Perjanjian secara tegas mensyaratkan addendum tertulis bagi setiap perubahan nilai maupun jangka waktu;'));
B.push(sub('c', 'Seluruh komponen yang ditagih ternyata telah berada di dalam lingkup Rencana Anggaran Biaya dengan nilai yang telah dianggarkan seluruhnya ' + rp(D.KLAIM85_TOTAL) + ', yaitu plafon pada Item 5 senilai Rp58.000.000,00, pencahayaan pada Item 7 senilai Rp58.000.000,00, area luar pada Item 11 senilai Rp31.000.000,00, dan penyesuaian desain serta gambar revisi pada sub-item 14.2 senilai Rp4.500.000,00;'));
B.push(sub('d', 'Biaya perpanjangan waktu tidak dapat dibebankan kepada Penggugat, karena kebutuhan perpanjangan waktu itu justru bersumber dari kelalaian Tergugat sendiri;'));

B.push(bahwa('Bahwa pada tanggal 15 Mei 2026 Penggugat menolak tagihan tersebut melalui sambungan telepon, dengan alasan pekerjaan belum selesai, belum dilakukan serah terima, serta tidak ada kesepakatan tertulis mengenai tambahan biaya maupun perpanjangan waktu. Setelah penolakan itu Tergugat menyatakan hanya bersedia melanjutkan pekerjaan apabila tagihan dipenuhi terlebih dahulu. Penangguhan prestasi oleh Tergugat tersebut tidak berdasar, karena Termin IV belum jatuh tempo dan karena Penggugat justru selalu membayar melebihi nilai prestasi Tergugat sebagaimana angka 6 di atas;'));

B.push(bahwa([
  run('Bahwa '), run('BENTUK WANPRESTASI KETIGA', { bold: true }),
  run(' yang dilakukan Tergugat adalah tidak memenuhi prestasi sama sekali. Pada tanggal 25 Juni 2026 Tergugat menghentikan seluruh pekerjaan dan menarik para pekerjanya dari lokasi (Bukti P-13), sehingga bangunan ditinggalkan dalam keadaan belum selesai dan sampai gugatan ini diajukan belum pernah diserahterimakan kepada Penggugat. Menurut Laporan Ahli, realisasi progres pada tanggal tersebut hanya ' + pc(D.B.total) + ' dengan nilai pekerjaan terpasang ' + rp(D.B.nilai) + '. Bahkan apabila permohonan perpanjangan waktu 45 hari yang diajukan Tergugat sendiri dianggap dikabulkan, '),
  run('quod non', { italics: true }),
  run(', pekerjaan seharusnya selesai pada tanggal 15 Juni 2026, sedangkan Tergugat baru menghentikan pekerjaan pada tanggal 25 Juni 2026 dalam keadaan belum selesai, yaitu 10 (sepuluh) hari setelah batas waktu yang ditentukan Tergugat sendiri;'),
]));

B.push(bahwa('Bahwa Penggugat telah menempuh upaya penyelesaian di luar pengadilan, yaitu melalui musyawarah yang diadakan pada tanggal 20 Juli 2026 antara Penggugat dan Tergugat, yang tidak menghasilkan kesepakatan karena Tergugat tetap menuntut pembayaran atas pekerjaan tambahan yang tidak pernah disepakati secara tertulis, sehingga tidak terdapat lagi jalan penyelesaian selain melalui gugatan ini;'));

B.push(bahwa('Bahwa dalil-dalil Tergugat yang menyatakan keterlambatan disebabkan oleh kondisi struktur bangunan, perubahan desain dan tata ruang, penyesuaian kitchen dan bar, serta perubahan plafon dan pencahayaan, seluruhnya tidak dapat diterima, karena semua hal tersebut ternyata telah diperhitungkan dan dianggarkan di dalam Rencana Anggaran Biaya yang disusun Tergugat sendiri, sebagaimana tabel berikut:'));
(function () {
  const cw = [3554, 2300, 1900, 1600];
  const rows = [new TableRow({ tableHeader: true, children: [
    cell('Dalil Tergugat', cw[0], { bold: true, fill: HEAD, align: AlignmentType.CENTER }),
    cell('Item RAB yang memuat', cw[1], { bold: true, fill: HEAD, align: AlignmentType.CENTER }),
    cell('Nilai Dianggarkan', cw[2], { bold: true, fill: HEAD, align: AlignmentType.CENTER }),
    cell('Bobot', cw[3], { bold: true, fill: HEAD, align: AlignmentType.CENTER }),
  ] })];
  [
    ['Kondisi struktur bangunan berbeda dari asumsi awal', 'Item 2, termasuk sub-item 2.8 pos cadangan Rp8.280.000,00', 108000000, D.bobot['2']],
    ['Perubahan desain dan tata ruang', 'Item 14, termasuk sub-item 14.2 gambar revisi', 59765766, D.bobot['14']],
    ['Penyesuaian kitchen dan bar', 'Item 9', 80000000, D.bobot['9']],
    ['Perubahan plafon', 'Item 5', 58000000, D.bobot['5']],
    ['Perubahan pencahayaan', 'Item 7', 58000000, D.bobot['7']],
    ['Perubahan tata ruang area luar', 'Item 11', 31000000, D.bobot['11']],
  ].forEach(r => rows.push(new TableRow({ children: [
    cell(r[0], cw[0]), cell(r[1], cw[1]),
    cell(rp(r[2]), cw[2], { align: AlignmentType.RIGHT }),
    cell(pc(r[3]), cw[3], { align: AlignmentType.CENTER }),
  ] })));
  B.push(tbl(cw, rows));
})();
B.push(Pl('', { after: 160 }));

B.push(bahwa('Bahwa dengan demikian risiko dan pekerjaan yang dijadikan dalih oleh Tergugat justru telah dihargai, dianggarkan, dan telah dibayar oleh Penggugat di dalam nilai kontrak, sehingga Tergugat tidak dapat menjadikan risiko yang ia sendiri hargai dan terima pembayarannya sebagai dalih pembenar atas keterlambatannya. Demikian pula dalil Tergugat mengenai penghentian pembayaran bertentangan dengan fakta, karena sampai tanggal 10 April 2026 Penggugat telah membayar Rp600.000.000,00 sedangkan nilai pekerjaan terpasang pada tanggal 1 Mei 2026 hanya ' + rp(D.A.nilai) + ';'));

B.push(bahwa('Bahwa akibat wanprestasi Tergugat tersebut Penggugat mengalami kerugian materiil yang nyata dan dapat dihitung sebagaimana dimaksud Pasal 1243 juncto Pasal 1246 Kitab Undang-Undang Hukum Perdata, dihitung atas dasar keadaan pekerjaan pada tanggal 25 Juni 2026 yaitu keadaan pada saat Tergugat meninggalkan lokasi, dengan rincian:'));
(function () {
  const cw = [6854, 2500];
  const rows = [];
  [
    ['A. Pengembalian kelebihan pembayaran, yaitu Rp600.000.000,00 dikurangi nilai pekerjaan terpasang ' + rp(D.B.nilai), D.KELEBIHAN, 0],
    ['B. Denda keterlambatan 1‰ per hari kalender dari nilai kontrak, dengan plafon 5% dari nilai kontrak', D.DENDA, 0],
    ['C. Biaya pembongkaran keramik, pengangkutan puing, dan perbaikan lapisan dasar, termasuk pajak', D.C_INCL, 0],
    ['D. Eskalasi harga dan biaya mobilisasi pelaksana pengganti, termasuk pajak', D.D_INCL, 0],
    ['JUMLAH KERUGIAN MATERIIL', D.GANTI, 1],
  ].forEach(r => rows.push(new TableRow({ children: [
    cell(r[0], cw[0], { bold: r[2] === 1, fill: r[2] === 1 ? TOTL : undefined, align: r[2] === 1 ? AlignmentType.RIGHT : AlignmentType.LEFT }),
    cell(rp(r[1]), cw[1], { bold: r[2] === 1, fill: r[2] === 1 ? TOTL : undefined, align: AlignmentType.RIGHT }),
  ] })));
  B.push(tbl(cw, rows));
})();
B.push(Pl('', { after: 160 }));

B.push(bahwa('Bahwa selain kerugian tersebut, menurut Laporan Ahli taksiran biaya untuk menyelesaikan sisa pekerjaan sebesar ' + pc(D.SISA_PCT) + ' adalah ' + rp(D.TAKSIRAN) + ', sedangkan dana kontrak yang belum dibayarkan hanya Rp250.000.000,00, sehingga Penggugat masih harus menanggung kekurangan dana sebesar ' + rp(D.KEKURANGAN) + ' hanya untuk memperoleh keadaan bangunan yang seharusnya sudah ia terima pada tanggal 1 Mei 2026;'));

B.push(bahwa('Bahwa oleh karena Tergugat telah menghentikan pekerjaan dan menarik para pekerjanya sehingga pelaksanaan Perjanjian tidak lagi mungkin dilanjutkan, maka berdasarkan Pasal 1266 juncto Pasal 1267 Kitab Undang-Undang Hukum Perdata Penggugat memilih menuntut pembatalan Perjanjian disertai penggantian biaya, kerugian, dan bunga, yang sesuai Pasal 1266 dimohonkan melalui putusan Pengadilan. Di samping itu Penggugat berhak atas bunga moratoir 6% (enam persen) per tahun sebagaimana Pasal 1250 Kitab Undang-Undang Hukum Perdata;'));

B.push(bahwa('Bahwa untuk menjamin agar gugatan Penggugat tidak menjadi hampa atau illusoir, dan mengingat Tergugat telah menghentikan seluruh pekerjaan serta menarik seluruh pekerjanya dari lokasi sehingga terdapat persangkaan yang beralasan bahwa Tergugat akan mengalihkan harta kekayaannya, maka berdasarkan Pasal 227 Herzien Inlandsch Reglement Penggugat mohon diletakkan sita jaminan (conservatoir beslag) atas harta kekayaan Tergugat yang nilainya sepadan dengan jumlah tuntutan Penggugat, antara lain berupa ....................................................;'));

B.push(bahwa('Bahwa gugatan ini merupakan sengketa keperdataan mengenai pemenuhan perjanjian antara Penggugat dan Tergugat sebagai sesama subjek hukum perdata, sehingga secara absolut menjadi kewenangan Pengadilan Negeri sebagaimana Pasal 50 Undang-Undang Nomor 2 Tahun 1986 tentang Peradilan Umum sebagaimana telah diubah terakhir dengan Undang-Undang Nomor 49 Tahun 2009. Adapun secara relatif, meskipun Tergugat berkedudukan di Kabupaten Klaten, Pasal 118 ayat (4) Herzien Inlandsch Reglement menentukan bahwa apabila para pihak dengan surat sah telah memilih suatu pengadilan negeri tertentu, maka gugatan diajukan kepada Ketua Pengadilan Negeri yang dipilih tersebut. Dalam Perjanjian, para pihak telah secara tegas memilih Pengadilan Negeri Surakarta sebagai pengadilan yang berwenang, dan pilihan tersebut sejalan pula dengan letak objek pekerjaan yang berada di Kota Surakarta. Dengan demikian Pengadilan Negeri Surakarta berwenang secara relatif maupun absolut untuk memeriksa dan mengadili perkara ini;'));

B.push(bahwa('Bahwa oleh karena gugatan ini diajukan berdasarkan bukti-bukti surat yang otentik, yaitu Perjanjian beserta lampirannya, Rencana Anggaran Biaya, bukti pembayaran, dan surat-surat yang dibuat Tergugat sendiri, serta didukung Laporan Pemeriksaan dan Pendapat Ahli, maka Penggugat mohon putusan dalam perkara ini dapat dilaksanakan terlebih dahulu (uitvoerbaar bij voorraad) sebagaimana Pasal 180 ayat (1) Herzien Inlandsch Reglement. Selanjutnya, oleh karena Tergugat adalah pihak yang menyebabkan timbulnya perkara ini, sudah sepatutnya Tergugat dihukum membayar seluruh biaya yang timbul dalam perkara ini.'));

/* ============ PETITUM ============ */
B.push(Pl('Atas dasar alasan dan uraian tersebut di atas, maka mohon kepada Ketua Pengadilan Negeri Surakarta c.q. Majelis Hakim yang memeriksa perkara ini untuk memutuskan sebagai berikut:', { before: 240, after: 200 }));
B.push(Pl([run('PRIMAIR:', { bold: true })], { after: 140 }));
B.push(petitum('Mengabulkan gugatan Penggugat untuk seluruhnya;'));
B.push(petitum('Menyatakan sah dan mengikat Perjanjian Pemborongan Pekerjaan Nomor 001/PPP/AK-RK/I/2026 tanggal 12 Januari 2026 beserta seluruh lampirannya;'));
B.push(petitum([run('Menyatakan Tergugat telah melakukan '), run('wanprestasi', { bold: true }), run(', yaitu terlambat memenuhi prestasi, memenuhi prestasi tetapi tidak sebagaimana mestinya, dan tidak memenuhi prestasi sama sekali;')]));
B.push(petitum('Membatalkan Perjanjian Pemborongan Pekerjaan Nomor 001/PPP/AK-RK/I/2026 tanggal 12 Januari 2026 beserta seluruh lampirannya karena wanprestasi Tergugat, terhitung sejak tanggal 25 Juni 2026;'));
B.push(petitum('Menyatakan surat tagihan Tergugat tertanggal 8 Mei 2026 sebesar Rp185.000.000,00 (seratus delapan puluh lima juta rupiah) tidak mempunyai dasar hukum dan tidak mengikat Penggugat;'));
B.push(petitum('Menyatakan pembayaran Termin IV sebesar Rp250.000.000,00 (dua ratus lima puluh juta rupiah) belum jatuh tempo dan Penggugat tidak berkewajiban membayarnya kepada Tergugat;'));
B.push(petitum('Menghukum Tergugat membayar ganti kerugian materiil kepada Penggugat sebesar ' + rp(D.GANTI) + ' (seratus dua puluh tujuh juta delapan puluh delapan ribu delapan ratus rupiah) secara tunai dan seketika, dengan rincian:'));
B.push(sub('a', 'Pengembalian kelebihan pembayaran sebesar ' + rp(D.KELEBIHAN) + ';'));
B.push(sub('b', 'Denda keterlambatan sebesar ' + rp(D.DENDA) + ';'));
B.push(sub('c', 'Biaya pembongkaran keramik, pengangkutan puing, dan perbaikan lapisan dasar sebesar ' + rp(D.C_INCL) + ';'));
B.push(sub('d', 'Eskalasi harga dan biaya mobilisasi pelaksana pengganti sebesar ' + rp(D.D_INCL) + ';'));
B.push(petitum('Menghukum Tergugat membayar bunga 6% (enam persen) per tahun atas jumlah tersebut, dihitung sejak gugatan ini didaftarkan sampai putusan dilaksanakan seluruhnya;'));
B.push(petitum('Menyatakan sah dan berharga sita jaminan (conservatoir beslag) yang diletakkan atas harta kekayaan Tergugat;'));
B.push(petitum('Menyatakan putusan dalam perkara ini dapat dilaksanakan terlebih dahulu (uitvoerbaar bij voorraad), meskipun ada verzet, banding, maupun kasasi;'));
B.push(petitum('Menghukum Tergugat membayar seluruh biaya yang timbul dalam perkara ini.'));

B.push(Pl([run('SUBSIDAIR:', { bold: true })], { before: 240, after: 140 }));
B.push(Pl('Atau apabila Majelis Hakim Pengadilan Negeri Surakarta berpendapat lain, mohon putusan yang seadil-adilnya (ex aequo et bono).', { after: 240 }));
B.push(Pl('Demikianlah gugatan ini diajukan, atas perhatian dan dikabulkannya gugatan ini, kami ucapkan terima kasih.', { after: 140 }));
B.push(Pl('Wassalamu’alaikum warrahmatullahi wabarakatuh.', { after: 300 }));

B.push(Pr('Hormat Kami,', { after: 0 }));
B.push(Pr([run('NAWASENA LAW FIRM', { bold: true })], { after: 0 }));
B.push(Pr('Kuasa Hukum Penggugat', { after: 560 }));
B.push(tbl([4677, 4677], [new TableRow({ children: [
  cell(['', '', 'BRIAN ERLANGGA, S.H., M.H.'], 4677, { align: AlignmentType.CENTER, bold: true, size: 24 }),
  cell(['', '', 'MOHAMMAD NAUFAL FARELLI, S.H., M.H.'], 4677, { align: AlignmentType.CENTER, bold: true, size: 24 }),
] })], { plain: true }));

const doc = new Document({
  creator: 'Praktik Peradilan Perdata',
  title: 'Surat Gugatan Wanprestasi - Raka melawan PT Arunika Kreasi',
  styles: { default: { document: { run: { font: FONT, size: SZ } } } },
  sections: [{
    properties: { page: { size: { width: 11906, height: 16838 },
      margin: { top: 1418, right: 1134, bottom: 1134, left: 1418 } } },
    footers: { default: new Footer({ children: [new Paragraph({
      alignment: AlignmentType.RIGHT,
      children: [new TextRun({ children: ['Page ', PageNumber.CURRENT, ' | ', PageNumber.TOTAL_PAGES], font: FONT, size: 20 })],
    })] }) },
    children: B,
  }],
});

Packer.toBuffer(doc).then(function (b) {
  const out = '/home/user/claude-workspace/Surat-Gugatan-Wanprestasi-Raka-vs-PT-Arunika-Kreasi.docx';
  fs.writeFileSync(out, b);
  console.log('Butir posita  : ' + N + '  (sebelumnya 41)');
  console.log('Butir petitum : ' + M);
  console.log('Ukuran        : ' + (b.length / 1024).toFixed(1) + ' KB');
});
