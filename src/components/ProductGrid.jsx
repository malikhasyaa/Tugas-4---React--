import ProductCard from "./ProductCard";

export default function ProductGrid({ products, onEdit, onDelete, searchQuery }) {
  if (products.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-state-title">
          {searchQuery
            ? `Tidak ada produk yang cocok dengan pencarian "${searchQuery}".`
            : "Belum ada produk yang tersedia."}
        </p>
        <p className="empty-state-subtitle">
          {searchQuery
            ? "Coba gunakan kata kunci pencarian yang lain."
            : "Klik tombol \"+ Tambah Produk\" untuk menambahkan produk baru."}
        </p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
