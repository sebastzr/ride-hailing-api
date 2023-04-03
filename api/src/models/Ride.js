const { Schema, model } = require("mongoose");

const rideSchema = Schema({
  origin: {
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  destination: {
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

module.exports = model("Ride", rideSchema);
