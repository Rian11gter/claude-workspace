const { Packer, Paragraph } = require('docx');
const fs = require('fs');
const L = require('./lib.js');
const { rp, pc, num, run, p, pj, h1, h2, cell, tbl, numlist, ltrlist, rows2,
        build, AlignmentType, TableRow } = L;
const D = JSON.parse(fs.readFileSync(__dirname + '/angka-ahli.json', 'utf8'));

const RATA = String(D.RATA_DIPERLUKAN).replace('.', ',') + '%';
const B = [];

// blok tanya-jawab
function QA(tag, q, a) {
  const out = [new Paragraph({
    children: [run(tag + '  ' + q, { bold: true })],
    spacing: { before: 200, after: 60, line: 280 },
    alignment: AlignmentType.JUSTIFIED,
  })];
  (Array.isArray(a) ? a : [a]).forEach(function (t) {
    out.push(new Paragraph({
      children: [run(t)],
      spacing: { before: 0, after: 60, line: 280 },
      indent: { left: 440 },
      alignment: AlignmentType.JUSTIFIED,
    }));
  });
  return out;
}
const push = arr => B.push.apply(B, arr);

B.push(p('PANDUAN DAN SKRIP PEMERIKSAAN AHLI DI PERSIDANGAN', { bold: true, size: 27, align: AlignmentType.CENTER, after: 60 }));
B.push(p('Peran: Ahli Konstruksi dan Penaksir Pekerjaan', { bold: true, size: 22, align: AlignmentType.CENTER, after: 40 }));
B.push(p('Fauzi', { bold: true, size: 22, align: AlignmentType.CENTER, after: 40 }));
B.push(p('Dokumen kerja internal kelompok, bukan bagian dari berkas perkara', { italics: true, size: 19, align: AlignmentType.CENTER, after: 240 }));

B.push(h1('A. KEDUDUKAN HUKUM KETERANGAN AHLI'));
B.push(pj('Hal pertama yang harus dikuasai, dan sering ditanyakan penguji: keterangan ahli bukan alat bukti dalam perkara perdata. Pasal 1866 KUH Perdata dan Pasal 164 HIR menyebutkan lima alat bukti, yaitu bukti surat, bukti saksi, persangkaan, pengakuan, dan sumpah. Keterangan ahli tidak termasuk di dalamnya.'));
B.push(pj('Dasar keterangan ahli adalah Pasal 154 HIR, yang memberi kewenangan kepada Majelis Hakim untuk meminta pendapat ahli apabila diperlukan keterangan atas hal yang menuntut keahlian khusus. Kedudukannya adalah keterangan yang memberi kejelasan kepada Majelis, dengan nilai pembuktian bebas: Majelis tidak terikat pada pendapat ahli, tetapi dapat menggunakannya untuk membentuk persangkaan.'));
B.push(pj('Konsekuensi praktisnya penting. Kekuatan keterangan Fauzi tidak terletak pada sebutannya sebagai ahli, melainkan pada mutu metode dan kemampuannya mempertahankan angka. Ahli yang tidak dapat menjelaskan asal angkanya tidak bernilai apa pun bagi Majelis.'));

B.push(h1('B. LIMA BATAS YANG TIDAK BOLEH DILANGGAR'));
push(numlist([
  'JANGAN memberikan kesimpulan hukum. Kata wanprestasi, cedera janji, keadaan memaksa, kelalaian, dan ganti kerugian adalah kewenangan Majelis Hakim. Kalimat aman: "Secara teknis keadaannya demikian. Penilaian atas akibat hukumnya bukan kewenangan saya."',
  'JANGAN mengaku melihat peristiwa. Ahli tidak pernah menyaksikan pekerjaan berlangsung. Apabila ia berkata "saya melihat mereka memasang keramik hitam", ia berubah kedudukan menjadi saksi yang keterangannya berdasarkan penuturan orang lain, dan keterangannya kehilangan nilai. Yang benar: "Saya memeriksa keadaan terpasang di lapangan, dan saya memeriksa dokumentasi foto bertanggal."',
  'JANGAN menjawab di luar keahlian. Pertanyaan tentang makna pasal perjanjian, tentang siapa yang menyetujui perubahan, atau tentang siapa yang bersalah, ditolak dengan sopan: "Hal tersebut di luar lingkup keahlian saya."',
  'JANGAN menyebut angka tanpa dasar. Setiap angka harus dapat ditunjuk asalnya, yaitu butir Rencana Anggaran Biaya, hasil pengukuran, atau harga pasar yang dinyatakan terbuka sebagai harga pasar.',
  'JANGAN menolak seluruh dalil pihak lawan. Ahli yang membenarkan pihaknya pada setiap titik akan dinilai tidak objektif. Fauzi memiliki satu pengakuan yang harus ia sampaikan sendiri sebelum ditanyakan, yaitu bahwa desain dan engineering memang telah selesai. Pengakuan itulah yang membuat sisa keterangannya dipercaya.',
]));

B.push(h1('C. ANGKA YANG HARUS DIHAFAL'));
(function () {
  const cw = [5854, 3500];
  B.push(tbl(cw, rows2(cw, [
    ['Bobot Item 4, pekerjaan lantai dan keramik', pc(D.bobot['4']), 2],
    ['Batas maksimum teknis, Item 4 dan Item 13 dikecualikan', pc(D.MAKS_TEKNIS), 2],
    ['Realisasi rata-rata yang dituntut agar tercapai 85%', RATA, 2],
    ['Bobot Item 13, finishing akhir dan pembersihan', pc(D.bobot['13']), 0],
    ['Bobot Item 2, penyesuaian struktur bangunan', pc(D.bobot['2']), 0],
    ['Bobot pekerjaan fisik, Item 1 sampai dengan Item 13', pc(D.BOBOT_FISIK), 0],
    ['Bobot seluruh item selain Item 4', pc(D.TANPA_4), 0],
    ['Realisasi per 1 Mei 2026, metode utama', pc(D.A.total), 1],
    ['Realisasi per 1 Mei 2026, metode alternatif', pc(D.ALT_TOTAL), 1],
    ['Realisasi per 25 Juni 2026', pc(D.B.total), 1],
    ['Nilai pekerjaan terpasang per 1 Mei 2026', rp(D.A.nilai), 0],
    ['Nilai pekerjaan terpasang per 25 Juni 2026', rp(D.B.nilai), 0],
    ['Biaya bongkar dan pasang ulang keramik, seluruhnya', rp(D.K_TOTAL), 0],
    ['Di dalamnya, biaya tambahan akibat ketidaksesuaian', rp(D.K_INKREMENTAL), 0],
    ['Nilai yang telah dianggarkan atas komponen yang ditagih Rp85 juta', rp(D.KLAIM85_TOTAL), 0],
    ['Taksiran biaya penyelesaian sisa pekerjaan', rp(D.TAKSIRAN), 0],
    ['Kekurangan dana terhadap Termin IV', rp(D.KEKURANGAN), 0],
  ])));
})();
B.push(pj('Tiga baris paling atas yang bernaung latar gelap adalah inti pertahanan. Ketiganya yang mematikan klaim progres 85%. Kalau hanya sanggup menghafal tiga angka, hafalkan ketiga itu.', { before: 120 }));

B.push(h1('D. TATA CARA DAN SUMPAH'));
B.push(pj('Perhatikan satu hal yang mudah terlewat. Dalam pembagian peran kelompok, Fauzi tercatat sebagai ahli sekaligus penyumpah. Fauzi tidak dapat menjadi penyumpah bagi dirinya sendiri. Susunan acara harus diatur demikian: Fauzi bertindak sebagai penyumpah ketika saksi Nayla dan saksi Davin diperiksa; kemudian pada saat Fauzi sendiri diperiksa sebagai ahli, yang memegang kitab suci adalah Panitera atau Hakim Anggota, sedangkan sumpah tetap dipandu oleh Hakim Ketua.'));
B.push(h2('Rumusan sumpah ahli berbeda dari sumpah saksi'));
B.push(pj('Saksi bersumpah akan menerangkan yang sebenarnya mengenai apa yang ia lihat, dengar, dan alami sendiri. Ahli bersumpah akan memberikan pendapat menurut pengetahuannya sebaik-baiknya, sebagaimana Pasal 154 ayat (2) HIR. Rumusan yang dipakai:'));
B.push(p('"Saya bersumpah bahwa saya akan memberikan pendapat mengenai hal-hal yang dimintakan kepada saya, menurut pengetahuan saya sebaik-baiknya."',
  { italics: true, indent: { left: 560 }, before: 60, after: 140 }));
B.push(pj('Kesalahan yang sering terjadi dalam simulasi: ahli diambil sumpahnya dengan rumusan sumpah saksi. Apabila Kuasa Hukum Tergugat cermat, hal itu dapat dipersoalkan. Pastikan tim Hakim memakai rumusan yang benar.'));
B.push(h2('Urutan pemeriksaan'));
push(numlist([
  'Hakim Ketua menanyakan identitas, pekerjaan, dan keahlian Ahli.',
  'Hakim Ketua menanyakan hubungan Ahli dengan para pihak. Jawab: tidak ada hubungan keluarga, pekerjaan, maupun kepentingan keuangan.',
  'Pengambilan sumpah dengan rumusan sumpah ahli.',
  'Pemeriksaan oleh Majelis Hakim.',
  'Pemeriksaan oleh Kuasa Hukum Penggugat, melalui Majelis.',
  'Pemeriksaan oleh Kuasa Hukum Tergugat, melalui Majelis.',
  'Pertanyaan penutup Majelis dan penyerahan laporan tertulis melalui Panitera.',
]));
B.push(pj('Catat tata cara yang sering dilanggar: pertanyaan kuasa hukum tidak diajukan langsung kepada Ahli, melainkan melalui Majelis. Ahli pun menjawab dengan menghadap Majelis, bukan menghadap penanya. Ini detail kecil yang langsung terlihat oleh penguji.', { before: 100 }));

B.push(h1('E. SKRIP PEMERIKSAAN OLEH MAJELIS HAKIM'));
B.push(p('Empat pertanyaan pembuka yang hampir pasti diajukan.', { italics: true, size: 19, after: 100 }));
push(QA('HAKIM:', 'Apa keahlian Saudara, dan atas dasar apa Saudara berpendapat?',
  'Saya konsultan manajemen konstruksi dan penaksir pekerjaan, dengan pengalaman lima belas tahun dalam pelaksanaan, pengawasan, dan penilaian pekerjaan bangunan gedung, dan memegang Sertifikat Kompetensi Kerja Konstruksi Ahli Manajemen Konstruksi Jenjang 8. Pendapat saya didasarkan pada pemeriksaan perjanjian beserta lampirannya, Rencana Anggaran Biaya, gambar kerja dan gambar revisi, dokumentasi foto bertanggal, bukti pembayaran, serta pemeriksaan lapangan yang saya lakukan pada tanggal sebagaimana tercantum dalam laporan saya.'));
push(QA('HAKIM:', 'Bagaimana cara Saudara mengukur progres pekerjaan?',
  ['Dengan metode bobot pekerjaan. Setiap item dalam Rencana Anggaran Biaya dihitung bobotnya, yaitu perbandingan nilai item itu terhadap jumlah anggaran, sehingga seluruh bobot berjumlah seratus persen. Kemudian setiap item dinilai realisasinya, dan hasil perkalian bobot dengan realisasi dijumlahkan.',
   'Saya tidak memakai metode persentase datar terhadap nilai kontrak, karena metode itu tidak mempunyai tolok ukur. Dengan metode persentase datar, angka berapa pun dapat dinyatakan tanpa dapat diperiksa. Dengan metode bobot, setiap angka dapat diuji baris per baris.']));
push(QA('HAKIM:', 'Berapa progres pekerjaan pada tanggal 1 Mei 2026?',
  ['Menurut penilaian saya ' + pc(D.A.total) + ', dengan nilai pekerjaan terpasang ' + rp(D.A.nilai) + '.',
   'Perlu saya sampaikan sendiri, Yang Mulia, bahwa terhadap satu pos penunjang terbuka perlakuan lain yang juga dapat dipertanggungjawabkan. Apabila pos desain dan engineering senilai ' + rp(D.SUB_DESAIN) + ' diakui selesai seluruhnya, hasilnya ' + pc(D.ALT_TOTAL) + '. Selisih kedua metode hanya ' + num(D.ALT_TOTAL - D.A.total) + ' poin, dan keduanya berada pada kisaran enam puluh lima persen.']));
push(QA('HAKIM:', 'Mengapa pekerjaan keramik Saudara nilai nol persen, padahal keramiknya terpasang?',
  ['Karena yang dinilai dalam progres pekerjaan adalah kesesuaian terhadap spesifikasi yang diperjanjikan, bukan kelayakan fungsi. Spesifikasi dalam Rencana Anggaran Biaya butir 4.4 menentukan keramik berwarna cokelat, permukaan matte, ukuran 60 kali 60 sentimeter. Yang terpasang berwarna hitam.',
   'Warna keramik adalah sifat bahan yang tidak dapat diubah setelah terpasang. Tidak ada metode perbaikan selain pembongkaran seluruhnya. Karena pekerjaan itu harus dibongkar, nilainya bagi pemberi tugas nol, bahkan menimbulkan biaya pembongkaran.']));

B.push(h1('F. SKRIP PEMERIKSAAN OLEH KUASA HUKUM PENGGUGAT'));
B.push(p('Pertanyaan yang disiapkan untuk mengeluarkan angka kunci. Diajukan oleh Brian dan Avel melalui Majelis.', { italics: true, size: 19, after: 100 }));
push(QA('KH PENGGUGAT:', 'Apakah angka progres 85% dapat dicapai dengan metode bobot?',
  ['Saya sudah mengujinya. Apabila Item 4 tidak diperhitungkan karena harus dibongkar, bobot seluruh item lainnya adalah ' + pc(D.TANPA_4) + '. Agar tercapai delapan puluh lima persen dari bobot itu, seluruh item lain harus terealisasi rata-rata ' + RATA + '.',
   'Selain itu Item 13, finishing akhir dan pembersihan, dengan bobot ' + pc(D.bobot['13']) + ', secara urutan pelaksanaan tidak dapat dimulai sebelum pekerjaan pendahulunya selesai. Dengan Item 4 dan Item 13 dikecualikan, batas maksimum yang secara teknis mungkin dicapai adalah ' + pc(D.MAKS_TEKNIS) + '. Dan angka itu hanya tercapai apabila dua belas item lainnya selesai seratus persen tanpa kecuali, pada bangunan yang belum dapat digunakan sebagai kafe.']));
push(QA('KH PENGGUGAT:', 'Harga satuan yang Ahli gunakan berasal dari mana?',
  ['Untuk menilai pekerjaan terpasang, saya menggunakan harga satuan yang tercantum dalam Rencana Anggaran Biaya, yaitu harga satuan yang disusun pelaksana pekerjaan sendiri dan disetujui pemberi tugas. Saya sengaja tidak memakai harga saya sendiri, agar tidak timbul perdebatan mengenai kewajaran harga.',
   'Harga pasar saya gunakan hanya untuk dua pos yang tidak ada dalam Rencana Anggaran Biaya, yaitu biaya pembongkaran keramik dan eskalasi pelaksana pengganti. Kedua pos itu saya tandai secara terpisah dalam laporan.']));
push(QA('KH PENGGUGAT:', 'Apakah keempat komponen yang ditagih Rp85.000.000,00 merupakan pekerjaan di luar kontrak?',
  ['Menurut pemeriksaan saya, keempatnya berada di dalam lingkup Rencana Anggaran Biaya. Plafon ada pada Item 5 senilai Rp58.000.000, pencahayaan pada Item 7 senilai Rp58.000.000, area luar pada Item 11 senilai Rp31.000.000, dan penyesuaian desain serta gambar revisi pada sub-item 14.2 senilai Rp4.500.000. Seluruhnya ' + rp(D.KLAIM85_TOTAL) + ' yang telah dianggarkan di dalam kontrak.',
   'Karena itu yang perlu ditunjukkan bukanlah adanya perubahan, melainkan adanya selisih volume atau spesifikasi di atas yang telah dianggarkan, disertai perhitungan. Sampai pemeriksaan saya selesai, saya tidak menemukan berita acara perubahan pekerjaan, addendum, gambar perubahan bertanda tangan, maupun perhitungan volume tambahan.']));
push(QA('KH PENGGUGAT:', 'Apakah kelangkaan keramik merupakan hambatan yang wajar?',
  ['Keramik ukuran 60 kali 60 sentimeter berwarna cokelat dengan permukaan matte adalah produk reguler yang diproduksi beberapa produsen nasional dan tersedia melalui distributor. Untuk volume 105 meter persegi, yang termasuk volume kecil, waktu pengadaan yang lazim dua sampai empat minggu.',
   'Saya tidak menemukan dasar teknis bagi waktu pengadaan yang tidak dapat ditentukan. Apakah keadaan itu dapat dikualifikasi sebagai keadaan memaksa, bukan kewenangan saya untuk menilai.']));
push(QA('KH PENGGUGAT:', 'Berapa biaya yang diperlukan untuk menyelesaikan sisa pekerjaan?',
  ['Atas dasar keadaan pada 25 Juni 2026, sisa pekerjaan ' + pc(D.SISA_PCT) + ' bernilai ' + rp(D.SISA_DPP) + '. Ditambah biaya pembongkaran keramik, pengangkutan puing, dan perbaikan lapisan dasar sebesar ' + rp(D.K_INKREMENTAL) + ', dan ditambah eskalasi serta mobilisasi pelaksana pengganti dua belas persen sebesar ' + rp(D.ESKALASI) + '. Setelah Pajak Pertambahan Nilai, taksiran seluruhnya ' + rp(D.TAKSIRAN) + '.',
   'Dana kontrak yang belum dibayarkan ' + rp(D.DANA_SISA) + ', sehingga terdapat kekurangan dana ' + rp(D.KEKURANGAN) + '.']));

B.push(h1('G. PERTANYAAN SULIT DARI KUASA HUKUM TERGUGAT'));
B.push(p('Delapan serangan yang paling mungkin diajukan Pamungkas dan Rafi, dengan jawaban yang sudah disiapkan. Bagian ini yang paling perlu dilatih berulang.', { italics: true, size: 19, after: 100 }));
push(QA('KH TERGUGAT:', 'Ahli tidak pernah berada di lokasi pada 1 Mei 2026. Bagaimana Ahli dapat menyatakan progres pada tanggal itu?',
  ['Benar, saya tidak berada di lokasi pada tanggal itu, dan hal tersebut saya nyatakan terbuka dalam laporan saya pada bagian keterbatasan. Penilaian saya atas tanggal 1 Mei 2026 adalah rekonstruksi, yang saya susun dari tiga sumber: dokumentasi foto bertanggal, dokumen progres dan pembayaran, serta keadaan terpasang yang saya periksa di lapangan.',
   'Rekonstruksi semacam ini metode yang lazim dalam penilaian pekerjaan konstruksi apabila penilai tidak hadir pada tanggal yang dipersoalkan. Saya menyampaikan keterbatasannya, dan Majelis yang menimbang bobotnya.']));
push(QA('KH TERGUGAT:', 'Keramik hitam itu tetap keramik dan lantainya tetap dapat dipakai. Bukankah menilai nol persen itu berlebihan?',
  ['Secara fungsional benar, lantai itu dapat dipijak. Tetapi yang dinilai dalam progres pekerjaan adalah kesesuaian terhadap spesifikasi yang diperjanjikan, bukan kelayakan fungsi.',
   'Apabila pekerjaan yang harus dibongkar tetap dihitung sebagai progres, akibatnya pemberi tugas membayar dua kali untuk satu pekerjaan, yaitu sekali untuk pekerjaan yang dibongkar dan sekali lagi untuk pekerjaan penggantinya. Dalam praktik penilaian pekerjaan, hal itu tidak dapat dibenarkan.']));
push(QA('KH TERGUGAT:', 'Ahli mengakui desain dan engineering sudah selesai seratus persen. Berarti perhitungan Ahli dapat berubah-ubah?',
  ['Saya memang mengakuinya, dan saya sendiri yang menyampaikannya lebih dahulu sebelum ditanyakan. Yang berubah adalah perlakuan terhadap satu pos penunjang dengan bobot ' + pc(D.B_DESAIN) + ', dan selisihnya ' + num(D.ALT_TOTAL - D.A.total) + ' poin.',
   'Yang tidak berubah adalah kesimpulannya. Metode utama menghasilkan ' + pc(D.A.total) + ', metode alternatif ' + pc(D.ALT_TOTAL) + '. Keduanya berada pada kisaran enam puluh lima persen, dan tidak satu pun mendekati delapan puluh lima persen.']));
push(QA('KH TERGUGAT:', 'Ahli ditunjuk atas permohonan Penggugat. Apakah Ahli independen?',
  ['Saya ditunjuk melalui Penetapan Majelis Hakim, meskipun permohonannya berasal dari Penggugat. Saya telah bersumpah di muka persidangan ini.',
   'Saya tidak mempunyai hubungan keluarga, hubungan pekerjaan, maupun kepentingan keuangan dengan kedua pihak, selain honorarium sebagai ahli yang besarnya tidak bergantung pada hasil putusan. Dan sebagaimana baru saya sampaikan, laporan saya justru memuat pengakuan atas pos yang menguntungkan Tergugat.']));
push(QA('KH TERGUGAT:', 'Bukankah kondisi struktur bangunan yang berbeda dari asumsi awal dapat menyebabkan keterlambatan?',
  ['Secara teknis, temuan kondisi struktur memang dapat menambah waktu pelaksanaan.',
   'Namun dalam Rencana Anggaran Biaya ini terdapat Item 2 berjudul Penyesuaian struktur bangunan senilai Rp108.000.000, yang merupakan item terbesar kedua dengan bobot ' + pc(D.bobot['2']) + '. Di dalamnya terdapat sub-item 2.8 berupa pos cadangan penyesuaian struktur akibat kondisi lapangan senilai Rp8.280.000. Artinya, secara teknis, kemungkinan itu telah diperhitungkan dan dianggarkan di dalam kontrak.',
   'Apakah keadaan itu membebaskan atau tidak membebaskan Tergugat, merupakan pertanyaan hukum yang di luar keahlian saya.']));
push(QA('KH TERGUGAT:', 'Bukankah penghentian pembayaran oleh Penggugat yang membuat pekerjaan tidak dapat dilanjutkan?',
  ['Secara teknis, tidak tersedianya dana memang dapat menghambat pengadaan bahan dan pembayaran upah.',
   'Tetapi dari dokumen pembayaran, sampai 10 April 2026 Penggugat telah membayar Rp600.000.000, sedangkan nilai pekerjaan terpasang pada 1 Mei 2026 menurut penilaian saya ' + rp(D.A.nilai) + '. Artinya jumlah yang telah diterima melebihi nilai pekerjaan yang telah dilaksanakan.',
   'Penilaian atas akibat hukum dari keadaan itu bukan kewenangan saya.']));
push(QA('KH TERGUGAT:', 'Eskalasi dua belas persen itu angka dari mana? Bukankah itu karangan Ahli sendiri?',
  ['Angka itu tidak berasal dari Rencana Anggaran Biaya, dan hal tersebut saya nyatakan terbuka dalam laporan. Dasarnya tiga hal yang harus ditanggung pelaksana pengganti: mobilisasi baru; pemeriksaan atas pekerjaan yang sudah ada berikut risiko atas mutu pekerjaan yang tidak ia kerjakan sendiri; dan kenaikan harga bahan serta upah dibandingkan harga Januari 2026.',
   'Dalam pengambilalihan pekerjaan yang terhenti, tambahan biaya pada kisaran sepuluh sampai lima belas persen merupakan kisaran yang lazim. Saya mengambil angka pada bagian bawah kisaran, yaitu dua belas persen. Apabila Majelis menghendaki, saya dapat menguraikan ketiga komponen itu satu per satu.']));
push(QA('KH TERGUGAT:', 'Apakah Ahli bersedia dikonfrontasi dengan perhitungan progres yang dibuat Tergugat?',
  ['Bersedia. Saya justru meminta agar perhitungan tersebut disajikan dalam bentuk bobot per item dan realisasi per item, sebagaimana laporan saya, agar dapat dibandingkan baris per baris.',
   'Perhitungan yang hanya menyebutkan satu angka gabungan tanpa rincian per item tidak dapat diperiksa, dan karena itu tidak dapat diperbandingkan.']));

B.push(h1('H. TIGA KALIMAT PENYELAMAT'));
B.push(pj('Apabila Ahli terpojok dan tidak mengetahui jawabannya, tiga kalimat berikut jauh lebih baik daripada mengarang. Mengarang satu angka akan menjatuhkan seluruh keterangannya.'));
push(numlist([
  '"Hal tersebut di luar lingkup keahlian saya." Untuk pertanyaan hukum, pertanyaan tentang kesalahan pihak, atau pertanyaan tentang maksud para pihak.',
  '"Saya tidak memeriksa hal itu, sehingga saya tidak dapat memberikan pendapat." Untuk hal yang memang tidak diperiksa. Jauh lebih kuat daripada menduga-duga.',
  '"Apabila Majelis menghendaki, saya dapat menghitungnya dan menyampaikannya secara tertulis." Untuk perhitungan yang diminta mendadak di persidangan.',
]));

B.push(h1('I. DAFTAR PERIKSA SEBELUM SIDANG'));
push(ltrlist([
  'Laporan Pemeriksaan dan Pendapat Ahli sudah ditandatangani dan diserahkan kepada Majelis melalui Panitera, dengan salinan untuk kedua kuasa hukum;',
  'Rencana Anggaran Biaya Lampiran I dibawa dalam bentuk cetak, karena hampir seluruh jawaban menunjuk butir-butirnya;',
  'Tiga angka kunci dihafal di luar kepala: bobot Item 4 sebesar ' + pc(D.bobot['4']) + ', batas maksimum teknis ' + pc(D.MAKS_TEKNIS) + ', dan realisasi rata-rata yang dituntut ' + RATA + ';',
  'Pengakuan mengenai sub-item desain dan engineering disiapkan untuk disampaikan sendiri, sebelum ditanyakan pihak lawan;',
  'Susunan acara sudah mengatur bahwa penyumpah bagi Ahli adalah Panitera atau Hakim Anggota, bukan Ahli sendiri;',
  'Tim Hakim sudah memakai rumusan sumpah ahli, bukan rumusan sumpah saksi;',
  'Kalkulator dibawa, untuk kemungkinan diminta menghitung ulang di persidangan;',
  'Latihan tanya jawab Bagian G dilakukan setidaknya dua kali, dengan anggota kelompok berperan sebagai Kuasa Hukum Tergugat yang menekan.',
]));

Packer.toBuffer(build(B, 'Panduan dan Skrip Pemeriksaan Ahli')).then(function (b) {
  const out = '/home/user/claude-workspace/Panduan-Skrip-Ahli-Konstruksi-Fauzi.docx';
  fs.writeFileSync(out, b);
  console.log('Panduan-Skrip-Ahli-Konstruksi-Fauzi.docx  ' + (b.length / 1024).toFixed(1) + ' KB');
});
