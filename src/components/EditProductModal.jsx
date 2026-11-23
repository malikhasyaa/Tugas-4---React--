import { useState, useEffect } from "react";
import Modal from "./Modal";

export default function EditProductModal({ isOpen, onClose, product, onUpdate }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setPrice(product.price ?? "");
      setErrors({});
    }
  }, [product, isOpen]);

  const validate = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Nama produk wajib diisi.";
    }

    const trimmedPrice = String(price).trim();
    if (!trimmedPrice) {
      newErrors.price = "Harga produk wajib diisi.";
    } else {
      const numPrice = Number(trimmedPrice);
      if (isNaN(numPrice) || numPrice <= 0) {
        newErrors.price = "Harga harus lebih dari 0.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onUpdate({
      ...product,
      name: name.trim(),
      price: Number(price),
    });

    onClose();
  };

  if (!product) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-900">Edit Produk</h2>
        <p className="text-xs text-gray-500 mt-1">
          Perbarui informasi nama atau harga produk yang dipilih.
        </p>
      </div>

      <div className="mb-4">
        <span className="inline-block text-xs font-mono font-semibold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-md">
          ID: #{product.id}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="edit-product-name" className="block text-xs font-semibold text-gray-700 mb-1">
            Nama Produk
          </label>
          <input
            id="edit-product-name"
            type="text"
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
              errors.name
                ? "border-red-500 focus:ring-red-500 bg-red-50/20"
                : "border-gray-300 focus:ring-blue-500 focus:border-transparent"
            }`}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) {
                setErrors((prev) => ({ ...prev, name: null }));
              }
            }}
          />
          {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="edit-product-price" className="block text-xs font-semibold text-gray-700 mb-1">
            Harga (Rp)
          </label>
          <input
            id="edit-product-price"
            type="number"
            min="1"
            step="1"
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
              errors.price
                ? "border-red-500 focus:ring-red-500 bg-red-50/20"
                : "border-gray-300 focus:ring-blue-500 focus:border-transparent"
            }`}
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
              if (errors.price) {
                setErrors((prev) => ({ ...prev, price: null }));
              }
            }}
          />
          <p className={`text-xs mt-1 ${errors.price ? "text-red-600" : "text-gray-400"}`}>
            {errors.price || "Harga harus lebih dari 0."}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-end gap-3">
          <button
            type="button"
            className="px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
            onClick={onClose}
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-xs transition-colors cursor-pointer"
          >
            Simpan Perubahan
          </button>
        </div>
      </form>
    </Modal>
  );
}
