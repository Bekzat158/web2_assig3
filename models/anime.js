const mongoose = require('mongoose');

const animeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Ссылка на пользователя
    search: { type: String }, // Add a search field,
    createdAt: { type: Date, default: Date.now },
    animeList: [{
        imageUrl: { type: String, required: true },
        titleEnglish: String,
        titleAlternative: String,
        episodes: Number,
        duration: String,
        genres: [String]
    }],
});

// Indexing the search field for faster search queries
animeSchema.index({ search: 'text' });

module.exports = mongoose.model('Anime', animeSchema);
