const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Booking = require('../models/Booking');
const nodemailer = require('nodemailer');

// Ensure email variables exist
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const ownerEmailTemplate = (booking) => ({
  subject: `New Booking: ${booking.guestName}`,
  html: `
    <h2>New Booking Received!</h2>
    <p><strong>Name:</strong> ${booking.guestName}</p>
    <p><strong>Email:</strong> ${booking.email}</p>
    <p><strong>Phone:</strong> ${booking.phone}</p>
    <p><strong>Rooms:</strong> ${booking.roomId}</p>
    <p><strong>Check-in:</strong> ${booking.checkIn}</p>
    <p><strong>Check-out:</strong> ${booking.checkOut}</p>
    <p><strong>Total Price:</strong> ₹${booking.price}</p>
    <hr>
    <p><em>Reply directly to this email to respond to the client.</em></p>
  `,
});

const userConfirmationTemplate = (booking) => ({
  subject: 'Booking Confirmation - The Hideout Hiraeth',
  html: `
    <h2>Thank you for booking with us!</h2>
    <p>Hi ${booking.guestName},</p>
    <p>We have received your booking and will contact you shortly to confirm the payment details.</p>
    <h3>Booking Summary:</h3>
    <ul>
      <li><strong>Rooms:</strong> ${booking.roomId}</li>
      <li><strong>Check-in:</strong> ${new Date(booking.checkIn).toLocaleDateString()}</li>
      <li><strong>Check-out:</strong> ${new Date(booking.checkOut).toLocaleDateString()}</li>
      <li><strong>Total Price:</strong> ₹${booking.price}</li>
    </ul>
    <p>In the meantime, if you have any questions, feel free to reach out to us on WhatsApp: +91 90154 53068 or email us: contact@thehideouthiraeth.com</p>
    <p>Best regards,<br>The Hideout Hiraeth Team</p>
  `,
});

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

    // Send Emails (Non-blocking)
    if (process.env.GMAIL_EMAIL && process.env.GMAIL_APP_PASSWORD) {
      try {
        await transporter.sendMail({
          from: process.env.GMAIL_EMAIL,
          to: process.env.SITE_OWNER_EMAIL || process.env.GMAIL_EMAIL,
          ...ownerEmailTemplate(newBooking),
          replyTo: newBooking.email,
        });

        await transporter.sendMail({
          from: process.env.GMAIL_EMAIL,
          to: newBooking.email,
          ...userConfirmationTemplate(newBooking),
        });
        console.log(`[Email] Booking confirmation sent for ${newBooking.id}`);
      } catch (emailErr) {
        console.error('[Email] Failed to send booking emails:', emailErr);
      }
    } else {
      console.warn('[Email] Missing process.env.GMAIL_EMAIL or GMAIL_APP_PASSWORD; skipping emails.');
    }

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
