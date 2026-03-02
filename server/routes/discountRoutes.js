const express = require('express');
const router = express.Router();

const DISCOUNT_CODES = {
  FIRSTLESSON: 10,
  SUMMER25: 25,
  LOYAL: 15,
};

router.post('/validate', (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ success: false, message: 'Code is required' });
  }

  const discount = DISCOUNT_CODES[code.toUpperCase()];

  if (!discount) {
    return res.status(404).json({ success: false, message: 'Invalid discount code' });
  }

  res.status(200).json({ success: true, discount });
});

module.exports = router;
