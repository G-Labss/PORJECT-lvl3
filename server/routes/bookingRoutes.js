const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getAllBookings, getBookingById, markAsPaid } = require('../controllers/bookingController');

router.get('/', protect, getAllBookings);
router.get('/:id', getBookingById);
router.patch('/:id/pay', protect, markAsPaid);

module.exports = router;
