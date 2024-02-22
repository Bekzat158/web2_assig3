const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const { language } = req.body;
    if (language && (language === 'english' || language === 'russian')) {
        res.cookie('language', language); // Устанавливаем выбранный язык в cookie
        res.status(200).send('Language updated successfully'); // Отправляем ответ об успешном обновлении языка
    } else {
        res.status(400).send('Invalid language'); // Отправляем ответ о неверном выборе языка
    }
});

module.exports = router;
