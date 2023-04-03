require("dotenv").config();
const mongoose = require("mongoose");
const { connect } = require("./connection");
const User = require("../models/User");

const data = [
  {
    name: "Rider1",
    email: "dummy@email.com",
    type: "Rider",
    status: "idle",
  },
  {
    name: "Rider2",
    email: "dummy2@email.com",
    type: "Rider",
    status: "idle",
  },
  {
    name: "Driver1",
    email: "dummy3@email.com",
    type: "Driver",
    status: "idle",
  },
  {
    name: "Driver2",
    email: "dummy4@email.com",
    type: "Driver",
    status: "idle",
  },
];

connect();

async function seed() {
  try {
    const result = await User.insertMany(data);
    console.log("Database seeded successfully\n", result);
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
}

seed();
