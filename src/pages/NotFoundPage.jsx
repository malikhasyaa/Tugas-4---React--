import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center text-4xl font-extrabold mb-6 shadow-xs">
        404
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
        Halaman Tidak Ditemukan
      </h1>

      <p className="mt-3 text-base text-gray-500 max-w-md mx-auto">
        Maaf, alamat URL yang Anda tuju tidak terdaftar atau telah dipindahkan ke tautan lain.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
        <Link
          to="/dashboard"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-5 py-2.5 rounded-lg shadow-xs transition-colors"
        >
          Ke Halaman Dashboard
        </Link>
        <Link
          to="/products"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors"
        >
          Ke Daftar Produk
        </Link>
      </div>
    </div>
  );
}
