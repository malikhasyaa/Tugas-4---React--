import { formatRupiah } from "../utils/formatters";

export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="product-card">
      <div className="product-card-body">
        <span className="product-id">ID: {product.id}</span>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">{formatRupiah(product.price)}</p>
      </div>
      <div className="product-card-actions">
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => onEdit(product)}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={() => onDelete(product)}
        >
          Hapus
        </button>
      </div>
    </div>
  );
}
