import { useState } from "react";
import Modal from "./Modal";

export default function AddProductModal({ isOpen, onClose, onAdd }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState({});

  const handleResetAndClose = () => {
    setName("");
    setPrice("");
    setErrors({});
    onClose();
  };

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

    onAdd({
      name: name.trim(),
      price: Number(price),
    });

    handleResetAndClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleResetAndClose}>
      <div className="mb-5">
        <h2 className="text-xl font-bold text-gray-900">Tambah Produk</h2>
        <p className="text-xs text-gray-500 mt-1">
          Masukkan informasi nama dan harga produk baru untuk ditambahkan.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="add-product-name" className="block text-xs font-semibold text-gray-700 mb-1">
            Nama Produk
          </label>
          <input
            id="add-product-name"
            type="text"
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
              errors.name
                ? "border-red-500 focus:ring-red-500 bg-red-50/20"
                : "border-gray-300 focus:ring-blue-500 focus:border-transparent"
            }`}
            placeholder="Contoh: Pulpen"
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
          <label htmlFor="add-product-price" className="block text-xs font-semibold text-gray-700 mb-1">
            Harga (Rp)
          </label>
          <input
            id="add-product-price"
            type="number"
            min="1"
            step="1"
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
              errors.price
                ? "border-red-500 focus:ring-red-500 bg-red-50/20"
                : "border-gray-300 focus:ring-blue-500 focus:border-transparent"
            }`}
            placeholder="Contoh: 5000"
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
            onClick={handleResetAndClose}
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-xs transition-colors cursor-pointer"
          >
            Simpan Produk
          </button>
        </div>
      </form>
    </Modal>
  );
}
