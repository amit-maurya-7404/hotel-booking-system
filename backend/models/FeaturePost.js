const mongoose = require('mongoose');

const featurePostSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String, // Base64 or URL
        required: true,
    },
    instagramUrl: {
        type: String,
        required: true,
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

module.exports = mongoose.model('FeaturePost', featurePostSchema);
