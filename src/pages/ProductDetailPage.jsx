import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { productService } from "../services/productService";
import { formatRupiah } from "../utils/formatters";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchDetail = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await productService.getProductById(id);
        if (isMounted) {
          setProduct(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Gagal mengambil data detail produk dari server backend.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchDetail();
    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Back link */}
      <div>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
        >
          <span aria-hidden="true">&larr;</span> Kembali ke Daftar Produk
        </Link>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center shadow-xs">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-blue-600 mb-4"></div>
          <p className="text-gray-600 font-medium">Memuat data produk dari backend...</p>
          <p className="text-xs text-gray-400 mt-1">Mengambil ID: #{id}</p>
        </div>
      )}

      {/* Error state */}
      {!loading && error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center shadow-xs">
          <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold mb-3">
            !
          </div>
          <h2 className="text-lg font-bold text-red-800">Terjadi Kesalahan</h2>
          <p className="text-sm text-red-600 mt-1">{error}</p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Muat Ulang
            </button>
            <Link
              to="/products"
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Kembali ke Daftar
            </Link>
          </div>
        </div>
      )}

      {/* Not Found state */}
      {!loading && !error && !product && (
        <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center shadow-xs space-y-4">
          <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mx-auto text-3xl font-bold">
            🔍
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Produk Tidak Ditemukan</h2>
            <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
              Produk dengan parameter ID <span className="font-mono font-semibold text-gray-700">#{id}</span> tidak ditemukan pada database backend atau sudah dihapus.
            </p>
          </div>
          <div className="pt-2">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-5 py-2.5 rounded-lg shadow-xs transition-colors"
            >
              &larr; Lihat Semua Produk Tersedia
            </Link>
          </div>
        </div>
      )}

      {/* Success detail view */}
      {!loading && !error && product && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 sm:p-8 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="inline-block px-2.5 py-0.5 bg-white/20 text-blue-200 text-xs font-mono font-semibold rounded-md mb-2">
                ID Produk: #{product.id}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {product.name}
              </h1>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xs text-slate-300 block">Harga Produk</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-blue-400">
                {formatRupiah(product.price)}
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Informasi Rinci
            </h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <dt className="text-xs font-medium text-gray-500">ID Produk</dt>
                <dd className="text-base font-semibold text-gray-900 mt-1 font-mono">
                  {product.id}
                </dd>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <dt className="text-xs font-medium text-gray-500">Nama Produk</dt>
                <dd className="text-base font-semibold text-gray-900 mt-1">
                  {product.name}
                </dd>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <dt className="text-xs font-medium text-gray-500">Nominal Harga</dt>
                <dd className="text-base font-bold text-blue-600 mt-1">
                  {formatRupiah(product.price)}
                </dd>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <dt className="text-xs font-medium text-gray-500">Status Inventaris</dt>
                <dd className="text-base font-semibold text-emerald-600 mt-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                  Tersedia di Katalog
                </dd>
              </div>
            </dl>

            <div className="pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
              >
                &larr; Kembali ke Daftar Produk
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
