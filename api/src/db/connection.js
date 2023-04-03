const mongoose = require("mongoose");
const { MONGO_URI } = process.env;

module.exports.connect = async () => {
  try {
    mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to mongodb!");
  } catch (error) {
    console.log(`Failed connecting to mongodb, Error: \n${error}`);
  }
};
