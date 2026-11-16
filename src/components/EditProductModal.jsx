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
      <div className="modal-header">
        <h2 className="modal-title">Edit Produk</h2>
        <p className="modal-subtitle">Perbarui informasi produk yang dipilih.</p>
      </div>

      <div className="modal-product-id">ID: {product.id}</div>

      <form onSubmit={handleSubmit} className="modal-form" noValidate>
        <div className="form-group">
          <label htmlFor="edit-product-name" className="form-label">
            Nama Produk
          </label>
          <input
            id="edit-product-name"
            type="text"
            className={`form-input ${errors.name ? "input-error" : ""}`}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) {
                setErrors((prev) => ({ ...prev, name: null }));
              }
            }}
          />
          {errors.name && <p className="form-error-text">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="edit-product-price" className="form-label">
            Harga (Rp)
          </label>
          <input
            id="edit-product-price"
            type="number"
            min="1"
            step="1"
            className={`form-input ${errors.price ? "input-error" : ""}`}
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
              if (errors.price) {
                setErrors((prev) => ({ ...prev, price: null }));
              }
            }}
          />
          <p className={`form-helper-text ${errors.price ? "helper-error" : ""}`}>
            {errors.price || "Harga harus lebih dari 0."}
          </p>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
          >
            Batal
          </button>
          <button type="submit" className="btn btn-primary">
            Simpan Perubahan
          </button>
        </div>
      </form>
    </Modal>
  );
}
