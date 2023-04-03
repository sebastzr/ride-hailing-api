const { Schema, model } = require("mongoose");

const rideSchema = Schema(
  {
    rider: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    driver: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    origin: {
      coordinates: {
        type: [Number],
        required: true,
      },
    },
    destination: {
      coordinates: {
        type: [Number],
      },
    },
    status: {
      type: String,
      enum: ["on-course", "finished"],
      required: true,
    },
    cost: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Ride", rideSchema);
