/* =====================================================================
   NAVIGASI SIDEBAR
===================================================================== */
const navButtons = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.page-section');
const topbarTitle = document.getElementById('topbarTitle');

navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    navButtons.forEach(b => b.classList.remove('active'));
    sections.forEach(s => s.classList.remove('active'));

    btn.classList.add('active');
    document.getElementById(btn.dataset.target).classList.add('active');
    topbarTitle.textContent = btn.dataset.title;
  });
});

/* =====================================================================
   1. FORM REGISTRASI DENGAN AUTOCOMPLETE NAMA
===================================================================== */
const dataMahasiswa = [
  { nama: "Ahmad Fauzi Rahman", nim: "5025231004" },
  { nama: "Aulia Rahmawati", nim: "5025231018" },
  { nama: "Bagas Prakoso", nim: "5025231029" },
  { nama: "Citra Kusuma Dewi", nim: "5025231041" },
  { nama: "Dimas Aditya Putra", nim: "5025231053" },
  { nama: "Fajar Nugroho", nim: "5025231062" },
  { nama: "Mahirah Yasmin Aulia", nim: "5025231075" },
  { nama: "Nadia Putri Larasati", nim: "5025231084" },
  { nama: "Rizky Pratama Wijaya", nim: "5025231091" },
  { nama: "Salman Tazakky", nim: "5025231098" }
];

const regNama = document.getElementById('regNama');
const regNim = document.getElementById('regNim');
const dropdownNama = document.getElementById('dropdownNama');
const tabelRegistrasi = document.getElementById('tabelRegistrasi');
let daftarKRS = [];

regNama.addEventListener('input', function () {
  const query = this.value.trim().toLowerCase();
  dropdownNama.innerHTML = '';

  if (!query) {
    dropdownNama.style.display = 'none';
    return;
  }

  const matches = dataMahasiswa.filter(m =>
    m.nama.toLowerCase().includes(query)
  );

  if (matches.length === 0) {
    dropdownNama.style.display = 'none';
    return;
  }

  matches.forEach(mhs => {
    const item = document.createElement('div');
    item.className = 'autocomplete-item';
    item.innerHTML = `<span>${mhs.nama}</span><span class="badge-nim">${mhs.nim}</span>`;
    item.addEventListener('click', () => {
      regNama.value = mhs.nama;
      regNim.value = mhs.nim;
      dropdownNama.style.display = 'none';
    });
    dropdownNama.appendChild(item);
  });

  dropdownNama.style.display = 'block';
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.form-group')) {
    dropdownNama.style.display = 'none';
  }
});

document.getElementById('formRegistrasi').addEventListener('submit', function (e) {
  e.preventDefault();
  const entry = {
    nama: regNama.value.trim(),
    nim: regNim.value.trim(),
    matkul: document.getElementById('regMatkul').value.trim(),
    dosen: document.getElementById('regDosen').value.trim()
  };

  daftarKRS.push(entry);
  renderTabelKRS();
  this.reset();
});

function renderTabelKRS() {
  tabelRegistrasi.innerHTML = daftarKRS.map(row => `
    <tr>
      <td><strong>${row.nim}</strong></td>
      <td>${row.nama}</td>
      <td>${row.matkul}</td>
      <td>${row.dosen}</td>
    </tr>
  `).join('');
}

/* =====================================================================
   2. PENCARIAN KODE POS INDONESIA
===================================================================== */
const wilayahIndonesia = {
  "Jawa Timur": {
    "Kota Surabaya": {
      "Sukolilo": { kodepos: "60111", kelurahan: "Keputih, Gebang Putih, Klampis Ngasem, Medokan Semampir, Semolowaru" },
      "Gubeng": { kodepos: "60281", kelurahan: "Airlangga, Mojo, Kertajaya, Baratajaya, Pucang Sewu" },
      "Rungkut": { kodepos: "60293", kelurahan: "Kalirungkut, Kedung Baruk, Penjaringan Sari, Wonorejo" },
      "Mulyorejo": { kodepos: "60115", kelurahan: "Mulyorejo, Kejawan Putih Tambak, Kalisari, Dukuh Sutorejo" }
    },
    "Kota Malang": {
      "Lowokwaru": { kodepos: "65141", kelurahan: "Dinoyo, Ketawanggede, Sumbersari, Jatimulyo, Tlogomas" },
      "Klojen": { kodepos: "65111", kelurahan: "Kauman, Kiduldalem, Rampal Celaket, Oro-oro Dowo" }
    },
    "Kabupaten Sidoarjo": {
      "Waru": { kodepos: "61256", kelurahan: "Pepelegi, Bungurasih, Medaeng, Tropodo, Wadungasri" }
    }
  },
  "Jawa Barat": {
    "Kota Bogor": {
      "Bogor Tengah": { kodepos: "16121", kelurahan: "Paledang, Babakan, Sempur, Gudang, Kebon Kalapa" },
      "Bogor Utara": { kodepos: "16151", kelurahan: "Bantarjati, Tegal Gundil, Cimahpar, Tanah Baru" }
    },
    "Kota Bandung": {
      "Coblong": { kodepos: "40132", kelurahan: "Dago, Lebak Gede, Sadang Serang, Sekeloa" }
    }
  },
  "DKI Jakarta": {
    "Jakarta Selatan": {
      "Kebayoran Baru": { kodepos: "12110", kelurahan: "Senayan, Selong, Gunung, Kramat Pela, Melawai" },
      "Tebet": { kodepos: "12810", kelurahan: "Tebet Barat, Tebet Timur, Manggarai, Bukit Duri" }
    },
    "Jakarta Pusat": {
      "Gambir": { kodepos: "10110", kelurahan: "Gambir, Cideng, Petojo Utara, Kebon Kelapa" }
    }
  }
};

const selProv = document.getElementById('selProvinsi');
const selKota = document.getElementById('selKota');
const selKec = document.getElementById('selKecamatan');
const btnCariKP = document.getElementById('btnCariKodePos');
const hasilKP = document.getElementById('hasilKodePos');

Object.keys(wilayahIndonesia).forEach(prov => {
  selProv.add(new Option(prov, prov));
});

selProv.addEventListener('change', function () {
  selKota.innerHTML = '<option value="">Pilih Kabupaten/Kota</option>';
  selKec.innerHTML = '<option value="">Pilih Kecamatan</option>';
  selKec.disabled = true;
  btnCariKP.disabled = true;
  hasilKP.style.display = 'none';

  if (this.value) {
    selKota.disabled = false;
    Object.keys(wilayahIndonesia[this.value]).forEach(kota => {
      selKota.add(new Option(kota, kota));
    });
  } else {
    selKota.disabled = true;
  }
});

selKota.addEventListener('change', function () {
  selKec.innerHTML = '<option value="">Pilih Kecamatan</option>';
  btnCariKP.disabled = true;
  hasilKP.style.display = 'none';

  if (this.value) {
    selKec.disabled = false;
    Object.keys(wilayahIndonesia[selProv.value][this.value]).forEach(kec => {
      selKec.add(new Option(kec, kec));
    });
  } else {
    selKec.disabled = true;
  }
});

selKec.addEventListener('change', function () {
  btnCariKP.disabled = !this.value;
});

btnCariKP.addEventListener('click', () => {
  const data = wilayahIndonesia[selProv.value][selKota.value][selKec.value];
  document.getElementById('kpNomor').textContent = data.kodepos;
  document.getElementById('kpKelurahan').textContent = `Cakupan Kelurahan/Desa: ${data.kelurahan}`;
  document.getElementById('kpKec').textContent = selKec.value;
  document.getElementById('kpKota').textContent = selKota.value;
  document.getElementById('kpProv').textContent = selProv.value;
  hasilKP.style.display = 'block';
});

document.getElementById('btnResetWilayah').addEventListener('click', () => {
  selProv.value = '';
  selKota.innerHTML = '<option value="">Pilih Kabupaten/Kota</option>';
  selKec.innerHTML = '<option value="">Pilih Kecamatan</option>';
  selKota.disabled = true;
  selKec.disabled = true;
  btnCariKP.disabled = true;
  hasilKP.style.display = 'none';
});

/* =====================================================================
   3. VALIDASI FORM & EMAIL JAVASCRIPT
===================================================================== */
const formValidasi = document.getElementById('formValidasi');
const valNama = document.getElementById('valNama');
const valEmail = document.getElementById('valEmail');
const valPassword = document.getElementById('valPassword');
const valConfirm = document.getElementById('valConfirm');

function setFieldState(inputEl, errEl, isValid) {
  if (isValid) {
    inputEl.classList.remove('is-invalid');
    inputEl.classList.add('is-valid');
    errEl.style.display = 'none';
  } else {
    inputEl.classList.remove('is-valid');
    inputEl.classList.add('is-invalid');
    errEl.style.display = 'block';
  }
  return isValid;
}

formValidasi.addEventListener('submit', function (e) {
  e.preventDefault();
  const alertBox = document.getElementById('alertValidasi');
  alertBox.style.display = 'none';

  const cekNama = setFieldState(
    valNama,
    document.getElementById('errNama'),
    /^[a-zA-Z\s'.]{3,}$/.test(valNama.value.trim())
  );

  const cekEmail = setFieldState(
    valEmail,
    document.getElementById('errEmail'),
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valEmail.value.trim())
  );

  const cekPass = setFieldState(
    valPassword,
    document.getElementById('errPassword'),
    /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(valPassword.value)
  );

  const cekConfirm = setFieldState(
    valConfirm,
    document.getElementById('errConfirm'),
    valConfirm.value !== '' && valConfirm.value === valPassword.value
  );

  if (cekNama && cekEmail && cekPass && cekConfirm) {
    alertBox.textContent = `Aktivasi berhasil untuk akun ${valNama.value.trim()} (${valEmail.value.trim()}).`;
    alertBox.style.display = 'block';
  }
});

/* =====================================================================
   4. LIST DROPDOWN DINAMIS
===================================================================== */
const inventarisLab = {
  komputasi: ["ThinkPad X1 Carbon Gen 11", "MacBook Pro 14 M3", "ASUS ROG Strix G16"],
  jaringan: ["MikroTik RouterBOARD RB4011", "Cisco Catalyst 2960 Switch", "Ubiquiti UniFi AP AC Pro"],
  iot: ["ESP32-S3 DevKitC", "Arduino Uno R4 WiFi", "NVIDIA Jetson Orin Nano"]
};

const dropKategori = document.getElementById('dropKategori');
const dropUnit = document.getElementById('dropUnit');
const infoUnit = document.getElementById('infoUnit');

function renderUnitDropdown(kategori) {
  dropUnit.innerHTML = '';
  if (!kategori || !inventarisLab[kategori]) {
    dropUnit.disabled = true;
    dropUnit.add(new Option('-- Pilih Kategori Terlebih Dahulu --', ''));
    infoUnit.textContent = '';
    return;
  }

  dropUnit.disabled = false;
  inventarisLab[kategori].forEach(unit => {
    dropUnit.add(new Option(unit, unit));
  });
  infoUnit.textContent = `Unit terpilih: ${dropUnit.value}`;
}

dropKategori.addEventListener('change', function () {
  renderUnitDropdown(this.value);
});

dropUnit.addEventListener('change', function () {
  infoUnit.textContent = `Unit terpilih: ${this.value}`;
});

document.getElementById('btnTambahUnit').addEventListener('click', () => {
  const kat = dropKategori.value;
  const inputBaru = document.getElementById('inputUnitBaru');
  const namaUnit = inputBaru.value.trim();

  if (!kat) {
    alert('Pilih kategori perangkat terlebih dahulu.');
    return;
  }
  if (!namaUnit) return;

  inventarisLab[kat].push(namaUnit);
  renderUnitDropdown(kat);
  dropUnit.value = namaUnit;
  infoUnit.textContent = `Unit terpilih: ${namaUnit} (baru ditambahkan)`;
  inputBaru.value = '';
});