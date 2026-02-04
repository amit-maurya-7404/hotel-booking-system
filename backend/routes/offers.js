const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Offer = require('../models/Offer');

// GET all offers
router.get('/', async (req, res) => {
  try {
    const offers = await Offer.find();
    res.json(offers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single offer
router.get('/:id', async (req, res) => {
  try {
    const offer = await Offer.findOne({ id: req.params.id });
    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }
    res.json(offer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE new offer
router.post('/', async (req, res) => {
  const { title, description, discount, validFrom, validTo, code } = req.body;

  // Validation
  if (!title || !description || !discount || !validFrom || !validTo || !code) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const offer = new Offer({
    id: uuidv4(),
    title,
    description,
    discount,
    validFrom,
    validTo,
    code,
    active: true,
  });

  try {
    const newOffer = await offer.save();
    res.status(201).json(newOffer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE offer
router.put('/:id', async (req, res) => {
  try {
    const offer = await Offer.findOne({ id: req.params.id });
    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }

    if (req.body.title) offer.title = req.body.title;
    if (req.body.description) offer.description = req.body.description;
    if (req.body.discount) offer.discount = req.body.discount;
    if (req.body.validFrom) offer.validFrom = req.body.validFrom;
    if (req.body.validTo) offer.validTo = req.body.validTo;
    if (req.body.code) offer.code = req.body.code;
    if (req.body.active !== undefined) offer.active = req.body.active;

    const updatedOffer = await offer.save();
    res.json(updatedOffer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE offer
router.delete('/:id', async (req, res) => {
  try {
    const offer = await Offer.findOneAndDelete({ id: req.params.id });
    if (!offer) {
      return res.status(404).json({ message: 'Offer not found' });
    }
    res.json({ message: 'Offer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
