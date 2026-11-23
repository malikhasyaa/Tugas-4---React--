import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  const navLinkClass = ({ isActive }) =>
    `inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
      isActive
        ? "bg-blue-600 text-white shadow-sm"
        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-gray-900 font-sans antialiased">
      {/* Navigation Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xs border-b border-gray-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo / Brand */}
            <NavLink
              to="/dashboard"
              className="flex items-center gap-2.5 text-gray-900 hover:text-blue-600 transition-colors"
            >
              <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-600 text-white font-bold text-lg shadow-sm">
                P
              </span>
              <div className="flex flex-col">
                <span className="font-bold text-base tracking-tight leading-tight">
                  Manajemen Produk
                </span>
                <span className="text-[11px] text-gray-500 font-normal">
                  Katalog &amp; Inventaris
                </span>
              </div>
            </NavLink>

            {/* Navigation Links */}
            <nav className="flex items-center gap-2" aria-label="Main Navigation">
              <NavLink to="/dashboard" className={navLinkClass}>
                Dashboard
              </NavLink>
              <NavLink to="/products" className={navLinkClass}>
                Produk
              </NavLink>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Aplikasi Katalog &amp; Manajemen Produk</p>
          <div className="flex items-center gap-4">
            <NavLink to="/dashboard" className="hover:text-blue-600 transition-colors">
              Dashboard
            </NavLink>
            <span className="text-gray-300">&bull;</span>
            <NavLink to="/products" className="hover:text-blue-600 transition-colors">
              Daftar Produk
            </NavLink>
          </div>
        </div>
      </footer>
    </div>
  );
}
