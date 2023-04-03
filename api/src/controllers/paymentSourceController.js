const { createPaymentSource } = require("../services/paymentSourceService");

const newPaymentSource = async (req, res) => {
  try {
    const { userID, token, userEmail, type, acceptanceToken } = req.body;
    const response = await createPaymentSource({
      userID,
      token,
      userEmail,
      type,
      acceptanceToken,
    });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  newPaymentSource,
};
