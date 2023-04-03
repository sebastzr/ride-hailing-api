const PaymentSource = require("../models/PaymentSource");
const Ride = require("../models/Ride");
const User = require("../models/User");
const { calculateRideCost, createTransaction } = require("../utils");

const rides = async () => {
  return await Ride.find({});
};

const requestRide = async (data) => {
  const { origin, userId } = data;
  const driver = await User.findOne({ type: "Driver", status: "idle" });
  const rideData = {
    rider: userId,
    driver: driver._id,
    origin,
    status: "on-course",
  };
  const newRide = await Ride.create(rideData);
  return newRide;
};

const finishRide = async (data) => {
  const { rideId, destination, installments } = data;
  const ride = await Ride.findById(rideId);
  const { origin, createdAt, rider, driver } = ride;
  const cost = await calculateRideCost({ origin, destination, createdAt });
  const rideData = {
    status: "finished",
    destination,
    cost,
  };

  await User.findByIdAndUpdate(driver, { status: "idle" });
  const { email } = await User.findByIdAndUpdate(
    rider,
    { status: "idle" },
    { new: true }
  );
  const updatedRide = await Ride.findByIdAndUpdate(rideId, rideData, {
    new: true,
  });

  const paymentSource = PaymentSource.findOne({ user: rider });
  await createTransaction({ cost, email, paymentSource, rideId, installments });

  return updatedRide;
};

module.exports = {
  rides,
  requestRide,
  finishRide,
};
