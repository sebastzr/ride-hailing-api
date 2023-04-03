require("dotenv").config();
const express = require("express");
const { connect } = require("./src/db/connection");
const app = express();
const { PORT = 3000 } = process.env;
const API_VERSION = "v1";

connect();

app.use(express.json());

app.use(
  `/${API_VERSION}/payment_sources`,
  require("./src/routes/paymentSourceRoutes")
);
app.use(`/${API_VERSION}/rides`, require("./src/routes/rideRoutes"));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
