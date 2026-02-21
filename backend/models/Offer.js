const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  offerType: {
    type: String,
    enum: ['all', 'room_specific', 'duration'],
    required: true,
    default: 'all',
  },
  applicableRooms: {
    type: [String],
    default: [],
  },
  minDays: {
    type: Number,
    default: 0,
  },
  validFrom: {
    type: String,
    required: true,
  },
  validTo: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Offer', offerSchema);
