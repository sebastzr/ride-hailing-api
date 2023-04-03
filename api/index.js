require("dotenv").config();
const express = require("express");
const app = express();
const { connect } = require("mongoose");
const { PORT = 3000, MONGO_URI } = process.env;
const API_VERSION = "v1";

try {
  connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to mongodb!");
} catch (error) {
  console.log(`Failed connecting to mongodb, Error: \n${error}`);
}

app.use(express.json());

app.use(
  `/${API_VERSION}/payment_sources`,
  require("./src/routes/paymentSourceRoutes")
);
app.use(`/${API_VERSION}/rides`, require("./src/routes/rideRoutes"));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
