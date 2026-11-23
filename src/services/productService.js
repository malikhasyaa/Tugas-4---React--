/**
 * Service untuk operasi produk melalui API backend.
 * Menggunakan URL konfigurasi dari environment variable atau default port 3000.
 */

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:3000";

export const productService = {
  /**
   * Mengambil semua produk dari backend.
   * @returns {Promise<Array<{id: number, name: string, price: number}>>}
   */
  async getAllProducts() {
    const res = await fetch(`${API_BASE_URL}/products`);
    if (!res.ok) {
      throw new Error(`Gagal memuat produk (HTTP ${res.status}): ${res.statusText || "Server error"}`);
    }
    return await res.json();
  },

  /**
   * Mengambil detail produk berdasarkan ID dari backend.
   * @param {string|number} id
   * @returns {Promise<{id: number, name: string, price: number}|null>}
   */
  async getProductById(id) {
    const res = await fetch(`${API_BASE_URL}/products/${id}`);
    if (res.status === 404) {
      return null;
    }
    if (!res.ok) {
      throw new Error(`Gagal memuat detail produk (HTTP ${res.status}): ${res.statusText || "Server error"}`);
    }
    return await res.json();
  },

  /**
   * Menambahkan produk baru ke backend.
   * @param {{name: string, price: number}} productData
   * @returns {Promise<{id: number, name: string, price: number}>}
   */
  async createProduct(productData) {
    const res = await fetch(`${API_BASE_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: productData.name,
        price: Number(productData.price),
      }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Gagal menambahkan produk (HTTP ${res.status})`);
    }
    return await res.json();
  },

  /**
   * Memperbarui data produk ke backend.
   * @param {string|number} id
   * @param {{name: string, price: number}} productData
   * @returns {Promise<{id: number, name: string, price: number}>}
   */
  async updateProduct(id, productData) {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: productData.name,
        price: Number(productData.price),
      }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Gagal memperbarui produk (HTTP ${res.status})`);
    }
    return await res.json();
  },

  /**
   * Menghapus produk berdasarkan ID dari backend.
   * @param {string|number} id
   * @returns {Promise<boolean>}
   */
  async deleteProduct(id) {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Gagal menghapus produk (HTTP ${res.status})`);
    }
    return true;
  },
};

export default productService;
