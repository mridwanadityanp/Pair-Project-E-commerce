function formatMoney(amount) {
  return Number(amount).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' });
}

module.exports = formatMoney;