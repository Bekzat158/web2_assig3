const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Item = require('../models/item');

const { validateRegistration } = require('../utils/validation');
const jwt = require('jsonwebtoken');

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        const items = await Item.find();

        res.render('admin', { users, items }); // Pass users and items to the template
    } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: 'Error fetching users or items' });
    }
});

router.post('/', async (req, res) => {
    const { username, password, password2, isAdmin } = req.body;
    const users = await User.find();

    // Validation
    const validationResult = await validateRegistration(username, password, password2);
    if (!validationResult.success) {
        return res.render('admin', { users, errorMessage: validationResult.message });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, isAdmin: isAdmin === 'on' });

    try {
        await user.save();
        return res.redirect('/admin');
    } catch (error) {
        console.error(error);
        return res.render('admin', { users, errorMessage: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const users = await User.find();
    try {
        await User.findByIdAndDelete(id);
        return res.redirect('/admin');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ errorMessage: 'Error deleting user' });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { newUsername, password, isAdmin } = req.body;

    try {
        let updateData = {};

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateData.password = hashedPassword;
        }

        if (newUsername) {
            updateData.username = newUsername;
        }

        // If isAdmin is "on", convert it to boolean
        updateData.isAdmin = isAdmin === "on"; // Convert "on" to boolean

        await User.findByIdAndUpdate(id, updateData);
        return res.redirect('/admin');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ errorMessage: 'Error updating user' });
    }
});

router.post('/items', async (req, res) => {
    const { nameEn, nameRus, descriptionEn, descriptionRus, imageURL } = req.body;
    try {
        const newItem = new Item({ nameEn, nameRus, descriptionEn, descriptionRus, imageURL });
        await newItem.save();
        res.redirect('/admin');
    } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: 'Error creating item' });
    }
});

// POST update item
router.post('/items/:id', async (req, res) => {
    const { id } = req.params;
    const { nameEn, nameRus, descriptionEn, descriptionRus, imageURL } = req.body;
    try {
        await Item.findByIdAndUpdate(id, { nameEn, nameRus, descriptionEn, descriptionRus, imageURL });
        res.redirect('/admin');
    } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: 'Error updating item' });
    }
});

// POST delete item
router.delete('/items/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Item.findByIdAndDelete(id);
        res.redirect('/admin');
    } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: 'Error deleting item' });
    }
});

module.exports = router;
