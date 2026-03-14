const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getAvailability,
  upsertAvailability,
  toggleSlot,
} = require('../controllers/availabilityController');

router.get('/', getAvailability);
router.post('/', protect, upsertAvailability);
router.patch('/:slotId', protect, toggleSlot);

module.exports = router;
