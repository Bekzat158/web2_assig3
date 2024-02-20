// routes/index.js
const express = require('express');
const router = express.Router();
const Item = require('../models/item'); // Import the Item model

router.get('/', async (req, res) => {
    try {
        const items = await Item.find().sort({ createdAt: -1 }); // Fetch items from the database
        res.render('index', { items }); // Pass items to the index page
    } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: 'Error fetching items' });
    }
});

module.exports = router;
