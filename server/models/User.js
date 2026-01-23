const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
  },
  bio: {
    type: String,
    maxlength: [500, 'Bio cannot exceed 500 characters'],
  },
  ntrpRating: {
    type: Number,
    min: [1.0, 'NTRP rating must be between 1.0 and 7.0'],
    max: [7.0, 'NTRP rating must be between 1.0 and 7.0'],
  },
  yearsExperience: {
    type: Number,
    min: [0, 'Years of experience cannot be negative'],
  },
  specialties: [{
    type: String,
    trim: true,
  }],
}, {
  timestamps: true, // Adds createdAt and updatedAt automatically
});

module.exports = mongoose.model('User', userSchema);