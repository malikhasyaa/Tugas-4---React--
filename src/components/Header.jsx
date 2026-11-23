export default function Header({ onAddProduct }) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          Daftar Produk
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Kelola katalog produk, tambah data baru, perbarui informasi, atau hapus item.
        </p>
      </div>
      <button
        type="button"
        className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-4 py-2.5 rounded-lg shadow-xs hover:shadow transition-all cursor-pointer"
        onClick={onAddProduct}
      >
        <span className="text-lg leading-none font-bold">+</span>
        Tambah Produk
      </button>
    </header>
  );
}
