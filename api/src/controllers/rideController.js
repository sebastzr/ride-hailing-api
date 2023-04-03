const { requestRide, finishRide, rides } = require("../services/rideService");

const listRides = async (req, res) => {
  try {
    const response = await rides();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const newRide = async (req, res) => {
  try {
    const { origin, userId } = req.body;
    const response = await requestRide({ origin, userId });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const endRide = async (req, res) => {
  try {
    const { rideId, destination } = req.body;
    const response = await finishRide({ rideId, destination });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  listRides,
  newRide,
  endRide,
};
