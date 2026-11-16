# Product Catalog & Management App

Aplikasi web interaktif untuk manajemen dan katalog produk berbasis **React** dan **Vite**. Proyek ini dikembangkan untuk memenuhi tugas perkuliahan Pemrograman Web dengan fokus pada konsep fundamental React: *component-based architecture*, *unidirectional data flow*, pengolahan state lokal (*hooks*), dan perancangan antarmuka responsif tanpa dependensi pustaka UI eksternal.

---

## Fitur Aplikasi

- **Katalog Produk Dinamis**: Menampilkan daftar produk dalam grid kartu yang memuat informasi ID, nama, serta harga dalam format standar Rupiah (`Rp`).
- **Pencarian Real-Time**: Fitur filter pencarian instan berdasarkan nama produk tanpa reload halaman, dilengkapi indikator jumlah item yang cocok dan tampilan status kosong (*empty state*).
- **Operasi CRUD Lengkap**:
  - **Tambah Produk**: Modal formulir input produk baru dengan penomoran ID otomatis.
  - **Edit Produk**: Memperbarui nama dan harga produk terpilih secara langsung.
  - **Hapus Produk**: Dialog konfirmasi penghapusan data untuk mencegah kesalahan aksi.
- **Validasi Formulir**: Memastikan nama produk tidak kosong dan harga memiliki nilai positif (> 0) dengan pesan umpan balik visual (*error state*).
- **Desain Responsif & Modern**: Tata letak fleksibel (CSS Grid & Flexbox) yang optimal untuk layar desktop maupun perangkat mobile.

---

## Tech Stack

- **Framework / Library**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vite.dev/)
- **Styling**: Pure CSS3 (CSS Variables, Flexbox, Grid, Media Queries)
- **Icons**: SVG Icons (Asset mandiri)

---

## Panduan Menjalankan Proyek

Pastikan Anda telah memasang [Node.js](https://nodejs.org/) di komputer Anda.

1. **Clone repositori dan masuk ke direktori**:
   ```bash
   git clone https://github.com/malikhasyaa/Tugas-4---React--.git
   cd Tugas-4---React--
   ```

2. **Beralih ke branch pengerjaan**:
   ```bash
   git checkout tugas-3
   ```

3. **Pasang seluruh dependensi**:
   ```bash
   npm install
   ```

4. **Jalankan development server**:
   ```bash
   npm run dev
   ```
   Aplikasi dapat diakses melalui browser pada alamat default: `http://localhost:5173`.

5. **Build untuk deployment produksi**:
   ```bash
   npm run build
   ```

---

## Struktur Direktori

```text
Tugas-4---React--/
├── public/
│   ├── favicon.svg          # Favicon aplikasi
│   └── icons.svg            # Asset icon aplikasi
├── src/
│   ├── assets/              # Aset media & logo
│   ├── components/
│   │   ├── Header.jsx       # Bagian atas aplikasi dan tombol aksi utama
│   │   ├── SearchBar.jsx    # Input filter pencarian & badge jumlah produk
│   │   ├── ProductCard.jsx  # Kartu representasi individual produk
│   │   ├── ProductGrid.jsx  # Grid wadah kartu produk & kondisi hasil kosong
│   │   ├── Modal.jsx        # Komponen dasar wrapper overlay dialog
│   │   ├── AddProductModal.jsx    # Form dialog penambahan produk
│   │   ├── EditProductModal.jsx   # Form dialog pengubahan produk
│   │   └── DeleteProductModal.jsx # Konfirmasi penghapusan produk
│   ├── data/
│   │   └── products.js      # Data inisial daftar produk
│   ├── utils/
│   │   └── formatters.js    # Utilitas pemformatan angka ke format Rupiah
│   ├── App.jsx              # Komponen induk pengelola state & alur CRUD
│   ├── App.css              # Aturan gaya spesifik layout dan komponen
│   ├── index.css            # Pengaturan global font dan CSS reset
│   └── main.jsx             # Entry point bootstrapping aplikasi React
├── index.html               # Dokumen template HTML utama
├── package.json             # Konfigurasi dependensi dan script npm
└── vite.config.js           # Konfigurasi bundler Vite
```

---