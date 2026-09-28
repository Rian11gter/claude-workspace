const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, Footer,
  WidthType, AlignmentType, BorderStyle, ShadingType, VerticalAlign,
  PageNumber, TabStopType,
} = require('docx');
const fs = require('fs');
const D = JSON.parse(fs.readFileSync(__dirname + '/angka-ahli.json', 'utf8'));

const FONT = 'Times New Roman', SZ = 24, W = 9354;   // 12pt
const HEAD = 'D9D9D9', TOTL = 'E8E8E8';
const NB = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const NO_BORDERS = { top: NB, bottom: NB, left: NB, right: NB };

const f  = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
const rp = n => 'Rp' + f(n) + ',00';
const pc = n => String(n.toFixed(2)).replace('.', ',') + '%';

const run = (t, o = {}) => new TextRun({
  text: t, font: FONT, size: o.size || SZ,
  bold: !!o.bold, italics: !!o.italics, underline: o.underline ? {} : undefined,
});
function P(parts, o = {}) {
  return new Paragraph({
    children: (Array.isArray(parts) ? parts : [run(parts, o)]),
    alignment: o.align || AlignmentType.JUSTIFIED,
    spacing: { before: o.before || 0, after: o.after === undefined ? 120 : o.after, line: o.line || 300 },
    indent: o.indent,
    tabStops: o.tabStops,
  });
}
const Pl = (t, o = {}) => P(t, Object.assign({ align: AlignmentType.LEFT }, o));
const Pc = (t, o = {}) => P(t, Object.assign({ align: AlignmentType.CENTER }, o));
const Pr = (t, o = {}) => P(t, Object.assign({ align: AlignmentType.RIGHT }, o));

// ---- penomoran posita yang berkelanjutan ----
let N = 0;
function bahwa(parts) {
  N += 1;
  const kids = [run(N + '.'), new TextRun({ text: '\t', font: FONT, size: SZ })];
  (Array.isArray(parts) ? parts : [run(parts)]).forEach(k => kids.push(k));
  return new Paragraph({
    children: kids,
    alignment: AlignmentType.JUSTIFIED,
    spacing: { before: 60, after: 120, line: 300 },
    indent: { left: 620, hanging: 620 },
    tabStops: [{ type: TabStopType.LEFT, position: 620 }],
  });
}
function sub(letter, text) {
  return new Paragraph({
    children: [run(letter + '.'), new TextRun({ text: '\t', font: FONT, size: SZ }), run(text)],
    alignment: AlignmentType.JUSTIFIED,
    spacing: { before: 40, after: 80, line: 300 },
    indent: { left: 1180, hanging: 560 },
    tabStops: [{ type: TabStopType.LEFT, position: 1180 }],
  });
}
let M = 0;
function petitum(parts) {
  M += 1;
  const kids = [run(M + '.'), new TextRun({ text: '\t', font: FONT, size: SZ })];
  (Array.isArray(parts) ? parts : [run(parts)]).forEach(k => kids.push(k));
  return new Paragraph({
    children: kids,
    alignment: AlignmentType.JUSTIFIED,
    spacing: { before: 60, after: 120, line: 300 },
    indent: { left: 620, hanging: 620 },
    tabStops: [{ type: TabStopType.LEFT, position: 620 }],
  });
}

function cell(text, width, o = {}) {
  return new TableCell({
    children: (Array.isArray(text) ? text : [text]).map(t => new Paragraph({
      children: [run(t, { size: o.size || 22, bold: o.bold, italics: o.italics })],
      alignment: o.align || AlignmentType.LEFT,
      spacing: { before: 30, after: 30, line: 260 },
    })),
    width: { size: width, type: WidthType.DXA },
    shading: o.fill ? { type: ShadingType.CLEAR, color: 'auto', fill: o.fill } : undefined,
    verticalAlign: VerticalAlign.CENTER,
    margins: { top: 50, bottom: 50, left: 100, right: 100 },
    columnSpan: o.span,
  });
}
const tbl = (cw, rows, o = {}) => new Table({
  columnWidths: cw, width: { size: o.w || W, type: WidthType.DXA },
  borders: o.plain ? NO_BORDERS : undefined, rows, indent: o.indent,
});

const B = [];

/* ===================== KEPALA SURAT ===================== */
B.push(Pr('Surakarta, 15 September 2026', { after: 240 }));
B.push(Pl('Kepada Yth.', { after: 0 }));
B.push(Pl('Ketua Pengadilan Negeri Surakarta', { after: 0 }));
B.push(Pl('Di-', { after: 0 }));
B.push(Pl([run('SURAKARTA', { bold: true })], { after: 240 }));
B.push(Pl([run('Perihal: '), run('Gugatan Wanprestasi', { bold: true })], { after: 240 }));

B.push(Pl('Assalamu’alaikum warrahmatullahi wabarakatuh,', { after: 120 }));
B.push(Pl('Dengan Hormat,', { after: 120 }));
B.push(Pl('Kami yang bertanda tangan di bawah ini:', { after: 120 }));

B.push(Pl([run('BRIAN ......................, S.H., M.H.', { bold: true })], { after: 0 }));
B.push(Pl([run('AVEL ......................, S.H., M.H.', { bold: true })], { after: 120 }));
B.push(Pl('Advokat dan Konsultan Hukum', { after: 0 }));
B.push(Pl([run('KANTOR HUKUM BRIAN, AVEL & REKAN', { bold: true })], { after: 0 }));
B.push(Pl('Beralamat di Jalan ......................... Nomor ....., Kota Surakarta, Provinsi Jawa Tengah, 57....', { after: 0 }));
B.push(Pl('surel: ................................ / telepon: ................................', { after: 120 }));
B.push(Pl('Bertindak baik sendiri-sendiri maupun bersama-sama, berdasarkan Surat Kuasa Khusus bermeterai tertanggal 8 September 2026, bertindak untuk dan atas nama:', { after: 160 }));

B.push(Pl([
  run('RAKA', { bold: true }),
  run(', Jenis Kelamin ......................, lahir di ...................... tanggal ......................, Nomor Induk Kependudukan ................................, Agama ......................, Pekerjaan Wirausaha, beralamat di Jalan ......................... Nomor ....., Kota Surakarta, Provinsi Jawa Tengah, selaku pemilik bangunan komersial yang terletak di Jalan Ahmad Yani Nomor 21, Kota Surakarta;'),
], { after: 120 }));
B.push(Pl([run('Selanjutnya disebut sebagai '), run('PENGGUGAT', { bold: true }), run(';')], { after: 200 }));

B.push(Pl([run('Dengan ini mengajukan '), run('Gugatan Wanprestasi', { bold: true }), run(' atas tindakan yang dilakukan oleh:')], { after: 140 }));
B.push(new Paragraph({
  children: [run('1.'), new TextRun({ text: '\t', font: FONT, size: SZ }),
    run('PT ARUNIKA KREASI', { bold: true }),
    run(', suatu badan hukum berbentuk perseroan terbatas yang bergerak di bidang desain interior dan pengelolaan usaha kuliner, berkedudukan dan berkantor di Jalan ......................... Nomor ....., Kota Surakarta, Provinsi Jawa Tengah, dalam hal ini diwakili oleh ......................................, dalam kedudukannya sebagai Direktur, yang berwenang mewakili perseroan berdasarkan Anggaran Dasar perseroan;'),
  ],
  alignment: AlignmentType.JUSTIFIED,
  spacing: { before: 60, after: 120, line: 300 },
  indent: { left: 620, hanging: 620 },
  tabStops: [{ type: TabStopType.LEFT, position: 620 }],
}));
B.push(Pl([run('Selanjutnya disebut sebagai '), run('TERGUGAT', { bold: true }), run(';')], { after: 200 }));

B.push(Pl('Bahwa adapun dalil gugatan ini kami ajukan berdasarkan hal-hal sebagai berikut:', { after: 160 }));

/* ===================== POSITA ===================== */

// -- kedudukan hukum & hubungan hukum --
B.push(bahwa('Bahwa Penggugat adalah pemilik sah atas sebuah bangunan komersial yang terletak di Jalan Ahmad Yani Nomor 21, Kota Surakarta, Provinsi Jawa Tengah, dengan ukuran kurang lebih 12 meter kali 10 meter atau seluas kurang lebih 120 m² (seratus dua puluh meter persegi), yang sebelumnya telah digunakan sebagai bangunan usaha;'));

B.push(bahwa('Bahwa pada tanggal 12 Januari 2026, Penggugat dan Tergugat menandatangani Perjanjian Pemborongan Pekerjaan Nomor 001/PPP/AK-RK/I/2026 beserta seluruh lampirannya (Bukti P-1), yang pada pokoknya mewajibkan Tergugat melaksanakan pekerjaan renovasi atas bangunan milik Penggugat tersebut menjadi sebuah kafe dalam kondisi siap beroperasi;'));

B.push(bahwa('Bahwa Perjanjian tersebut telah memenuhi keempat syarat sahnya suatu perjanjian sebagaimana Pasal 1320 Kitab Undang-Undang Hukum Perdata, dan karena itu berlaku sebagai undang-undang bagi para pihak yang membuatnya sebagaimana Pasal 1338 Kitab Undang-Undang Hukum Perdata. Adapun hubungan hukum di antara para pihak adalah perjanjian pemborongan pekerjaan sebagaimana dimaksud Pasal 1601b juncto Pasal 1604 sampai dengan Pasal 1616 Kitab Undang-Undang Hukum Perdata;'));

B.push(bahwa('Bahwa nilai keseluruhan pekerjaan yang disepakati adalah sebesar Rp850.000.000,00 (delapan ratus lima puluh juta rupiah) termasuk pajak, yang berdasarkan Rencana Anggaran Biaya sebagai Lampiran I Perjanjian (Bukti P-2) terdiri atas Dasar Pengenaan Pajak sebesar Rp765.765.766,00 dan Pajak Pertambahan Nilai 11% sebesar Rp84.234.234,00;'));

B.push(bahwa('Bahwa Rencana Anggaran Biaya tersebut disusun oleh Tergugat sendiri dan disetujui oleh Penggugat, serta merinci lingkup pekerjaan menjadi 14 (empat belas) item pekerjaan beserta bobotnya masing-masing, yang antara lain meliputi Item 2 Penyesuaian struktur bangunan sebesar Rp108.000.000,00 dengan bobot ' + pc(D.bobot['2']) + '; Item 4 Pekerjaan lantai dan keramik sebesar Rp80.000.000,00 dengan bobot ' + pc(D.bobot['4']) + '; Item 5 Pekerjaan plafon sebesar Rp58.000.000,00; Item 7 Instalasi listrik dan pencahayaan sebesar Rp58.000.000,00; Item 9 Kitchen dan bar sebesar Rp80.000.000,00; Item 11 Fasad dan area luar sebesar Rp31.000.000,00; serta Item 14 Desain, engineering, mobilisasi, overhead dan manajemen proyek sebesar Rp59.765.766,00;'));

B.push(bahwa('Bahwa jangka waktu pelaksanaan pekerjaan ditetapkan selama 105 (seratus lima) hari kalender terhitung sejak dimulainya pekerjaan pada tanggal 16 Januari 2026, sehingga batas akhir penyerahan pekerjaan dalam kondisi siap beroperasi adalah tanggal 1 Mei 2026;'));

B.push(bahwa('Bahwa spesifikasi keramik lantai area utama ditetapkan secara tegas dalam Rencana Anggaran Biaya butir 4.4 dan Lampiran Spesifikasi Teknis Perjanjian (Bukti P-3), yaitu keramik berukuran 60 cm x 60 cm, berwarna cokelat, permukaan matte, dengan harga satuan Rp185.000,00 per meter persegi dan volume pengadaan 105 meter persegi;'));

B.push(bahwa('Bahwa Perjanjian juga menentukan secara tegas bahwa setiap perubahan lingkup, volume, spesifikasi, nilai, maupun jangka waktu pekerjaan hanya berlaku apabila dituangkan dalam addendum tertulis yang ditandatangani kedua pihak, dan bahwa kesepakatan lisan tidak menimbulkan hak tagih atas pekerjaan tambahan;'));

B.push(bahwa('Bahwa pembayaran disepakati dalam 4 (empat) termin, yaitu Termin I sebesar Rp450.000.000,00 setelah perjanjian ditandatangani dan pekerjaan dimulai; Termin II sebesar Rp50.000.000,00 setelah pekerjaan mencapai progres sekitar 40%; Termin III sebesar Rp100.000.000,00 setelah pekerjaan mencapai progres sekitar 70%; dan Termin IV sebesar Rp250.000.000,00 setelah pekerjaan selesai 100% dan diserahterimakan dalam kondisi siap beroperasi;'));

// -- pemenuhan kewajiban Penggugat --
B.push(bahwa('Bahwa Penggugat telah memenuhi seluruh kewajiban pembayaran yang telah jatuh tempo, yaitu Termin I sebesar Rp450.000.000,00 pada tanggal 16 Januari 2026 (Bukti P-4); Termin II sebesar Rp50.000.000,00 pada tanggal 5 Maret 2026 atas dasar klaim progres 40% yang disampaikan Tergugat sendiri (Bukti P-5); dan Termin III sebesar Rp100.000.000,00 pada tanggal 10 April 2026 atas dasar klaim progres 70% yang juga disampaikan Tergugat sendiri (Bukti P-6), sehingga seluruhnya Penggugat telah membayar Rp600.000.000,00 (enam ratus juta rupiah);'));

B.push(bahwa('Bahwa Termin IV sebesar Rp250.000.000,00 sampai dengan gugatan ini diajukan belum jatuh tempo, karena syarat pembayarannya adalah pekerjaan selesai 100% dan diserahterimakan dalam kondisi siap beroperasi, dan syarat tersebut tidak pernah terpenuhi oleh Tergugat;'));

B.push(bahwa('Bahwa sepanjang pelaksanaan pekerjaan, Penggugat senantiasa membayar melebihi nilai prestasi yang telah dikerjakan Tergugat, bahkan apabila diukur dengan klaim progres Tergugat sendiri, sebagaimana tabel berikut:'));
(function () {
  const cw = [1700, 1900, 2554, 1600, 1600];
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

// -- pelaksanaan & keramik --
B.push(bahwa('Bahwa pada tanggal 16 Januari 2026 Tergugat mulai melaksanakan pekerjaan dengan pembongkaran interior lama, dan setelah pembongkaran tersebut Tergugat sendiri yang mengusulkan penyesuaian desain dan tata ruang bangunan melalui percakapan pesan elektronik kepada Penggugat (Bukti P-7). Dengan demikian penyesuaian desain tersebut bukan berasal dari permintaan Penggugat, melainkan berasal dari usulan Tergugat sendiri;'));

B.push(bahwa('Bahwa pada tanggal 20 Februari 2026 Penggugat menemukan bahwa keramik lantai yang dipasang Tergugat berwarna hitam, menyimpang dari spesifikasi yang diperjanjikan yaitu berwarna cokelat, dan atas hal tersebut Penggugat menyampaikan keberatan kepada Tergugat (Bukti P-8 dan Bukti P-9);'));

B.push(bahwa('Bahwa atas keberatan tersebut Tergugat berdalih keramik cokelat sedang tidak tersedia, dan Tergugat secara sepihak tetap memasang keramik hitam tanpa persetujuan tertulis dari Penggugat, kemudian menyatakan bahwa pemesanan keramik yang sesuai spesifikasi memerlukan waktu sekitar 6 (enam) minggu;'));

B.push(bahwa('Bahwa pada tanggal 18 Maret 2026 diadakan pertemuan di lokasi antara Penggugat, Direktur Tergugat, dan pelaksana lapangan, yang membahas beberapa perubahan mengenai plafon, pencahayaan, dan tata ruang area luar. Namun perubahan tersebut hanya disepakati secara lisan dan tidak pernah dituangkan dalam addendum tertulis maupun berita acara perubahan pekerjaan, sehingga sesuai Perjanjian tidak mengubah lingkup, nilai, maupun jangka waktu pekerjaan;'));

B.push(bahwa('Bahwa pada tanggal 22 April 2026 Penggugat mengingatkan Tergugat mengenai batas akhir penyelesaian pekerjaan pada tanggal 1 Mei 2026 (Bukti P-11), namun Tergugat justru menyampaikan bahwa waktu pengadaan keramik yang semula 6 minggu berubah menjadi waktu yang tidak dapat ditentukan;'));

// -- WANPRESTASI I --
B.push(bahwa([
  run('Bahwa '), run('BENTUK WANPRESTASI PERTAMA', { bold: true }),
  run(' yang dilakukan Tergugat adalah terlambat memenuhi prestasi. Pada tanggal 1 Mei 2026 pekerjaan renovasi belum selesai dan bangunan belum dapat digunakan sebagai kafe. Berdasarkan Laporan Pemeriksaan dan Pendapat Ahli (Bukti P-18), realisasi progres pekerjaan pada tanggal tersebut hanya ' + pc(D.A.total) + ' dengan nilai pekerjaan terpasang ' + rp(D.A.nilai) + ', diukur dengan metode bobot pekerjaan berdasarkan Rencana Anggaran Biaya yang disusun Tergugat sendiri;'),
]));

B.push(bahwa('Bahwa karena tidak pernah ada addendum tertulis yang mengubah jangka waktu pekerjaan, maka batas akhir tanggal 1 Mei 2026 tetap berlaku dan mengikat Tergugat, sehingga sejak tanggal 2 Mei 2026 Tergugat telah berada dalam keadaan terlambat memenuhi prestasi;'));

// -- WANPRESTASI II --
B.push(bahwa([
  run('Bahwa '), run('BENTUK WANPRESTASI KEDUA', { bold: true }),
  run(' yang dilakukan Tergugat adalah memenuhi prestasi tetapi tidak sebagaimana mestinya, yaitu memasang keramik lantai yang menyimpang dari spesifikasi yang diperjanjikan. Warna keramik merupakan sifat bahan yang tidak dapat diubah setelah terpasang, sehingga satu-satunya cara memenuhi spesifikasi adalah pembongkaran seluruh keramik terpasang, perbaikan lapisan dasar, dan pemasangan ulang. Taksiran biaya pembongkaran dan pemasangan ulang tersebut adalah ' + rp(D.K_TOTAL) + ', yang di dalamnya sebesar ' + rp(D.K_INKREMENTAL) + ' merupakan biaya yang sama sekali tidak akan timbul apabila Tergugat memasang keramik sesuai spesifikasi sejak semula;'),
]));

B.push(bahwa('Bahwa dalih Tergugat mengenai ketidaktersediaan keramik tidak dapat diterima, karena keramik berukuran 60 cm x 60 cm berwarna cokelat dengan permukaan matte merupakan produk reguler yang diproduksi beberapa produsen nasional dan tersedia melalui jaringan distributor, dengan waktu pengadaan yang lazim 2 sampai dengan 4 minggu untuk volume 105 meter persegi yang termasuk volume kecil. Selain itu Tergugat telah menerima Termin I sebesar Rp450.000.000,00 yang di dalamnya termasuk dana pengadaan material;'));

// -- tagihan Rp185 juta --
B.push(bahwa('Bahwa pada tanggal 8 Mei 2026, yaitu setelah Tergugat berada dalam keadaan terlambat, Tergugat justru mengirimkan surat tagihan kepada Penggugat sebesar Rp185.000.000,00 (Bukti P-12), terdiri atas Rp100.000.000,00 sebagai pembayaran pekerjaan dan Rp85.000.000,00 sebagai biaya tambahan karena permintaan perpanjangan waktu selama 45 (empat puluh lima) hari;'));

B.push(bahwa('Bahwa tagihan Tergugat tersebut sama sekali tidak mempunyai dasar hukum, dengan alasan sebagai berikut:'));
B.push(sub('a', 'Tagihan sebesar Rp100.000.000,00 merupakan bagian dari Termin IV yang belum jatuh tempo, karena pekerjaan belum selesai dan belum pernah diserahterimakan dalam kondisi siap beroperasi;'));
B.push(sub('b', 'Tagihan sebesar Rp85.000.000,00 tidak pernah disepakati dalam addendum tertulis, sedangkan Perjanjian secara tegas mensyaratkan addendum tertulis bagi setiap perubahan nilai maupun jangka waktu pekerjaan;'));
B.push(sub('c', 'Seluruh komponen pekerjaan yang ditagih tersebut ternyata telah berada di dalam lingkup Rencana Anggaran Biaya dengan nilai yang telah dianggarkan seluruhnya ' + rp(D.KLAIM85_TOTAL) + ', yaitu plafon pada Item 5 senilai Rp58.000.000,00, pencahayaan pada Item 7 senilai Rp58.000.000,00, area luar pada Item 11 senilai Rp31.000.000,00, dan penyesuaian desain serta gambar revisi pada sub-item 14.2 senilai Rp4.500.000,00;'));
B.push(sub('d', 'Biaya perpanjangan waktu tidak dapat dibebankan kepada Penggugat, karena keterlambatan yang menimbulkan kebutuhan perpanjangan waktu tersebut justru bersumber dari kelalaian Tergugat sendiri;'));

B.push(bahwa('Bahwa pada tanggal 15 Mei 2026 Penggugat menolak tagihan tersebut secara lisan melalui sambungan telepon, dengan alasan pekerjaan belum selesai, belum dilakukan serah terima, serta tidak terdapat kesepakatan tertulis mengenai tambahan biaya maupun perpanjangan waktu. Penolakan tersebut selanjutnya dituangkan dan ditegaskan kembali secara tertulis dalam somasi yang disampaikan Penggugat kepada Tergugat (Bukti P-13);'));

B.push(bahwa('Bahwa setelah penolakan tersebut, Tergugat menyatakan hanya bersedia melanjutkan pekerjaan apabila tagihan tersebut dipenuhi terlebih dahulu. Penangguhan prestasi oleh Tergugat tersebut tidak mempunyai dasar, karena Termin IV belum jatuh tempo dan karena sepanjang pelaksanaan pekerjaan Penggugat justru selalu membayar melebihi nilai prestasi Tergugat sebagaimana telah diuraikan pada angka 12 di atas;'));

// -- WANPRESTASI III --
B.push(bahwa([
  run('Bahwa '), run('BENTUK WANPRESTASI KETIGA', { bold: true }),
  run(' yang dilakukan Tergugat adalah tidak memenuhi prestasi sama sekali. Pada tanggal 25 Juni 2026 Tergugat menghentikan seluruh pekerjaan dan menarik para pekerjanya dari lokasi (Bukti P-15), sehingga bangunan ditinggalkan dalam keadaan belum selesai dan belum dapat digunakan sebagai kafe. Berdasarkan Laporan Ahli, realisasi progres pekerjaan pada tanggal tersebut hanya ' + pc(D.B.total) + ' dengan nilai pekerjaan terpasang ' + rp(D.B.nilai) + ';'),
]));

B.push(bahwa('Bahwa bahkan apabila permohonan perpanjangan waktu 45 hari yang diajukan Tergugat sendiri dianggap telah dikabulkan, quod non, maka pekerjaan seharusnya selesai pada tanggal 15 Juni 2026. Kenyataannya Tergugat baru menghentikan pekerjaan pada tanggal 25 Juni 2026 dalam keadaan belum selesai, yaitu 10 (sepuluh) hari setelah batas waktu yang ditentukan Tergugat sendiri. Dengan demikian Tergugat tetap berada dalam keadaan wanprestasi, bahkan diukur dengan tenggat waktu yang ia tentukan sendiri;'));

B.push(bahwa('Bahwa sampai dengan gugatan ini diajukan, Tergugat sama sekali belum menyelesaikan pekerjaan dan belum pernah menyerahkan bangunan kepada Penggugat dalam kondisi siap beroperasi sebagaimana diperjanjikan;'));

// -- somasi --
B.push(bahwa('Bahwa Penggugat telah berulang kali memberikan kesempatan kepada Tergugat untuk memenuhi kewajibannya, yaitu melalui somasi pertama (Bukti P-13), somasi terakhir (Bukti P-14), serta melalui musyawarah yang diadakan pada tanggal 20 Juli 2026 yang tidak menghasilkan kesepakatan. Dengan demikian syarat pernyataan lalai sebagaimana Pasal 1238 Kitab Undang-Undang Hukum Perdata telah terpenuhi secara sempurna, dan Tergugat telah sah dinyatakan lalai;'));

// -- bantahan pendahuluan --
B.push(bahwa('Bahwa dalil-dalil Tergugat yang menyatakan keterlambatan disebabkan oleh kondisi struktur bangunan, perubahan desain, perubahan tata ruang, penyesuaian kitchen dan bar, serta perubahan plafon dan pencahayaan, seluruhnya tidak dapat diterima, karena seluruh hal tersebut ternyata telah diperhitungkan dan dianggarkan di dalam Rencana Anggaran Biaya yang disusun Tergugat sendiri, sebagaimana tabel berikut:'));
(function () {
  const cw = [3654, 2200, 1900, 1600];
  const rows = [new TableRow({ tableHeader: true, children: [
    cell('Dalil Tergugat', cw[0], { bold: true, fill: HEAD, align: AlignmentType.CENTER }),
    cell('Item RAB yang memuat', cw[1], { bold: true, fill: HEAD, align: AlignmentType.CENTER }),
    cell('Nilai Dianggarkan', cw[2], { bold: true, fill: HEAD, align: AlignmentType.CENTER }),
    cell('Bobot', cw[3], { bold: true, fill: HEAD, align: AlignmentType.CENTER }),
  ] })];
  [
    ['Kondisi struktur bangunan berbeda dari asumsi awal', 'Item 2, termasuk sub-item 2.8 pos cadangan Rp8.280.000,00', 108000000, pc(D.bobot['2'])],
    ['Perubahan desain dan tata ruang', 'Item 14, termasuk sub-item 14.2 gambar revisi', 59765766, pc(D.bobot['14'])],
    ['Penyesuaian kitchen dan bar', 'Item 9', 80000000, pc(D.bobot['9'])],
    ['Perubahan plafon', 'Item 5', 58000000, pc(D.bobot['5'])],
    ['Perubahan pencahayaan', 'Item 7', 58000000, pc(D.bobot['7'])],
    ['Perubahan tata ruang area luar', 'Item 11', 31000000, pc(D.bobot['11'])],
  ].forEach(r => rows.push(new TableRow({ children: [
    cell(r[0], cw[0]), cell(r[1], cw[1]),
    cell(rp(r[2]), cw[2], { align: AlignmentType.RIGHT }),
    cell(r[3], cw[3], { align: AlignmentType.CENTER }),
  ] })));
  B.push(tbl(cw, rows));
})();
B.push(Pl('', { after: 160 }));

B.push(bahwa('Bahwa dengan demikian risiko dan pekerjaan yang dijadikan dalih oleh Tergugat justru telah dihargai, dianggarkan, dan telah dibayar oleh Penggugat di dalam nilai kontrak. Tergugat tidak dapat menjadikan risiko yang ia sendiri hargai dan terima pembayarannya sebagai dalih pembenar atas keterlambatannya;'));

B.push(bahwa('Bahwa khusus mengenai dalil penghentian pembayaran, dalil tersebut bertentangan dengan fakta, karena sampai dengan tanggal 10 April 2026 Penggugat telah membayar Rp600.000.000,00 sedangkan nilai pekerjaan terpasang pada tanggal 1 Mei 2026 hanya ' + rp(D.A.nilai) + '. Dengan demikian Penggugat tidak pernah lalai, dan Tergugat tidak berhak menangguhkan prestasinya;'));

// -- kerugian --
B.push(bahwa('Bahwa akibat wanprestasi Tergugat tersebut, Penggugat mengalami kerugian materiil yang nyata dan dapat dihitung, dengan rincian sebagaimana tabel berikut, dihitung atas dasar keadaan pekerjaan pada tanggal 25 Juni 2026 yaitu keadaan pada saat Tergugat meninggalkan lokasi:'));
(function () {
  const cw = [6854, 2500];
  const rows = [];
  [
    ['A. Pengembalian kelebihan pembayaran, yaitu Rp600.000.000,00 dikurangi nilai pekerjaan terpasang ' + rp(D.B.nilai), D.KELEBIHAN, 0],
    ['B. Denda keterlambatan sebesar 1‰ per hari kalender dari nilai kontrak, dengan plafon 5% dari nilai kontrak', D.DENDA, 0],
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

B.push(bahwa('Bahwa kerugian materiil Penggugat seluruhnya berjumlah ' + rp(D.GANTI) + ' (seratus dua puluh tujuh juta delapan puluh delapan ribu delapan ratus rupiah), yang merupakan biaya dan kerugian sebagaimana dimaksud Pasal 1243 juncto Pasal 1246 Kitab Undang-Undang Hukum Perdata;'));

B.push(bahwa('Bahwa selain kerugian tersebut, berdasarkan Laporan Ahli, taksiran biaya yang diperlukan untuk menyelesaikan sisa pekerjaan sebesar ' + pc(D.SISA_PCT) + ' adalah ' + rp(D.TAKSIRAN) + ', sedangkan dana kontrak yang belum dibayarkan hanya Rp250.000.000,00, sehingga Penggugat masih harus menanggung kekurangan dana sebesar ' + rp(D.KEKURANGAN) + ' untuk memperoleh keadaan bangunan yang seharusnya sudah ia terima pada tanggal 1 Mei 2026;'));

B.push(bahwa('Bahwa oleh karena Tergugat telah menghentikan pekerjaan, menarik para pekerjanya, dan hubungan di antara para pihak tidak lagi memungkinkan pelaksanaan Perjanjian dilanjutkan, maka berdasarkan Pasal 1266 juncto Pasal 1267 Kitab Undang-Undang Hukum Perdata Penggugat memilih untuk menuntut pembatalan Perjanjian disertai penggantian biaya, kerugian, dan bunga, dan sesuai Pasal 1266 pembatalan tersebut dimohonkan melalui putusan Pengadilan;'));

B.push(bahwa('Bahwa selain ganti kerugian tersebut, Penggugat berhak atas bunga moratoir sebesar 6% (enam persen) per tahun sebagaimana dimaksud Pasal 1250 Kitab Undang-Undang Hukum Perdata, dihitung sejak gugatan ini didaftarkan sampai dengan putusan berkekuatan hukum tetap dan dilaksanakan;'));

// -- sita jaminan --
B.push(bahwa('Bahwa untuk menjamin agar gugatan Penggugat tidak menjadi hampa atau illusoir, dan mengingat Tergugat telah menghentikan seluruh pekerjaan serta menarik seluruh pekerjanya dari lokasi sehingga terdapat persangkaan yang beralasan bahwa Tergugat akan mengalihkan harta kekayaannya, maka berdasarkan Pasal 227 Herzien Inlandsch Reglement (HIR) Penggugat mohon agar diletakkan sita jaminan (conservatoir beslag) atas harta kekayaan milik Tergugat yang nilainya sepadan dengan jumlah tuntutan Penggugat, antara lain berupa ....................................................;'));

// -- kompetensi --
B.push(bahwa('Bahwa gugatan ini merupakan sengketa keperdataan mengenai pemenuhan perjanjian antara Penggugat dan Tergugat sebagai sesama subjek hukum perdata, sehingga secara absolut menjadi kewenangan Pengadilan Negeri sebagaimana Pasal 50 Undang-Undang Nomor 2 Tahun 1986 tentang Peradilan Umum sebagaimana telah diubah terakhir dengan Undang-Undang Nomor 49 Tahun 2009. Selanjutnya, oleh karena Tergugat berkedudukan di Kota Surakarta, maka berdasarkan asas actor sequitur forum rei sebagaimana Pasal 118 ayat (1) Herzien Inlandsch Reglement (HIR), dan sejalan pula dengan klausula domisili hukum dalam Perjanjian serta letak objek pekerjaan yang berada di Kota Surakarta, Pengadilan Negeri Surakarta berwenang secara relatif maupun absolut untuk memeriksa dan mengadili perkara ini;'));

B.push(bahwa('Bahwa oleh karena gugatan ini diajukan berdasarkan bukti-bukti surat yang otentik, yaitu Perjanjian beserta lampirannya, Rencana Anggaran Biaya, bukti pembayaran, dan surat-surat yang dibuat Tergugat sendiri, serta didukung Laporan Pemeriksaan dan Pendapat Ahli, maka Penggugat mohon agar putusan dalam perkara ini dapat dilaksanakan terlebih dahulu (uitvoerbaar bij voorraad) sebagaimana Pasal 180 ayat (1) Herzien Inlandsch Reglement (HIR);'));

B.push(bahwa('Bahwa oleh karena Tergugat adalah pihak yang menyebabkan timbulnya perkara ini, maka sudah sepatutnya Tergugat dihukum untuk membayar seluruh biaya yang timbul dalam perkara ini.'));

/* ===================== PETITUM ===================== */
B.push(Pl('Atas dasar alasan dan uraian yang tersebut di atas, maka mohon kepada Ketua Pengadilan Negeri Surakarta c.q. Majelis Hakim yang memeriksa perkara ini untuk memutuskan, sebagai berikut:', { before: 240, after: 200 }));

B.push(Pl([run('PRIMAIR:', { bold: true })], { after: 140 }));
B.push(petitum('Mengabulkan gugatan Penggugat untuk seluruhnya;'));
B.push(petitum('Menyatakan sah dan mengikat Perjanjian Pemborongan Pekerjaan Nomor 001/PPP/AK-RK/I/2026 tanggal 12 Januari 2026 beserta seluruh lampirannya, termasuk Rencana Anggaran Biaya sebagai Lampiran I dan Lampiran Spesifikasi Teknis;'));
B.push(petitum([run('Menyatakan Tergugat telah melakukan '), run('wanprestasi', { bold: true }), run(' atas Perjanjian Pemborongan Pekerjaan Nomor 001/PPP/AK-RK/I/2026 tanggal 12 Januari 2026, yaitu berupa terlambat memenuhi prestasi, memenuhi prestasi tetapi tidak sebagaimana mestinya, dan tidak memenuhi prestasi sama sekali;')]));
B.push(petitum('Membatalkan Perjanjian Pemborongan Pekerjaan Nomor 001/PPP/AK-RK/I/2026 tanggal 12 Januari 2026 beserta seluruh lampirannya karena wanprestasi Tergugat, terhitung sejak tanggal 25 Juni 2026;'));
B.push(petitum('Menyatakan surat tagihan Tergugat tertanggal 8 Mei 2026 sebesar Rp185.000.000,00 (seratus delapan puluh lima juta rupiah) tidak mempunyai dasar hukum dan tidak mengikat Penggugat;'));
B.push(petitum('Menyatakan pembayaran Termin IV sebesar Rp250.000.000,00 (dua ratus lima puluh juta rupiah) belum jatuh tempo dan Penggugat tidak berkewajiban untuk membayarnya kepada Tergugat;'));
B.push(petitum('Menghukum Tergugat untuk membayar ganti kerugian materiil kepada Penggugat sebesar ' + rp(D.GANTI) + ' (seratus dua puluh tujuh juta delapan puluh delapan ribu delapan ratus rupiah), secara tunai dan seketika, dengan rincian sebagai berikut:'));
B.push(sub('a', 'Pengembalian kelebihan pembayaran sebesar ' + rp(D.KELEBIHAN) + ';'));
B.push(sub('b', 'Denda keterlambatan sebesar ' + rp(D.DENDA) + ';'));
B.push(sub('c', 'Biaya pembongkaran keramik, pengangkutan puing, dan perbaikan lapisan dasar sebesar ' + rp(D.C_INCL) + ';'));
B.push(sub('d', 'Eskalasi harga dan biaya mobilisasi pelaksana pengganti sebesar ' + rp(D.D_INCL) + ';'));
B.push(petitum('Menghukum Tergugat untuk membayar bunga sebesar 6% (enam persen) per tahun atas jumlah tersebut, dihitung sejak gugatan ini didaftarkan sampai dengan putusan dalam perkara ini dilaksanakan seluruhnya;'));
B.push(petitum('Menyatakan sah dan berharga sita jaminan (conservatoir beslag) yang diletakkan atas harta kekayaan milik Tergugat;'));
B.push(petitum('Menyatakan putusan dalam perkara ini dapat dilaksanakan terlebih dahulu (uitvoerbaar bij voorraad), meskipun ada verzet, banding, maupun kasasi;'));
B.push(petitum('Menghukum Tergugat untuk membayar seluruh biaya yang timbul dalam perkara ini.'));

B.push(Pl([run('SUBSIDAIR:', { bold: true })], { before: 240, after: 140 }));
B.push(Pl('Atau apabila Majelis Hakim Pengadilan Negeri Surakarta berpendapat lain, mohon putusan yang seadil-adilnya (ex aequo et bono).', { after: 240 }));

B.push(Pl('Demikianlah gugatan ini diajukan, atas perhatian dan dikabulkannya gugatan ini, kami ucapkan terima kasih.', { after: 140 }));
B.push(Pl('Wassalamu’alaikum warrahmatullahi wabarakatuh.', { after: 300 }));

B.push(Pr('Hormat Kami,', { after: 0 }));
B.push(Pr([run('KANTOR HUKUM BRIAN, AVEL & REKAN', { bold: true })], { after: 0 }));
B.push(Pr('Kuasa Hukum Penggugat', { after: 500 }));
B.push(tbl([4677, 4677], [new TableRow({ children: [
  cell(['', '', 'BRIAN ......................, S.H., M.H.'], 4677, { align: AlignmentType.CENTER, bold: true }),
  cell(['', '', 'AVEL ......................, S.H., M.H.'], 4677, { align: AlignmentType.CENTER, bold: true }),
] })], { plain: true }));

/* ===================== DOKUMEN ===================== */
const doc = new Document({
  creator: 'Praktik Peradilan Perdata',
  title: 'Surat Gugatan Wanprestasi - Raka melawan PT Arunika Kreasi',
  styles: { default: { document: { run: { font: FONT, size: SZ } } } },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 },
        margin: { top: 1418, right: 1134, bottom: 1134, left: 1418 },
      },
    },
    footers: {
      default: new Footer({ children: [new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [new TextRun({ children: ['Page ', PageNumber.CURRENT, ' | ', PageNumber.TOTAL_PAGES], font: FONT, size: 20 })],
      })] }),
    },
    children: B,
  }],
});

Packer.toBuffer(doc).then(function (b) {
  const out = '/home/user/claude-workspace/Surat-Gugatan-Wanprestasi-Raka-vs-PT-Arunika-Kreasi.docx';
  fs.writeFileSync(out, b);
  console.log('Butir posita  : ' + N);
  console.log('Butir petitum : ' + M);
  console.log('File          : ' + out.split('/').pop() + '  ' + (b.length / 1024).toFixed(1) + ' KB');
});
