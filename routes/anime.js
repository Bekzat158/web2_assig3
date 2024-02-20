const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const Anime = require('../models/anime'); // Подключаем модель аниме
const router = express.Router();

router.get('/', (req, res) => {
  res.render('anime', { animeData: [] }); // pass an empty anime Data
});

router.post('/', async (req, res) => {
  const searchQuery = req.body.search;
  try {
    const response = await axios.get(`http://api.jikan.moe/v4/anime?q=${encodeURIComponent(searchQuery)}&order_by=favorites&sort=desc`);
    const animeData = response.data.data; // limit to 10 anime

    // Decode the token to get userId
    const decodedToken = jwt.decode(req.cookies.token);
    const userId = decodedToken.userId; // Get userId from the token
    const search = req.body.search;

    userAnime = new Anime({ userId, search,animeList: [] });


    // Add new anime data to the existing animeList
    animeData.forEach(anime => {
      userAnime.animeList.push({
        imageUrl: anime.images.jpg.image_url,
        titleEnglish: anime.title_english ? anime.title_english : 'N/A',
        titleAlternative: anime.title ? anime.title : 'N/A',
        episodes: anime.episodes ? anime.episodes : null,
        duration: anime.duration ? anime.duration : 'N/A',
        genres: anime.genres ? anime.genres.map(genre => genre.name) : [],
      });
    });

    // Save the updated anime document
    await userAnime.save();

    // Render the anime page with the updated animeData
    res.render('anime', { animeData });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;
