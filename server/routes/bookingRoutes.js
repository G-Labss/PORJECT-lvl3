const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getAllBookings, getBookingById } = require('../controllers/bookingController');

router.get('/', protect, getAllBookings);
router.get('/:id', getBookingById);

module.exports = router;
