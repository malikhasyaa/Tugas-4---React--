export default function Header({ onAddProduct }) {
  return (
    <header className="page-header">
      <div className="header-text">
        <h1 className="page-title">Manajemen Produk</h1>
        <p className="page-subtitle">
          Kelola daftar produk dan harga dalam satu tempat.
        </p>
      </div>
      <button
        type="button"
        className="btn btn-primary btn-add-product"
        onClick={onAddProduct}
      >
        <span className="btn-icon">+</span>
        Tambah Produk
      </button>
    </header>
  );
}
