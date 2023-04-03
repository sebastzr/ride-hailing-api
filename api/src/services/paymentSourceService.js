const { WOMPI_ENDPOINTS } = require("../constants");
const PaymentSource = require("../models/PaymentSource");
const axios = require("axios");
const { WOMPI_URL, WOMPI_PRIVATE_KEY } = process.env;

const createPaymentSource = async (data) => {
  const { userID, token, userEmail, type, acceptanceToken } = data;

  const response = await axios.post(
    `${WOMPI_URL}${WOMPI_ENDPOINTS.PAYMENT_SOURCES}`,
    {
      type,
      token,
      customer_email: userEmail,
      acceptance_token: acceptanceToken,
    },
    {
      headers: {
        Authorization: `Bearer ${WOMPI_PRIVATE_KEY}`,
      },
    }
  );

  const { id } = response.data.data;

  const paymentSourceData = {
    user: userID,
    type,
    paymentSourceId: id,
  };

  const newPaymentSource = await PaymentSource.create(paymentSourceData);
  return newPaymentSource;
};

module.exports = {
  createPaymentSource,
};
