export default function SearchBar({ searchQuery, onSearchChange, count }) {
  return (
    <div className="search-section">
      <div className="search-input-wrapper">
        <svg
          className="search-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="9" cy="9" r="6" />
          <line x1="13.5" y1="13.5" x2="18" y2="18" />
        </svg>
        <input
          type="text"
          className="search-input"
          placeholder="Cari nama produk..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Cari nama produk"
        />
      </div>
      <div className="product-count-badge">
        <span>{count} produk</span>
      </div>
    </div>
  );
}
