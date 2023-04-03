const { Router } = require("express");
const { newPaymentSource } = require("../controllers/paymentSourceController");
const router = Router();

router.post("/", newPaymentSource);

module.exports = router;
