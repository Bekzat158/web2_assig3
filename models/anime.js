const mongoose = require('mongoose');

const animeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Ссылка на пользователя
    animeList: [{
        imageUrl: { type: String, required: true },
        titleEnglish: String,
        titleAlternative: String,
        episodes: Number,
        duration: String,
        genres: [String]
    }]
}, {
    timestamps: true // Добавление меток времени
});

module.exports = mongoose.model('Anime', animeSchema);
