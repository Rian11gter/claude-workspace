const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, Footer,
  WidthType, AlignmentType, BorderStyle, ShadingType, VerticalAlign,
  PageNumber, TabStopType,
} = require('docx');
const fs = require('fs');
const D = JSON.parse(fs.readFileSync(__dirname + '/angka-ahli.json', 'utf8'));

const FONT = 'Times New Roman', SZ = 24, W = 9354;
const HEAD = 'D9D9D9', TOTL = 'E8E8E8', WARN = 'FFF2CC';
const NB = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const NO_BORDERS = { top: NB, bottom: NB, left: NB, right: NB,
                     insideHorizontal: NB, insideVertical: NB };

const f  = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
const rp = n => 'Rp' + f(n) + ',00';
const pc = n => String(n.toFixed(2)).replace('.', ',') + '%';

const NK = 850000000, DIBAYAR = 600000000;
const P85 = NK * 0.85, HAK = P85 - DIBAYAR, TAMBAHAN = 85000000;
const REKONVENSI = 100000000 + TAMBAHAN, BELUM = D.C_INCL + D.D_INCL;
if (HAK !== 122500000 || REKONVENSI !== 185000000 || BELUM !== 46948800)
  throw new Error('validasi angka gagal');

const run = (t, o = {}) => new TextRun({
  text: t, font: FONT, size: o.size || SZ, bold: !!o.bold, italics: !!o.italics,
});
function P(parts, o = {}) {
  return new Paragraph({
    children: (Array.isArray(parts) ? parts : [run(parts, o)]),
    alignment: o.align || AlignmentType.JUSTIFIED,
    spacing: { before: o.before || 0, after: o.after === undefined ? 120 : o.after, line: o.line || 280 },
  });
}
const Pl = (t, o = {}) => P(t, Object.assign({ align: AlignmentType.LEFT }, o));
const Pr = (t, o = {}) => P(t, Object.assign({ align: AlignmentType.RIGHT }, o));
const Pc = (t, o = {}) => P(t, Object.assign({ align: AlignmentType.CENTER }, o));

const C = {};
const REF = new Set();               // butir posita yang ditanggapi
// kumpulkan rujukan "angka N" ke butir posita gugatan, tanpa peduli huruf besar/kecil
function scan(text) {
  let m; const re = /angka\s+(\d+)/gi;
  while ((m = re.exec(text)) !== null) REF.add(+m[1]);
}
function item(key, parts) {
  C[key] = (C[key] || 0) + 1;
  const kids = [run(C[key] + '.'), new TextRun({ text: '\t', font: FONT, size: SZ })];
  (Array.isArray(parts) ? parts : [run(parts)]).forEach(k => kids.push(k));
  if (typeof parts === 'string') scan(parts);
  return new Paragraph({
    children: kids, alignment: AlignmentType.JUSTIFIED,
    spacing: { before: 60, after: 120, line: 280 },
    indent: { left: 620, hanging: 620 },
    tabStops: [{ type: TabStopType.LEFT, position: 620 }],
  });
}
function sub(letter, text) {
  return new Paragraph({
    children: [run(letter + '.'), new TextRun({ text: '\t', font: FONT, size: SZ }), run(text)],
    alignment: AlignmentType.JUSTIFIED,
    spacing: { before: 40, after: 80, line: 280 },
    indent: { left: 1180, hanging: 560 },
    tabStops: [{ type: TabStopType.LEFT, position: 1180 }],
  });
}
const H = t => Pc([run(t, { bold: true })], { before: 300, after: 160 });
function H2(t) { scan(t); return Pl([run(t, { bold: true })], { before: 220, after: 120 }); }

function cellR(text, width, o = {}) {
  return new TableCell({
    children: [new Paragraph({ children: [run(text, { size: SZ, bold: o.bold })],
      alignment: o.align || AlignmentType.LEFT, spacing: { before: 10, after: 10, line: 280 } })],
    width: { size: width, type: WidthType.DXA }, verticalAlign: VerticalAlign.TOP,
    margins: { top: 20, bottom: 20, left: 0, right: 60 },
  });
}
const kvRow = (l, v) => new TableRow({ children: [
  cellR(l, 2800, { bold: true }), cellR(':', 260, { align: AlignmentType.CENTER }), cellR(v, W - 3060)] });
const kvTable = rows => new Table({ columnWidths: [2800, 260, W - 3060],
  width: { size: W, type: WidthType.DXA }, borders: NO_BORDERS, rows });
function cell(text, width, o = {}) {
  return new TableCell({
    children: (Array.isArray(text) ? text : [text]).map(t => new Paragraph({
      children: [run(t, { size: o.size || 21, bold: o.bold })],
      alignment: o.align || AlignmentType.LEFT, spacing: { before: 30, after: 30, line: 250 } })),
    width: { size: width, type: WidthType.DXA },
    shading: o.fill ? { type: ShadingType.CLEAR, color: 'auto', fill: o.fill } : undefined,
    verticalAlign: VerticalAlign.CENTER, margins: { top: 50, bottom: 50, left: 100, right: 100 },
    columnSpan: o.span,
  });
}
const tbl = (cw, rows) => new Table({ columnWidths: cw, width: { size: W, type: WidthType.DXA }, rows });

const B = [];

/* ============================ KOP ============================ */
B.push(Pr('Surakarta, 6 Oktober 2026', { after: 240 }));
B.push(Pl('Kepada Yth.', { after: 0 }));
B.push(Pl('Majelis Hakim Pemeriksa Perkara Nomor ......../Pdt.G/2026/PN Skt', { after: 0 }));
B.push(Pl('Pengadilan Negeri Surakarta', { after: 0 }));
B.push(Pl('Di-', { after: 0 }));
B.push(Pl([run('SURAKARTA', { bold: true })], { after: 240 }));
B.push(Pl([run('Perihal: '), run('Jawaban Tergugat atas Gugatan Wanprestasi', { bold: true })], { after: 240 }));
B.push(Pl('Assalamu’alaikum warrahmatullahi wabarakatuh,', { after: 120 }));
B.push(Pl('Dengan Hormat,', { after: 120 }));
B.push(Pl('Kami yang bertanda tangan di bawah ini:', { after: 120 }));
B.push(Pl([run('RAFI RIZALDI KHAERAN, S.H., M.H.', { bold: true })], { after: 0 }));
B.push(Pl([run('DINAR PAMUNGKAS, S.H., M.H.', { bold: true })], { after: 120 }));
B.push(Pl('Advokat dan Penasihat Hukum pada:', { after: 0 }));
B.push(Pl([run('NEVADA LAW FIRM', { bold: true })], { after: 0 }));
B.push(Pl('Berkantor di Jalan Duwet Raya Nomor 014, Kelurahan Karangasem, Kecamatan Laweyan, Kota Surakarta, Provinsi Jawa Tengah, 57145;', { after: 120 }));
B.push(Pl('Bertindak baik sendiri-sendiri maupun bersama-sama, berdasarkan Surat Kuasa Khusus bermeterai Nomor 47/SKK/RMR/IX/2026 tertanggal 25 September 2026, bertindak untuk dan atas nama:', { after: 160 }));
B.push(kvTable([
  kvRow('Nama Perseroan', 'PT ARUNIKA KREASI'),
  kvRow('Bidang Usaha', 'Desain interior dan pengelolaan usaha kuliner'),
  kvRow('Kedudukan', 'Jalan Anggrek Nomor 07, RT 01, RW 02, Kelurahan Nyawiji, Kecamatan Polanharjo, Kabupaten Klaten, Provinsi Jawa Tengah'),
  kvRow('Diwakili oleh', 'ARYA DAMAR PRAYOGA, S.H., M.H., lahir di Klaten pada tanggal 31 Desember 2000, Nomor Kartu Tanda Penduduk 325477854003, dalam kedudukannya sebagai Direktur yang sah bertindak untuk dan atas nama perseroan'),
]));
B.push(Pl([run('Selanjutnya disebut sebagai '), run('TERGUGAT', { bold: true }), run(';')], { before: 120, after: 200 }));
B.push(Pl('Dengan ini menyampaikan Jawaban atas Gugatan Wanprestasi yang diajukan oleh RAKA selaku PENGGUGAT tertanggal 15 September 2026, sebagai berikut:', { after: 120 }));
B.push(Pl('Bahwa TERGUGAT menolak dengan tegas seluruh dalil PENGGUGAT dalam gugatannya, kecuali terhadap hal-hal yang secara tegas diakui oleh TERGUGAT dalam Jawaban ini. Pengakuan atas suatu fakta tidak berarti pengakuan atas kualifikasi hukum yang dibangun PENGGUGAT atas fakta tersebut. Agar Jawaban ini mudah diikuti Majelis Hakim, TERGUGAT menanggapi dalil PENGGUGAT dengan menunjuk nomor butir posita gugatan.', { after: 160 }));

/* ========================= DALAM EKSEPSI ========================= */
B.push(H('DALAM EKSEPSI'));

B.push(H2('A. Eksepsi Kewenangan Relatif (Exceptio Declinatoria Fori) — menanggapi dalil angka 4 dan angka 24'));
B.push(item('e', 'Bahwa sebelum TERGUGAT menyampaikan pembelaan lain, dan karenanya diajukan pada kesempatan pertama sebagaimana disyaratkan Pasal 133 Herzien Inlandsch Reglement, TERGUGAT mengajukan eksepsi bahwa Pengadilan Negeri Surakarta tidak berwenang secara relatif memeriksa dan mengadili perkara ini;'));
B.push(item('e', 'Bahwa sebagaimana PENGGUGAT akui sendiri pada dalil angka 24 gugatannya, TERGUGAT berkedudukan di Kabupaten Klaten. Berdasarkan asas actor sequitur forum rei sebagaimana Pasal 118 ayat (1) Herzien Inlandsch Reglement, gugatan seharusnya diajukan kepada Pengadilan Negeri Klaten;'));
B.push(item('e', 'Bahwa PENGGUGAT pada dalil angka 4 dan angka 24 menyandarkan kewenangan pada klausula domisili hukum dalam Perjanjian. Namun kewenangan relatif pengadilan merupakan bagian dari hukum acara yang bersifat memaksa, sehingga Majelis Hakim tetap berkewajiban menguji kewenangannya sendiri, dan klausula yang memuat pelepasan hak mengajukan eksepsi kewenangan tidak dapat menghapus kewajiban pengujian tersebut;'));
B.push(item('e', 'Bahwa dengan demikian TERGUGAT mohon Majelis Hakim menyatakan Pengadilan Negeri Surakarta tidak berwenang, dan menyatakan gugatan PENGGUGAT tidak dapat diterima;'));

B.push(H2('B. Eksepsi Gugatan Kabur dan Saling Bertentangan (Exceptio Obscuur Libel)'));
B.push(item('e', 'Bahwa petitum PENGGUGAT mengandung pertentangan yang tidak dapat dipertemukan. Pada petitum angka 2 PENGGUGAT meminta Majelis Hakim menyatakan Perjanjian sah dan mengikat, sedangkan pada petitum angka 4 PENGGUGAT meminta Perjanjian yang sama dibatalkan. Kedua tuntutan tersebut kontradiktif dan tidak dapat dikabulkan bersamaan;'));
B.push(item('e', 'Bahwa pertentangan yang lebih mendasar terdapat antara petitum angka 4 dan petitum angka 7 huruf b. PENGGUGAT meminta Perjanjian dibatalkan, namun pada saat yang sama menuntut denda keterlambatan ' + rp(D.DENDA) + ' yang dasarnya semata-mata bersumber dari klausula denda dalam Perjanjian itu sendiri. Apabila Perjanjian dibatalkan, klausula denda di dalamnya turut kehilangan daya ikat, sehingga tuntutan denda tersebut kehilangan dasar;'));
B.push(item('e', 'Bahwa dalil angka 20 gugatan menghitung pengembalian kelebihan pembayaran berdasarkan keadaan tanggal 25 Juni 2026, sedangkan denda keterlambatan pada butir yang sama dihitung berdasarkan jatuh tempo tanggal 1 Mei 2026, tanpa satu pun penjelasan mengenai dasar penggunaan dua titik waktu berbeda untuk satu rangkaian tuntutan;'));
B.push(item('e', 'Bahwa dalil angka 23 gugatan memohon sita jaminan atas harta kekayaan TERGUGAT namun objeknya dibiarkan kosong berupa titik-titik, sehingga permohonan tersebut tidak jelas dan tidak dapat dilaksanakan;'));
B.push(item('e', 'Bahwa dengan demikian gugatan PENGGUGAT kabur dan tidak memenuhi syarat formal, sehingga sepatutnya dinyatakan tidak dapat diterima;'));

B.push(H2('C. Eksepsi Gugatan Prematur — menanggapi dalil angka 11 dan angka 15'));
B.push(item('e', 'Bahwa PENGGUGAT pada dalil angka 15 hanya mendalilkan penolakan tagihan melalui sambungan telepon, dan di seluruh gugatannya PENGGUGAT tidak pernah menguraikan adanya pernyataan lalai secara tertulis kepada TERGUGAT, serta tidak mengajukan satu pun surat peringatan sebagai alat bukti;'));
B.push(item('e', 'Bahwa pada dalil angka 11 PENGGUGAT menyandarkan keadaan lalai TERGUGAT semata-mata pada lewatnya waktu berdasarkan kekuatan perikatan sendiri. Namun dalam perjanjian pemborongan pekerjaan yang pelaksanaannya nyata dipengaruhi temuan kondisi lapangan dan perubahan desain, tenggat waktu tidak dapat diperlakukan sebagai tenggat mutlak tanpa didahului pernyataan lalai tertulis, agar debitur memperoleh kesempatan yang patut memenuhi prestasinya;'));
B.push(item('e', 'Bahwa Perjanjian juga mensyaratkan musyawarah dalam jangka waktu paling lama 30 (tiga puluh) hari kalender sejak perselisihan diberitahukan secara tertulis, sedangkan PENGGUGAT pada dalil angka 17 tidak menguraikan adanya pemberitahuan perselisihan secara tertulis sebagai syarat formal dimulainya tahap tersebut;'));
B.push(item('e', 'Bahwa dengan demikian gugatan PENGGUGAT prematur dan sepatutnya dinyatakan tidak dapat diterima;'));

/* ======================= DALAM POKOK PERKARA ======================= */
B.push(H('DALAM POKOK PERKARA'));

B.push(H2('A. Dalil yang Diakui TERGUGAT — dalil angka 1, angka 2, dan angka 3'));
B.push(item('p', 'Bahwa TERGUGAT mengakui dalil angka 1 gugatan, yaitu PENGGUGAT adalah pemilik bangunan komersial di Jalan Ahmad Yani Nomor 21, Kota Surakarta, seluas kurang lebih 120 m²;'));
B.push(item('p', 'Bahwa TERGUGAT mengakui dalil angka 2 gugatan, yaitu adanya Perjanjian Pemborongan Pekerjaan Nomor 001/PPP/AK-RK/I/2026 tanggal 12 Januari 2026 beserta lampirannya, dan mengakui Perjanjian tersebut sah serta mengikat PARA PIHAK;'));
B.push(item('p', 'Bahwa TERGUGAT mengakui dalil angka 3 gugatan mengenai nilai kontrak Rp850.000.000,00 termasuk pajak, yang terdiri atas Dasar Pengenaan Pajak Rp765.765.766,00 dan Pajak Pertambahan Nilai Rp84.234.234,00. TERGUGAT pula mengakui Rencana Anggaran Biaya disusun oleh TERGUGAT, namun perlu ditegaskan bahwa penyusunannya dilakukan pada tanggal 12 Januari 2026, yaitu sebelum pembongkaran interior lama dilaksanakan, sehingga seluruh volume dan asumsi di dalamnya disusun berdasarkan kondisi bangunan yang tampak dari luar;'));
B.push(item('p', 'Bahwa pengakuan atas fakta-fakta tersebut sama sekali tidak berarti pengakuan atas dalil PENGGUGAT bahwa TERGUGAT telah melakukan wanprestasi;'));

B.push(H2('B. Tanggapan atas Dalil Angka 4 dan Angka 5'));
B.push(item('p', 'Bahwa TERGUGAT mengakui dalil angka 4 gugatan sepanjang mengenai jangka waktu 105 hari kalender sejak 16 Januari 2026 dengan batas akhir 1 Mei 2026, spesifikasi keramik, dan keharusan addendum tertulis. Adapun mengenai klausula domisili hukum, TERGUGAT telah menanggapinya dalam Eksepsi;'));
B.push(item('p', 'Bahwa TERGUGAT mengakui dalil angka 5 gugatan sepanjang mengenai diterimanya pembayaran Termin I, Termin II, dan Termin III seluruhnya Rp600.000.000,00;'));
B.push(item('p', 'Bahwa TERGUGAT membantah bagian akhir dalil angka 5 yang menyatakan Termin IV belum jatuh tempo. Tidak terpenuhinya syarat penyerahan pekerjaan justru disebabkan terhentinya pekerjaan, sedangkan terhentinya pekerjaan disebabkan penolakan mutlak PENGGUGAT atas seluruh tagihan TERGUGAT. PENGGUGAT tidak dapat menjadikan keadaan yang ia sendiri turut menimbulkan sebagai dasar untuk menghindari kewajiban pembayarannya;'));

B.push(H2('C. Tanggapan atas Dalil Angka 6 — Tabel Pembayaran PENGGUGAT Menyesatkan'));
B.push(item('p', 'Bahwa TERGUGAT membantah dalil angka 6 gugatan beserta tabel yang menyertainya. Tabel tersebut disusun dengan mencampur dua dasar penilaian yang berbeda dalam satu rangkaian perbandingan. Tiga baris pertama menggunakan klaim progres TERGUGAT, sedangkan dua baris terakhir beralih menggunakan penilaian ahli yang diajukan PENGGUGAT sendiri. Perbandingan yang dasarnya berpindah di tengah jalan tidak dapat menghasilkan kesimpulan yang sahih;'));
B.push(item('p', 'Bahwa baris pertama tabel tersebut menyebut pembayaran Termin I sebesar Rp450.000.000,00 pada tanggal 16 Januari 2026 sebagai kelebihan bayar. Dalil tersebut bertentangan dengan Perjanjian, karena Termin I memang diperjanjikan jatuh tempo setelah Perjanjian ditandatangani dan pekerjaan dimulai, dan diperuntukkan bagi biaya persiapan, mobilisasi, serta pengadaan material utama. Termin I adalah uang muka kontraktual, bukan kelebihan pembayaran;'));
B.push(item('p', 'Bahwa apabila perbandingan disusun dengan dasar yang konsisten, yaitu realisasi progres menurut TERGUGAT, maka hasilnya justru berlawanan dengan dalil PENGGUGAT, sebagaimana tabel berikut:'));
(function () {
  const cw = [1900, 2100, 2154, 1600, 1600];
  const rows = [new TableRow({ tableHeader: true, children: [
    cell('Tanggal', cw[0], { bold: true, fill: HEAD, align: AlignmentType.CENTER }),
    cell('Dibayar PENGGUGAT (kumulatif)', cw[1], { bold: true, fill: HEAD, align: AlignmentType.CENTER }),
    cell('Dasar Penilaian (konsisten)', cw[2], { bold: true, fill: HEAD, align: AlignmentType.CENTER }),
    cell('Nilai Prestasi', cw[3], { bold: true, fill: HEAD, align: AlignmentType.CENTER }),
    cell('Selisih', cw[4], { bold: true, fill: HEAD, align: AlignmentType.CENTER }),
  ] })];
  [
    ['5 Maret 2026',  500000000, 'Progres 40%', 340000000, 'Lebih bayar'],
    ['10 April 2026', 600000000, 'Progres 70%', 595000000, 'Lebih bayar'],
    ['1 Mei 2026',    600000000, 'Progres 85%', P85,       'KURANG BAYAR'],
  ].forEach(r => {
    const d = r[1] - r[3], kurang = d < 0;
    rows.push(new TableRow({ children: [
      cell(r[0], cw[0], { align: AlignmentType.CENTER, fill: kurang ? WARN : undefined, bold: kurang }),
      cell(rp(r[1]), cw[1], { align: AlignmentType.RIGHT, fill: kurang ? WARN : undefined, bold: kurang }),
      cell(r[2], cw[2], { align: AlignmentType.CENTER, fill: kurang ? WARN : undefined, bold: kurang }),
      cell(rp(r[3]), cw[3], { align: AlignmentType.RIGHT, fill: kurang ? WARN : undefined, bold: kurang }),
      cell(r[4] + ' ' + rp(Math.abs(d)), cw[4], { align: AlignmentType.RIGHT, fill: kurang ? WARN : undefined, bold: kurang }),
    ] }));
  });
  B.push(tbl(cw, rows));
})();
B.push(Pl('', { after: 160 }));
B.push(item('p', 'Bahwa dengan dasar penilaian yang konsisten, pada tanggal 1 Mei 2026 PENGGUGAT justru kurang membayar sebesar ' + rp(HAK) + '. Dengan demikian dalil PENGGUGAT bahwa ia senantiasa membayar melebihi nilai prestasi TERGUGAT adalah tidak benar;'));

B.push(H2('D. Tanggapan atas Dalil Angka 7, Angka 9, Angka 18, dan Angka 19 — Perubahan Pekerjaan'));
B.push(item('p', 'Bahwa TERGUGAT mengakui dalil angka 7 gugatan bahwa usulan penyesuaian desain berasal dari TERGUGAT, namun membantah kualifikasi yang dibangun PENGGUGAT atas fakta tersebut. Menyampaikan temuan kondisi lapangan dan mengusulkan penyesuaian adalah kewajiban profesional pelaksana pekerjaan. Justru akan merupakan kelalaian apabila TERGUGAT membiarkan pekerjaan berjalan dengan desain yang tidak lagi sesuai kenyataan struktur bangunan;'));
B.push(item('p', 'Bahwa kondisi struktur dan bentuk bangunan yang berbeda dari asumsi awal baru dapat diketahui setelah pembongkaran interior lama dilaksanakan. Keadaan tersebut secara teknis tidak dapat diketahui sebelumnya dan bukan merupakan kelalaian TERGUGAT;'));
B.push(item('p', 'Bahwa PENGGUGAT menyetujui penyesuaian desain tersebut dan menerima gambar revisi yang dibuat TERGUGAT. PENGGUGAT tidak dapat di satu sisi menikmati hasil penyesuaian yang membuat bangunannya dapat difungsikan sebagai kafe, namun di sisi lain menolak seluruh akibat penyesuaian itu terhadap waktu pelaksanaan;'));
B.push(item('p', 'Bahwa TERGUGAT mengakui dalil angka 9 gugatan bahwa perubahan pada pertemuan tanggal 18 Maret 2026 tidak dituangkan dalam addendum tertulis. Namun perlu ditegaskan bahwa pertemuan tersebut dihadiri langsung oleh PENGGUGAT bersama Direktur TERGUGAT dan pelaksana lapangan, PENGGUGAT menyetujui perubahan tersebut, dan PENGGUGAT sama sekali tidak meminta dibuatkan addendum atas perubahan yang ia setujui sendiri. Tidak dibuatnya addendum merupakan kelalaian bersama PARA PIHAK, bukan kelalaian TERGUGAT semata;'));
B.push(item('p', 'Bahwa TERGUGAT membantah dalil angka 18 dan angka 19 gugatan beserta tabelnya. Bahwa Rencana Anggaran Biaya memuat pos penyesuaian struktur, plafon, pencahayaan, dan area luar adalah benar, namun pos-pos tersebut disusun berdasarkan volume dan asumsi sebelum pembongkaran. Yang TERGUGAT tagihkan bukanlah pekerjaan yang telah dianggarkan itu, melainkan selisih volume dan spesifikasi di atas yang dianggarkan;'));
B.push(item('p', 'Bahwa Perjanjian sendiri mengakui kemungkinan adanya selisih demikian, dengan mensyaratkan pihak yang mendalilkan pekerjaan tambahan membuktikan selisih volume atau spesifikasi di atas yang dianggarkan. TERGUGAT justru mengajukan perhitungan selisih volume tersebut sebagai alat bukti, sehingga dalil PENGGUGAT yang menganggap persoalan ini selesai hanya dengan menunjuk adanya pos dalam Rencana Anggaran Biaya adalah dalil yang terlalu menyederhanakan;'));

B.push(H2('E. Tanggapan atas Dalil Angka 8 dan Angka 12 — Keramik Lantai'));
B.push(item('p', 'Bahwa TERGUGAT mengakui dalil angka 8 gugatan bahwa keramik yang dipasang berwarna hitam dan bukan cokelat, serta mengakui PENGGUGAT menyampaikan keberatan pada tanggal 20 Februari 2026;'));
B.push(item('p', 'Bahwa keramik cokelat sesuai spesifikasi pada saat itu tidak tersedia pada pemasok TERGUGAT. Guna menghindari terhentinya seluruh rangkaian pekerjaan lantai dan keterlambatan yang lebih besar, TERGUGAT memasang keramik pengganti dan memberitahukan keadaan tersebut kepada PENGGUGAT;'));
B.push(item('p', 'Bahwa yang paling menentukan, dan yang sama sekali tidak diuraikan PENGGUGAT dalam gugatannya, adalah perbuatan PENGGUGAT sendiri setelah mengetahui ketidaksesuaian tersebut. Sebagaimana PENGGUGAT akui pada dalil angka 5, PENGGUGAT tetap melakukan pembayaran Termin II pada tanggal 5 Maret 2026 dan pembayaran Termin III pada tanggal 10 April 2026, yaitu dua kali pembayaran setelah keberatan disampaikan, tanpa sekali pun mensyaratkan pembongkaran keramik terlebih dahulu dan tanpa menahan sebagian pembayaran sebagai jaminan perbaikan;'));
B.push(item('p', 'Bahwa perbuatan PENGGUGAT yang terus melaksanakan pembayaran selama lebih dari 7 (tujuh) minggu setelah mengetahui ketidaksesuaian, serta membiarkan pekerjaan lantai tetap berlangsung, menunjukkan bahwa PENGGUGAT pada kenyataannya menerima keadaan tersebut. PENGGUGAT tidak dapat pada kemudian hari menuntut pembongkaran atas keadaan yang telah ia terima melalui perbuatannya sendiri;'));
B.push(item('p', 'Bahwa TERGUGAT membantah dalil angka 12 gugatan sepanjang mengenai penilaian pekerjaan lantai dan keramik sebesar 0% (nol persen). Perjanjian menyatakan bahwa pekerjaan yang tidak sesuai spesifikasi tidak diperhitungkan sebagai realisasi progres ' + '“sampai kesesuaiannya dipulihkan”' + '. Rumusan tersebut menunjukkan penangguhan perhitungan, bukan penghapusan nilai pekerjaan secara permanen. Menilai Item 4 sebesar nol berarti menghapus seluruh biaya bahan, upah, rabat beton, waterproofing, dan pekerjaan persiapan lantai yang nyata telah dikeluarkan TERGUGAT;'));
B.push(item('p', 'Bahwa TERGUGAT sampai dengan saat ini tetap bersedia menggantikan keramik tersebut sesuai spesifikasi, sepanjang PENGGUGAT memenuhi kewajiban pembayaran yang telah TERGUGAT tagihkan;'));

B.push(H2('F. Tanggapan atas Dalil Angka 10 dan Angka 11 — Keterlambatan dan Penilaian Progres'));
B.push(item('p', 'Bahwa TERGUGAT mengakui dalil angka 10 gugatan bahwa pada tanggal 22 April 2026 PENGGUGAT mengingatkan batas waktu, dan mengakui TERGUGAT menyampaikan adanya hambatan pengadaan keramik;'));
B.push(item('p', 'Bahwa TERGUGAT membantah dalil angka 11 gugatan. Menurut TERGUGAT, realisasi progres pekerjaan pada tanggal 1 Mei 2026 telah mencapai sekitar 85% (delapan puluh lima persen) atau senilai ' + rp(P85) + ', bukan ' + pc(D.A.total) + ' sebagaimana didalilkan PENGGUGAT;'));
B.push(item('p', 'Bahwa Laporan Pemeriksaan dan Pendapat Ahli yang PENGGUGAT ajukan sebagai Bukti P-15 tidak dapat dijadikan dasar penilaian yang meyakinkan, karena berdasarkan pengakuan ahli itu sendiri di dalam laporannya:'));
B.push(sub('a', 'ahli tidak berada di lokasi pekerjaan pada tanggal 1 Mei 2026 maupun pada tanggal 25 Juni 2026, sehingga penilaiannya atas kedua tanggal tersebut bersifat rekonstruksi dan bukan hasil pengamatan langsung;'));
B.push(sub('b', 'ahli mengakui terbuka metode penilaian lain yang juga dapat dipertanggungjawabkan, yang menghasilkan angka berbeda yaitu ' + pc(D.ALT_TOTAL) + '. Dengan adanya dua hasil berbeda atas objek yang sama, penilaian tersebut tidak bersifat tunggal dan tidak dapat diperlakukan sebagai kebenaran yang pasti;'));
B.push(sub('c', 'ahli mengakui sub-item desain, gambar revisi, serta engineering dan perhitungan struktur senilai ' + rp(D.SUB_DESAIN) + ' telah selesai seluruhnya, namun ahli tetap memperhitungkan seluruh Item 14 secara proporsional, sehingga menihilkan sebagian pekerjaan yang ia sendiri akui telah selesai;'));
B.push(item('p', 'Bahwa selisih penilaian progres antara TERGUGAT dan PENGGUGAT mencapai ' + rp(P85 - D.A.nilai) + '. Mengingat besarnya selisih tersebut, TERGUGAT mohon dilakukan pemeriksaan setempat dan/atau opname bersama dengan menghadirkan ahli yang ditunjuk Majelis Hakim;'));

B.push(H2('G. Tanggapan atas Dalil Angka 13, Angka 14, dan Angka 15 — Tagihan 8 Mei 2026'));
B.push(item('p', 'Bahwa TERGUGAT mengakui dalil angka 13 gugatan mengenai adanya surat tagihan tanggal 8 Mei 2026 sebesar ' + rp(REKONVENSI) + ', namun membantah dalil angka 14 yang menyatakan tagihan tersebut tidak mempunyai dasar hukum;'));
B.push(item('p', 'Bahwa terhadap dalil angka 14 huruf a, tagihan Rp100.000.000,00 bukan semata bagian Termin IV, melainkan pembayaran atas nilai pekerjaan yang nyata telah dilaksanakan. Berdasarkan realisasi progres 85% senilai ' + rp(P85) + ' sedangkan PENGGUGAT baru membayar ' + rp(DIBAYAR) + ', TERGUGAT sesungguhnya berhak atas ' + rp(HAK) + '. TERGUGAT dengan itikad baik hanya menagih Rp100.000.000,00, yaitu di bawah jumlah yang menjadi haknya;'));
B.push(item('p', 'Bahwa terhadap dalil angka 14 huruf b, tidak dibuatnya addendum merupakan kelalaian bersama PARA PIHAK sebagaimana telah TERGUGAT uraikan pada bagian D di atas, karena PENGGUGAT hadir sendiri dalam pertemuan tanggal 18 Maret 2026 dan menyetujui perubahan tanpa meminta dibuatkan addendum;'));
B.push(item('p', 'Bahwa terhadap dalil angka 14 huruf c, yang TERGUGAT tagihkan adalah selisih volume dan spesifikasi di atas yang dianggarkan dalam Rencana Anggaran Biaya, yaitu penggantian plafon datar menjadi drop ceiling berornamen, penambahan titik dan fixture pencahayaan di atas 48 titik yang dianggarkan, serta perluasan perkerasan dan penataan area luar, sebagaimana perhitungan selisih volume yang TERGUGAT ajukan sebagai alat bukti. Menunjuk adanya pos dalam Rencana Anggaran Biaya tidak dengan sendirinya membuktikan bahwa volume yang dikerjakan tidak melampaui volume yang dianggarkan;'));
B.push(item('p', 'Bahwa terhadap dalil angka 14 huruf d, keterlambatan tidak bersumber dari kelalaian TERGUGAT melainkan dari temuan kondisi lapangan dan perubahan pekerjaan yang disetujui PENGGUGAT, sebagaimana telah diuraikan pada bagian D;'));
B.push(item('p', 'Bahwa pekerjaan tambahan tersebut nyata dilaksanakan dan hasilnya melekat pada bangunan milik PENGGUGAT serta dinikmati olehnya. Menolak membayar sementara menikmati hasil pekerjaan merupakan pengayaan tanpa hak yang tidak dibenarkan hukum;'));
B.push(item('p', 'Bahwa terhadap dalil angka 15, TERGUGAT mencatat PENGGUGAT sendiri mengakui penolakan tagihan hanya disampaikan melalui sambungan telepon, tanpa satu pun surat penolakan yang diajukan sebagai alat bukti. Adapun mengenai penangguhan prestasi, TERGUGAT menanggapinya pada bagian H di bawah ini;'));

B.push(H2('H. Tanggapan atas Dalil Angka 16 dan Angka 17 — Terhentinya Pekerjaan'));
B.push(item('p', 'Bahwa TERGUGAT mengakui dalil angka 16 gugatan sepanjang mengenai fakta terhentinya pekerjaan pada tanggal 25 Juni 2026, namun membantah dengan tegas kualifikasi PENGGUGAT bahwa TERGUGAT tidak memenuhi prestasi sama sekali dan menghentikan pekerjaan secara sepihak dengan itikad buruk;'));
B.push(item('p', 'Bahwa setelah PENGGUGAT menolak seluruh tagihan tanggal 8 Mei 2026, TERGUGAT tidak lagi memiliki dana untuk membeli material dan membayar upah tenaga kerja, sedangkan nilai pekerjaan yang telah dilaksanakan melampaui jumlah yang telah dibayarkan PENGGUGAT. Terhentinya pekerjaan merupakan akibat ketidakmampuan nyata untuk melanjutkan pelaksanaan, bukan kehendak TERGUGAT meninggalkan kewajibannya;'));
B.push(item('p', 'Bahwa TERGUGAT justru telah menyatakan kesediaan melanjutkan pekerjaan, dan kesediaan tersebut tidak pernah dicabut sampai gugatan ini diajukan. TERGUGAT juga telah mengajukan permohonan perpanjangan waktu 45 (empat puluh lima) hari, yang justru menunjukkan niat menyelesaikan pekerjaan, namun permohonan itu ditolak PENGGUGAT tanpa pembahasan yang wajar;'));
B.push(item('p', 'Bahwa dalil PENGGUGAT pada akhir angka 16 mengenai tanggal 15 Juni 2026 justru memperkuat kedudukan TERGUGAT. Dalil tersebut menunjukkan bahwa TERGUGAT masih melanjutkan pekerjaan setelah tanggal 1 Mei 2026 dan baru berhenti pada tanggal 25 Juni 2026, yaitu bukan perbuatan pihak yang sejak semula tidak berniat memenuhi prestasinya;'));
B.push(item('p', 'Bahwa TERGUGAT mengakui dalil angka 17 gugatan bahwa musyawarah tanggal 20 Juli 2026 tidak menghasilkan kesepakatan, namun membantah sebab kegagalannya. Musyawarah tersebut gagal karena PENGGUGAT menolak secara mutlak seluruh tagihan TERGUGAT tanpa bersedia membahas perhitungan volume pekerjaan tambahan yang TERGUGAT ajukan;'));

B.push(H2('I. Tanggapan atas Dalil Angka 20, Angka 21, dan Angka 22 — Ganti Kerugian'));
B.push(item('p', 'Bahwa TERGUGAT menolak dalil angka 20 gugatan dan tuntutan ganti kerugian sebesar ' + rp(D.GANTI) + ' untuk seluruhnya;'));
B.push(item('p', 'Bahwa dari jumlah tersebut, sebesar ' + rp(BELUM) + ' atau 36,9% dari keseluruhan tuntutan sama sekali belum pernah dikeluarkan PENGGUGAT, sebagaimana tabel berikut:'));
(function () {
  const cw = [4854, 2000, 2500];
  const rows = [new TableRow({ tableHeader: true, children: [
    cell('Pos tuntutan PENGGUGAT pada dalil angka 20', cw[0], { bold: true, fill: HEAD, align: AlignmentType.CENTER }),
    cell('Jumlah', cw[1], { bold: true, fill: HEAD, align: AlignmentType.CENTER }),
    cell('Sifat', cw[2], { bold: true, fill: HEAD, align: AlignmentType.CENTER }),
  ] })];
  [
    ['C. Biaya pembongkaran keramik, pengangkutan puing, dan perbaikan lapisan dasar', D.C_INCL, 'Belum dikeluarkan'],
    ['D. Eskalasi harga dan mobilisasi pelaksana pengganti', D.D_INCL, 'Taksiran ahli, belum dikeluarkan'],
  ].forEach(r => rows.push(new TableRow({ children: [
    cell(r[0], cw[0]), cell(rp(r[1]), cw[1], { align: AlignmentType.RIGHT }), cell(r[2], cw[2], { align: AlignmentType.CENTER }),
  ] })));
  rows.push(new TableRow({ children: [
    cell('JUMLAH YANG BELUM NYATA DIKELUARKAN', cw[0], { bold: true, fill: TOTL, align: AlignmentType.RIGHT }),
    cell(rp(BELUM), cw[1], { bold: true, fill: TOTL, align: AlignmentType.RIGHT }),
    cell('', cw[2], { fill: TOTL }),
  ] }));
  B.push(tbl(cw, rows));
})();
B.push(Pl('', { after: 160 }));
B.push(item('p', 'Bahwa kerugian yang belum terjadi dan belum nyata dikeluarkan bukan merupakan kerugian yang dapat dituntut. Pasal 1243 Kitab Undang-Undang Hukum Perdata yang PENGGUGAT sendiri jadikan dasar menuntut adanya kerugian yang nyata diderita, bukan perkiraan biaya yang mungkin dikeluarkan di kemudian hari;'));
B.push(item('p', 'Bahwa tuntutan pengembalian kelebihan pembayaran sebesar ' + rp(D.KELEBIHAN) + ' pada dalil angka 20 huruf A seluruhnya bergantung pada angka progres ' + pc(D.B.total) + ' yang TERGUGAT tolak. Apabila progres yang benar adalah 85% sebagaimana dalil TERGUGAT, tidak terdapat kelebihan pembayaran sama sekali, dan yang terjadi justru sebaliknya, yaitu PENGGUGAT masih berutang kepada TERGUGAT;'));
B.push(item('p', 'Bahwa TERGUGAT menolak dalil angka 21 gugatan mengenai taksiran biaya penyelesaian sisa pekerjaan sebesar ' + rp(D.TAKSIRAN) + ' dan kekurangan dana ' + rp(D.KEKURANGAN) + '. Angka-angka tersebut merupakan taksiran yang seluruhnya bertumpu pada penilaian progres yang TERGUGAT bantah, dan bukan biaya yang nyata telah dikeluarkan PENGGUGAT;'));
B.push(item('p', 'Bahwa TERGUGAT menolak dalil angka 22 gugatan. Tuntutan pembatalan Perjanjian tidak dapat diajukan bersamaan dengan tuntutan denda keterlambatan yang bersumber dari klausula Perjanjian itu sendiri, sebagaimana telah TERGUGAT uraikan dalam Eksepsi;'));

B.push(H2('J. Tanggapan atas Dalil Angka 23, Angka 24, dan Angka 25'));
B.push(item('p', 'Bahwa TERGUGAT menolak dalil angka 23 gugatan mengenai sita jaminan. Permohonan tersebut tidak memenuhi syarat Pasal 227 Herzien Inlandsch Reglement, karena PENGGUGAT tidak menguraikan satu pun fakta yang menunjukkan persangkaan beralasan bahwa TERGUGAT akan mengalihkan harta kekayaannya. TERGUGAT adalah perseroan terbatas yang masih menjalankan usahanya secara terbuka pada alamat yang jelas, dan PENGGUGAT bahkan tidak menyebutkan objek yang dimohonkan untuk disita;'));
B.push(item('p', 'Bahwa TERGUGAT menolak dalil angka 24 gugatan mengenai kewenangan Pengadilan Negeri Surakarta, sebagaimana telah TERGUGAT uraikan dalam Eksepsi bagian A;'));
B.push(item('p', 'Bahwa TERGUGAT menolak dalil angka 25 gugatan mengenai putusan serta-merta. Perkara ini justru memuat perselisihan fakta yang sungguh-sungguh mengenai besarnya progres pekerjaan dengan selisih mencapai ' + rp(P85 - D.A.nilai) + ', sehingga tidak termasuk perkara dengan bukti yang begitu terang sebagaimana disyaratkan Pasal 180 ayat (1) Herzien Inlandsch Reglement, dan sejalan dengan kehati-hatian yang digariskan Mahkamah Agung melalui Surat Edaran Nomor 3 Tahun 2000 dan Surat Edaran Nomor 4 Tahun 2001;'));

/* ========================== REKONVENSI ========================== */
B.push(H('DALAM GUGATAN REKONVENSI'));
B.push(Pl('Bahwa berdasarkan Pasal 132a Herzien Inlandsch Reglement, bersamaan dengan Jawaban ini TERGUGAT mengajukan Gugatan Rekonvensi. Selanjutnya dalam bagian ini TERGUGAT disebut sebagai PENGGUGAT REKONVENSI dan PENGGUGAT disebut sebagai TERGUGAT REKONVENSI. Seluruh dalil dalam Jawaban Konvensi di atas merupakan bagian yang tidak terpisahkan dari Gugatan Rekonvensi ini.', { after: 160 }));
B.push(item('r', 'Bahwa PENGGUGAT REKONVENSI telah melaksanakan pekerjaan renovasi dengan realisasi progres sekitar 85% atau senilai ' + rp(P85) + ', sedangkan TERGUGAT REKONVENSI baru membayar ' + rp(DIBAYAR) + ', sehingga terdapat kekurangan pembayaran sebesar ' + rp(HAK) + ';'));
B.push(item('r', 'Bahwa selain itu PENGGUGAT REKONVENSI telah melaksanakan pekerjaan tambahan senilai ' + rp(TAMBAHAN) + ' atas persetujuan TERGUGAT REKONVENSI yang diberikan dalam pertemuan tanggal 18 Maret 2026, yang hasilnya melekat pada bangunan milik TERGUGAT REKONVENSI;'));
B.push(item('r', 'Bahwa dengan demikian PENGGUGAT REKONVENSI sesungguhnya berhak atas ' + rp(HAK + TAMBAHAN) + '. Namun demikian, dengan itikad baik PENGGUGAT REKONVENSI membatasi tuntutannya pada jumlah yang telah secara resmi ditagihkan melalui surat tagihan tanggal 8 Mei 2026, yaitu ' + rp(REKONVENSI) + ', dan tidak menuntut selisih sebesar ' + rp(HAK + TAMBAHAN - REKONVENSI) + ';'));
B.push(item('r', 'Bahwa TERGUGAT REKONVENSI telah menolak tagihan tersebut dan sampai gugatan ini diajukan tidak pernah membayarnya, sehingga TERGUGAT REKONVENSI telah melakukan wanprestasi atas kewajiban pembayarannya;'));
B.push(item('r', 'Bahwa akibat tidak dibayarnya tagihan tersebut, PENGGUGAT REKONVENSI kehilangan kemampuan membeli material dan membayar upah tenaga kerja, sehingga pekerjaan terhenti dan PENGGUGAT REKONVENSI menanggung modal kerja yang telah dikeluarkan tanpa memperoleh penggantian;'));
B.push(item('r', 'Bahwa atas jumlah yang belum dibayarkan tersebut PENGGUGAT REKONVENSI berhak atas bunga sebesar 6% (enam persen) per tahun sebagaimana Pasal 1250 Kitab Undang-Undang Hukum Perdata;'));

/* ============================ PETITUM ============================ */
B.push(Pl('Berdasarkan seluruh uraian tersebut di atas, TERGUGAT mohon kepada Majelis Hakim Pengadilan Negeri Surakarta yang memeriksa dan mengadili perkara ini untuk memutuskan sebagai berikut:', { before: 300, after: 200 }));

B.push(H2('DALAM EKSEPSI:'));
B.push(item('x', 'Menerima dan mengabulkan eksepsi TERGUGAT;'));
B.push(item('x', 'Menyatakan Pengadilan Negeri Surakarta tidak berwenang memeriksa dan mengadili perkara ini;'));
B.push(item('x', 'Menyatakan gugatan PENGGUGAT tidak dapat diterima (niet ontvankelijke verklaard);'));

B.push(H2('DALAM POKOK PERKARA:'));
B.push(item('y', 'Menolak gugatan PENGGUGAT untuk seluruhnya, atau setidak-tidaknya menyatakan gugatan PENGGUGAT tidak dapat diterima;'));
B.push(item('y', 'Menyatakan TERGUGAT tidak melakukan wanprestasi atas Perjanjian Pemborongan Pekerjaan Nomor 001/PPP/AK-RK/I/2026 tanggal 12 Januari 2026;'));
B.push(item('y', 'Menyatakan realisasi progres pekerjaan pada tanggal 1 Mei 2026 adalah sekitar 85% (delapan puluh lima persen) atau senilai ' + rp(P85) + ';'));
B.push(item('y', 'Menyatakan PENGGUGAT telah menerima pemasangan keramik pengganti melalui perbuatannya sendiri berupa pembayaran Termin II dan Termin III setelah mengetahui ketidaksesuaian tersebut;'));
B.push(item('y', 'Menyatakan surat tagihan TERGUGAT tertanggal 8 Mei 2026 sebesar ' + rp(REKONVENSI) + ' sah dan mengikat PENGGUGAT;'));
B.push(item('y', 'Menolak permohonan sita jaminan (conservatoir beslag) yang diajukan PENGGUGAT;'));
B.push(item('y', 'Menolak permohonan putusan yang dapat dilaksanakan terlebih dahulu (uitvoerbaar bij voorraad);'));
B.push(item('y', 'Menghukum PENGGUGAT untuk membayar seluruh biaya yang timbul dalam perkara ini.'));

B.push(H2('DALAM GUGATAN REKONVENSI:'));
B.push(item('z', 'Mengabulkan Gugatan Rekonvensi PENGGUGAT REKONVENSI untuk seluruhnya;'));
B.push(item('z', 'Menyatakan TERGUGAT REKONVENSI telah melakukan wanprestasi karena tidak memenuhi kewajiban pembayaran atas pekerjaan yang telah dilaksanakan dan atas pekerjaan tambahan;'));
B.push(item('z', 'Menghukum TERGUGAT REKONVENSI untuk membayar kepada PENGGUGAT REKONVENSI sebesar ' + rp(REKONVENSI) + ' (seratus delapan puluh lima juta rupiah) secara tunai dan seketika, dengan rincian:'));
B.push(sub('a', 'Pembayaran atas pekerjaan yang telah dilaksanakan sebesar Rp100.000.000,00;'));
B.push(sub('b', 'Pembayaran atas pekerjaan tambahan sebesar ' + rp(TAMBAHAN) + ';'));
B.push(item('z', 'Menghukum TERGUGAT REKONVENSI untuk membayar bunga sebesar 6% (enam persen) per tahun atas jumlah tersebut, dihitung sejak tanggal 8 Mei 2026 sampai seluruh kewajiban dilaksanakan;'));
B.push(item('z', 'Menghukum TERGUGAT REKONVENSI untuk membayar seluruh biaya yang timbul dalam Gugatan Rekonvensi ini.'));

B.push(H2('SUBSIDAIR:'));
B.push(Pl('Atau apabila Majelis Hakim Pengadilan Negeri Surakarta berpendapat lain, mohon putusan yang seadil-adilnya (ex aequo et bono).', { after: 240 }));
B.push(Pl('Demikianlah Jawaban ini kami sampaikan, atas perhatian Majelis Hakim kami ucapkan terima kasih.', { after: 140 }));
B.push(Pl('Wassalamu’alaikum warrahmatullahi wabarakatuh.', { after: 300 }));

B.push(Pr('Hormat Kami,', { after: 0 }));
B.push(Pr([run('NEVADA LAW FIRM', { bold: true })], { after: 0 }));
B.push(Pr('Kuasa Hukum Tergugat', { after: 560 }));
B.push(new Table({
  columnWidths: [4677, 4677], width: { size: W, type: WidthType.DXA }, borders: NO_BORDERS,
  rows: [new TableRow({ children: [
    cell(['', '', 'RAFI RIZALDI KHAERAN, S.H., M.H.'], 4677, { align: AlignmentType.CENTER, bold: true, size: 24 }),
    cell(['', '', 'DINAR PAMUNGKAS, S.H., M.H.'], 4677, { align: AlignmentType.CENTER, bold: true, size: 24 }),
  ] })],
}));

/* validasi: seluruh 25 butir posita harus ditanggapi */
const missing = [];
for (let i = 1; i <= 25; i++) if (!REF.has(i)) missing.push(i);
if (missing.length) throw new Error('butir posita belum ditanggapi: ' + missing.join(', '));

const doc = new Document({
  creator: 'Praktik Peradilan Perdata',
  title: 'Jawaban Tergugat atas Gugatan Wanprestasi - PT Arunika Kreasi',
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
  fs.writeFileSync('/home/user/claude-workspace/Jawaban-Gugatan-PT-Arunika-Kreasi.docx', b);
  console.log('Butir posita gugatan yang ditanggapi : ' + [...REF].sort((a, c) => a - c).join(', '));
  console.log('Cakupan                             : ' + REF.size + ' dari 25 butir');
  console.log('Eksepsi ' + C.e + ' butir | Pokok perkara ' + C.p + ' butir | Rekonvensi ' + C.r + ' butir');
  console.log('Petitum: eksepsi ' + C.x + ', pokok perkara ' + C.y + ', rekonvensi ' + C.z);
  console.log('Ukuran                              : ' + (b.length / 1024).toFixed(1) + ' KB');
});
