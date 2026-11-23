import { Link } from "react-router-dom";
import { formatRupiah } from "../utils/formatters";

export default function ProductCard({ product, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-mono font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
            ID: #{product.id}
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-500" title="Aktif"></span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
          {product.name}
        </h3>
        <p className="text-xl font-extrabold text-blue-600 mt-2">
          {formatRupiah(product.price)}
        </p>
      </div>

      <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
        <Link
          to={`/products/${product.id}`}
          className="inline-flex items-center text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md transition-colors"
        >
          Detail &rarr;
        </Link>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            className="text-xs font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 px-2.5 py-1.5 rounded-md transition-colors cursor-pointer"
            onClick={() => onEdit(product)}
          >
            Edit
          </button>
          <button
            type="button"
            className="text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 px-2.5 py-1.5 rounded-md transition-colors cursor-pointer"
            onClick={() => onDelete(product)}
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
