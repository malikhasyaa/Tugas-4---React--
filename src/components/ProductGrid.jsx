import ProductCard from "./ProductCard";

export default function ProductGrid({ products, onEdit, onDelete, searchQuery }) {
  if (products.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-12 text-center my-6">
        <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto text-xl mb-3">
          📦
        </div>
        <p className="text-base font-bold text-gray-800">
          {searchQuery
            ? `Tidak ada produk yang cocok dengan pencarian "${searchQuery}".`
            : "Belum ada produk yang tersedia."}
        </p>
        <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
          {searchQuery
            ? "Coba gunakan kata kunci pencarian yang lain atau periksa ejaan."
            : "Klik tombol \"+ Tambah Produk\" untuk menambahkan produk baru ke katalog."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
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
