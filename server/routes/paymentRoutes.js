const express = require('express');
const router = express.Router();
const {
  createStripeIntent,
  confirmStripePayment,
  createCryptoBooking,
  getCoachWallet,
} = require('../controllers/paymentController');

router.get('/coach-wallet', getCoachWallet);
router.post('/stripe/intent', createStripeIntent);
router.post('/stripe/confirm', confirmStripePayment);
router.post('/crypto', createCryptoBooking);

module.exports = router;
