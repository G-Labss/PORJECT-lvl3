const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Booking = require('../models/Booking');
const Lesson = require('../models/Lesson');

// POST /api/payments/stripe/intent
exports.createStripeIntent = async (req, res, next) => {
  try {
    const { lessonId, studentName, studentEmail, notes } = req.body;

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ success: false, message: 'Lesson not found' });
    }

    const amountInCents = Math.round(lesson.price * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'usd',
      metadata: { lessonId, studentEmail },
    });

    const booking = await Booking.create({
      lesson: lessonId,
      studentName,
      studentEmail,
      paymentMethod: 'stripe',
      paymentStatus: 'pending',
      amount: lesson.price,
      stripePaymentIntentId: paymentIntent.id,
      notes,
    });

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      bookingId: booking._id,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/payments/stripe/confirm
exports.confirmStripePayment = async (req, res, next) => {
  try {
    const { bookingId, paymentIntentId } = req.body;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({ success: false, message: 'Payment not completed' });
    }

    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { paymentStatus: 'paid' },
      { new: true }
    ).populate('lesson', 'title duration price level');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    next(error);
  }
};

// POST /api/payments/crypto
exports.createCryptoBooking = async (req, res, next) => {
  try {
    const { lessonId, studentName, studentEmail, cryptoTxHash, cryptoWalletAddress, notes } = req.body;

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ success: false, message: 'Lesson not found' });
    }

    const booking = await Booking.create({
      lesson: lessonId,
      studentName,
      studentEmail,
      paymentMethod: 'crypto',
      paymentStatus: 'paid',
      amount: lesson.price,
      cryptoTxHash,
      cryptoWalletAddress,
      notes,
    });

    await booking.populate('lesson', 'title duration price level');

    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    next(error);
  }
};

// GET /api/payments/coach-wallet
exports.getCoachWallet = (req, res) => {
  res.json({
    success: true,
    walletAddress: process.env.COACH_WALLET_ADDRESS || '',
  });
};
