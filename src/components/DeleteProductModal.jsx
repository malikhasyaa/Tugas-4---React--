import Modal from "./Modal";
import { formatRupiah } from "../utils/formatters";

export default function DeleteProductModal({ isOpen, onClose, product, onConfirmDelete }) {
  if (!product) return null;

  const handleDelete = () => {
    onConfirmDelete(product.id);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="420px">
      <div className="delete-modal-content">
        <div className="delete-icon-wrapper">
          <svg
            className="delete-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <line x1="10" y1="11" x2="10" y2="17" />
            <line x1="14" y1="11" x2="14" y2="17" />
          </svg>
        </div>

        <h2 className="delete-modal-title">Hapus Produk?</h2>
        <p className="delete-modal-subtitle">
          Produk yang dihapus tidak dapat dikembalikan.
        </p>

        <div className="delete-summary-card">
          <span className="summary-id">ID: {product.id}</span>
          <h4 className="summary-name">{product.name}</h4>
          <p className="summary-price">{formatRupiah(product.price)}</p>
        </div>

        <div className="delete-modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
          >
            Batal
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleDelete}
          >
            Hapus Produk
          </button>
        </div>
      </div>
    </Modal>
  );
}
