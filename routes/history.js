const express = require('express');
const jwt = require('jsonwebtoken');
const Anime = require('../models/anime');
const Movie = require('../models/movie');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // Получаем userId из токена
    const decodedToken = jwt.decode(req.cookies.token);
    const userId = decodedToken.userId;

    // Получаем записи аниме и фильмов для данного пользователя
    let userAnime = await Anime.find({ userId }).select('search createdAt').lean();
    let userMovies = await Movie.find({ userId }).select('search createdAt').lean();

    // Сортируем записи по дате создания (createdAt) в порядке убывания
    userAnime = userAnime.sort((a, b) => b.createdAt - a.createdAt);
    userMovies = userMovies.sort((a, b) => b.createdAt - a.createdAt);

    // Отображаем страницу и передаем результаты поиска для отображения
    res.render('history', { userAnime, userMovies });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
