const { Client } = require("@googlemaps/google-maps-services-js");
const { FEES } = require("../constants");
const { GOOGLE_MAPS_KEY } = process.env;

const emailValidator = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const calculateRideDistance = async (origin, destination) => {
  try {
    const client = new Client({});
    const response = await client.distancematrix({
      params: {
        origins: origin,
        destination: destination,
        key: GOOGLE_MAPS_KEY,
      },
      timeout: 1000,
    });

    const distance = response.data.rows[0].elements[0].distance.value / 1000;
    return distance;
  } catch (error) {
    console.log(error);
  }
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

module.exports = {
  emailValidator,
  calculateRideCost,
};
