import { useState, useMemo } from "react";
import { initialProducts } from "./data/products";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import ProductGrid from "./components/ProductGrid";
import AddProductModal from "./components/AddProductModal";
import EditProductModal from "./components/EditProductModal";
import DeleteProductModal from "./components/DeleteProductModal";
import "./App.css";

export default function App() {
  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal states
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Filtered products based on search query
  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return products;
    return products.filter((p) => p.name.toLowerCase().includes(query));
  }, [products, searchQuery]);

  // Handlers for Add
  const handleOpenAdd = () => {
    setIsAddOpen(true);
  };

  const handleCloseAdd = () => {
    setIsAddOpen(false);
  };

  const handleAddProduct = (newProductData) => {
    const nextId =
      products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
    const newProduct = {
      id: nextId,
      name: newProductData.name,
      price: newProductData.price,
    };
    setProducts((prev) => [...prev, newProduct]);
  };

  // Handlers for Edit
  const handleOpenEdit = (product) => {
    setSelectedProduct(product);
    setIsEditOpen(true);
  };

  const handleCloseEdit = () => {
    setSelectedProduct(null);
    setIsEditOpen(false);
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  // Handlers for Delete
  const handleOpenDelete = (product) => {
    setSelectedProduct(product);
    setIsDeleteOpen(true);
  };

  const handleCloseDelete = () => {
    setSelectedProduct(null);
    setIsDeleteOpen(false);
  };

  const handleDeleteProduct = (productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  return (
    <div className="app-container">
      <main className="main-content">
        <Header onAddProduct={handleOpenAdd} />

        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          count={filteredProducts.length}
        />

        <ProductGrid
          products={filteredProducts}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
          searchQuery={searchQuery}
        />

        <div className="page-footer">
          <p className="footer-summary">
            Menampilkan {filteredProducts.length} dari {products.length} produk
          </p>
        </div>
      </main>

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
