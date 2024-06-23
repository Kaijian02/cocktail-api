const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  cocktailName: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userEmail: { type: String, required: true }
});


module.exports = mongoose.model('Favorite', favoriteSchema);
