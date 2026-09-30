// Isi makalah. Markup inline: **tebal**, _miring_.
const JUDUL = "PEMUTUSAN HUBUNGAN KERJA (PHK) DAN HAK PESANGON PEKERJA PASCA UNDANG-UNDANG CIPTA KERJA";

const kataPengantar = [
  "_Assalamu’alaikum Warahmatullahi Wabarakatuh._",
  "Puji syukur penulis panjatkan ke hadirat Allah SWT atas limpahan rahmat, taufik, dan hidayah-Nya sehingga penulis dapat menyelesaikan makalah yang berjudul “Pemutusan Hubungan Kerja (PHK) dan Hak Pesangon Pekerja Pasca Undang-Undang Cipta Kerja” ini. Shalawat serta salam semoga senantiasa tercurah kepada junjungan kita Nabi Muhammad SAW, yang telah membawa umatnya dari zaman kegelapan menuju zaman yang terang benderang.",
  "Makalah ini disusun untuk memenuhi tugas mata kuliah Hubungan Industrial di Universitas Muhammadiyah Surakarta. Makalah ini membahas dua persoalan pokok, yaitu prosedur pemutusan hubungan kerja yang sah menurut peraturan perundang-undangan yang berlaku dan perbandingan hak pesangon pekerja sebelum dan sesudah berlakunya Undang-Undang Cipta Kerja. Pembahasan juga memperhatikan perkembangan setelah Putusan Mahkamah Konstitusi Nomor 168/PUU-XXI/2023 serta pembahasan Rancangan Undang-Undang Pelindungan Ketenagakerjaan yang sedang berlangsung.",
  "Dalam penyusunan makalah ini, penulis mendapatkan bantuan dan dukungan dari berbagai pihak. Oleh karena itu, penulis mengucapkan terima kasih kepada:",
  { list: "decimal", items: [
    "[Nama Dosen], selaku dosen pengampu mata kuliah Hubungan Industrial yang telah memberikan bimbingan dan arahan;",
    "Kedua orang tua yang senantiasa memberikan doa dan dukungan;",
    "Teman-teman yang telah membantu dalam diskusi dan penyusunan makalah ini.",
  ]},
  "Penulis menyadari bahwa makalah ini masih jauh dari sempurna. Oleh karena itu, kritik dan saran yang membangun sangat penulis harapkan demi perbaikan di masa mendatang. Semoga makalah ini dapat memberikan manfaat bagi pembaca, khususnya dalam memahami hak-hak pekerja dalam hubungan industrial.",
  "_Wassalamu’alaikum Warahmatullahi Wabarakatuh._",
];

// Blok isi utama
const body = [
  // ================= BAB I =================
  { t: "h1", bab: "BAB I", text: "PENDAHULUAN" },
  { t: "h2", text: "A. Latar Belakang" },
  { t: "p", text: "Pekerjaan merupakan sarana utama bagi manusia untuk memenuhi kebutuhan hidup sekaligus menjaga martabatnya sebagai manusia. Konstitusi Indonesia memberikan jaminan yang tegas atas hal tersebut. Pasal 27 ayat (2) Undang-Undang Dasar Negara Republik Indonesia Tahun 1945 (UUD 1945) menyatakan bahwa tiap-tiap warga negara berhak atas pekerjaan dan penghidupan yang layak bagi kemanusiaan. Selanjutnya, Pasal 28D ayat (2) UUD 1945 menegaskan bahwa setiap orang berhak untuk bekerja serta mendapat imbalan dan perlakuan yang adil dan layak dalam hubungan kerja. Jaminan konstitusional ini menjadi dasar bagi negara untuk hadir dan mengatur hubungan antara pekerja/buruh dan pengusaha, yang dalam kajian ketenagakerjaan dikenal sebagai hubungan industrial." },
  { t: "p", text: "Secara teoretis, John T. Dunlop dalam karyanya _Industrial Relations Systems_ (1958) memandang hubungan industrial sebagai suatu sistem yang melibatkan tiga aktor utama, yaitu manajemen atau pengusaha, pekerja beserta organisasinya, dan lembaga pemerintah. Ketiga aktor tersebut berinteraksi dalam konteks teknologi, pasar, dan distribusi kekuasaan tertentu, dan hasil dari interaksi itu adalah seperangkat aturan (_web of rules_) yang mengatur tempat kerja. Di Indonesia, gagasan tersebut dirumuskan dalam Pasal 1 angka 16 Undang-Undang Nomor 13 Tahun 2003 tentang Ketenagakerjaan, yang mendefinisikan hubungan industrial sebagai suatu sistem hubungan yang terbentuk antara para pelaku dalam proses produksi barang dan/atau jasa, yang terdiri atas unsur pengusaha, pekerja/buruh, dan pemerintah, yang didasarkan pada nilai-nilai Pancasila dan UUD 1945. Dengan demikian, hubungan kerja di Indonesia tidak semata-mata merupakan hubungan privat antara dua pihak, tetapi juga mengandung dimensi publik karena negara berkepentingan menjaga keseimbangan, keadilan, dan ketenangan kerja." },
  { t: "p", text: "Salah satu titik paling rawan dalam hubungan industrial adalah pemutusan hubungan kerja (PHK). Bagi pengusaha, PHK sering dipandang sebagai langkah rasional untuk menjaga kelangsungan usaha, misalnya ketika perusahaan mengalami kerugian atau melakukan efisiensi. Sebaliknya, bagi pekerja PHK berarti hilangnya sumber penghasilan yang menopang kehidupan diri dan keluarganya. Husni (2020) menggambarkan PHK sebagai peristiwa yang bagi pekerja menjadi awal dari hilangnya mata pencaharian, sehingga hukum ketenagakerjaan harus berupaya agar PHK tidak terjadi secara sewenang-wenang. Persoalan ini semakin relevan mengingat angka PHK di Indonesia terus meningkat. Kementerian Ketenagakerjaan mencatat jumlah tenaga kerja yang terkena PHK sebanyak 77.965 orang sepanjang tahun 2024 dan meningkat menjadi 88.519 orang sepanjang tahun 2025, atau naik sekitar 13,54 persen (Bisnis.com, 2026)." },
  { t: "p", text: "Ketika PHK tidak dapat dihindari, hukum memberikan perlindungan berupa kewajiban pengusaha untuk membayar uang pesangon, uang penghargaan masa kerja, dan uang penggantian hak. Selama hampir dua dekade, ketentuan tersebut diatur dalam Undang-Undang Nomor 13 Tahun 2003 tentang Ketenagakerjaan (selanjutnya disebut UU Ketenagakerjaan). Undang-undang ini menetapkan besaran pesangon sebagai batas minimal (“paling sedikit”) dengan faktor pengali hingga dua kali untuk alasan PHK tertentu, serta mensyaratkan bahwa PHK hanya dapat dilakukan setelah memperoleh penetapan dari lembaga penyelesaian perselisihan hubungan industrial." },
  { t: "p", text: "Peta pengaturan tersebut berubah secara signifikan dengan lahirnya Undang-Undang Nomor 11 Tahun 2020 tentang Cipta Kerja. Setelah Mahkamah Konstitusi melalui Putusan Nomor 91/PUU-XVIII/2020 menyatakan undang-undang tersebut inkonstitusional bersyarat, pemerintah menerbitkan Peraturan Pemerintah Pengganti Undang-Undang Nomor 2 Tahun 2022 yang kemudian ditetapkan menjadi Undang-Undang Nomor 6 Tahun 2023 (selanjutnya disebut UU Cipta Kerja). Klaster ketenagakerjaan UU Cipta Kerja mengubah sejumlah ketentuan penting mengenai PHK, antara lain mengganti mekanisme penetapan PHK dengan mekanisme pemberitahuan, menghapus komponen penggantian perumahan dan pengobatan sebesar 15 persen, serta menyerahkan pengaturan faktor pengali pesangon kepada Peraturan Pemerintah Nomor 35 Tahun 2021 (PP 35/2021) yang menetapkan pengali antara 0,5 hingga 2 kali. Sebagai penyeimbang, UU Cipta Kerja memperkenalkan program Jaminan Kehilangan Pekerjaan (JKP)." },
  { t: "p", text: "Perubahan tersebut memicu perdebatan panjang. Pemerintah berargumen bahwa pengaturan baru memberikan kepastian hukum dan memperbaiki iklim investasi. Di sisi lain, serikat pekerja menilai bahwa perubahan itu menurunkan tingkat perlindungan pekerja. Perdebatan ini berujung pada Putusan Mahkamah Konstitusi Nomor 168/PUU-XXI/2023 yang diucapkan pada 31 Oktober 2024. Dalam putusan tersebut, Mahkamah mengabulkan sebagian permohonan Partai Buruh dan sejumlah serikat pekerja, antara lain memulihkan makna “paling sedikit” dalam ketentuan besaran pesangon, menegaskan bahwa perundingan bipartit harus dilakukan secara musyawarah untuk mufakat, dan menegaskan bahwa upah selama proses perselisihan wajib dibayar sampai putusan berkekuatan hukum tetap. Mahkamah juga memerintahkan pembentuk undang-undang untuk menyusun undang-undang ketenagakerjaan yang baru dan terpisah dari UU Cipta Kerja dalam waktu paling lama dua tahun. Pada saat makalah ini disusun, DPR bersama pemerintah sedang membahas Rancangan Undang-Undang Pelindungan Ketenagakerjaan yang ditargetkan disahkan pada Oktober 2026 (Bisnis.com, 2026)." },
  { t: "p", text: "Dinamika regulasi yang cepat tersebut menimbulkan kebingungan di lapangan, baik bagi pekerja maupun pengusaha, mengenai prosedur PHK yang sah dan besaran hak pesangon yang seharusnya diterima. Oleh karena itu, penulis tertarik untuk mengkaji persoalan ini dalam makalah yang berjudul **“Pemutusan Hubungan Kerja (PHK) dan Hak Pesangon Pekerja Pasca Undang-Undang Cipta Kerja”**." },

  { t: "h2", text: "B. Rumusan Masalah" },
  { t: "p", text: "Berdasarkan latar belakang di atas, rumusan masalah dalam makalah ini adalah sebagai berikut:", noIndent: true },
  { t: "list", style: "decimal", items: [
    "Bagaimana prosedur pemutusan hubungan kerja (PHK) yang sah menurut peraturan perundang-undangan yang berlaku pasca Undang-Undang Cipta Kerja?",
    "Bagaimana perbandingan hak pesangon pekerja yang terkena PHK sebelum dan sesudah berlakunya Undang-Undang Cipta Kerja?",
  ]},

  { t: "h2", text: "C. Tujuan Penulisan" },
  { t: "p", text: "Sesuai dengan rumusan masalah, tujuan penulisan makalah ini adalah:", noIndent: true },
  { t: "list", style: "decimal", items: [
    "Untuk mengetahui dan menganalisis prosedur PHK yang sah menurut peraturan perundang-undangan yang berlaku pasca Undang-Undang Cipta Kerja, termasuk perubahan yang ditimbulkan oleh Putusan Mahkamah Konstitusi Nomor 168/PUU-XXI/2023.",
    "Untuk mengetahui dan menganalisis perbandingan hak pesangon pekerja yang terkena PHK berdasarkan UU Ketenagakerjaan dan berdasarkan UU Cipta Kerja beserta peraturan pelaksanaannya.",
  ]},

  { t: "h2", text: "D. Manfaat Penulisan" },
  { t: "list", style: "decimal", items: [
    "**Manfaat teoretis**, yaitu menambah khazanah pengetahuan di bidang hubungan industrial, khususnya mengenai perkembangan pengaturan PHK dan pesangon di Indonesia.",
    "**Manfaat praktis**, yaitu memberikan gambaran yang jelas bagi pekerja dan serikat pekerja mengenai hak-hak yang harus diperjuangkan ketika menghadapi PHK, serta bagi pengusaha dan praktisi sumber daya manusia mengenai prosedur PHK yang harus ditempuh agar tidak melanggar hukum.",
  ]},

  { t: "h2", text: "E. Metode Penulisan" },
  { t: "p", text: "Makalah ini disusun dengan metode penelitian hukum normatif (yuridis normatif), yaitu penelitian yang menelaah norma-norma hukum tertulis. Pendekatan yang digunakan adalah pendekatan perundang-undangan (_statute approach_) dan pendekatan perbandingan (_comparative approach_), yaitu membandingkan ketentuan PHK dan pesangon dalam UU Ketenagakerjaan dengan ketentuan dalam UU Cipta Kerja dan PP 35/2021. Bahan hukum yang digunakan terdiri atas bahan hukum primer berupa UUD 1945, undang-undang, peraturan pemerintah, dan putusan Mahkamah Konstitusi; bahan hukum sekunder berupa buku teks dan artikel jurnal ilmiah; serta bahan hukum tersier berupa pemberitaan media yang kredibel. Seluruh bahan tersebut dianalisis secara deskriptif-kualitatif." },

  // ================= BAB II =================
  { t: "h1", bab: "BAB II", text: "PEMBAHASAN" },
  { t: "h2", text: "A. Tinjauan Umum tentang Hubungan Industrial, PHK, dan Pesangon" },
  { t: "h3", text: "1. Hubungan Industrial dan Hubungan Kerja" },
  { t: "p", text: "Sebagaimana telah disinggung dalam pendahuluan, Dunlop (1958) menjelaskan bahwa sistem hubungan industrial terdiri atas aktor-aktor (pengusaha, pekerja dan organisasinya, serta pemerintah), konteks tempat mereka berinteraksi (teknologi, kendala pasar atau anggaran, dan distribusi kekuasaan dalam masyarakat), serta ideologi bersama yang mengikat sistem tersebut. Keluaran dari sistem ini adalah jaringan aturan (_web of rules_) yang meliputi aturan prosedural maupun substantif. Aturan mengenai PHK dan pesangon merupakan contoh nyata dari jaringan aturan tersebut. Oleh karena itu, perubahan aturan PHK dan pesangon dapat dibaca sebagai cerminan pergeseran kekuatan dan kepentingan di antara para aktor hubungan industrial." },
  { t: "p", text: "Di Indonesia, hubungan industrial dijalankan dengan prinsip Hubungan Industrial Pancasila yang menekankan musyawarah, kekeluargaan, dan keseimbangan kepentingan. Pasal 103 UU Ketenagakerjaan menyebutkan sarana pelaksanaan hubungan industrial, yaitu serikat pekerja/serikat buruh, organisasi pengusaha, lembaga kerja sama bipartit, lembaga kerja sama tripartit, peraturan perusahaan, perjanjian kerja bersama, peraturan perundang-undangan ketenagakerjaan, dan lembaga penyelesaian perselisihan hubungan industrial. Sarana-sarana inilah yang berperan ketika terjadi perselisihan PHK." },
  { t: "p", text: "Hubungan industrial berpangkal pada hubungan kerja. Pasal 1 angka 15 UU Ketenagakerjaan mendefinisikan hubungan kerja sebagai hubungan antara pengusaha dengan pekerja/buruh berdasarkan perjanjian kerja yang mempunyai unsur pekerjaan, upah, dan perintah. Unsur perintah menunjukkan bahwa kedudukan pekerja dan pengusaha tidak setara, karena pekerja berada dalam posisi subordinat. Uwiyono dkk. (2014) menjelaskan bahwa ketimpangan kedudukan inilah yang menjadi alasan hukum perburuhan memiliki sifat melindungi pekerja, sehingga tidak dapat diserahkan sepenuhnya pada asas kebebasan berkontrak. Senada dengan itu, Wijayanti (2009) menekankan bahwa hukum ketenagakerjaan memiliki sifat publik di samping sifat privatnya, karena negara ikut campur tangan untuk melindungi pihak yang lemah melalui norma-norma yang bersifat memaksa." },

  { t: "h3", text: "2. Pengertian dan Jenis Pemutusan Hubungan Kerja" },
  { t: "p", text: "Pasal 1 angka 25 UU Ketenagakerjaan mendefinisikan pemutusan hubungan kerja sebagai pengakhiran hubungan kerja karena suatu hal tertentu yang mengakibatkan berakhirnya hak dan kewajiban antara pekerja/buruh dan pengusaha. Definisi ini tidak diubah oleh UU Cipta Kerja. Husni (2020) mengelompokkan PHK ke dalam empat jenis, yaitu:" },
  { t: "list", style: "alpha", items: [
    "**PHK oleh pengusaha**, yaitu PHK atas inisiatif pengusaha karena alasan tertentu, misalnya efisiensi, kerugian, atau pelanggaran yang dilakukan pekerja;",
    "**PHK oleh pekerja/buruh**, yaitu ketika pekerja mengundurkan diri atau mengajukan permohonan PHK karena pengusaha melakukan perbuatan yang merugikan pekerja;",
    "**Hubungan kerja putus demi hukum**, misalnya karena berakhirnya jangka waktu perjanjian kerja waktu tertentu, pekerja memasuki usia pensiun, atau pekerja meninggal dunia;",
    "**PHK oleh pengadilan**, yaitu PHK yang terjadi berdasarkan putusan Pengadilan Hubungan Industrial.",
  ]},
  { t: "p", text: "Pada tingkat internasional, Konvensi ILO Nomor 158 Tahun 1982 tentang Pemutusan Hubungan Kerja atas Inisiatif Pengusaha (_Termination of Employment Convention_) menetapkan prinsip bahwa hubungan kerja tidak boleh diputus kecuali terdapat alasan yang sah yang berkaitan dengan kemampuan atau perilaku pekerja, atau didasarkan pada kebutuhan operasional perusahaan. Konvensi ini juga mengatur hak pekerja atas pemberitahuan terlebih dahulu, kesempatan membela diri, dan tunjangan pesangon (ILO, 1982). Meskipun Indonesia belum meratifikasi konvensi tersebut, prinsip-prinsipnya tercermin dalam pengaturan PHK di Indonesia dan dapat dijadikan tolok ukur dalam menilai kualitas perlindungan pekerja." },

  { t: "h3", text: "3. Pengertian dan Komponen Pesangon" },
  { t: "p", text: "Pasal 156 ayat (1) UU Ketenagakerjaan sebagaimana diubah oleh UU Cipta Kerja menyatakan bahwa dalam hal terjadi PHK, pengusaha wajib membayar uang pesangon dan/atau uang penghargaan masa kerja dan uang penggantian hak yang seharusnya diterima. Secara umum, hak-hak pekerja yang terkena PHK terdiri atas komponen berikut:" },
  { t: "list", style: "alpha", items: [
    "**Uang Pesangon (UP)**, yaitu kompensasi yang diberikan kepada pekerja karena kehilangan pekerjaan, yang besarnya didasarkan pada masa kerja;",
    "**Uang Penghargaan Masa Kerja (UPMK)**, yaitu penghargaan atas pengabdian pekerja yang diberikan kepada pekerja dengan masa kerja paling sedikit tiga tahun;",
    "**Uang Penggantian Hak (UPH)**, yaitu penggantian atas hak-hak pekerja yang belum diterima, seperti cuti tahunan yang belum diambil dan biaya pulang ke tempat asal;",
    "**Uang pisah**, yaitu uang yang diberikan kepada pekerja yang di-PHK karena alasan tertentu, seperti mengundurkan diri atau mangkir, yang besarnya diatur dalam perjanjian kerja, peraturan perusahaan, atau perjanjian kerja bersama.",
  ]},
  { t: "p", text: "Khakim (2014) menjelaskan bahwa pesangon pada hakikatnya berfungsi sebagai jaring pengaman bagi pekerja dan keluarganya selama masa transisi setelah kehilangan pekerjaan hingga memperoleh pekerjaan baru. Karena itu, besaran dan kepastian pembayaran pesangon menjadi indikator penting dari kualitas perlindungan hukum terhadap pekerja dalam suatu sistem hubungan industrial." },

  // ---- RM 1 ----
  { t: "h2", text: "B. Prosedur PHK yang Sah Menurut Peraturan Perundang-undangan Pasca UU Cipta Kerja" },
  { t: "h3", text: "1. Prinsip PHK sebagai Upaya Terakhir" },
  { t: "p", text: "Prinsip dasar pengaturan PHK di Indonesia adalah bahwa PHK merupakan upaya terakhir (_ultimum remedium_). Pasal 151 ayat (1) UU Ketenagakerjaan, baik sebelum maupun sesudah diubah oleh UU Cipta Kerja, menyatakan bahwa pengusaha, pekerja/buruh, serikat pekerja/serikat buruh, dan pemerintah harus mengupayakan agar tidak terjadi PHK. Dalam praktik, upaya pencegahan tersebut dapat dilakukan dengan berbagai langkah sebagaimana diarahkan dalam Surat Edaran Menteri Tenaga Kerja dan Transmigrasi Nomor SE.907/MEN/PHI-PPHI/X/2004 tentang Pencegahan Pemutusan Hubungan Kerja Massal, antara lain mengurangi upah dan fasilitas pekerja tingkat atas, membatasi atau menghapuskan kerja lembur, mengurangi jam kerja dan hari kerja, merumahkan pekerja secara bergilir untuk sementara waktu, tidak memperpanjang kontrak bagi pekerja yang masa kontraknya habis, serta memberikan pensiun bagi pekerja yang telah memenuhi syarat." },
  { t: "p", text: "Prinsip ini sejalan dengan nilai Hubungan Industrial Pancasila yang menempatkan pengusaha dan pekerja sebagai mitra dalam proses produksi. PHK yang dilakukan tanpa terlebih dahulu menempuh upaya pencegahan tidak hanya berpotensi melanggar hukum, tetapi juga merusak iklim hubungan industrial di perusahaan." },

  { t: "h3", text: "2. Alasan PHK yang Dibenarkan" },
  { t: "p", text: "Salah satu perubahan penting dalam UU Cipta Kerja adalah dimuatnya daftar alasan PHK secara terperinci dalam Pasal 154A ayat (1). Berdasarkan ketentuan tersebut, PHK dapat terjadi karena alasan-alasan berikut:" },
  { t: "list", style: "alpha", items: [
    "perusahaan melakukan penggabungan, peleburan, pengambilalihan, atau pemisahan perusahaan, dan pekerja tidak bersedia melanjutkan hubungan kerja atau pengusaha tidak bersedia menerima pekerja;",
    "perusahaan melakukan efisiensi, baik diikuti maupun tidak diikuti dengan penutupan perusahaan, yang disebabkan perusahaan mengalami kerugian;",
    "perusahaan tutup yang disebabkan mengalami kerugian secara terus-menerus selama dua tahun;",
    "perusahaan tutup yang disebabkan keadaan memaksa (_force majeure_);",
    "perusahaan dalam keadaan penundaan kewajiban pembayaran utang (PKPU);",
    "perusahaan pailit;",
    "adanya permohonan PHK yang diajukan oleh pekerja karena pengusaha melakukan perbuatan tertentu, misalnya menganiaya, menghina secara kasar, atau mengancam pekerja, atau tidak membayar upah tepat waktu selama tiga bulan berturut-turut atau lebih;",
    "adanya putusan lembaga penyelesaian perselisihan hubungan industrial yang menyatakan pengusaha tidak melakukan perbuatan sebagaimana dimaksud pada huruf g;",
    "pekerja mengundurkan diri atas kemauan sendiri;",
    "pekerja mangkir selama lima hari kerja atau lebih berturut-turut tanpa keterangan tertulis yang dilengkapi bukti sah dan telah dipanggil oleh pengusaha dua kali secara patut dan tertulis;",
    "pekerja melakukan pelanggaran ketentuan dalam perjanjian kerja, peraturan perusahaan, atau perjanjian kerja bersama dan sebelumnya telah diberikan surat peringatan pertama, kedua, dan ketiga secara berturut-turut;",
    "pekerja tidak dapat melakukan pekerjaan selama enam bulan akibat ditahan pihak yang berwajib karena diduga melakukan tindak pidana;",
    "pekerja mengalami sakit berkepanjangan atau cacat akibat kecelakaan kerja dan tidak dapat melakukan pekerjaannya setelah melampaui batas dua belas bulan;",
    "pekerja memasuki usia pensiun; atau",
    "pekerja meninggal dunia.",
  ]},
  { t: "p", text: "Selain alasan-alasan tersebut, Pasal 154A ayat (2) membuka kemungkinan ditetapkannya alasan PHK lainnya dalam perjanjian kerja, peraturan perusahaan, atau perjanjian kerja bersama. Perlu dicatat bahwa rumusan alasan efisiensi dalam UU Nomor 6 Tahun 2023 lebih sempit dibandingkan rumusan dalam UU Nomor 11 Tahun 2020, karena efisiensi harus disebabkan oleh kerugian perusahaan. Penegasan ini penting untuk mencegah alasan “efisiensi” dijadikan dalih PHK sewenang-wenang." },

  { t: "h3", text: "3. Larangan PHK" },
  { t: "p", text: "Di samping alasan yang dibenarkan, undang-undang juga menetapkan alasan-alasan yang dilarang dijadikan dasar PHK. Pasal 153 ayat (1) UU Ketenagakerjaan sebagaimana diubah oleh UU Cipta Kerja melarang pengusaha melakukan PHK dengan alasan pekerja: (a) berhalangan masuk kerja karena sakit menurut keterangan dokter selama waktu tidak melampaui dua belas bulan secara terus-menerus; (b) berhalangan menjalankan pekerjaan karena memenuhi kewajiban terhadap negara; (c) menjalankan ibadah yang diperintahkan agamanya; (d) menikah; (e) hamil, melahirkan, gugur kandungan, atau menyusui bayinya; (f) mempunyai pertalian darah dan/atau ikatan perkawinan dengan pekerja lain di dalam satu perusahaan; (g) mendirikan, menjadi anggota dan/atau pengurus serikat pekerja, atau melakukan kegiatan serikat pekerja; (h) mengadukan pengusaha kepada pihak yang berwajib mengenai perbuatan pengusaha yang melakukan tindak pidana kejahatan; (i) berbeda paham, agama, aliran politik, suku, warna kulit, golongan, jenis kelamin, kondisi fisik, atau status perkawinan; dan (j) dalam keadaan cacat tetap atau sakit akibat kecelakaan kerja yang jangka waktu penyembuhannya belum dapat dipastikan." },
  { t: "p", text: "Pasal 153 ayat (2) menegaskan bahwa PHK yang dilakukan dengan alasan-alasan tersebut batal demi hukum, dan pengusaha wajib mempekerjakan kembali pekerja yang bersangkutan. Khusus untuk larangan huruf (f), Mahkamah Konstitusi melalui Putusan Nomor 13/PUU-XV/2017 telah menghapus pengecualian yang sebelumnya memungkinkan larangan tersebut disimpangi melalui perjanjian kerja, peraturan perusahaan, atau perjanjian kerja bersama. Ketentuan larangan ini merupakan wujud perlindungan hak asasi pekerja yang tidak dapat ditawar oleh kesepakatan para pihak." },

  { t: "h3", text: "4. Tahapan Prosedur PHK" },
  { t: "p", text: "Prosedur PHK pasca UU Cipta Kerja diatur dalam Pasal 151 UU Ketenagakerjaan sebagaimana diubah oleh UU Cipta Kerja, Pasal 37 sampai dengan Pasal 39 PP 35/2021, serta Undang-Undang Nomor 2 Tahun 2004 tentang Penyelesaian Perselisihan Hubungan Industrial (UU PPHI). Secara ringkas, tahapan tersebut disajikan dalam Tabel 1 berikut." },
  { t: "caption", text: "Tabel 1. Tahapan Prosedur PHK Pasca UU Cipta Kerja" },
  { t: "table", widths: [600, 1800, 1900, 1700, 1937], header: ["No.", "Tahapan", "Dasar Hukum", "Jangka Waktu", "Keterangan"], rows: [
    ["1", "Pemberitahuan tertulis mengenai maksud dan alasan PHK kepada pekerja dan/atau serikat pekerja", "Pasal 151 ayat (2) UU Ketenagakerjaan jo. UU Cipta Kerja; Pasal 37 PP 35/2021", "Paling lama 14 hari kerja sebelum PHK (7 hari kerja bagi pekerja dalam masa percobaan)", "Disampaikan secara sah dan patut"],
    ["2", "Penolakan oleh pekerja (jika tidak setuju)", "Pasal 39 PP 35/2021", "Paling lama 7 hari kerja setelah pemberitahuan diterima", "Dibuat secara tertulis dan disertai alasan"],
    ["3", "Perundingan bipartit", "Pasal 151 ayat (3) UU Ketenagakerjaan jo. UU Cipta Kerja; Pasal 3 UU PPHI", "Paling lama 30 hari kerja", "Wajib secara musyawarah untuk mufakat (Putusan MK 168/PUU-XXI/2023); jika sepakat, dibuat perjanjian bersama dan didaftarkan ke PHI"],
    ["4", "Mediasi atau konsiliasi", "Pasal 4 dan Pasal 8–28 UU PPHI", "Paling lama 30 hari kerja", "Arbitrase tidak berlaku untuk perselisihan PHK; hasilnya berupa perjanjian bersama atau anjuran tertulis"],
    ["5", "Gugatan ke Pengadilan Hubungan Industrial (PHI)", "Pasal 5 dan Pasal 81–112 UU PPHI", "Putusan paling lama 50 hari kerja sejak sidang pertama", "Gugatan wajib dilampiri risalah mediasi atau konsiliasi"],
    ["6", "Kasasi ke Mahkamah Agung", "Pasal 110 dan Pasal 115 UU PPHI", "Diputus paling lama 30 hari kerja", "Putusan kasasi berkekuatan hukum tetap"],
  ]},
  { t: "p", text: "Tahap pertama adalah **pemberitahuan**. Apabila PHK tidak dapat dihindari, pengusaha wajib memberitahukan maksud dan alasan PHK kepada pekerja dan/atau serikat pekerja. Pemberitahuan dibuat dalam bentuk surat dan disampaikan secara sah dan patut paling lama 14 hari kerja sebelum PHK. Apabila pekerja menerima PHK tersebut, pengusaha harus melaporkan PHK kepada instansi yang bertanggung jawab di bidang ketenagakerjaan. Sebaliknya, apabila pekerja menolak, ia harus membuat surat penolakan beserta alasannya paling lama 7 hari kerja setelah menerima surat pemberitahuan." },
  { t: "p", text: "Tahap kedua adalah **perundingan bipartit**, yaitu perundingan langsung antara pengusaha dan pekerja atau serikat pekerja. Pasal 3 UU PPHI menetapkan bahwa perundingan bipartit harus diselesaikan paling lama 30 hari kerja. Jika perundingan mencapai kesepakatan, hasilnya dituangkan dalam perjanjian bersama yang ditandatangani para pihak dan didaftarkan di PHI. Jika perundingan gagal atau salah satu pihak menolak berunding, salah satu pihak dapat mencatatkan perselisihannya kepada dinas ketenagakerjaan setempat dengan melampirkan bukti upaya bipartit." },
  { t: "p", text: "Tahap ketiga adalah **penyelesaian melalui pihak ketiga**. Setelah perselisihan dicatatkan, dinas ketenagakerjaan menawarkan penyelesaian melalui konsiliasi. Apabila para pihak tidak memilih konsiliasi dalam waktu 7 hari kerja, penyelesaian dilimpahkan kepada mediator. Untuk perselisihan PHK, forum yang tersedia hanya mediasi atau konsiliasi, karena berdasarkan Pasal 4 ayat (3) UU PPHI arbitrase hanya berwenang menyelesaikan perselisihan kepentingan dan perselisihan antarserikat pekerja. Mediator wajib menyelesaikan tugasnya paling lama 30 hari kerja. Jika tidak tercapai kesepakatan, mediator mengeluarkan anjuran tertulis." },
  { t: "p", text: "Tahap keempat adalah **penyelesaian melalui pengadilan**. Apabila anjuran mediator atau konsiliator ditolak oleh salah satu pihak, pihak tersebut dapat mengajukan gugatan ke PHI pada pengadilan negeri setempat. PHI wajib memberikan putusan paling lama 50 hari kerja sejak sidang pertama. Terhadap putusan PHI mengenai perselisihan PHK, para pihak dapat mengajukan kasasi ke Mahkamah Agung, yang wajib diputus paling lama 30 hari kerja." },

  { t: "h3", text: "5. Penguatan Prosedur oleh Putusan MK Nomor 168/PUU-XXI/2023" },
  { t: "p", text: "Sebelum Putusan MK Nomor 168/PUU-XXI/2023, rumusan Pasal 151 hasil perubahan UU Cipta Kerja dikritik karena dianggap memberi ruang bagi pengusaha untuk melakukan PHK cukup dengan pemberitahuan. Hal ini berbeda dengan rumusan asli UU Ketenagakerjaan yang secara tegas menyatakan bahwa PHK hanya dapat dilakukan setelah memperoleh penetapan dari lembaga penyelesaian perselisihan hubungan industrial, dan bahwa PHK tanpa penetapan tersebut batal demi hukum (Pasal 151 ayat (3) dan Pasal 155 ayat (1) UU Ketenagakerjaan sebelum perubahan)." },
  { t: "p", text: "Putusan MK Nomor 168/PUU-XXI/2023 memperbaiki kelemahan tersebut melalui beberapa penegasan. **Pertama**, perundingan bipartit dalam Pasal 151 ayat (3) harus dimaknai sebagai perundingan yang dilakukan secara musyawarah untuk mufakat antara pengusaha dan pekerja atau serikat pekerja. **Kedua**, Pasal 151 ayat (4) dimaknai bahwa apabila perundingan bipartit tidak mencapai kesepakatan, PHK hanya dapat dilakukan setelah memperoleh penetapan dari lembaga penyelesaian perselisihan hubungan industrial yang putusannya telah berkekuatan hukum tetap. **Ketiga**, kewajiban pengusaha untuk tetap membayar upah dan hak lainnya selama proses penyelesaian perselisihan (upah proses) dalam Pasal 157A ayat (3) berlaku sampai berakhirnya proses penyelesaian perselisihan hubungan industrial yang berkekuatan hukum tetap." },
  { t: "p", text: "Selama proses tersebut, Pasal 157A menegaskan bahwa pengusaha dan pekerja tetap melaksanakan kewajibannya masing-masing. Pengusaha dapat melakukan tindakan skorsing kepada pekerja yang sedang dalam proses PHK, tetapi tetap wajib membayar upah beserta hak-hak lain yang biasa diterima pekerja. Dengan demikian, pasca Putusan MK tersebut, PHK yang ditolak oleh pekerja tidak dapat berlaku efektif hanya dengan surat pemberitahuan sepihak." },

  { t: "h3", text: "6. Analisis Prosedur PHK dari Perspektif Hubungan Industrial" },
  { t: "p", text: "Berdasarkan uraian di atas, prosedur PHK yang sah pasca UU Cipta Kerja dan Putusan MK Nomor 168/PUU-XXI/2023 dapat dirumuskan dalam tiga syarat kumulatif. Syarat pertama adalah syarat materiil, yaitu PHK harus didasarkan pada salah satu alasan yang dibenarkan dalam Pasal 154A dan tidak boleh didasarkan pada alasan yang dilarang dalam Pasal 153. Syarat kedua adalah syarat formil, yaitu PHK harus didahului dengan pemberitahuan tertulis, dan jika ditolak, harus ditempuh melalui bipartit, mediasi atau konsiliasi, hingga putusan pengadilan yang berkekuatan hukum tetap. Syarat ketiga adalah syarat pemenuhan hak, yaitu pengusaha wajib membayar hak-hak pekerja yang timbul akibat PHK, termasuk upah selama proses perselisihan." },
  { t: "p", text: "Dari perspektif teori sistem Dunlop, perubahan yang dibawa UU Cipta Kerja pada awalnya menggeser keseimbangan kekuatan ke arah pengusaha dengan mengedepankan fleksibilitas pasar kerja. Putusan MK Nomor 168/PUU-XXI/2023 kemudian berfungsi sebagai koreksi yang mengembalikan peran perundingan dan lembaga penyelesaian perselisihan sebagai penyeimbang. Hal ini menunjukkan bahwa jaringan aturan dalam hubungan industrial tidak bersifat statis, melainkan terus dibentuk ulang melalui interaksi antara pengusaha, pekerja, dan negara, termasuk melalui lembaga peradilan konstitusi." },
  { t: "p", text: "Dalam praktik, tantangan utama bukan hanya terletak pada rumusan norma, tetapi juga pada kepatuhan. Banyak pekerja, terutama yang tidak tergabung dalam serikat pekerja, tidak memahami hak mereka untuk menolak PHK dan menempuh jalur penyelesaian perselisihan. Oleh karena itu, peran serikat pekerja dan lembaga kerja sama bipartit di tingkat perusahaan menjadi sangat penting untuk memastikan bahwa prosedur PHK dijalankan sesuai hukum." },

  // ---- RM 2 ----
  { t: "h2", text: "C. Perbandingan Hak Pesangon Sebelum dan Sesudah UU Cipta Kerja" },
  { t: "h3", text: "1. Tabel Dasar Uang Pesangon dan Uang Penghargaan Masa Kerja" },
  { t: "p", text: "Besaran dasar uang pesangon dan uang penghargaan masa kerja ditentukan berdasarkan masa kerja. Menariknya, tabel dasar tersebut tidak berubah secara substansial. Tabel dasar yang semula tercantum dalam Pasal 156 ayat (2) dan ayat (3) UU Ketenagakerjaan dipertahankan dalam UU Cipta Kerja dan diulang dalam Pasal 40 ayat (2) dan ayat (3) PP 35/2021, sebagaimana disajikan dalam Tabel 2 dan Tabel 3 berikut." },
  { t: "caption", text: "Tabel 2. Besaran Dasar Uang Pesangon (UP)" },
  { t: "table", widths: [800, 3937, 3200], header: ["No.", "Masa Kerja", "Uang Pesangon"], rows: [
    ["1", "Kurang dari 1 tahun", "1 bulan upah"],
    ["2", "1 tahun atau lebih, tetapi kurang dari 2 tahun", "2 bulan upah"],
    ["3", "2 tahun atau lebih, tetapi kurang dari 3 tahun", "3 bulan upah"],
    ["4", "3 tahun atau lebih, tetapi kurang dari 4 tahun", "4 bulan upah"],
    ["5", "4 tahun atau lebih, tetapi kurang dari 5 tahun", "5 bulan upah"],
    ["6", "5 tahun atau lebih, tetapi kurang dari 6 tahun", "6 bulan upah"],
    ["7", "6 tahun atau lebih, tetapi kurang dari 7 tahun", "7 bulan upah"],
    ["8", "7 tahun atau lebih, tetapi kurang dari 8 tahun", "8 bulan upah"],
    ["9", "8 tahun atau lebih", "9 bulan upah"],
  ], center: [0, 2] },
  { t: "source", text: "Sumber: Pasal 156 ayat (2) UU Ketenagakerjaan jo. UU Cipta Kerja; Pasal 40 ayat (2) PP 35/2021." },
  { t: "caption", text: "Tabel 3. Besaran Dasar Uang Penghargaan Masa Kerja (UPMK)" },
  { t: "table", widths: [800, 3937, 3200], header: ["No.", "Masa Kerja", "Uang Penghargaan Masa Kerja"], rows: [
    ["1", "3 tahun atau lebih, tetapi kurang dari 6 tahun", "2 bulan upah"],
    ["2", "6 tahun atau lebih, tetapi kurang dari 9 tahun", "3 bulan upah"],
    ["3", "9 tahun atau lebih, tetapi kurang dari 12 tahun", "4 bulan upah"],
    ["4", "12 tahun atau lebih, tetapi kurang dari 15 tahun", "5 bulan upah"],
    ["5", "15 tahun atau lebih, tetapi kurang dari 18 tahun", "6 bulan upah"],
    ["6", "18 tahun atau lebih, tetapi kurang dari 21 tahun", "7 bulan upah"],
    ["7", "21 tahun atau lebih, tetapi kurang dari 24 tahun", "8 bulan upah"],
    ["8", "24 tahun atau lebih", "10 bulan upah"],
  ], center: [0, 2] },
  { t: "source", text: "Sumber: Pasal 156 ayat (3) UU Ketenagakerjaan jo. UU Cipta Kerja; Pasal 40 ayat (3) PP 35/2021." },
  { t: "p", text: "Meskipun tabel dasarnya sama, terdapat perbedaan mendasar pada sifat ketentuan tersebut. Dalam UU Ketenagakerjaan, Pasal 156 ayat (2) menggunakan frasa “perhitungan uang pesangon … paling sedikit sebagai berikut”, sehingga tabel tersebut merupakan batas minimal dan pengusaha dapat memberikan lebih. UU Cipta Kerja mengubah frasa tersebut menjadi “diberikan dengan ketentuan sebagai berikut”, sehingga tabel pesangon berubah sifat menjadi besaran yang baku. Perubahan ini kemudian dikoreksi oleh Putusan MK Nomor 168/PUU-XXI/2023 yang menyatakan frasa “diberikan dengan ketentuan sebagai berikut” bertentangan dengan UUD 1945 sepanjang tidak dimaknai “paling sedikit”. Dengan demikian, saat ini tabel pesangon kembali berfungsi sebagai batas minimal." },

  { t: "h3", text: "2. Perubahan Komponen Uang Penggantian Hak" },
  { t: "p", text: "Perbedaan berikutnya terdapat pada komponen uang penggantian hak. Berdasarkan Pasal 156 ayat (4) UU Ketenagakerjaan sebelum perubahan, UPH meliputi: (a) cuti tahunan yang belum diambil dan belum gugur; (b) biaya atau ongkos pulang bagi pekerja dan keluarganya ke tempat pekerja diterima bekerja; (c) **penggantian perumahan serta pengobatan dan perawatan yang ditetapkan 15 persen dari uang pesangon dan/atau uang penghargaan masa kerja** bagi yang memenuhi syarat; dan (d) hal-hal lain yang ditetapkan dalam perjanjian kerja, peraturan perusahaan, atau perjanjian kerja bersama." },
  { t: "p", text: "UU Cipta Kerja menghapus komponen penggantian perumahan serta pengobatan dan perawatan sebesar 15 persen tersebut. Akibatnya, UPH saat ini hanya terdiri atas cuti tahunan yang belum diambil, biaya pulang ke tempat asal, dan hal-hal lain yang ditetapkan dalam perjanjian kerja, peraturan perusahaan, atau perjanjian kerja bersama. Walaupun terlihat kecil, penghapusan ini berdampak cukup berarti karena nilainya dihitung dari total pesangon dan penghargaan masa kerja." },

  { t: "h3", text: "3. Perbandingan Faktor Pengali Berdasarkan Alasan PHK" },
  { t: "p", text: "Perubahan paling signifikan terletak pada faktor pengali pesangon. Dalam UU Ketenagakerjaan, faktor pengali diatur langsung dalam pasal-pasal undang-undang (Pasal 160 sampai dengan Pasal 172) dengan besaran satu atau dua kali ketentuan dasar. Setelah UU Cipta Kerja, pasal-pasal tersebut dihapus dan pengaturannya didelegasikan kepada PP 35/2021 dengan faktor pengali yang lebih bervariasi, yaitu 0,5; 0,75; 1; 1,75; dan 2 kali. Perbandingannya disajikan dalam Tabel 4." },
  { t: "caption", text: "Tabel 4. Perbandingan Faktor Pengali Uang Pesangon Berdasarkan Alasan PHK" },
  { t: "table", widths: [2837, 2550, 2550], header: ["Alasan PHK", "UU 13/2003 (sebelum UU Cipta Kerja)", "PP 35/2021 (sesudah UU Cipta Kerja)"], rows: [
    ["Penggabungan/peleburan/perubahan status, pekerja tidak bersedia melanjutkan", "1 × UP, 1 × UPMK, UPH (Ps. 163 ayat 1)", "1 × UP, 1 × UPMK, UPH (Ps. 41)"],
    ["Penggabungan/peleburan, pengusaha tidak bersedia menerima pekerja", "2 × UP, 1 × UPMK, UPH (Ps. 163 ayat 2)", "1 × UP, 1 × UPMK, UPH (Ps. 41)"],
    ["Pengambilalihan yang mengubah syarat kerja, pekerja tidak bersedia melanjutkan", "1 × UP, 1 × UPMK, UPH (Ps. 163 ayat 1)", "0,5 × UP, 1 × UPMK, UPH (Ps. 42 ayat 2)"],
    ["Efisiensi karena perusahaan mengalami kerugian", "2 × UP, 1 × UPMK, UPH (Ps. 164 ayat 3)", "0,5 × UP, 1 × UPMK, UPH (Ps. 43 ayat 1)"],
    ["Efisiensi untuk mencegah kerugian", "2 × UP, 1 × UPMK, UPH (Ps. 164 ayat 3)", "1 × UP, 1 × UPMK, UPH (Ps. 43 ayat 2)"],
    ["Perusahaan tutup karena rugi terus-menerus 2 tahun", "1 × UP, 1 × UPMK, UPH (Ps. 164 ayat 1)", "0,5 × UP, 1 × UPMK, UPH (Ps. 44 ayat 1)"],
    ["Perusahaan tutup bukan karena rugi", "2 × UP, 1 × UPMK, UPH (Ps. 164 ayat 3)", "1 × UP, 1 × UPMK, UPH (Ps. 44 ayat 2)"],
    ["Keadaan memaksa (force majeure), perusahaan tutup", "1 × UP, 1 × UPMK, UPH (Ps. 164 ayat 1)", "0,5 × UP, 1 × UPMK, UPH (Ps. 45 ayat 1)"],
    ["Keadaan memaksa, perusahaan tidak tutup", "Tidak diatur secara khusus", "0,75 × UP, 1 × UPMK, UPH (Ps. 45 ayat 2)"],
    ["Perusahaan pailit", "1 × UP, 1 × UPMK, UPH (Ps. 165)", "0,5 × UP, 1 × UPMK, UPH (Ps. 47)"],
    ["Permohonan PHK oleh pekerja karena perbuatan pengusaha", "2 × UP, 1 × UPMK, UPH (Ps. 169 ayat 2)", "1 × UP, 1 × UPMK, UPH (Ps. 48)"],
    ["Pekerja melakukan pelanggaran setelah diberi surat peringatan", "1 × UP, 1 × UPMK, UPH (Ps. 161 ayat 3)", "0,5 × UP, 1 × UPMK, UPH (Ps. 52 ayat 1)"],
    ["Sakit berkepanjangan/cacat akibat kecelakaan kerja lebih dari 12 bulan", "2 × UP, 2 × UPMK, UPH (Ps. 172)", "2 × UP, 1 × UPMK, UPH (Ps. 55 ayat 2)"],
    ["Pensiun (tidak diikutsertakan dalam program pensiun)", "2 × UP, 1 × UPMK, UPH (Ps. 167 ayat 5)", "1,75 × UP, 1 × UPMK, UPH (Ps. 56)"],
    ["Pekerja meninggal dunia", "2 × UP, 1 × UPMK, UPH (Ps. 166)", "2 × UP, 1 × UPMK, UPH (Ps. 57)"],
    ["Mengundurkan diri atau mangkir", "UPH dan uang pisah (Ps. 162, 168)", "UPH dan uang pisah (Ps. 50, 51)"],
  ]},
  { t: "source", text: "Sumber: Diolah dari UU Nomor 13 Tahun 2003 dan PP Nomor 35 Tahun 2021." },
  { t: "p", text: "Tabel 4 menunjukkan bahwa untuk sebagian besar alasan PHK, faktor pengali uang pesangon pasca UU Cipta Kerja lebih rendah dibandingkan sebelumnya. Penurunan paling tajam terjadi pada PHK karena efisiensi akibat kerugian, yang semula dua kali ketentuan dasar menjadi hanya setengah kali ketentuan dasar. Hanya PHK karena pekerja meninggal dunia serta alasan penggabungan atau perubahan status yang pekerjanya tidak bersedia melanjutkan hubungan kerja yang besarnya tetap sama. Di sisi lain, PP 35/2021 mengatur beberapa situasi yang sebelumnya tidak diatur secara khusus, seperti keadaan memaksa yang tidak menyebabkan perusahaan tutup dan PKPU, sehingga memberikan kepastian yang lebih rinci." },

  { t: "h3", text: "4. Simulasi Perhitungan Pesangon" },
  { t: "p", text: "Untuk memperjelas dampak perubahan tersebut, berikut disajikan simulasi perhitungan hak pekerja dengan asumsi sebagai berikut: pekerja memiliki masa kerja 10 tahun, upah per bulan (upah pokok ditambah tunjangan tetap) sebesar Rp4.000.000, dan terkena PHK karena perusahaan melakukan efisiensi akibat mengalami kerugian. Berdasarkan Tabel 2 dan Tabel 3, masa kerja 10 tahun menghasilkan UP dasar sebesar 9 bulan upah dan UPMK sebesar 4 bulan upah. Hak cuti yang belum diambil dan biaya pulang diasumsikan nihil." },
  { t: "caption", text: "Tabel 5. Simulasi Perhitungan Hak Pekerja yang Terkena PHK karena Efisiensi Akibat Kerugian" },
  { t: "table", widths: [2437, 2750, 2750], header: ["Komponen", "UU 13/2003 (Ps. 164 ayat 3)", "UU Cipta Kerja (Ps. 43 ayat 1 PP 35/2021)"], rows: [
    ["Uang Pesangon", "2 × 9 × Rp4.000.000 = Rp72.000.000", "0,5 × 9 × Rp4.000.000 = Rp18.000.000"],
    ["Uang Penghargaan Masa Kerja", "4 × Rp4.000.000 = Rp16.000.000", "4 × Rp4.000.000 = Rp16.000.000"],
    ["Penggantian perumahan dan pengobatan (15%)", "15% × Rp88.000.000 = Rp13.200.000", "Dihapus (Rp0)"],
    ["**Total dibayar pengusaha**", "**Rp101.200.000**", "**Rp34.000.000**"],
    ["Manfaat uang tunai JKP (dibayar BPJS Ketenagakerjaan)", "Belum ada", "60% × Rp4.000.000 × 6 bulan = Rp14.400.000"],
    ["**Total diterima pekerja**", "**Rp101.200.000**", "**Rp48.400.000**"],
  ]},
  { t: "source", text: "Sumber: Perhitungan penulis berdasarkan UU Nomor 13 Tahun 2003, PP Nomor 35 Tahun 2021, dan PP Nomor 6 Tahun 2025." },
  { t: "p", text: "Simulasi tersebut menunjukkan bahwa pada kasus PHK karena efisiensi akibat kerugian, kewajiban pengusaha turun dari Rp101.200.000 menjadi Rp34.000.000, atau berkurang sekitar 66,4 persen. Setelah ditambah manfaat uang tunai JKP pun, total yang diterima pekerja hanya Rp48.400.000, atau sekitar 47,8 persen dari hak yang akan diterima berdasarkan UU Ketenagakerjaan. Jika PHK dilakukan karena efisiensi untuk mencegah kerugian, pengusaha membayar 1 × UP ditambah UPMK, yaitu Rp36.000.000 + Rp16.000.000 = Rp52.000.000, yang tetap jauh di bawah ketentuan lama." },
  { t: "p", text: "Secara umum, perubahan ini sering diringkas dalam perdebatan publik sebagai penurunan pesangon maksimal dari sekitar 32 kali upah menjadi 25 kali upah. Angka 32 kali berasal dari ketentuan lama, yaitu 2 × 9 bulan UP ditambah 10 bulan UPMK dan 15 persen penggantian hak, sedangkan angka 25 kali berasal dari 19 kali upah yang dibayar pengusaha (9 bulan UP dan 10 bulan UPMK) ditambah manfaat JKP yang pada waktu itu disetarakan dengan 6 kali upah." },

  { t: "h3", text: "5. Jaminan Kehilangan Pekerjaan sebagai Kompensasi" },
  { t: "p", text: "Sebagai penyeimbang dari penurunan pesangon, UU Cipta Kerja menambahkan program Jaminan Kehilangan Pekerjaan (JKP) ke dalam sistem jaminan sosial nasional yang diselenggarakan oleh BPJS Ketenagakerjaan. Program ini semula diatur dalam Peraturan Pemerintah Nomor 37 Tahun 2021 dan kemudian diubah dengan Peraturan Pemerintah Nomor 6 Tahun 2025. JKP memberikan tiga jenis manfaat, yaitu uang tunai, akses informasi pasar kerja, dan pelatihan kerja." },
  { t: "p", text: "Berdasarkan PP Nomor 6 Tahun 2025, manfaat uang tunai JKP ditingkatkan menjadi 60 persen dari upah yang dilaporkan selama enam bulan, dengan batas atas upah sebesar Rp5.000.000. Sebelumnya, manfaat yang diberikan hanya 45 persen upah untuk tiga bulan pertama dan 25 persen upah untuk tiga bulan berikutnya. Iuran program ini tidak dibebankan kepada pekerja, melainkan berasal dari pemerintah pusat dan rekomposisi iuran program jaminan sosial lainnya. Meskipun demikian, JKP hanya dapat dinikmati oleh pekerja yang terdaftar sebagai peserta dan memenuhi masa iur tertentu. Pekerja yang tidak didaftarkan oleh pengusahanya ke BPJS Ketenagakerjaan tidak memperoleh manfaat ini, sehingga fungsi JKP sebagai kompensasi sangat bergantung pada kepatuhan pengusaha." },

  { t: "h3", text: "6. Dampak Putusan MK Nomor 168/PUU-XXI/2023 terhadap Hak Pesangon" },
  { t: "p", text: "Putusan MK Nomor 168/PUU-XXI/2023 membawa dampak penting terhadap pengaturan pesangon. Dengan dipulihkannya makna “paling sedikit” dalam Pasal 156 ayat (2), besaran pesangon dalam peraturan perundang-undangan kembali menjadi standar minimal. Konsekuensinya, pekerja dan serikat pekerja memiliki dasar hukum yang kuat untuk merundingkan besaran pesangon yang lebih tinggi melalui perjanjian kerja, peraturan perusahaan, atau perjanjian kerja bersama. Putusan ini juga dinilai membuka peluang bagi pekerja yang mengalami PHK untuk memperoleh pesangon lebih tinggi daripada yang ditentukan dalam peraturan pelaksana." },
  { t: "p", text: "Namun demikian, putusan tersebut tidak secara langsung membatalkan faktor pengali dalam PP 35/2021. Hal ini menimbulkan persoalan keselarasan antara undang-undang dan peraturan pelaksananya. Nababan dkk. (2022) bahkan telah berargumen sebelum putusan MK bahwa ketentuan pesangon dalam PP 35/2021 yang mengatur besaran lebih rendah daripada ketentuan dalam undang-undang induknya tidak dapat dibenarkan secara hukum, karena peraturan pelaksana tidak boleh mengurangi hak yang diberikan oleh undang-undang. Dengan dipulihkannya frasa “paling sedikit”, argumen tersebut menjadi semakin relevan, sehingga faktor pengali di bawah satu kali dalam PP 35/2021 layak ditinjau ulang." },

  { t: "h3", text: "7. Analisis Perbandingan dan Arah Pengaturan ke Depan" },
  { t: "p", text: "Apabila dianalisis secara menyeluruh, perbandingan hak pesangon sebelum dan sesudah UU Cipta Kerja menunjukkan adanya pergeseran paradigma. UU Ketenagakerjaan menempatkan pesangon sebagai instrumen perlindungan yang sepenuhnya menjadi tanggung jawab pengusaha dengan besaran yang relatif tinggi. Sebaliknya, UU Cipta Kerja menurunkan beban pengusaha dan membagi sebagian risiko kehilangan pekerjaan kepada sistem jaminan sosial melalui JKP. Pendekatan ini sejalan dengan gagasan fleksibilitas pasar kerja yang dianut pemerintah untuk menarik investasi." },
  { t: "p", text: "Dari sudut pandang pengusaha, besaran pesangon yang tinggi dalam UU Ketenagakerjaan kerap dinilai memberatkan, terutama bagi perusahaan yang sedang mengalami kesulitan keuangan, sehingga dalam praktik banyak pesangon yang tidak dibayarkan secara penuh. Dari sudut pandang pekerja, penurunan pesangon berarti melemahnya jaring pengaman ketika kehilangan pekerjaan, apalagi di tengah meningkatnya angka PHK. Dengan kata lain, persoalan utama pesangon di Indonesia bukan hanya soal besaran, tetapi juga soal kepastian pembayaran. Tingginya besaran pesangon di atas kertas tidak berarti banyak apabila pekerja tidak benar-benar menerimanya." },
  { t: "p", text: "Kesadaran akan persoalan kepastian pembayaran ini tampak dalam pembahasan Rancangan Undang-Undang Pelindungan Ketenagakerjaan yang disusun sebagai tindak lanjut Putusan MK Nomor 168/PUU-XXI/2023. Draf RUU tersebut mengusulkan skema jaminan pesangon, yaitu pengusaha menyetorkan atau mencicil dana pesangon kepada BPJS Ketenagakerjaan sehingga hak pekerja tetap tersedia ketika terjadi PHK, termasuk ketika perusahaan mengalami masalah keuangan (Fortune Indonesia, 2026). Apabila skema ini disahkan dan dirancang dengan baik, maka dua persoalan sekaligus dapat diatasi, yaitu kecukupan besaran pesangon dan kepastian pembayarannya." },
  { t: "p", text: "Dari perspektif Hubungan Industrial Pancasila, pengaturan pesangon yang ideal adalah pengaturan yang menyeimbangkan kelangsungan usaha dengan perlindungan pekerja. Keseimbangan ini tidak hanya dicapai melalui peraturan perundang-undangan, tetapi juga melalui dialog sosial di tingkat perusahaan. Perjanjian kerja bersama yang dirundingkan oleh serikat pekerja yang kuat dapat menetapkan pesangon di atas standar minimal, sedangkan lembaga kerja sama bipartit dapat menjadi forum untuk mencari alternatif selain PHK ketika perusahaan menghadapi kesulitan." },

  // ================= BAB III =================
  { t: "h1", bab: "BAB III", text: "PENUTUP" },
  { t: "h2", text: "A. Kesimpulan" },
  { t: "p", text: "Berdasarkan pembahasan yang telah diuraikan, dapat ditarik kesimpulan sebagai berikut:", noIndent: true },
  { t: "list", style: "decimal", items: [
    "Prosedur PHK yang sah pasca UU Cipta Kerja harus memenuhi tiga syarat kumulatif. Syarat materiil mengharuskan PHK didasarkan pada alasan yang dibenarkan dalam Pasal 154A dan tidak didasarkan pada alasan yang dilarang dalam Pasal 153; PHK dengan alasan yang dilarang batal demi hukum. Syarat formil mengharuskan PHK diawali dengan pemberitahuan tertulis paling lama 14 hari kerja sebelumnya. Jika pekerja menolak, PHK harus diselesaikan melalui perundingan bipartit secara musyawarah untuk mufakat, dilanjutkan dengan mediasi atau konsiliasi, dan apabila tetap tidak tercapai kesepakatan, PHK hanya dapat dilakukan setelah ada putusan lembaga penyelesaian perselisihan hubungan industrial yang berkekuatan hukum tetap. Syarat pemenuhan hak mengharuskan pengusaha membayar hak-hak pekerja, termasuk upah selama proses perselisihan hingga putusan berkekuatan hukum tetap. Putusan MK Nomor 168/PUU-XXI/2023 berperan penting dalam memulihkan perlindungan prosedural yang sempat melemah akibat UU Cipta Kerja.",
    "Perbandingan hak pesangon sebelum dan sesudah UU Cipta Kerja menunjukkan bahwa tabel dasar uang pesangon dan uang penghargaan masa kerja tidak berubah, tetapi terjadi tiga perubahan penting: (a) sifat ketentuan pesangon sempat berubah dari batas minimal menjadi besaran baku, sebelum dipulihkan kembali menjadi batas minimal oleh Putusan MK Nomor 168/PUU-XXI/2023; (b) komponen penggantian perumahan serta pengobatan dan perawatan sebesar 15 persen dihapus; dan (c) faktor pengali pesangon dalam PP 35/2021 umumnya lebih rendah, berkisar antara 0,5 hingga 2 kali, dibandingkan UU Ketenagakerjaan yang berkisar antara 1 hingga 2 kali. Dalam simulasi PHK karena efisiensi akibat kerugian, kewajiban pengusaha turun sekitar 66,4 persen. Penurunan ini hanya sebagian dikompensasi oleh program JKP yang memberikan manfaat uang tunai 60 persen upah selama enam bulan.",
  ]},
  { t: "h2", text: "B. Saran" },
  { t: "list", style: "decimal", items: [
    "**Bagi pemerintah dan DPR**, Rancangan Undang-Undang Pelindungan Ketenagakerjaan hendaknya menyelaraskan seluruh ketentuan PHK dan pesangon dengan Putusan MK Nomor 168/PUU-XXI/2023, meninjau ulang faktor pengali pesangon di bawah satu kali, serta merancang skema jaminan pesangon melalui BPJS Ketenagakerjaan agar kepastian pembayaran pesangon benar-benar terjamin.",
    "**Bagi pengusaha**, PHK hendaknya benar-benar ditempatkan sebagai upaya terakhir, didahului langkah-langkah pencegahan, dan dilaksanakan sesuai prosedur hukum. Pengusaha juga wajib mendaftarkan seluruh pekerjanya ke BPJS Ketenagakerjaan agar pekerja dapat memperoleh manfaat JKP.",
    "**Bagi pekerja dan serikat pekerja**, penting untuk memahami hak-hak yang timbul akibat PHK, termasuk hak menolak PHK dan menempuh jalur penyelesaian perselisihan. Serikat pekerja hendaknya memanfaatkan perundingan perjanjian kerja bersama untuk menetapkan besaran pesangon di atas standar minimal.",
    "**Bagi mahasiswa dan akademisi**, perlu dilakukan kajian lanjutan mengenai efektivitas pelaksanaan Putusan MK Nomor 168/PUU-XXI/2023 dan undang-undang ketenagakerjaan yang baru setelah disahkan, khususnya terkait tingkat kepatuhan pembayaran pesangon di lapangan.",
  ]},
];

const pustaka = [
  { group: "Buku" },
  "Dunlop, J. T. (1958). _Industrial Relations Systems_. New York: Henry Holt and Company.",
  "Husni, L. (2020). _Pengantar Hukum Ketenagakerjaan Indonesia_ (Edisi Revisi). Depok: Rajawali Pers.",
  "Khakim, A. (2014). _Dasar-Dasar Hukum Ketenagakerjaan Indonesia_ (Edisi Revisi). Bandung: Citra Aditya Bakti.",
  "Uwiyono, A., Hoesin, S. H., Suryandono, W., & Kiswandari, M. (2014). _Asas-Asas Hukum Perburuhan_. Jakarta: RajaGrafindo Persada.",
  "Wijayanti, A. (2009). _Hukum Ketenagakerjaan Pasca Reformasi_. Jakarta: Sinar Grafika.",
  { group: "Jurnal dan Dokumen Internasional" },
  "International Labour Organization. (1982). _Termination of Employment Convention, 1982 (No. 158)_. Geneva: International Labour Organization.",
  "Nababan, A. K., Junaidi, M., Sudarmanto, K., & Arifin, Z. (2022). Keabsahan Materi Muatan Terkait Uang Pesangon dalam Peraturan Perundang-Undangan. _Jurnal USM Law Review_, 5(1), 314–330. https://doi.org/10.26623/julr.v5i1.4808",
  { group: "Peraturan Perundang-undangan dan Putusan" },
  "Undang-Undang Dasar Negara Republik Indonesia Tahun 1945.",
  "Undang-Undang Nomor 13 Tahun 2003 tentang Ketenagakerjaan.",
  "Undang-Undang Nomor 2 Tahun 2004 tentang Penyelesaian Perselisihan Hubungan Industrial.",
  "Undang-Undang Nomor 6 Tahun 2023 tentang Penetapan Peraturan Pemerintah Pengganti Undang-Undang Nomor 2 Tahun 2022 tentang Cipta Kerja menjadi Undang-Undang.",
  "Peraturan Pemerintah Nomor 35 Tahun 2021 tentang Perjanjian Kerja Waktu Tertentu, Alih Daya, Waktu Kerja dan Waktu Istirahat, dan Pemutusan Hubungan Kerja.",
  "Peraturan Pemerintah Nomor 6 Tahun 2025 tentang Perubahan atas Peraturan Pemerintah Nomor 37 Tahun 2021 tentang Penyelenggaraan Program Jaminan Kehilangan Pekerjaan.",
  "Surat Edaran Menteri Tenaga Kerja dan Transmigrasi Nomor SE.907/MEN/PHI-PPHI/X/2004 tentang Pencegahan Pemutusan Hubungan Kerja Massal.",
  "Putusan Mahkamah Konstitusi Nomor 13/PUU-XV/2017.",
  "Putusan Mahkamah Konstitusi Nomor 91/PUU-XVIII/2020.",
  "Putusan Mahkamah Konstitusi Nomor 168/PUU-XXI/2023.",
  { group: "Sumber Internet" },
  "Bisnis.com. (2026, 21 Januari). _Kemnaker Blak-blakan Penyebab PHK 2025 Tembus 88.519 Pekerja_. https://ekonomi.bisnis.com/read/20260121/12/1945940/kemnaker-blak-blakan-penyebab-phk-2025-tembus-88519-pekerja",
  "Fortune Indonesia. (2026). _RUU Pelindungan Ketenagakerjaan Usul Dana Pesangon BPJS_. https://www.fortuneidn.com/news/ruu-ketenagakerjaan-pengusaha-setor-uang-pesangon-pekerja-ke-bpjs-00-my5jv-yj84m9",
  "Bisnis.com. (2026, 24 September). _DPR Target RUU Pelindungan Ketenagakerjaan Disahkan 8 Oktober_. https://ekonomi.bisnis.com/read/20260924/12/2006916/dpr-target-ruu-pelindungan-ketenagakerjaan-disahkan-8-oktober",
];

module.exports = { JUDUL, kataPengantar, body, pustaka };
