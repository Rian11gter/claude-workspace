const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, Footer,
  WidthType, AlignmentType, BorderStyle, VerticalAlign, PageNumber, TabStopType,
} = require('docx');
const fs = require('fs');

const FONT = 'Times New Roman', SZ = 24, W = 9354;
const NB = { style: BorderStyle.NONE, size: 0, color: 'FFFFFF' };
const NO_BORDERS = { top: NB, bottom: NB, left: NB, right: NB,
                     insideHorizontal: NB, insideVertical: NB };

const run = (t, o = {}) => new TextRun({
  text: t, font: FONT, size: o.size || SZ, bold: !!o.bold, italics: !!o.italics,
});
const P = (t, o = {}) => new Paragraph({
  children: Array.isArray(t) ? t : [run(t, o)],
  alignment: o.align || AlignmentType.JUSTIFIED,
  spacing: { before: o.before || 0, after: o.after === undefined ? 120 : o.after, line: o.line || 290 },
  indent: o.indent,
});
const Pc = (t, o = {}) => P(t, Object.assign({ align: AlignmentType.CENTER }, o));

function numbered(n, parts, opt = {}) {
  const kids = [run(opt.paren ? '(' + n + ')' : n + '.'),
                new TextRun({ text: '\t', font: FONT, size: SZ })];
  (Array.isArray(parts) ? parts : [run(parts)]).forEach(k => kids.push(k));
  return new Paragraph({
    children: kids, alignment: AlignmentType.JUSTIFIED,
    spacing: { before: 40, after: 100, line: 290 },
    indent: { left: opt.deep ? 1240 : 640, hanging: opt.deep ? 560 : 640 },
    tabStops: [{ type: TabStopType.LEFT, position: opt.deep ? 1240 : 640 }],
  });
}

/* =========================== ISI PERJANJIAN =========================== */
// tiap pasal: [judul, [ayat...]]  ; ayat = string | {t, sub:[[huruf,teks]...]}
const PASAL = [
['DEFINISI DAN PENGERTIAN', [
  '"Perjanjian" adalah perjanjian ini beserta seluruh lampiran dan addendumnya yang merupakan satu kesatuan yang tidak terpisahkan.',
  '"Pekerjaan" adalah seluruh pekerjaan renovasi sebagaimana diuraikan dalam Pasal 2 Perjanjian ini.',
  '"RAB" adalah Rencana Anggaran Biaya sebagai Lampiran I, yang memuat 14 (empat belas) item pekerjaan beserta nilai dan bobot masing-masing.',
  '"DED" adalah gambar kerja atau Detail Engineering Design sebagai Lampiran II.',
  '"Spesifikasi Teknis" adalah spesifikasi teknis dan material sebagai Lampiran III.',
  '"Opname" adalah pemeriksaan dan pencatatan realisasi Pekerjaan per item, yang formatnya ditetapkan dalam Lampiran IV.',
  '"Bobot" adalah perbandingan nilai suatu item pekerjaan terhadap jumlah Dasar Pengenaan Pajak dalam RAB, dinyatakan dalam persen, yang jumlah seluruhnya adalah 100% (seratus persen).',
  { t: '"Kondisi Siap Beroperasi" adalah keadaan bangunan pada saat seluruh item pekerjaan dalam RAB telah terealisasi 100% (seratus persen) dan sesuai dengan Spesifikasi Teknis serta DED, dengan sekurang-kurangnya terpenuhi keadaan sebagai berikut:',
    sub: [
    ['a', 'instalasi listrik dan pencahayaan terpasang lengkap, berfungsi, dan telah diuji;'],
    ['b', 'instalasi plumbing, sanitasi, dan gas dapur terpasang, berfungsi, dan tidak mengalami kebocoran;'],
    ['c', 'kitchen dan bar terpasang lengkap sesuai DED serta dapat digunakan;'],
    ['d', 'lantai, dinding, plafon, pintu, jendela, dan pengecatan telah selesai dan sesuai Spesifikasi Teknis;'],
    ['e', 'furniture built-in terpasang dan berfungsi;'],
    ['f', 'fasad dan area luar telah selesai; dan'],
    ['g', 'bangunan telah dibersihkan serta bebas dari sisa material dan puing, sehingga dapat langsung digunakan untuk kegiatan usaha kafe.'],
  ]},
  '"Addendum" adalah perubahan tertulis atas Perjanjian yang ditandatangani oleh PARA PIHAK.',
  '"Hari" berarti hari kalender, kecuali dinyatakan lain secara tegas.',
]],
['DOKUMEN KONTRAK, HIERARKI, DAN RUANG LINGKUP', [
  'PIHAK KEDUA wajib melaksanakan pekerjaan renovasi bangunan komersial seluas 120 m² (seratus dua puluh meter persegi) berukuran 12 meter x 10 meter yang berlokasi di Jalan Ahmad Yani Nomor 21, Kota Surakarta, Provinsi Jawa Tengah, menjadi kafe dalam Kondisi Siap Beroperasi.',
  'Ruang lingkup Pekerjaan meliputi: pembongkaran interior lama; penyesuaian struktur bangunan; pekerjaan dinding, plester dan finishing; pekerjaan lantai dan keramik; pekerjaan plafon; pintu dan jendela; instalasi listrik dan pencahayaan; plumbing dan sanitasi; kitchen dan bar; pengecatan; fasad dan area luar; furniture built-in; finishing akhir dan pembersihan; serta desain, engineering, mobilisasi, overhead dan manajemen proyek.',
  'RAB sebagai Lampiran I, DED sebagai Lampiran II, Spesifikasi Teknis sebagai Lampiran III, dan Format Dokumen Opname sebagai Lampiran IV merupakan satu kesatuan dan bagian yang tidak terpisahkan dari Perjanjian ini.',
  { t: 'Apabila terdapat pertentangan antar dokumen kontrak, maka urutan kekuatan berlaku sebagai berikut:',
    sub: [
    ['a', 'Addendum yang terakhir ditandatangani PARA PIHAK;'],
    ['b', 'Perjanjian ini;'],
    ['c', 'Spesifikasi Teknis (Lampiran III);'],
    ['d', 'RAB (Lampiran I);'],
    ['e', 'DED (Lampiran II); dan'],
    ['f', 'Format Dokumen Opname (Lampiran IV).'],
  ]},
  'PIHAK KEDUA wajib melaksanakan Pekerjaan sesuai ukuran, volume, harga satuan, spesifikasi, desain, fungsi, dan estetika yang telah disepakati PARA PIHAK.',
  'PIHAK KEDUA menyatakan memiliki kemampuan, tenaga ahli, peralatan, dan sumber daya yang cukup untuk melaksanakan Pekerjaan. Keterbatasan kemampuan, tenaga kerja, atau sumber daya internal PIHAK KEDUA tidak dapat dijadikan alasan pembenar atas keterlambatan maupun ketidaksesuaian Pekerjaan.',
]],
['NILAI KONTRAK', [
  'Nilai keseluruhan Pekerjaan disepakati sebesar Rp850.000.000,00 (delapan ratus lima puluh juta rupiah), termasuk pajak.',
  'Nilai kontrak sebagaimana ayat (1) terdiri atas Dasar Pengenaan Pajak sebesar Rp765.765.766,00 (tujuh ratus enam puluh lima juta tujuh ratus enam puluh lima ribu tujuh ratus enam puluh enam rupiah) dan Pajak Pertambahan Nilai 11% (sebelas persen) sebesar Rp84.234.234,00 (delapan puluh empat juta dua ratus tiga puluh empat ribu dua ratus tiga puluh empat rupiah), sebagaimana dirinci dalam RAB.',
  'Nilai kontrak merupakan harga tetap (lump sum fixed price) selama jangka waktu pelaksanaan Pekerjaan.',
  'Nilai kontrak telah mencakup bahan, upah tenaga kerja, peralatan, alat bantu, biaya umum, keselamatan dan kesehatan kerja, keuntungan pelaksana, desain, engineering, mobilisasi, overhead, manajemen proyek, serta seluruh pekerjaan lain yang tercantum dalam RAB.',
  'Pekerjaan tambahan di luar ruang lingkup awal hanya dapat menimbulkan hak pembayaran apabila terlebih dahulu disepakati secara tertulis oleh PARA PIHAK melalui Addendum yang mengatur sekurang-kurangnya jenis pekerjaan, volume, nilai, dan pengaruhnya terhadap jangka waktu.',
  'Pekerjaan yang volume, spesifikasi, dan nilainya telah dianggarkan di dalam RAB merupakan bagian dari ruang lingkup Pekerjaan dan tidak dapat ditagih kembali sebagai pekerjaan tambahan. PIHAK KEDUA yang mendalilkan adanya pekerjaan tambahan wajib membuktikan adanya selisih volume atau spesifikasi di atas yang telah dianggarkan dalam RAB, disertai perhitungan yang dapat diperiksa.',
]],
['SPESIFIKASI MATERIAL DAN ESTETIKA', [
  'Keramik lantai area utama ditetapkan berukuran 60 cm x 60 cm, berwarna cokelat, permukaan matte, dengan luas pengadaan 105 m² (seratus lima meter persegi) termasuk cadangan 5% (lima persen), dan harga satuan Rp185.000,00 (seratus delapan puluh lima ribu rupiah) per meter persegi.',
  'Nilai pengadaan keramik area utama sebagaimana ayat (1) adalah Rp19.425.000,00 (sembilan belas juta empat ratus dua puluh lima ribu rupiah). Pekerjaan lantai dan keramik secara keseluruhan merupakan Item 4 RAB dengan nilai Dasar Pengenaan Pajak sebesar Rp80.000.000,00 (delapan puluh juta rupiah).',
  'PIHAK KEDUA dilarang mengganti warna, ukuran, jenis, mutu, maupun karakter estetika material yang telah disepakati tanpa persetujuan tertulis terlebih dahulu dari PIHAK PERTAMA.',
  'Apabila material yang telah disepakati tidak tersedia, PIHAK KEDUA wajib terlebih dahulu memberitahukan keadaan tersebut kepada PIHAK PERTAMA dan mengajukan alternatif secara tertulis. Penggantian material baru dapat dilaksanakan setelah memperoleh persetujuan tertulis PIHAK PERTAMA.',
  'Pekerjaan yang tidak sesuai dengan Spesifikasi Teknis dan karena itu harus dibongkar atau diperbaiki tidak diperhitungkan sebagai realisasi progres sampai kesesuaiannya dipulihkan, tidak menimbulkan hak pembayaran bagi PIHAK KEDUA, dan biaya pembongkaran serta pemasangan ulangnya menjadi beban PIHAK KEDUA.',
]],
['JANGKA WAKTU DAN JATUH TEMPO PEKERJAAN', [
  'Pelaksanaan Pekerjaan dimulai pada tanggal 16 Januari 2026 dan berlangsung selama 105 (seratus lima) hari kalender.',
  'PIHAK KEDUA wajib menyelesaikan seluruh Pekerjaan 100% (seratus persen) dan menyerahkannya kepada PIHAK PERTAMA dalam Kondisi Siap Beroperasi paling lambat pada tanggal 1 Mei 2026.',
  'Perpanjangan waktu hanya sah apabila disepakati secara tertulis oleh PARA PIHAK dalam Addendum, sebelum atau pada saat keadaan yang menjadi dasar perpanjangan tersebut diketahui.',
  'Perubahan desain, ruang lingkup, volume, spesifikasi, nilai, atau jangka waktu yang tidak dituangkan dalam Addendum tertulis tidak dengan sendirinya mengubah jatuh tempo Pekerjaan sebagaimana ayat (2).',
  'Keterlambatan yang bersumber dari kelalaian, kekurangcakapan, atau kesalahan PIHAK KEDUA tidak menimbulkan hak bagi PIHAK KEDUA atas tambahan biaya maupun perpanjangan waktu, dan tidak dapat dibebankan kepada PIHAK PERTAMA.',
]],
['PEMBAYARAN DAN JATUH TEMPO', [
  'Pembayaran dilakukan berdasarkan termin dan pencapaian progres Pekerjaan yang dibuktikan dengan dokumen Opname.',
  'Termin I sebesar Rp450.000.000,00 (empat ratus lima puluh juta rupiah) jatuh tempo setelah Perjanjian ditandatangani dan Pekerjaan dimulai. Termin I dimaksudkan antara lain untuk biaya persiapan, mobilisasi, dan pengadaan material utama, termasuk keramik lantai, material kitchen dan bar, serta furniture built-in.',
  'Termin II sebesar Rp50.000.000,00 (lima puluh juta rupiah) jatuh tempo setelah Pekerjaan mencapai progres sekitar 40% (empat puluh persen) berdasarkan Opname.',
  'Termin III sebesar Rp100.000.000,00 (seratus juta rupiah) jatuh tempo setelah Pekerjaan mencapai progres sekitar 70% (tujuh puluh persen) berdasarkan Opname.',
  'Termin IV sebesar Rp250.000.000,00 (dua ratus lima puluh juta rupiah) jatuh tempo setelah Pekerjaan selesai 100% (seratus persen), dinyatakan sesuai dengan dokumen kontrak, dan dilakukan serah terima dalam Kondisi Siap Beroperasi.',
  'Ketiga syarat pada ayat (5) bersifat kumulatif. Termin IV tidak jatuh tempo dan PIHAK PERTAMA tidak berkewajiban membayarnya sepanjang salah satu syarat tersebut belum terpenuhi.',
  'Pembayaran termin tidak menghapus hak PIHAK PERTAMA untuk menuntut perbaikan atas bagian Pekerjaan yang kemudian terbukti tidak sesuai dengan Perjanjian, RAB, DED, atau Spesifikasi Teknis.',
]],
['OPNAME DAN PENILAIAN PROGRES', [
  'Setiap pencapaian progres yang menjadi dasar pembayaran wajib dituangkan dalam dokumen Opname yang memuat sekurang-kurangnya item pekerjaan, volume kontrak, volume terpasang, persentase dan bobot realisasi, kondisi pekerjaan, serta catatan kesesuaian.',
  'Opname dilakukan dengan mencocokkan realisasi di lapangan terhadap RAB, DED, Spesifikasi Teknis, ukuran dan volume per meter atau per meter persegi, serta aspek bentuk dan estetika bangunan yang telah disepakati.',
  'Progres Pekerjaan dihitung berdasarkan realisasi Bobot setiap item RAB. Progres Pekerjaan tidak dihitung sebagai persentase datar terhadap nilai kontrak.',
  'Item 14 RAB berupa desain, engineering, mobilisasi, overhead dan manajemen proyek bukan merupakan pekerjaan fisik, sehingga diakui secara proporsional terhadap realisasi fisik Item 1 sampai dengan Item 13.',
  'Pekerjaan yang tidak sesuai Spesifikasi Teknis dan harus dibongkar dinilai 0% (nol persen) dalam Opname, sesuai Pasal 4 ayat (5).',
  'Apabila terdapat perbedaan antara laporan progres PIHAK KEDUA dengan kondisi lapangan, PARA PIHAK dapat melakukan Opname bersama dan/atau menggunakan penilaian ahli jasa konstruksi.',
]],
['PERUBAHAN PEKERJAAN DAN ADDENDUM', [
  'Setiap perubahan desain, tata ruang, bentuk bangunan, material, volume, nilai pekerjaan, atau jangka waktu wajib memperoleh persetujuan PARA PIHAK.',
  'Perubahan yang berakibat pada penambahan biaya atau penambahan waktu wajib dituangkan dalam Addendum tertulis yang ditandatangani PARA PIHAK.',
  'Instruksi, pembicaraan, maupun persetujuan informal, baik secara lisan maupun melalui pesan elektronik, yang tidak dituangkan dalam Addendum tertulis tidak dapat dijadikan dasar sepihak untuk menagih biaya tambahan atau memperpanjang jangka waktu Pekerjaan.',
  'Gambar revisi yang telah disetujui secara tertulis menjadi bagian dari dokumen kontrak dan digunakan dalam Opname untuk menilai kesesuaian Pekerjaan.',
  'Usulan perubahan desain, tata ruang, atau material yang berasal dari PIHAK KEDUA sendiri, termasuk yang diajukan karena kondisi lapangan, tidak dapat dijadikan dasar bagi PIHAK KEDUA untuk menuntut tambahan biaya maupun perpanjangan waktu dari PIHAK PERTAMA.',
]],
['HAK DAN KEWAJIBAN PIHAK PERTAMA', [
  'PIHAK PERTAMA berhak memperoleh hasil Pekerjaan yang sesuai dengan RAB, DED, Spesifikasi Teknis, serta kualitas, fungsi, dan estetika yang diperjanjikan.',
  'PIHAK PERTAMA berhak memeriksa Pekerjaan, meminta Opname, menyampaikan keberatan atas ketidaksesuaian, dan meminta perbaikan.',
  'PIHAK PERTAMA wajib membayar termin yang telah jatuh tempo sesuai Pasal 6 setelah syarat pencapaian progres dan/atau serah terima terpenuhi.',
  'PIHAK PERTAMA wajib memberikan akses lokasi dan informasi yang secara wajar diperlukan untuk pelaksanaan Pekerjaan.',
]],
['HAK DAN KEWAJIBAN PIHAK KEDUA', [
  'PIHAK KEDUA berhak menerima pembayaran sesuai termin apabila syarat pembayaran telah terpenuhi.',
  'PIHAK KEDUA wajib melaksanakan Pekerjaan secara profesional, tepat mutu, tepat spesifikasi, dan tepat waktu.',
  'PIHAK KEDUA wajib menggunakan material sesuai Spesifikasi Teknis yang telah disepakati, dan bertanggung jawab atas pekerjaan yang dilaksanakan tanpa persetujuan yang dipersyaratkan Perjanjian ini.',
  'PIHAK KEDUA wajib memperbaiki atas biaya sendiri pekerjaan yang terbukti tidak sesuai dengan dokumen kontrak, sepanjang ketidaksesuaian tersebut menjadi tanggung jawab PIHAK KEDUA.',
  'PIHAK KEDUA wajib menjaga keselamatan kerja, keamanan lokasi, dan ketertiban selama pelaksanaan Pekerjaan.',
  'PIHAK KEDUA dilarang mengalihkan seluruh atau sebagian besar Pekerjaan kepada pihak lain tanpa persetujuan tertulis PIHAK PERTAMA.',
]],
['LARANGAN PENGHENTIAN DAN PENANGGUHAN PEKERJAAN SECARA SEPIHAK', [
  'PIHAK KEDUA dilarang menghentikan, menangguhkan, memperlambat, atau meninggalkan Pekerjaan secara sepihak dengan alasan apa pun sebelum Pekerjaan selesai dan diserahterimakan, kecuali karena Keadaan Kahar sebagaimana Pasal 15 atau atas persetujuan tertulis PIHAK PERTAMA.',
  'Tagihan yang belum jatuh tempo, tagihan yang tidak didasarkan pada Addendum tertulis, maupun perbedaan pendapat mengenai besarnya progres Pekerjaan, bukan merupakan alasan yang sah bagi PIHAK KEDUA untuk menghentikan atau menangguhkan Pekerjaan.',
  'Penarikan tenaga kerja, peralatan, atau material dari lokasi yang mengakibatkan Pekerjaan terhenti dikualifikasikan sebagai penghentian sepihak sebagaimana ayat (1).',
  'Penghentian atau penangguhan Pekerjaan secara sepihak merupakan wanprestasi, dan seluruh kerugian yang timbul karenanya menjadi tanggung jawab PIHAK KEDUA.',
]],
['SERAH TERIMA PEKERJAAN DAN MASA PEMELIHARAAN', [
  'Serah terima dilakukan setelah Pekerjaan mencapai 100% (seratus persen), seluruh item pokok telah berfungsi, dan bangunan berada dalam Kondisi Siap Beroperasi sesuai ruang lingkup kontrak.',
  'Sebelum serah terima, PARA PIHAK melakukan pemeriksaan akhir dan Opname untuk mencocokkan hasil Pekerjaan dengan RAB, DED, Spesifikasi Teknis, serta estetika yang disepakati.',
  'Hasil pemeriksaan dituangkan dalam Berita Acara Serah Terima. Apabila masih terdapat kekurangan, dicantumkan daftar pekerjaan perbaikan (punch list) beserta batas waktu penyelesaiannya.',
  'Pekerjaan tidak dapat dinyatakan telah diserahterimakan sepanjang Berita Acara Serah Terima belum ditandatangani oleh PARA PIHAK.',
  'Masa pemeliharaan berlaku selama 90 (sembilan puluh) hari kalender sejak tanggal Berita Acara Serah Terima. Dalam masa tersebut PIHAK KEDUA wajib memperbaiki atas biaya sendiri setiap cacat atau kerusakan yang menjadi tanggung jawabnya.',
]],
['WANPRESTASI, DENDA, DAN GANTI KERUGIAN', [
  { t: 'Suatu pihak dianggap melakukan wanprestasi apabila:',
    sub: [
    ['a', 'tidak memenuhi kewajiban yang telah jatuh tempo;'],
    ['b', 'memenuhi kewajiban tetapi tidak sebagaimana diperjanjikan;'],
    ['c', 'terlambat memenuhi kewajiban; atau'],
    ['d', 'melakukan sesuatu yang menurut Perjanjian tidak boleh dilakukan.'],
  ]},
  'Keterlambatan penyelesaian Pekerjaan yang menjadi tanggung jawab PIHAK KEDUA dikenakan denda sebesar 1‰ (satu per mil) per hari kalender dari nilai kontrak, dengan jumlah paling banyak 5% (lima persen) dari nilai kontrak, dihitung sejak hari kalender pertama setelah tanggal jatuh tempo Pekerjaan sebagaimana Pasal 5 ayat (2).',
  'Pengenaan denda tidak menghapus kewajiban PIHAK KEDUA untuk menyelesaikan atau memperbaiki Pekerjaan, dan tidak menutup hak pihak yang dirugikan untuk menuntut kerugian yang dapat dibuktikan sesuai ketentuan hukum.',
  'Dalam menilai ketidaksesuaian pekerjaan tertentu, termasuk pekerjaan keramik, PARA PIHAK membedakan antara nilai kontrak keseluruhan, nilai item pekerjaan terkait, biaya pemulihan atau perbaikan, serta kerugian lain yang dapat dibuktikan, dan penilaiannya disesuaikan dengan jenis tuntutan serta hubungan sebab akibat.',
  { t: 'Kerugian yang dapat dituntut meliputi biaya, rugi, dan bunga sebagaimana Pasal 1243 dan Pasal 1246 Kitab Undang-Undang Hukum Perdata, yang antara lain dapat berupa:',
    sub: [
    ['a', 'pengembalian kelebihan pembayaran atas prestasi yang tidak dilaksanakan;'],
    ['b', 'denda keterlambatan sebagaimana ayat (2);'],
    ['c', 'biaya pemulihan pekerjaan yang tidak sesuai Spesifikasi Teknis; dan'],
    ['d', 'biaya tambahan yang timbul untuk menyelesaikan sisa Pekerjaan melalui pihak ketiga, termasuk eskalasi harga dan biaya mobilisasi.'],
  ]},
]],
['PENGAKHIRAN DAN PEMBATALAN PERJANJIAN', [
  { t: 'PIHAK PERTAMA berhak menuntut pembatalan Perjanjian apabila PIHAK KEDUA:',
    sub: [
    ['a', 'tidak menyelesaikan Pekerjaan sampai dengan batas waktu Pasal 5 ayat (2) dan denda keterlambatan telah mencapai jumlah maksimum sebagaimana Pasal 13 ayat (2);'],
    ['b', 'menghentikan atau menangguhkan Pekerjaan secara sepihak sebagaimana Pasal 11;'],
    ['c', 'melaksanakan pekerjaan yang tidak sesuai Spesifikasi Teknis dan tidak memperbaikinya dalam waktu yang wajar setelah diberitahukan; atau'],
    ['d', 'mengalihkan Pekerjaan kepada pihak lain tanpa persetujuan tertulis PIHAK PERTAMA.'],
  ]},
  'PARA PIHAK sepakat tidak mengesampingkan Pasal 1266 dan Pasal 1267 Kitab Undang-Undang Hukum Perdata, sehingga pembatalan Perjanjian dimohonkan melalui putusan Pengadilan.',
  'Pembatalan Perjanjian tidak menghapus hak pihak yang dirugikan untuk menuntut penggantian biaya, kerugian, dan bunga, termasuk pengembalian kelebihan pembayaran atas prestasi yang tidak dilaksanakan.',
  'Dalam hal Perjanjian dibatalkan, PIHAK KEDUA wajib menyerahkan kepada PIHAK PERTAMA seluruh gambar, dokumen, material, dan hasil pekerjaan yang telah dibayar oleh PIHAK PERTAMA.',
]],
['KEADAAN KAHAR', [
  'Keadaan Kahar adalah peristiwa di luar kemampuan dan kendali wajar PARA PIHAK yang secara langsung menghambat pelaksanaan kewajiban kontraktual, antara lain bencana alam, kebakaran, huru-hara, perang, epidemi, dan kebijakan pemerintah yang berdampak langsung terhadap pelaksanaan Pekerjaan.',
  'Pihak yang mengalami Keadaan Kahar wajib memberitahukan secara tertulis kepada pihak lainnya sesegera mungkin dan paling lambat 7 (tujuh) hari kalender sejak peristiwa terjadi, dengan menjelaskan peristiwa, akibatnya, dan perkiraan jangka waktu hambatan.',
  'Kesulitan pengadaan material pada umumnya tidak dengan sendirinya merupakan Keadaan Kahar, apabila kesulitan tersebut secara wajar dapat diantisipasi atau apabila tersedia material alternatif yang dapat dimintakan persetujuan sesuai Pasal 4 ayat (4).',
  'Keadaan Kahar tidak membebaskan suatu pihak dari kewajiban yang telah jatuh tempo sebelum Keadaan Kahar tersebut terjadi.',
]],
['PEMBERITAHUAN DAN KORESPONDENSI', [
  'Segala pemberitahuan, laporan, peringatan, keberatan, dan korespondensi sehubungan dengan Perjanjian ini disampaikan kepada PARA PIHAK pada alamat yang tercantum dalam Perjanjian ini atau pada alamat lain yang diberitahukan secara tertulis.',
  'Pemberitahuan dianggap sah apabila disampaikan secara langsung, melalui jasa kurir, melalui surat elektronik, atau melalui pesan elektronik termasuk aplikasi pesan instan, kepada kontak yang ditunjuk masing-masing pihak.',
  'PARA PIHAK sepakat bahwa informasi elektronik dan dokumen elektronik sehubungan dengan Perjanjian ini merupakan alat bukti yang sah sebagaimana Pasal 5 Undang-Undang Nomor 11 Tahun 2008 tentang Informasi dan Transaksi Elektronik sebagaimana telah diubah dengan Undang-Undang Nomor 19 Tahun 2016.',
  'Ketentuan ayat (2) dan ayat (3) tidak mengurangi keharusan dibuatnya Addendum tertulis yang ditandatangani PARA PIHAK untuk setiap perubahan sebagaimana Pasal 8.',
  'Kontak yang ditunjuk: PIHAK PERTAMA, nama .............................., nomor .............................., surel ..............................; PIHAK KEDUA, nama .............................., nomor .............................., surel '
  + '...............................',
]],
['PEMBUKTIAN DAN AHLI', [
  'Dalam hal terjadi perselisihan mengenai mutu, volume, progres, kesesuaian RAB atau DED, Spesifikasi Teknis, bentuk, atau estetika hasil Pekerjaan, PARA PIHAK dapat menggunakan keterangan ahli jasa konstruksi.',
  'Dalam hal terjadi perselisihan mengenai penafsiran Perjanjian, pemenuhan prestasi, perubahan kontrak, jatuh tempo, atau dugaan wanprestasi, PARA PIHAK dapat menggunakan keterangan ahli hukum perjanjian.',
  'Keterangan ahli tidak mengurangi kewenangan Majelis Hakim untuk menilai seluruh alat bukti dalam perkara.',
]],
['PENYELESAIAN PERSELISIHAN DAN PILIHAN FORUM', [
  'Setiap perselisihan yang timbul dari pelaksanaan, pemenuhan, atau penafsiran Perjanjian terlebih dahulu diselesaikan melalui musyawarah untuk mencapai mufakat secara kekeluargaan dengan itikad baik, dalam jangka waktu paling lama 30 (tiga puluh) hari kalender sejak perselisihan diberitahukan secara tertulis.',
  'Apabila musyawarah sebagaimana ayat (1) tidak menghasilkan kesepakatan, PARA PIHAK sepakat menyelesaikan perselisihan tersebut melalui Pengadilan Negeri Surakarta.',
  'PARA PIHAK dengan ini secara tegas sepakat memilih Pengadilan Negeri Surakarta sebagai pengadilan yang berwenang memeriksa, mengadili, dan memutus setiap perselisihan yang timbul dari Perjanjian ini, dan memilih domisili hukum yang tetap dan umum pada Kepaniteraan Pengadilan Negeri Surakarta. Pilihan tersebut merupakan pilihan pengadilan sebagaimana dimaksud Pasal 118 ayat (4) Herzien Inlandsch Reglement, dan karena itu PARA PIHAK sepakat untuk tidak mengajukan keberatan atau eksepsi mengenai kewenangan relatif Pengadilan Negeri Surakarta atas dasar tempat kedudukan salah satu pihak.',
  'PARA PIHAK menyatakan tidak memilih penyelesaian sengketa melalui arbitrase maupun lembaga alternatif penyelesaian sengketa lainnya.',
  'Apabila perselisihan telah didaftarkan di pengadilan, proses mediasi dilaksanakan sesuai hukum acara yang berlaku.',
]],
['KETENTUAN PENUTUP', [
  'Hal-hal yang belum diatur dalam Perjanjian ini dapat diatur kemudian berdasarkan kesepakatan tertulis PARA PIHAK dan menjadi bagian yang tidak terpisahkan dari Perjanjian.',
  'Perjanjian ini beserta seluruh lampirannya merupakan keseluruhan kesepakatan PARA PIHAK mengenai pekerjaan renovasi yang menjadi objek Perjanjian, dan menggantikan seluruh pembicaraan maupun kesepakatan sebelumnya mengenai hal yang sama.',
  'Apabila salah satu ketentuan dalam Perjanjian ini dinyatakan tidak berlaku atau tidak dapat dilaksanakan, hal tersebut tidak mempengaruhi keberlakuan ketentuan lainnya.',
  'Perjanjian ini dibuat dalam 2 (dua) rangkap asli bermeterai cukup, masing-masing mempunyai kekuatan hukum yang sama, dan mulai berlaku sejak ditandatangani PARA PIHAK.',
  'PARA PIHAK menyatakan telah membaca, memahami, dan menyetujui seluruh isi Perjanjian ini tanpa adanya paksaan, kekhilafan, maupun penipuan dari pihak mana pun.',
]],
];

/* =========================== BANGUN DOKUMEN =========================== */
const B = [];
B.push(Pc([run('PERJANJIAN PEMBORONGAN PEKERJAAN', { bold: true, size: 26 })], { after: 40 }));
B.push(Pc([run('RENOVASI BANGUNAN KOMERSIAL MENJADI KAFE', { bold: true, size: 26 })], { after: 40 }));
B.push(Pc([run('Nomor: 001/PPP/AK-RK/I/2026', { bold: true })], { after: 260 }));

B.push(P('Pada hari Senin, tanggal 12 (dua belas) Januari 2026, bertempat di Kota Surakarta, telah dibuat dan ditandatangani Perjanjian Pemborongan Pekerjaan Renovasi Bangunan Komersial Menjadi Kafe (selanjutnya disebut “Perjanjian”) oleh dan antara:', { after: 160 }));

B.push(numbered(1, [
  run('RAKA', { bold: true }),
  run(', lahir di Surakarta pada tanggal 20 September 1998, Nomor Induk Kependudukan 390188764453, pekerjaan Wiraswasta, bertempat tinggal di Jalan Karagan Nomor 18, Kelurahan Panularan, Kecamatan Laweyan, Kota Surakarta, Provinsi Jawa Tengah. Dalam hal ini bertindak untuk dan atas nama diri sendiri selaku pemilik bangunan komersial yang menjadi objek Pekerjaan. Selanjutnya disebut '),
  run('“PIHAK PERTAMA”', { bold: true }), run(' atau '), run('“PEMBERI TUGAS”', { bold: true }), run('.'),
]));
B.push(numbered(2, [
  run('PT ARUNIKA KREASI', { bold: true }),
  run(', suatu perseroan terbatas yang didirikan menurut hukum Negara Republik Indonesia dan bergerak di bidang desain interior serta pengelolaan usaha kuliner, berkedudukan dan berkantor di Jalan Anggrek Nomor 7, RT 01, RW 02, Kelurahan Nyawiji, Kecamatan Polanharjo, Kabupaten Klaten, Provinsi Jawa Tengah. Dalam hal ini diwakili oleh '),
  run('ARYA DAMAR PRAYOGA, S.H., M.H.', { bold: true }),
  run(', dalam kedudukannya sebagai Direktur, yang sah bertindak untuk dan atas nama perseroan berdasarkan Anggaran Dasar perseroan. Selanjutnya disebut '),
  run('“PIHAK KEDUA”', { bold: true }), run(' atau '), run('“PELAKSANA PEKERJAAN”', { bold: true }), run('.'),
]));

B.push(P([run('PIHAK PERTAMA dan PIHAK KEDUA selanjutnya secara bersama-sama disebut '), run('“PARA PIHAK”', { bold: true }), run('.')], { before: 100, after: 160 }));
B.push(P('PARA PIHAK terlebih dahulu menerangkan bahwa PIHAK PERTAMA bermaksud merenovasi bangunan komersial miliknya menjadi kafe dalam kondisi siap beroperasi, dan PIHAK KEDUA menyatakan mempunyai kemampuan untuk melaksanakan pekerjaan tersebut berdasarkan gambar kerja, Rencana Anggaran Biaya, spesifikasi teknis, dan ketentuan Perjanjian ini.', { after: 120 }));
B.push(P('Berdasarkan hal-hal tersebut, PARA PIHAK sepakat mengikatkan diri dalam Perjanjian ini dengan syarat dan ketentuan sebagai berikut.', { after: 120 }));

PASAL.forEach((ps, i) => {
  B.push(Pc([run('PASAL ' + (i + 1), { bold: true })], { before: 260, after: 20 }));
  B.push(Pc([run(ps[0], { bold: true })], { after: 120 }));
  ps[1].forEach((ay, j) => {
    if (typeof ay === 'string') { B.push(numbered(j + 1, ay, { paren: true })); }
    else {
      B.push(numbered(j + 1, ay.t, { paren: true }));
      ay.sub.forEach(s => B.push(numbered(s[0], s[1], { deep: true })));
    }
  });
});

/* tanda tangan */
B.push(Pc('Surakarta, 12 Januari 2026', { before: 340, after: 200 }));
const SW = [4677, 4677];
B.push(new Table({
  columnWidths: SW, width: { size: W, type: WidthType.DXA }, borders: NO_BORDERS,
  rows: [new TableRow({ children: [SW[0], SW[1]].map((w, k) => new TableCell({
    children: (k === 0
      ? ['PIHAK PERTAMA', 'PEMBERI TUGAS', '', '', '', 'Meterai Rp10.000', '', 'RAKA']
      : ['PIHAK KEDUA', 'PT ARUNIKA KREASI', '', '', '', '', '', 'ARYA DAMAR PRAYOGA, S.H., M.H.', 'Direktur']
    ).map(t => new Paragraph({
      children: [run(t, { bold: t === 'RAKA' || t.startsWith('ARYA') || t.startsWith('PIHAK') })],
      alignment: AlignmentType.CENTER, spacing: { before: 20, after: 20, line: 280 },
    })),
    width: { size: w, type: WidthType.DXA }, verticalAlign: VerticalAlign.TOP,
    margins: { top: 40, bottom: 40, left: 60, right: 60 },
  })) })],
}));

B.push(Pc([run('DAFTAR LAMPIRAN', { bold: true })], { before: 400, after: 140 }));
[
  'Lampiran I — Rencana Anggaran Biaya (RAB) Pekerjaan Renovasi Bangunan Komersial Menjadi Kafe.',
  'Lampiran II — Gambar Kerja atau Detail Engineering Design (DED) dan desain estetika yang disepakati.',
  'Lampiran III — Spesifikasi Teknis dan Material.',
  'Lampiran IV — Format Dokumen Opname atau Progres Pekerjaan.',
].forEach((t, i) => B.push(numbered(i + 1, t)));

const doc = new Document({
  creator: 'Praktik Peradilan Perdata',
  title: 'Perjanjian Pemborongan Pekerjaan Nomor 001/PPP/AK-RK/I/2026',
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
  const out = '/home/user/claude-workspace/Perjanjian-Pemborongan-Pekerjaan-001-PPP-AK-RK-I-2026.docx';
  fs.writeFileSync(out, b);
  const ay = PASAL.reduce((a, p) => a + p[1].length, 0);
  const sb = PASAL.reduce((a, p) => a + p[1].filter(x => typeof x !== 'string').reduce((c, x) => c + x.sub.length, 0), 0);
  console.log('Pasal   : ' + PASAL.length + '  (draft awal: 15)');
  console.log('Ayat    : ' + ay + '   sub-huruf: ' + sb);
  console.log('Ukuran  : ' + (b.length / 1024).toFixed(1) + ' KB');
});
