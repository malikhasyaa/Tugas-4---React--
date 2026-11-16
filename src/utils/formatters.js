/**
 * Format angka menjadi string mata uang Rupiah (contoh: 5000 -> Rp5.000)
 * @param {number|string} value
 * @returns {string}
 */
export const formatRupiah = (value) => {
  const number = Number(value);
  if (isNaN(number)) return "Rp0";
  return `Rp${number.toLocaleString("id-ID")}`;
};
