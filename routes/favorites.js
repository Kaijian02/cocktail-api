const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorite');

// POST route to save a favorite cocktail
router.post('/', async (req, res) => {
  const { cocktailName, imageUrl, userEmail } = req.body;

  try {
    const newFavorite = new Favorite({
      cocktailName,
      imageUrl,
      userEmail
    });

    const savedFavorite = await newFavorite.save();
    res.json(savedFavorite);
  } catch (error) {
    console.error('Error saving favorite:', error);
    res.status(500).json({ error: 'Error saving favorite' });
  }
});

// GET route to retrieve all favorite cocktails
router.get('/:userEmail', async (req, res) => {
  const { userEmail } = req.params;
  try {
    // Get the favorites cocktail based on userEmail
    const favorites = await Favorite.find({userEmail});
    res.json(favorites);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ error: 'Error fetching favorites' });
  }
});

// DELETE route to remove a favorite cocktail
router.delete('/:userEmail/:id', async (req, res) => {
  const { userEmail, id } = req.params;
  try {
    // Delete favorite cocktail based on email and id
    const favorite = await Favorite.findByIdAndDelete({_id: id, userEmail});
    if (!favorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }
    res.json({ message: 'Favorite deleted successfully' });
  } catch (error) {
    console.error('Error deleting favorite:', error);
    res.status(500).json({ error: 'Error deleting favorite' });
  }
});

module.exports = router;
