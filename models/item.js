// models/item.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    nameEn: {
        type: String,
        required: true
    },
    nameRus: {
        type: String,
        required: true
    },
    descriptionEn: {
        type: String,
        required: true
    },
    descriptionRus: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
