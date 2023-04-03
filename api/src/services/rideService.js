const Ride = require("../models/Ride");
const { calculateRideCost } = require("../utils");

const rides = async () => {
  return await Ride.find({});
};

const requestRide = async (data) => {
  const { origin, userID } = data;
  const driver = await Ride.findOne({ type: "Driver", status: "idle" });
  const rideData = {
    rider: userID,
    driver: driver._id,
    origin,
    status: "on-course",
  };
  const newRide = await Ride.create(rideData);
  return newRide;
};

const finishRide = async (data) => {
  const { rideId, destination } = data;
  const { origin, createdAt } = await Ride.findById(rideId);
  const cost = await calculateRideCost({ origin, destination, createdAt });
  const rideData = {
    status: "finished",
    destination,
    cost,
  };
  const ride = await Ride.findByIdAndUpdate(rideId, rideData, { new: true });
  return ride;
};

module.exports = {
  rides,
  requestRide,
  finishRide,
};
