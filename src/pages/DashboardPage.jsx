import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { productService } from "../services/productService";
import { formatRupiah } from "../utils/formatters";

export default function DashboardPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await productService.getAllProducts();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Gagal memuat data dari server backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const totalProducts = products.length;
  const totalValue = products.reduce((acc, p) => acc + (Number(p.price) || 0), 0);
  const avgPrice = totalProducts > 0 ? Math.round(totalValue / totalProducts) : 0;

  return (
    <div className="space-y-8">
      {/* Banner / Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 sm:p-8 text-white shadow-md">
        <div className="max-w-3xl">
          <span className="inline-block px-3 py-1 bg-white/20 text-xs font-semibold rounded-full uppercase tracking-wider mb-3">
            Dashboard Overview
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Selamat Datang di Dashboard Manajemen Produk
          </h1>
          <p className="mt-2 text-sm sm:text-base text-blue-100">
            Pantau ringkasan statistik produk katalog secara terpusat dan kelola data inventaris dengan cepat.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-white text-blue-700 hover:bg-blue-50 font-semibold text-sm px-4 py-2.5 rounded-lg shadow-xs transition-colors"
            >
              Lihat Semua Produk &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-start gap-3">
            <span className="text-xl">⚠️</span>
            <div>
              <p className="font-semibold text-sm">Gagal Mengakses Backend API</p>
              <p className="text-xs text-red-600 mt-0.5">{error}</p>
            </div>
          </div>
          <button
            onClick={fetchProducts}
            className="self-start sm:self-auto text-xs font-semibold bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1.5 rounded-md transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Card 1: Total Produk */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">Total Produk</span>
            <span className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg">
              📦
            </span>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-extrabold text-gray-900">
              {loading ? (
                <span className="inline-block w-12 h-8 bg-gray-200 animate-pulse rounded"></span>
              ) : (
                totalProducts
              )}
            </p>
            <p className="text-xs text-gray-500 mt-1">Item terdaftar di katalog</p>
          </div>
        </div>

        {/* Card 2: Total Nilai Inventaris */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">Total Nilai Produk</span>
            <span className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg">
              💰
            </span>
          </div>
          <div className="mt-4">
            <p className="text-2xl sm:text-3xl font-extrabold text-gray-900 truncate">
              {loading ? (
                <span className="inline-block w-24 h-8 bg-gray-200 animate-pulse rounded"></span>
              ) : (
                formatRupiah(totalValue)
              )}
            </p>
            <p className="text-xs text-gray-500 mt-1">Akumulasi seluruh nilai harga</p>
          </div>
        </div>

        {/* Card 3: Rata-rata Harga */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">Rata-rata Harga</span>
            <span className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg">
              📊
            </span>
          </div>
          <div className="mt-4">
            <p className="text-2xl sm:text-3xl font-extrabold text-gray-900 truncate">
              {loading ? (
                <span className="inline-block w-24 h-8 bg-gray-200 animate-pulse rounded"></span>
              ) : (
                formatRupiah(avgPrice)
              )}
            </p>
            <p className="text-xs text-gray-500 mt-1">Rata-rata nilai per produk</p>
          </div>
        </div>
      </div>

      {/* Quick Preview Table / Section */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Ringkasan Produk Terdaftar</h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Pratinjau data produk yang tersedia pada sistem backend.
            </p>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center justify-center text-xs font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg transition-colors"
          >
            Kelola di Menu Produk &rarr;
          </Link>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-500 text-sm">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-blue-600 mb-2"></div>
            <p>Memuat data produk dari backend...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm">
            <p className="font-medium">Belum ada produk yang dapat ditampilkan.</p>
            <p className="text-xs text-gray-400 mt-1">
              Tambahkan produk melalui halaman Produk atau periksa koneksi backend.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600 text-xs uppercase border-b border-gray-200">
                <tr>
                  <th className="py-3 px-6 font-semibold">ID</th>
                  <th className="py-3 px-6 font-semibold">Nama Produk</th>
                  <th className="py-3 px-6 font-semibold">Harga</th>
                  <th className="py-3 px-6 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.slice(0, 5).map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3 px-6 font-mono text-xs text-gray-500 font-medium">
                      #{product.id}
                    </td>
                    <td className="py-3 px-6 font-semibold text-gray-900">
                      {product.name}
                    </td>
                    <td className="py-3 px-6 text-blue-600 font-semibold">
                      {formatRupiah(product.price)}
                    </td>
                    <td className="py-3 px-6 text-right">
                      <Link
                        to={`/products/${product.id}`}
                        className="text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        Lihat Detail &rarr;
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
