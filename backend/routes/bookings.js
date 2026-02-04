const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Booking = require('../models/Booking');

// GET all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single booking
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findOne({ id: req.params.id });
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE new booking
router.post('/', async (req, res) => {
  const { guestName, email, phone, roomId, checkIn, checkOut, price, status } = req.body;

  // Validation
  if (!guestName || !email || !phone || !roomId || !checkIn || !checkOut || !price) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const booking = new Booking({
    id: uuidv4(),
    guestName,
    email,
    phone,
    roomId,
    checkIn,
    checkOut,
    price,
    status: status || 'pending',
  });

  try {
    const newBooking = await booking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE booking
router.put('/:id', async (req, res) => {
  try {
    const booking = await Booking.findOne({ id: req.params.id });
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    if (req.body.guestName) booking.guestName = req.body.guestName;
    if (req.body.email) booking.email = req.body.email;
    if (req.body.phone) booking.phone = req.body.phone;
    if (req.body.roomId) booking.roomId = req.body.roomId;
    if (req.body.checkIn) booking.checkIn = req.body.checkIn;
    if (req.body.checkOut) booking.checkOut = req.body.checkOut;
    if (req.body.price) booking.price = req.body.price;
    if (req.body.status) booking.status = req.body.status;

    const updatedBooking = await booking.save();
    res.json(updatedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE booking
router.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findOneAndDelete({ id: req.params.id });
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
