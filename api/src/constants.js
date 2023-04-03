const FEES = Object.freeze({
  KM: 1000,
  MIN: 200,
  BASE: 3500,
});

const WOMPI_ENDPOINTS = Object.freeze({
  PAYMENT_SOURCES: "/payment_sources",
  TRANSACTIONS: "/transactions",
});

const CURRENCY = "COP";

module.exports = {
  FEES,
  WOMPI_ENDPOINTS,
  CURRENCY,
};
