const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Ссылка на пользователя
    search: { type: String }, // Add a search field,
    createdAt: { type: Date, default: Date.now },
    movieList: [{
        imageUrl: { type: String, required: true },
        title: String,
        voteAverage: Number,
        popularity: Number,
        releaseDate: Date // Изменено на тип Date
    }]
});

module.exports = mongoose.model('Movie', movieSchema);
