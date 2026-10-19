export type Ranking = {
  name: string;
  /** YKS'de üniversite, LGS'de kazanılan lise */
  school: string;
  department?: string;
  image: string;
};

// Yeni bir derece eklemek için: görseli public/derecelerimiz/<sınav>/ altına
// koyup aşağıdaki ilgili listeye bir satır eklemek yeterli.
export const yksRankings: Ranking[] = [
  { name: 'Fatma Sümeyye Asker', school: 'Bursa Uludağ Üniversitesi', department: 'Tıp Fakültesi', image: '/derecelerimiz/yks/fatma-sumeyye-asker.jpg' },
  { name: 'Ayşe Şevval Şabanoğlu', school: 'Sebahattin Zaim Üniversitesi', department: 'Tıp Fakültesi', image: '/derecelerimiz/yks/ayse-sevval-sabanoglu.jpg' },
  { name: 'Yağmur Hıdır', school: 'Haliç Üniversitesi', department: 'Tıp Fakültesi', image: '/derecelerimiz/yks/yagmur-hidir.jpg' },
  { name: 'Fatih Burak Baş', school: 'Sakarya Üniversitesi', department: 'Tıp Fakültesi', image: '/derecelerimiz/yks/fatih-burak-bas.jpg' },
  { name: 'Burhan Çelik', school: 'Çankırı Üniversitesi', department: 'Diş Hekimliği Fakültesi', image: '/derecelerimiz/yks/burhan-celik.jpg' },
  { name: 'Umutcan Kılıçarslan', school: 'İstanbul Teknik Üniversitesi', department: 'Elektrik Mühendisliği', image: '/derecelerimiz/yks/umutcan-kilicarslan.jpg' },
  { name: 'Ahmet Karakurt', school: 'Galatasaray Üniversitesi', department: 'Matematik', image: '/derecelerimiz/yks/ahmet-karakurt.jpg' },
  { name: 'Enes Gökalp', school: 'İstanbul Üniversitesi', department: 'Hukuk Fakültesi', image: '/derecelerimiz/yks/enes-gokalp.jpg' },
  { name: 'Esra Yağıbasan', school: 'Kocaeli Üniversitesi', department: 'Hukuk Fakültesi', image: '/derecelerimiz/yks/esra-yagibasan.jpg' },
  { name: 'İrem Özel', school: 'Marmara Üniversitesi', department: 'Bilgisayar Mühendisliği', image: '/derecelerimiz/yks/irem-ozel.jpg' },
  { name: 'Yusuf Talha Kaya', school: 'Karabük Üniversitesi', department: 'Bilgisayar Mühendisliği', image: '/derecelerimiz/yks/yusuf-talha-kaya.jpg' },
  { name: 'Defne Çankaya', school: 'Dokuz Eylül Üniversitesi', department: 'İktisat', image: '/derecelerimiz/yks/defne-cankaya.jpg' },
  { name: 'Eda Kazancı', school: 'Namık Kemal Üniversitesi', department: 'Maliye', image: '/derecelerimiz/yks/eda-kazanci.jpg' },
  { name: 'Toprak Öztürk', school: 'Marmara Üniversitesi', department: 'Fransızca Öğretmenliği', image: '/derecelerimiz/yks/toprak-ozturk.jpg' },
  { name: 'Fırat Saygın', school: 'Marmara Üniversitesi', department: 'Özel Öğretim Öğretmenliği', image: '/derecelerimiz/yks/firat-saygin.jpg' },
];

export const lgsRankings: Ranking[] = [
  { name: 'Zeynep Esra Altıntop', school: 'Hacıbektaş Veli Anadolu Lisesi', image: '/derecelerimiz/lgs/zeynep-esra-altintop.jpg' },
  { name: 'Tuba Er', school: 'Hacıbektaş Veli Anadolu Lisesi', image: '/derecelerimiz/lgs/tuba-er.jpg' },
  { name: 'Emir Adıgüzel', school: 'Hacıbektaş Veli Anadolu Lisesi', image: '/derecelerimiz/lgs/emir-adiguzel.jpg' },
  { name: 'Berat Aris', school: 'Doğan Cüceloğlu Fen Lisesi', image: '/derecelerimiz/lgs/berat-aris.jpg' },
  { name: 'Yiğit Hasan Kavuk', school: 'Yaşar Acar Fen Lisesi', image: '/derecelerimiz/lgs/yigit-hasan-kavuk.jpg' },
  { name: 'Erdem Özel', school: 'Pertevniyal Lisesi', image: '/derecelerimiz/lgs/erdem-ozel.jpg' },
  { name: 'Kıvanç Daldaban', school: 'Prof. Dr. Sabahattin Zaim Anadolu Lisesi', image: '/derecelerimiz/lgs/kivanc-daldaban.jpg' },
  { name: 'Zeynep Zengin', school: 'Prof. Dr. Sabahattin Zaim Anadolu Lisesi', image: '/derecelerimiz/lgs/zeynep-zengin.jpg' },
  { name: 'Mert Gerenler', school: 'Prof. Dr. Sabahattin Zaim Anadolu Lisesi', image: '/derecelerimiz/lgs/mert-gerenler.jpg' },
  { name: 'Ayşe Zeren Yetimova', school: 'Şehremini Anadolu Lisesi', image: '/derecelerimiz/lgs/ayse-zeren-yetimova.jpg' },
  { name: 'Ahmet Berat Tunca', school: 'Şehremini Anadolu Lisesi', image: '/derecelerimiz/lgs/ahmet-berat-tunca.jpg' },
  { name: 'Ecrin Neva Hatunoğlu', school: 'Şehremini Anadolu Lisesi', image: '/derecelerimiz/lgs/ecrin-neva-hatunoglu.jpg' },
  { name: 'Ecrin Ergin', school: 'Yeşilköy Anadolu Lisesi', image: '/derecelerimiz/lgs/ecrin-ergin.jpg' },
  { name: 'Nisa Doğrultan', school: 'Florya Tevfik Ercan Anadolu Lisesi', image: '/derecelerimiz/lgs/nisa-dogrultan.jpg' },
  { name: 'Ecrin Nisa Karagül', school: 'Adnan Menderes Anadolu Lisesi', image: '/derecelerimiz/lgs/ecrin-nisa-karagul.jpg' },
];
