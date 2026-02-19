const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Room = require('../models/Room');

// GET all rooms
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single room
router.get('/:id', async (req, res) => {
  try {
    const room = await Room.findOne({ id: req.params.id });
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE new room
router.post('/', async (req, res) => {
  const { name, type, capacity, price, amenities, description } = req.body;

  // Validation
  if (!name || !type || !capacity || !price) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const room = new Room({
    id: uuidv4(),
    name,
    type,
    capacity,
    price,
    description: description || '',
    amenities: amenities || [],
    available: true,
  });

  try {
    const newRoom = await room.save();
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE room
router.put('/:id', async (req, res) => {
  try {
    const room = await Room.findOne({ id: req.params.id });
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    if (req.body.name) room.name = req.body.name;
    if (req.body.type) room.type = req.body.type;
    if (req.body.capacity) room.capacity = req.body.capacity;
    if (req.body.price) room.price = req.body.price;
    if (req.body.description !== undefined) room.description = req.body.description;
    if (req.body.amenities) room.amenities = req.body.amenities;
    if (req.body.available !== undefined) room.available = req.body.available;

    const updatedRoom = await room.save();
    res.json(updatedRoom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE room
router.delete('/:id', async (req, res) => {
  try {
    const room = await Room.findOneAndDelete({ id: req.params.id });
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
