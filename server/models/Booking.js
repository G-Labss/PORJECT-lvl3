const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  lesson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
    required: true,
  },
  studentName: {
    type: String,
    required: [true, 'Student name is required'],
    trim: true,
  },
  studentEmail: {
    type: String,
    required: [true, 'Student email is required'],
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
  },
  paymentMethod: {
    type: String,
    enum: ['stripe', 'crypto'],
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending',
  },
  amount: {
    type: Number,
    required: true,
  },
  stripePaymentIntentId: String,
  cryptoTxHash: String,
  cryptoWalletAddress: String,
  notes: String,
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
