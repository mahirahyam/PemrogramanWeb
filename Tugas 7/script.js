// Data Berita Gosip per Menu Sidebar
const edisiGosip = [
    {
        feat1Title: "Aktor Inisial R Terciduk di Kafe Senopati",
        feat1Desc: "Foto buram aktor muda R tengah makan malam berdua dengan selebgram pendatang baru mendadak viral dan memicu spekulasi putus dengan pacar resminya.",
        feat1Full: "KRONOLOGI LENGKAP: Menurut saksi mata di lokasi, aktor berinisial R tiba sekitar pukul 21.30 WIB mengenakan topi hitam dan masker. Tak lama berselang, seorang selebgram wanita bergabung di meja VIP lantai dua. Keduanya terlihat berbincang akrab selama hampir dua jam sebelum meninggalkan lokasi secara terpisah.",
        feat2Title: "Penyanyi Pop Hapus Semua Foto Pacar",
        feat2Desc: "Penggemar dibuat panik setelah seluruh foto kebersamaan pasangan musisi muda ini lenyap dari feed Instagram sejak dini hari tadi.",
        feat2Full: "UPDATE TERBARU: Selain menghapus puluhan foto liburan bersama, keduanya juga kedapatan saling unfollow di Instagram dan TikTok. Sumber dekat manajemen menyebutkan jadwal tur yang padat dan perbedaan prinsip menjadi pemicu keretakan hubungan mereka.",
        mainTitle: "Main Article: Mantan Asisten Bongkar Sikap Asli Artis Terkenal",
        mainBody: "Sebuah utas anonim mendadak menjadi perbincangan hangat warganet setelah menceritakan pengalaman bekerja di balik layar bersama seorang figur publik ternama. Meski dikenal sangat ramah di depan kamera televisi, sang artis disebut kerap membatalkan jadwal syuting secara sepihak."
    },
    {
        feat1Title: "Pasangan Sinetron Diduga Cinlok di Lokasi Syuting",
        feat1Desc: "Chemistry keduanya di luar kamera tertangkap kamera kru saat sedang beristirahat di sela pengambilan gambar episode terbaru.",
        feat1Full: "DETAIL CINLOK: Beberapa kru mengunggah video singkat saat sang aktor membawakan kopi dan kipas portabel untuk lawan mainnya. Warganet menduga kedekatan ini bukan sekadar promosi sinetron semata.",
        feat2Title: "Batal Tunangan, Model Papan Atas Kembalikan Cincin",
        feat2Desc: "Rencana pernikahan mewah yang dijadwalkan akhir tahun ini dikabarkan resmi dibatalkan secara sepihak.",
        feat2Full: "KABAR PUTUS: Pihak keluarga membenarkan bahwa acara lamaran resmi ditunda tanpa batas waktu yang ditentukan setelah beredar tangkapan layar percakapan pribadi di media sosial.",
        mainTitle: "Main Article: Deretan Pasangan Artis yang Diam-Diam Balikan",
        mainBody: "Setelah sempat mengumumkan perpisahan beberapa bulan lalu, sejumlah pasangan selebriti muda terpantau kembali menghabiskan waktu bersama di beberapa acara tertutup rekan sesama artis."
    },
    {
        feat1Title: "Spill Akun Anonim: Selebgram Pamer Tas KW",
        feat1Desc: "Akun pemerhati fesyen membongkar detail jahitan tas mewah milik seorang influencer yang diklaim dibeli langsung dari Paris.",
        feat1Full: "ANALISIS NETIZEN: Unggahan perbandingan detail logo dan nomor seri tas tersebut langsung menuai ribuan komentar. Sang influencer memilih menutup kolom komentarnya sejak pagi tadi.",
        feat2Title: "Sutradara Ternama Sindir Aktor Pendatang Baru",
        feat2Desc: "Status bernada kecewa di media sosial diduga ditujukan kepada pemeran utama film barunya yang sering datang terlambat.",
        feat2Full: "REAKSI WARGANET: Meski tidak menyebut nama secara langsung, netizen langsung menebak sosok aktor yang dimaksud berdasarkan jadwal produksi film yang sedang berjalan bulan ini.",
        mainTitle: "Main Article: Fenomena Akun Anonim Pembongkar Rahasia Industri Hiburan",
        mainBody: "Kemunculan berbagai akun anonim di media sosial kerap menjadi sumber pertama mencuatnya rumor selebriti sebelum akhirnya dikonfirmasi oleh media hiburan arus utama."
    }
];

let indeksAktif = 0;

// Ganti isi Feature 1, Feature 2, dan Main Article saat sidebar diklik
function gantiEdisi(index) {
    indeksAktif = index;
    const data = edisiGosip[index];
    document.getElementById('feat1Title').textContent = data.feat1Title;
    document.getElementById('feat1Desc').textContent = data.feat1Desc;
    document.getElementById('feat2Title').textContent = data.feat2Title;
    document.getElementById('feat2Desc').textContent = data.feat2Desc;
    document.getElementById('mainTitle').textContent = data.mainTitle;
    document.getElementById('mainBody').textContent = data.mainBody;
}

// Tampilkan isi lengkap berita ke kotak Main Article saat tombol Feature diklik
function bacaDetail(nomorFeature) {
    const data = edisiGosip[indeksAktif];
    if (nomorFeature === 1) {
        document.getElementById('mainTitle').textContent = data.feat1Title;
        document.getElementById('mainBody').textContent = data.feat1Full;
    } else {
        document.getElementById('mainTitle').textContent = data.feat2Title;
        document.getElementById('mainBody').textContent = data.feat2Full;
    }
}

// Kontrol Modal Login & Register
const authModal = document.getElementById('authModal');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const modalAlert = document.getElementById('modalAlert');

function bukaModal() {
    authModal.classList.remove('hidden');
    modalAlert.classList.add('hidden');
}

function tutupModal() {
    authModal.classList.add('hidden');
}

function switchTab(mode) {
    modalAlert.classList.add('hidden');
    if (mode === 'login') {
        document.getElementById('modalTitle').textContent = 'Login Akun Netizen';
        document.getElementById('tabLogin').classList.add('active');
        document.getElementById('tabRegister').classList.remove('active');
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
    } else {
        document.getElementById('modalTitle').textContent = 'Register Akun Baru';
        document.getElementById('tabRegister').classList.add('active');
        document.getElementById('tabLogin').classList.remove('active');
        registerForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
    }
}

function showModalAlert(msg) {
    modalAlert.textContent = msg;
    modalAlert.classList.remove('hidden');
}

// Proses Register
registerForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;

    if (password.length < 6) {
        showModalAlert('Password minimal 6 karakter!');
        return;
    }

    const users = JSON.parse(localStorage.getItem('gosip_users')) || [];
    if (users.some(u => u.email === email)) {
        showModalAlert('Email sudah terdaftar! Silakan login.');
        return;
    }

    users.push({ name, email, password });
    localStorage.setItem('gosip_users', JSON.stringify(users));
    registerForm.reset();
    switchTab('login');
    showModalAlert(`Registrasi berhasil untuk ${name}! Silakan login.`);
});

// Proses Login
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    const users = JSON.parse(localStorage.getItem('gosip_users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        document.getElementById('userGreeting').textContent = `Halo, ${user.name}`;
        document.getElementById('userGreeting').classList.remove('hidden');
        document.getElementById('btnOpenAuth').classList.add('hidden');
        document.getElementById('btnLogout').classList.remove('hidden');
        loginForm.reset();
        tutupModal();
    } else {
        showModalAlert('Email atau password salah!');
    }
});

// Logout
function logoutUser() {
    document.getElementById('userGreeting').classList.add('hidden');
    document.getElementById('btnOpenAuth').classList.remove('hidden');
    document.getElementById('btnLogout').classList.add('hidden');
}