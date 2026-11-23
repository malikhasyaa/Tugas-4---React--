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
      <div className="text-center">
        <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
          <svg
            className="w-6 h-6"
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

        <h2 className="text-xl font-bold text-gray-900">Hapus Produk?</h2>
        <p className="text-xs text-gray-500 mt-1">
          Tindakan ini tidak dapat dibatalkan. Produk akan dihapus dari sistem backend.
        </p>

        <div className="my-5 p-4 bg-gray-50 rounded-xl border border-gray-100 text-left">
          <span className="text-xs font-mono font-medium text-gray-500">
            ID: #{product.id}
          </span>
          <h4 className="text-base font-bold text-gray-900 mt-1">{product.name}</h4>
          <p className="text-base font-extrabold text-blue-600 mt-1">
            {formatRupiah(product.price)}
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
            type="button"
            className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-red-600 hover:bg-red-700 shadow-xs transition-colors cursor-pointer"
            onClick={handleDelete}
          >
            Hapus Produk
          </button>
        </div>
      </div>
    </Modal>
  );
}
