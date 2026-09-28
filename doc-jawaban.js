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
const NO_BORDERS = { top: NB, bottom: NB, left: NB, right: NB,
                     insideHorizontal: NB, insideVertical: NB };

const f  = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
const rp = n => 'Rp' + f(n) + ',00';
const pc = n => String(n.toFixed(2)).replace('.', ',') + '%';

/* angka yang didalilkan Tergugat */
const NK = 850000000, DIBAYAR = 600000000;
const P85 = NK * 0.85;                    // 722.500.000
const HAK = P85 - DIBAYAR;                // 122.500.000
const TAMBAHAN = 85000000;
const REKONVENSI = 100000000 + TAMBAHAN;  // 185.000.000
const BELUM = D.C_INCL + D.D_INCL;        // 46.948.800
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
    indent: o.indent,
  });
}
const Pl = (t, o = {}) => P(t, Object.assign({ align: AlignmentType.LEFT }, o));
const Pr = (t, o = {}) => P(t, Object.assign({ align: AlignmentType.RIGHT }, o));
const Pc = (t, o = {}) => P(t, Object.assign({ align: AlignmentType.CENTER }, o));

/* penomoran yang bisa direset per bagian */
const C = {};
function item(key, parts) {
  C[key] = (C[key] || 0) + 1;
  const kids = [run(C[key] + '.'), new TextRun({ text: '\t', font: FONT, size: SZ })];
  (Array.isArray(parts) ? parts : [run(parts)]).forEach(k => kids.push(k));
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
const H2 = t => Pl([run(t, { bold: true })], { before: 200, after: 120 });

function cellR(text, width, o = {}) {
  return new TableCell({
    children: [new Paragraph({
      children: [run(text, { size: SZ, bold: o.bold })],
      alignment: o.align || AlignmentType.LEFT,
      spacing: { before: 10, after: 10, line: 280 },
    })],
    width: { size: width, type: WidthType.DXA },
    verticalAlign: VerticalAlign.TOP,
    margins: { top: 20, bottom: 20, left: 0, right: 60 },
  });
}
function kvRow(label, value) {
  const cw = [2800, 260, W - 3060];
  return new TableRow({ children: [
    cellR(label, cw[0], { bold: true }), cellR(':', cw[1], { align: AlignmentType.CENTER }), cellR(value, cw[2]),
  ] });
}
const kvTable = rows => new Table({
  columnWidths: [2800, 260, W - 3060], width: { size: W, type: WidthType.DXA },
  borders: NO_BORDERS, rows,
});
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
const tbl = (cw, rows) => new Table({ columnWidths: cw, width: { size: W, type: WidthType.DXA }, rows });

const B = [];

/* ======================= KOP ======================= */
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
B.push(Pl('Dengan ini menyampaikan Jawaban atas Gugatan Wanprestasi yang diajukan oleh RAKA selaku PENGGUGAT, sebagai berikut:', { after: 120 }));
B.push(Pl('Bahwa TERGUGAT menolak dengan tegas seluruh dalil PENGGUGAT dalam gugatannya, kecuali terhadap hal-hal yang secara tegas diakui oleh TERGUGAT dalam Jawaban ini. Pengakuan atas suatu fakta tidak berarti pengakuan atas kualifikasi hukum yang dibangun PENGGUGAT atas fakta tersebut.', { after: 160 }));

/* ======================= DALAM EKSEPSI ======================= */
B.push(H('DALAM EKSEPSI'));

B.push(H2('A. Eksepsi Kewenangan Relatif (Exceptio Declinatoria Fori)'));
B.push(item('e', 'Bahwa sebelum TERGUGAT menyampaikan pembelaan lain, dan karenanya diajukan pada kesempatan pertama sebagaimana disyaratkan Pasal 133 Herzien Inlandsch Reglement, TERGUGAT mengajukan eksepsi bahwa Pengadilan Negeri Surakarta tidak berwenang secara relatif untuk memeriksa dan mengadili perkara ini;'));
B.push(item('e', 'Bahwa TERGUGAT adalah suatu perseroan terbatas yang berkedudukan dan berkantor di Jalan Anggrek Nomor 07, RT 01, RW 02, Kelurahan Nyawiji, Kecamatan Polanharjo, Kabupaten Klaten, Provinsi Jawa Tengah, sebagaimana PENGGUGAT sendiri akui dalam gugatannya;'));
B.push(item('e', 'Bahwa berdasarkan asas actor sequitur forum rei sebagaimana Pasal 118 ayat (1) Herzien Inlandsch Reglement, gugatan harus diajukan kepada Ketua Pengadilan Negeri di wilayah hukum tempat TERGUGAT berkedudukan, yaitu Pengadilan Negeri Klaten, bukan Pengadilan Negeri Surakarta;'));
B.push(item('e', 'Bahwa meskipun PENGGUGAT menyandarkan kewenangan pada klausula pilihan forum dalam Perjanjian, kewenangan relatif pengadilan merupakan bagian dari hukum acara yang bersifat memaksa, sehingga Majelis Hakim tetap berkewajiban menguji kewenangannya sendiri. Klausula yang memuat pelepasan hak untuk mengajukan eksepsi kewenangan tidak dapat menghapus kewajiban pengujian tersebut;'));
B.push(item('e', 'Bahwa dengan demikian TERGUGAT mohon agar Majelis Hakim menyatakan Pengadilan Negeri Surakarta tidak berwenang memeriksa dan mengadili perkara ini, dan menyatakan gugatan PENGGUGAT tidak dapat diterima;'));

B.push(H2('B. Eksepsi Gugatan Tidak Jelas dan Saling Bertentangan (Exceptio Obscuur Libel)'));
B.push(item('e', 'Bahwa petitum PENGGUGAT mengandung pertentangan yang tidak dapat dipertemukan. Pada petitum angka 2 PENGGUGAT meminta Majelis Hakim menyatakan Perjanjian sah dan mengikat, sedangkan pada petitum angka 4 PENGGUGAT justru meminta Perjanjian yang sama dibatalkan. Dua tuntutan tersebut bersifat kontradiktif dan tidak dapat dikabulkan secara bersamaan;'));
B.push(item('e', 'Bahwa pertentangan yang lebih mendasar terdapat antara petitum angka 4 dan petitum angka 7 huruf b. PENGGUGAT meminta Perjanjian dibatalkan, namun pada saat yang sama menuntut denda keterlambatan sebesar ' + rp(D.DENDA) + ' yang dasar hukumnya semata-mata bersumber dari klausula denda dalam Perjanjian itu sendiri. Apabila Perjanjian dibatalkan, maka klausula denda di dalamnya turut kehilangan daya ikat, sehingga tuntutan denda tersebut kehilangan dasar;'));
B.push(item('e', 'Bahwa dasar perhitungan kerugian PENGGUGAT juga tidak konsisten. PENGGUGAT menghitung pengembalian kelebihan pembayaran berdasarkan keadaan pekerjaan tanggal 25 Juni 2026, sedangkan denda keterlambatan dihitung berdasarkan jatuh tempo tanggal 1 Mei 2026, tanpa menjelaskan dasar penggunaan dua titik waktu yang berbeda untuk satu rangkaian tuntutan;'));
B.push(item('e', 'Bahwa dengan demikian gugatan PENGGUGAT kabur dan tidak memenuhi syarat formal suatu gugatan, sehingga sepatutnya dinyatakan tidak dapat diterima;'));

B.push(H2('C. Eksepsi Gugatan Prematur'));
B.push(item('e', 'Bahwa PENGGUGAT dalam gugatannya tidak pernah menguraikan adanya pernyataan lalai secara tertulis kepada TERGUGAT. PENGGUGAT hanya mendalilkan penolakan tagihan yang disampaikan melalui sambungan telepon pada tanggal 15 Mei 2026, tanpa satu pun surat peringatan maupun pernyataan lalai yang diajukan sebagai alat bukti;'));
B.push(item('e', 'Bahwa PENGGUGAT menyandarkan keadaan lalai TERGUGAT pada lewatnya waktu berdasarkan kekuatan perikatan sendiri. Namun dalam perjanjian pemborongan pekerjaan yang pelaksanaannya nyata-nyata dipengaruhi oleh temuan kondisi lapangan dan perubahan desain, tenggat waktu tidak dapat diperlakukan sebagai tenggat yang bersifat mutlak tanpa didahului pernyataan lalai secara tertulis, agar debitur memperoleh kesempatan yang patut untuk memenuhi prestasinya;'));
B.push(item('e', 'Bahwa Perjanjian pada Pasal 18 ayat (1) mensyaratkan musyawarah dalam jangka waktu paling lama 30 (tiga puluh) hari kalender sejak perselisihan diberitahukan secara tertulis. PENGGUGAT tidak menguraikan adanya pemberitahuan perselisihan secara tertulis sebagai syarat formal dimulainya tahap musyawarah tersebut;'));
B.push(item('e', 'Bahwa dengan demikian gugatan PENGGUGAT diajukan secara prematur dan sepatutnya dinyatakan tidak dapat diterima;'));

/* ======================= DALAM POKOK PERKARA ======================= */
B.push(H('DALAM POKOK PERKARA'));

B.push(H2('A. Hal-hal yang Diakui TERGUGAT'));
B.push(item('p', 'Bahwa TERGUGAT mengakui telah menandatangani Perjanjian Pemborongan Pekerjaan Nomor 001/PPP/AK-RK/I/2026 tanggal 12 Januari 2026 beserta lampirannya, dengan nilai kontrak Rp850.000.000,00 termasuk pajak, jangka waktu 105 hari kalender sejak 16 Januari 2026, dan batas akhir penyerahan tanggal 1 Mei 2026;'));
B.push(item('p', 'Bahwa TERGUGAT mengakui telah menerima pembayaran dari PENGGUGAT seluruhnya sebesar Rp600.000.000,00 melalui Termin I, Termin II, dan Termin III;'));
B.push(item('p', 'Bahwa TERGUGAT mengakui pada tanggal 1 Mei 2026 pekerjaan belum diserahterimakan, dan mengakui pada tanggal 25 Juni 2026 pekerjaan di lokasi terhenti;'));
B.push(item('p', 'Bahwa TERGUGAT mengakui telah memasang keramik lantai berwarna hitam, bukan berwarna cokelat sebagaimana spesifikasi awal;'));
B.push(item('p', 'Bahwa pengakuan atas fakta-fakta tersebut sama sekali tidak berarti pengakuan atas dalil PENGGUGAT bahwa TERGUGAT telah melakukan wanprestasi, karena keadaan tersebut timbul dari sebab-sebab yang akan TERGUGAT uraikan di bawah ini;'));

B.push(H2('B. Perubahan Pekerjaan Berasal dari Kondisi Lapangan yang Tidak Dapat Diketahui Sebelumnya'));
B.push(item('p', 'Bahwa setelah pembongkaran interior lama dilaksanakan pada tanggal 16 Januari 2026, ditemukan kondisi struktur dan bentuk bangunan yang tidak sesuai dengan asumsi awal. Temuan tersebut merupakan keadaan yang secara teknis tidak dapat diketahui sebelum pembongkaran dilakukan, dan bukan merupakan kelalaian TERGUGAT;'));
B.push(item('p', 'Bahwa penyesuaian desain, tata ruang, posisi kitchen dan bar, serta jalur instalasi merupakan akibat langsung dari temuan tersebut, dan seluruh penyesuaian itu dikomunikasikan kepada PENGGUGAT serta dituangkan dalam gambar revisi yang diketahui dan diterima PENGGUGAT;'));
B.push(item('p', 'Bahwa PENGGUGAT tidak dapat di satu sisi menikmati hasil penyesuaian desain yang membuat bangunannya dapat difungsikan sebagai kafe, namun di sisi lain menolak sepenuhnya akibat penyesuaian tersebut terhadap waktu pelaksanaan pekerjaan;'));
B.push(item('p', 'Bahwa pada tanggal 18 Maret 2026 diadakan pertemuan di lokasi yang dihadiri langsung oleh PENGGUGAT, Direktur TERGUGAT, dan pelaksana lapangan. Dalam pertemuan tersebut PENGGUGAT menyetujui perubahan rancangan plafon, penambahan pencahayaan, dan perubahan tata ruang area luar. Persetujuan PENGGUGAT tersebut nyata diberikan, dan atas dasar persetujuan itulah TERGUGAT melaksanakan pekerjaan yang dimaksud;'));

B.push(H2('C. Penilaian Progres Pekerjaan PENGGUGAT Tidak Dapat Dipertahankan'));
B.push(item('p', 'Bahwa TERGUGAT menolak dalil PENGGUGAT bahwa realisasi progres pekerjaan pada tanggal 1 Mei 2026 hanya ' + pc(D.A.total) + '. Menurut TERGUGAT, realisasi progres pekerjaan pada tanggal tersebut telah mencapai sekitar 85% (delapan puluh lima persen) atau senilai ' + rp(P85) + ';'));
B.push(item('p', 'Bahwa Laporan Pemeriksaan dan Pendapat Ahli yang diajukan PENGGUGAT tidak dapat dijadikan dasar penilaian yang meyakinkan, dengan alasan sebagai berikut:'));
B.push(sub('a', 'Ahli mengakui sendiri dalam laporannya bahwa ia tidak berada di lokasi pekerjaan pada tanggal 1 Mei 2026 maupun pada tanggal 25 Juni 2026, sehingga penilaiannya atas kedua tanggal tersebut bersifat rekonstruksi dan bukan hasil pengamatan langsung;'));
B.push(sub('b', 'Ahli mengakui sendiri bahwa terhadap Item 14 terbuka metode penilaian lain yang juga dapat dipertanggungjawabkan, yang menghasilkan angka berbeda yaitu ' + pc(D.ALT_TOTAL) + '. Dengan adanya dua hasil yang berbeda atas objek yang sama, penilaian tersebut tidak bersifat tunggal dan tidak dapat diperlakukan sebagai kebenaran yang pasti;'));
B.push(sub('c', 'Ahli mengakui sendiri bahwa sub-item 14.1 sampai dengan 14.3 senilai ' + rp(D.SUB_DESAIN) + ' berupa jasa desain, gambar revisi, serta engineering dan perhitungan struktur telah selesai seluruhnya. Namun ahli tetap memperhitungkan seluruh Item 14 secara proporsional, sehingga menihilkan sebagian pekerjaan yang ia sendiri akui telah selesai;'));
B.push(item('p', 'Bahwa penilaian Item 4 berupa pekerjaan lantai dan keramik sebesar 0% (nol persen) bertentangan dengan Perjanjian itu sendiri. Pasal 4 ayat (5) Perjanjian menyatakan bahwa pekerjaan yang tidak sesuai spesifikasi tidak diperhitungkan sebagai realisasi progres ' + '“sampai kesesuaiannya dipulihkan”' + '. Rumusan tersebut menunjukkan penangguhan perhitungan, bukan penghapusan nilai pekerjaan secara permanen. Menilai Item 4 sebesar nol berarti menghapus seluruh biaya bahan, upah, dan pekerjaan persiapan lantai yang nyata telah dikeluarkan TERGUGAT;'));
B.push(item('p', 'Bahwa selisih penilaian progres antara TERGUGAT dan PENGGUGAT adalah ' + rp(P85 - D.A.nilai) + '. Mengingat besarnya selisih tersebut, TERGUGAT mohon agar dilakukan pemeriksaan setempat dan/atau opname bersama sebagaimana Pasal 7 ayat (6) Perjanjian, dengan menghadirkan ahli yang ditunjuk Majelis Hakim;'));

B.push(H2('D. PENGGUGAT Telah Menerima Pemasangan Keramik Pengganti'));
B.push(item('p', 'Bahwa keramik berwarna cokelat sesuai spesifikasi pada saat itu tidak tersedia pada pemasok TERGUGAT. Guna menghindari terhentinya pekerjaan dan keterlambatan yang lebih besar, TERGUGAT memasang keramik pengganti dan memberitahukan keadaan tersebut kepada PENGGUGAT;'));
B.push(item('p', 'Bahwa PENGGUGAT telah mengetahui pemasangan keramik berwarna hitam tersebut sejak tanggal 20 Februari 2026, sebagaimana PENGGUGAT akui sendiri dalam gugatannya;'));
B.push(item('p', 'Bahwa meskipun telah mengetahui keadaan tersebut, PENGGUGAT tetap melakukan pembayaran Termin II pada tanggal 5 Maret 2026 dan pembayaran Termin III pada tanggal 10 April 2026, yaitu dua kali pembayaran setelah keberatan disampaikan, tanpa sekali pun mensyaratkan pembongkaran keramik terlebih dahulu dan tanpa menahan sebagian pembayaran sebagai jaminan perbaikan;'));
B.push(item('p', 'Bahwa perbuatan PENGGUGAT yang terus melaksanakan pembayaran selama lebih dari 7 (tujuh) minggu setelah mengetahui ketidaksesuaian, serta membiarkan pekerjaan lantai tetap berlangsung, menunjukkan bahwa PENGGUGAT pada kenyataannya menerima keadaan tersebut. PENGGUGAT tidak dapat pada kemudian hari menuntut pembongkaran atas keadaan yang telah ia terima melalui perbuatannya sendiri;'));
B.push(item('p', 'Bahwa TERGUGAT sampai dengan saat ini tetap bersedia menggantikan keramik tersebut sesuai spesifikasi, sepanjang PENGGUGAT memenuhi kewajiban pembayaran yang telah TERGUGAT tagihkan;'));

B.push(H2('E. Tagihan TERGUGAT Tanggal 8 Mei 2026 Mempunyai Dasar'));
B.push(item('p', 'Bahwa TERGUGAT menolak dalil PENGGUGAT bahwa tagihan tanggal 8 Mei 2026 sebesar ' + rp(REKONVENSI) + ' tidak mempunyai dasar hukum;'));
B.push(item('p', 'Bahwa tagihan sebesar Rp100.000.000,00 merupakan bagian dari nilai pekerjaan yang nyata telah TERGUGAT laksanakan. Berdasarkan realisasi progres 85% atau senilai ' + rp(P85) + ', sedangkan PENGGUGAT baru membayar ' + rp(DIBAYAR) + ', maka TERGUGAT sesungguhnya berhak atas ' + rp(HAK) + '. TERGUGAT dengan itikad baik hanya menagih Rp100.000.000,00, yaitu di bawah jumlah yang menjadi haknya;'));
B.push(item('p', 'Bahwa tagihan sebesar ' + rp(TAMBAHAN) + ' merupakan nilai pekerjaan tambahan yang volume dan spesifikasinya melampaui yang dianggarkan dalam Rencana Anggaran Biaya, yaitu penggantian plafon datar menjadi drop ceiling berornamen, penambahan titik dan fixture pencahayaan di atas 48 titik yang dianggarkan, serta perluasan perkerasan dan penataan area luar, sebagaimana perhitungan selisih volume yang TERGUGAT ajukan sebagai alat bukti;'));
B.push(item('p', 'Bahwa pekerjaan tambahan tersebut dilaksanakan atas persetujuan PENGGUGAT yang diberikan dalam pertemuan tanggal 18 Maret 2026, dan hasilnya nyata melekat pada bangunan milik PENGGUGAT serta dinikmati olehnya. Menolak membayar sementara menikmati hasil pekerjaan merupakan pengayaan tanpa hak yang tidak dibenarkan hukum;'));
B.push(item('p', 'Bahwa TERGUGAT mengakui perubahan tersebut tidak dituangkan dalam addendum tertulis. Namun tidak dibuatnya addendum merupakan kelalaian bersama PARA PIHAK, bukan kelalaian TERGUGAT semata, karena PENGGUGAT hadir sendiri dalam pertemuan tanggal 18 Maret 2026 dan sama sekali tidak meminta dibuatnya addendum atas perubahan yang ia setujui;'));

B.push(H2('F. Terhentinya Pekerjaan Disebabkan Tidak Tersedianya Dana'));
B.push(item('p', 'Bahwa TERGUGAT menolak dalil PENGGUGAT bahwa TERGUGAT menghentikan pekerjaan secara sepihak dengan itikad buruk;'));
B.push(item('p', 'Bahwa setelah PENGGUGAT menolak seluruh tagihan tanggal 8 Mei 2026, TERGUGAT tidak lagi memiliki dana untuk membeli material dan membayar upah tenaga kerja, sedangkan nilai pekerjaan yang telah TERGUGAT laksanakan melampaui jumlah yang telah dibayarkan PENGGUGAT;'));
B.push(item('p', 'Bahwa terhentinya pekerjaan merupakan akibat ketidakmampuan nyata untuk melanjutkan pelaksanaan, bukan kehendak TERGUGAT untuk meninggalkan kewajibannya. TERGUGAT justru telah menyatakan kesediaannya melanjutkan pekerjaan, dan kesediaan tersebut tidak pernah dicabut sampai gugatan ini diajukan;'));
B.push(item('p', 'Bahwa TERGUGAT juga telah mengajukan permohonan perpanjangan waktu selama 45 (empat puluh lima) hari, yang menunjukkan niat TERGUGAT untuk menyelesaikan pekerjaan. Permohonan tersebut ditolak PENGGUGAT tanpa pembahasan yang wajar;'));

B.push(H2('G. Tuntutan Ganti Kerugian PENGGUGAT Tidak Berdasar'));
B.push(item('p', 'Bahwa TERGUGAT menolak tuntutan ganti kerugian PENGGUGAT sebesar ' + rp(D.GANTI) + ' untuk seluruhnya;'));
B.push(item('p', 'Bahwa dari jumlah tersebut, sebesar ' + rp(BELUM) + ' atau 36,9% dari keseluruhan tuntutan sama sekali belum pernah dikeluarkan oleh PENGGUGAT, sebagaimana tabel berikut:'));
(function () {
  const cw = [4854, 2000, 2500];
  const rows = [new TableRow({ tableHeader: true, children: [
    cell('Pos tuntutan PENGGUGAT', cw[0], { bold: true, fill: HEAD, align: AlignmentType.CENTER }),
    cell('Jumlah', cw[1], { bold: true, fill: HEAD, align: AlignmentType.CENTER }),
    cell('Sifat', cw[2], { bold: true, fill: HEAD, align: AlignmentType.CENTER }),
  ] })];
  [
    ['C. Biaya pembongkaran keramik, puing, dan perbaikan lapisan dasar', D.C_INCL, 'Belum dikeluarkan'],
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
B.push(item('p', 'Bahwa kerugian yang belum terjadi dan belum nyata dikeluarkan bukan merupakan kerugian yang dapat dituntut. Pasal 1243 Kitab Undang-Undang Hukum Perdata menuntut adanya kerugian yang nyata diderita, bukan perkiraan biaya yang mungkin akan dikeluarkan di kemudian hari;'));
B.push(item('p', 'Bahwa tuntutan pengembalian kelebihan pembayaran sebesar ' + rp(D.KELEBIHAN) + ' seluruhnya bergantung pada angka progres ' + pc(D.B.total) + ' yang TERGUGAT tolak. Apabila progres yang benar adalah 85% sebagaimana dalil TERGUGAT, maka tidak terdapat kelebihan pembayaran sama sekali, dan yang terjadi justru sebaliknya, yaitu PENGGUGAT masih berutang kepada TERGUGAT;'));
B.push(item('p', 'Bahwa tuntutan denda keterlambatan sebesar ' + rp(D.DENDA) + ' tidak dapat dikabulkan bersamaan dengan tuntutan pembatalan Perjanjian, sebagaimana telah TERGUGAT uraikan dalam Eksepsi;'));

B.push(H2('H. Permohonan Sita Jaminan dan Putusan Serta-Merta Harus Ditolak'));
B.push(item('p', 'Bahwa permohonan sita jaminan PENGGUGAT tidak memenuhi syarat Pasal 227 Herzien Inlandsch Reglement. PENGGUGAT tidak menguraikan satu pun fakta yang menunjukkan adanya persangkaan beralasan bahwa TERGUGAT akan mengalihkan harta kekayaannya. TERGUGAT adalah perseroan terbatas yang masih menjalankan usahanya secara terbuka pada alamat yang jelas, dan PENGGUGAT bahkan tidak menyebutkan objek yang dimohonkan untuk disita;'));
B.push(item('p', 'Bahwa permohonan putusan serta-merta juga harus ditolak. Perkara ini justru memuat perselisihan fakta yang sungguh-sungguh mengenai besarnya progres pekerjaan, sehingga tidak termasuk perkara dengan bukti yang begitu terang sebagaimana disyaratkan Pasal 180 ayat (1) Herzien Inlandsch Reglement, dan sejalan dengan kehati-hatian yang digariskan Mahkamah Agung melalui Surat Edaran Nomor 3 Tahun 2000 dan Surat Edaran Nomor 4 Tahun 2001;'));

/* ======================= REKONVENSI ======================= */
B.push(H('DALAM GUGATAN REKONVENSI'));
B.push(Pl('Bahwa berdasarkan Pasal 132a Herzien Inlandsch Reglement, bersamaan dengan Jawaban ini TERGUGAT mengajukan Gugatan Rekonvensi. Selanjutnya dalam bagian ini TERGUGAT disebut sebagai PENGGUGAT REKONVENSI dan PENGGUGAT disebut sebagai TERGUGAT REKONVENSI. Seluruh dalil dalam Jawaban Konvensi di atas merupakan bagian yang tidak terpisahkan dari Gugatan Rekonvensi ini.', { after: 160 }));
B.push(item('r', 'Bahwa PENGGUGAT REKONVENSI telah melaksanakan pekerjaan renovasi dengan realisasi progres sekitar 85% atau senilai ' + rp(P85) + ', sedangkan TERGUGAT REKONVENSI baru membayar ' + rp(DIBAYAR) + ';'));
B.push(item('r', 'Bahwa selain itu PENGGUGAT REKONVENSI telah melaksanakan pekerjaan tambahan senilai ' + rp(TAMBAHAN) + ' atas persetujuan TERGUGAT REKONVENSI yang diberikan dalam pertemuan tanggal 18 Maret 2026, yang hasilnya melekat pada bangunan milik TERGUGAT REKONVENSI;'));
B.push(item('r', 'Bahwa dengan demikian PENGGUGAT REKONVENSI sesungguhnya berhak atas ' + rp(HAK + TAMBAHAN) + ', yaitu ' + rp(HAK) + ' atas pekerjaan yang telah dilaksanakan ditambah ' + rp(TAMBAHAN) + ' atas pekerjaan tambahan;'));
B.push(item('r', 'Bahwa namun demikian, PENGGUGAT REKONVENSI dengan itikad baik membatasi tuntutannya pada jumlah yang telah secara resmi ditagihkan melalui surat tagihan tanggal 8 Mei 2026, yaitu sebesar ' + rp(REKONVENSI) + ', dan tidak menuntut selisih sebesar ' + rp(HAK + TAMBAHAN - REKONVENSI) + ';'));
B.push(item('r', 'Bahwa TERGUGAT REKONVENSI telah menolak tagihan tersebut dan sampai gugatan ini diajukan tidak pernah membayarnya, sehingga TERGUGAT REKONVENSI telah melakukan wanprestasi atas kewajiban pembayarannya;'));
B.push(item('r', 'Bahwa akibat tidak dibayarnya tagihan tersebut, PENGGUGAT REKONVENSI kehilangan kemampuan membeli material dan membayar upah tenaga kerja, sehingga pekerjaan terhenti dan PENGGUGAT REKONVENSI menanggung kerugian berupa modal kerja yang telah dikeluarkan namun tidak memperoleh penggantian;'));
B.push(item('r', 'Bahwa atas jumlah yang belum dibayarkan tersebut PENGGUGAT REKONVENSI berhak atas bunga sebesar 6% (enam persen) per tahun sebagaimana Pasal 1250 Kitab Undang-Undang Hukum Perdata;'));

/* ======================= PETITUM ======================= */
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
B.push(item('z', 'Menghukum TERGUGAT REKONVENSI untuk membayar bunga sebesar 6% (enam persen) per tahun atas jumlah tersebut, dihitung sejak tanggal 8 Mei 2026 sampai dengan seluruh kewajiban dilaksanakan;'));
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
  console.log('Eksepsi        : ' + C.e + ' butir (3 jenis eksepsi)');
  console.log('Pokok perkara  : ' + C.p + ' butir (8 sub-bagian A-H)');
  console.log('Rekonvensi     : ' + C.r + ' butir');
  console.log('Petitum        : eksepsi ' + C.x + ', pokok perkara ' + C.y + ', rekonvensi ' + C.z);
  console.log('Ukuran         : ' + (b.length / 1024).toFixed(1) + ' KB');
});
