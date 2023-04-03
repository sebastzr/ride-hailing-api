const { Router } = require("express");
const {
  listRides,
  newRide,
  endRide,
} = require("../controllers/rideController");
const router = Router();

router.get("/", listRides);
router.post("/request", newRide);
router.post("/finish", endRide);

module.exports = router;
