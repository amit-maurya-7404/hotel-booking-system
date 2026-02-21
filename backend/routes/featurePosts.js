const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const FeaturePost = require('../models/FeaturePost');

// GET all feature posts
router.get('/', async (req, res) => {
    try {
        const featurePosts = await FeaturePost.find().sort({ createdAt: -1 });
        res.json(featurePosts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET single feature post
router.get('/:id', async (req, res) => {
    try {
        const featurePost = await FeaturePost.findOne({ id: req.params.id });
        if (!featurePost) {
            return res.status(404).json({ message: 'Feature Post not found' });
        }
        res.json(featurePost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// CREATE new feature post
router.post('/', async (req, res) => {
    const { image, instagramUrl, active } = req.body;

    if (!image || !instagramUrl) {
        return res.status(400).json({ message: 'Meeting required fields (image, instagramUrl)' });
    }

    const featurePost = new FeaturePost({
        id: uuidv4(),
        image,
        instagramUrl,
        active: active !== undefined ? active : true,
    });

    try {
        const newFeaturePost = await featurePost.save();
        res.status(201).json(newFeaturePost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// UPDATE feature post
router.put('/:id', async (req, res) => {
    try {
        const featurePost = await FeaturePost.findOne({ id: req.params.id });
        if (!featurePost) {
            return res.status(404).json({ message: 'Feature Post not found' });
        }

        if (req.body.image) featurePost.image = req.body.image;
        if (req.body.instagramUrl) featurePost.instagramUrl = req.body.instagramUrl;
        if (req.body.active !== undefined) featurePost.active = req.body.active;

        const updatedFeaturePost = await featurePost.save();
        res.json(updatedFeaturePost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE feature post
router.delete('/:id', async (req, res) => {
    try {
        const featurePost = await FeaturePost.findOneAndDelete({ id: req.params.id });
        if (!featurePost) {
            return res.status(404).json({ message: 'Feature Post not found' });
        }
        res.json({ message: 'Feature Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
