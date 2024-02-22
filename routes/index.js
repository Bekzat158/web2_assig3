const express = require('express');
const router = express.Router();
const Item = require('../models/item'); // Импортируем модель Item
const cookieParser = require('cookie-parser');

router.use(cookieParser());

router.get('/', async (req, res) => {
    try {
        let language = req.cookies.language || 'english'; // Получаем значение языка из cookie или устанавливаем английский язык по умолчанию
        const items = await Item.find().sort({ createdAt: -1 }); // Получаем список элементов из базы данных
        // Определяем, какое описание использовать в зависимости от выбранного языка
        const descriptions = items.map(item => language === 'russian' ? item.descriptionRus : item.descriptionEn);
        res.render('index', { items, descriptions }); // Передаем описания на страницу
    } catch (error) {
        console.error(error);
        res.status(500).json({ errorMessage: 'Error fetching items' });
    }
});

module.exports = router;
