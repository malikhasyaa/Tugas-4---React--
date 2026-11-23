import { useState, useEffect, useMemo, useCallback } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import ProductGrid from "../components/ProductGrid";
import AddProductModal from "../components/AddProductModal";
import EditProductModal from "../components/EditProductModal";
import DeleteProductModal from "../components/DeleteProductModal";
import { productService } from "../services/productService";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionError, setActionError] = useState(null);

  // Modal states
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Load products from backend API
  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getAllProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(
        err.message ||
          "Gagal memuat daftar produk dari server backend. Pastikan server API berjalan."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Filtered products based on search query
  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return products;
    return products.filter((p) => p.name.toLowerCase().includes(query));
  }, [products, searchQuery]);

  // Handlers for Add
  const handleOpenAdd = () => {
    setActionError(null);
    setIsAddOpen(true);
  };

  const handleCloseAdd = () => {
    setIsAddOpen(false);
  };

  const handleAddProduct = async (newProductData) => {
    setActionError(null);
    try {
      const created = await productService.createProduct(newProductData);
      setProducts((prev) => [...prev, created]);
    } catch (err) {
      setActionError(err.message || "Gagal menambahkan produk ke backend.");
    }
  };

  // Handlers for Edit
  const handleOpenEdit = (product) => {
    setActionError(null);
    setSelectedProduct(product);
    setIsEditOpen(true);
  };

  const handleCloseEdit = () => {
    setSelectedProduct(null);
    setIsEditOpen(false);
  };

  const handleUpdateProduct = async (updatedProduct) => {
    setActionError(null);
    try {
      const saved = await productService.updateProduct(
        updatedProduct.id,
        updatedProduct
      );
      setProducts((prev) =>
        prev.map((p) => (p.id === updatedProduct.id ? saved || updatedProduct : p))
      );
    } catch (err) {
      setActionError(err.message || "Gagal memperbarui produk pada backend.");
    }
  };

  // Handlers for Delete
  const handleOpenDelete = (product) => {
    setActionError(null);
    setSelectedProduct(product);
    setIsDeleteOpen(true);
  };

  const handleCloseDelete = () => {
    setSelectedProduct(null);
    setIsDeleteOpen(false);
  };

  const handleDeleteProduct = async (productId) => {
    setActionError(null);
    try {
      await productService.deleteProduct(productId);
      setProducts((prev) => prev.filter((p) => p.id !== productId));
    } catch (err) {
      setActionError(err.message || "Gagal menghapus produk dari backend.");
    }
  };

  return (
    <div className="space-y-6">
      <Header onAddProduct={handleOpenAdd} />

      {/* Action Error Banner */}
      {actionError && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-4 flex items-center justify-between gap-3 text-sm">
          <span>⚠️ {actionError}</span>
          <button
            onClick={() => setActionError(null)}
            className="text-xs font-semibold text-red-700 hover:text-red-900"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Fetch Error Banner */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-6 text-center space-y-3">
          <p className="font-bold text-base">Gagal Terhubung ke Backend</p>
          <p className="text-xs sm:text-sm text-red-600 max-w-lg mx-auto">{error}</p>
          <button
            onClick={loadProducts}
            className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs px-4 py-2 rounded-lg transition-colors cursor-pointer"
          >
            Coba Muat Ulang
          </button>
        </div>
      )}

      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        count={filteredProducts.length}
      />

      {loading ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-xs">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-blue-600 mb-3"></div>
          <p className="text-sm font-medium text-gray-600">
            Memuat data produk dari backend...
          </p>
        </div>
      ) : (
        <ProductGrid
          products={filteredProducts}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
          searchQuery={searchQuery}
        />
      )}

      <div className="pt-4 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
        <p>
          Menampilkan <span className="font-semibold text-gray-700">{filteredProducts.length}</span> dari{" "}
          <span className="font-semibold text-gray-700">{products.length}</span> produk
        </p>
      </div>

      {/* Modals */}
      <AddProductModal
        isOpen={isAddOpen}
        onClose={handleCloseAdd}
        onAdd={handleAddProduct}
      />

      <EditProductModal
        isOpen={isEditOpen}
        onClose={handleCloseEdit}
        product={selectedProduct}
        onUpdate={handleUpdateProduct}
      />

      <DeleteProductModal
        isOpen={isDeleteOpen}
        onClose={handleCloseDelete}
        product={selectedProduct}
        onConfirmDelete={handleDeleteProduct}
      />
    </div>
  );
}
