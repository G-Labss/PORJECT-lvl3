const Availability = require('../models/Availability');
const Booking = require('../models/Booking');
const User = require('../models/User');

// GET /api/availability
// Returns the coach's availability slots + booked slot info for the next 14 days
exports.getAvailability = async (req, res, next) => {
  try {
    const coach = await User.findOne();
    if (!coach) {
      return res.status(404).json({ success: false, message: 'No coach found' });
    }

    const availability = await Availability.findOne({ coach: coach._id });
    const slots = availability ? availability.slots.filter(s => s.isActive) : [];

    // Find all non-failed bookings with a scheduled date in the next 14 days
    const now = new Date();
    const twoWeeksOut = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
    const bookedSlots = await Booking.find({
      scheduledDate: { $gte: now, $lte: twoWeeksOut },
      paymentStatus: { $ne: 'failed' },
    }).select('scheduledDate scheduledTime availabilitySlotId');

    res.status(200).json({
      success: true,
      data: {
        slots,
        bookedSlots: bookedSlots.map(b => ({
          date: b.scheduledDate,
          time: b.scheduledTime,
          slotId: b.availabilitySlotId,
        })),
      },
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/availability  (admin only)
// Replace the coach's entire slot list
exports.upsertAvailability = async (req, res, next) => {
  try {
    const { slots } = req.body;

    if (!Array.isArray(slots)) {
      return res.status(400).json({ success: false, message: 'slots must be an array' });
    }

    const coach = await User.findOne();
    if (!coach) {
      return res.status(404).json({ success: false, message: 'No coach found' });
    }

    const availability = await Availability.findOneAndUpdate(
      { coach: coach._id },
      { coach: coach._id, slots },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json({ success: true, data: availability });
  } catch (error) {
    next(error);
  }
};

// PATCH /api/availability/:slotId  (admin only)
// Toggle a single slot's isActive
exports.toggleSlot = async (req, res, next) => {
  try {
    const coach = await User.findOne();
    if (!coach) {
      return res.status(404).json({ success: false, message: 'No coach found' });
    }

    const availability = await Availability.findOne({ coach: coach._id });
    if (!availability) {
      return res.status(404).json({ success: false, message: 'No availability set up yet' });
    }

    const slot = availability.slots.id(req.params.slotId);
    if (!slot) {
      return res.status(404).json({ success: false, message: 'Slot not found' });
    }

    slot.isActive = !slot.isActive;
    await availability.save();

    res.status(200).json({ success: true, data: availability });
  } catch (error) {
    next(error);
  }
};
