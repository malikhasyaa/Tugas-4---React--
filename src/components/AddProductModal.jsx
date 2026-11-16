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
      <div className="modal-header">
        <h2 className="modal-title">Tambah Produk</h2>
        <p className="modal-subtitle">Masukkan informasi produk baru.</p>
      </div>

      <form onSubmit={handleSubmit} className="modal-form" noValidate>
        <div className="form-group">
          <label htmlFor="add-product-name" className="form-label">
            Nama Produk
          </label>
          <input
            id="add-product-name"
            type="text"
            className={`form-input ${errors.name ? "input-error" : ""}`}
            placeholder="Contoh: Pulpen"
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
          <label htmlFor="add-product-price" className="form-label">
            Harga (Rp)
          </label>
          <input
            id="add-product-price"
            type="number"
            min="1"
            step="1"
            className={`form-input ${errors.price ? "input-error" : ""}`}
            placeholder="Contoh: 5000"
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
            onClick={handleResetAndClose}
          >
            Batal
          </button>
          <button type="submit" className="btn btn-primary">
            Simpan Produk
          </button>
        </div>
      </form>
    </Modal>
  );
}
