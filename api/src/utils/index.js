const { FEES, CURRENCY, WOMPI_ENDPOINTS } = require("../constants");
const axios = require("axios");
const { WOMPI_URL, WOMPI_PRIVATE_KEY } = process.env;

const emailValidator = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

const calculateRideDistance = async (origin, destination) => {
  const [lat1, lon1] = origin.split(",").map((numStr) => parseInt(numStr));
  const [lat2, lon2] = destination.split(",").map((numStr) => parseInt(numStr));
  const R = 6371; // Earth's radius in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
};

const calculateRideDuration = (createdAt) => {
  const start = new Date(createdAt);
  const finish = new Date();
  const elapsedMinutes = Math.floor((finish - start) / 60000);
  return elapsedMinutes;
};

const calculateRideCost = async (data) => {
  const { origin, destination, createdAt } = data;
  const distance = await calculateRideDistance(origin, destination);
  const time = calculateRideDuration(createdAt);
  const distanceCost = FEES.KM * distance;
  const timeCost = FEES.MIN * time;
  const cost = FEES.BASE + distanceCost + timeCost;
  return cost;
};

const createTransaction = async (data) => {
  const { cost, email, paymentSource, rideId, installments } = data;
  const response = await axios.post(
    `${WOMPI_URL}${WOMPI_ENDPOINTS.TRANSACTIONS}`,
    {
      amount_in_cents: cost,
      currency: CURRENCY,
      customer_email: email,
      payment_method: paymentSource.type === "CARD" ? { installments } : null,
      reference: rideId,
      payment_source_id: paymentSource.paymentSourceId,
    },
    {
      headers: {
        Authorization: `Bearer ${WOMPI_PRIVATE_KEY}`,
      },
    }
  );
  console.log("Transaction: ", response.data);
};

module.exports = {
  emailValidator,
  calculateRideCost,
  createTransaction,
};
