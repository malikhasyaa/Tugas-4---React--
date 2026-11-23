# Product Catalog & Management App

Aplikasi web interaktif untuk manajemen dan katalog produk berbasis **React**, **React Router**, **Tailwind CSS**, dan **Vite** yang terintegrasi dengan REST API backend. Proyek ini dikembangkan untuk memenuhi **Tugas 4 Minggu 13 Pemrograman Web**.

---

## Fitur Aplikasi

- **Routing Antarhalaman (React Router)**:
  - `/dashboard`: Halaman dashboard dengan kartu statistik metrik inventaris (total produk, total nilai katalog, rata-rata harga) dan pratinjau produk.
  - `/products`: Halaman katalog produk dengan fitur filter pencarian real-time dan operasi CRUD terintegrasi API backend.
  - `/products/:id`: Halaman detail produk dinamis berbasis `useParams` dengan tautan kembali ke katalog dan penanganan pesan produk tidak ditemukan.
  - `*`: Halaman 404 (Not Found) responsif dengan navigasi cepat ke Dashboard maupun Daftar Produk.
  - **Shared Layout**: Menggunakan `<Outlet />` dan navigasi `<NavLink>` aktif.

- **Operasi CRUD & Integrasi Backend**:
  - Penanganan operasi data (Read All, Read by ID, Create, Update, Delete) melalui abstraction service `productService.js`.
  - Penanganan kondisi antarmuka komprehensif: *Loading state*, *Error state*, *Empty state*, dan *Not Found state*.
  - Konfigurasi alamat backend melalui environment variable `VITE_API_URL` (default: `http://localhost:3000`).

- **Desain & Tata Letak Modern (Tailwind CSS)**:
  - Styling responsif berbasis Tailwind CSS utility classes pada semua komponen antarmuka, modal dialog, formulir input, navigasi, dan halaman.
  - State hover, focus, dan active yang rapi dan konsisten pada berbagai resolusi layar.

---

## Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **Build Tool**: [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) via `@tailwindcss/vite`
- **Data & Service**: Fetch API terintegrasi RESTful backend

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
   git checkout tugas-4
   ```

3. **Pasang seluruh dependensi**:
   ```bash
   npm install
   ```

4. **Konfigurasi Environment Backend (Opsional)**:
   Salin `.env.example` ke `.env` jika URL backend berbeda dari `http://localhost:3000`:
   ```bash
   cp .env.example .env
   ```

5. **Jalankan development server**:
   ```bash
   npm run dev
   ```
   Aplikasi dapat diakses melalui browser pada alamat default: `http://localhost:5173`.

6. **Build untuk deployment produksi**:
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
│   │   ├── AddProductModal.jsx    # Form dialog penambahan produk
│   │   ├── DeleteProductModal.jsx # Konfirmasi dialog penghapusan produk
│   │   ├── EditProductModal.jsx   # Form dialog pengubahan data produk
│   │   ├── Header.jsx       # Bagian atas katalog produk & tombol aksi
│   │   ├── Layout.jsx       # Layout bersama dengan Navbar & <Outlet />
│   │   ├── Modal.jsx        # Komponen wrapper overlay dialog
│   │   ├── ProductCard.jsx  # Kartu produk dengan link detail & aksi CRUD
│   │   ├── ProductGrid.jsx  # Grid kartu produk & kondisi data kosong
│   │   └── SearchBar.jsx    # Filter pencarian real-time & indikator jumlah
│   ├── data/
│   │   └── products.js      # Data inisial referensi katalog
│   ├── pages/
│   │   ├── DashboardPage.jsx     # Halaman dashboard (/dashboard)
│   │   ├── NotFoundPage.jsx      # Halaman 404 URL tidak terdaftar (*)
│   │   ├── ProductDetailPage.jsx # Halaman detail produk (/products/:id)
│   │   └── ProductsPage.jsx      # Halaman katalog produk & CRUD (/products)
│   ├── services/
│   │   └── productService.js     # Service API backend terpusat
│   ├── utils/
│   │   └── formatters.js    # Utilitas pemformatan mata uang Rupiah
│   ├── App.css              # Custom styling bawaan
│   ├── App.jsx              # Konfigurasi routing React Router
│   ├── index.css            # Pengaturan global & import Tailwind CSS
│   └── main.jsx             # Entry point React root
├── .env.example             # Contoh konfigurasi URL backend
├── index.html               # Dokumen HTML template utama
├── package.json             # Konfigurasi dependensi dan scripts
└── vite.config.js           # Konfigurasi bundler Vite & plugin Tailwind
```

---
