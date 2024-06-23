const express = require('express');
const path = require('path');
const axios = require('axios');
const connectDB = require('./connect');
const favoritesRouter = require('./routes/favorites');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const app = express();

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.json());

// Routes
app.use('/api/favorites', favoritesRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

// Fetch all the cocktails alphabetically from API
app.get('/api/cocktails', async (req, res) => {
  try {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const allCocktails = [];

    // Keep track of IDs to filter out duplicates
    const seenIds = new Set();

    // Fetch cocktails for each letter of the alphabet
    for (const letter of alphabet) {
      const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${letter}`);
      const drinks = response.data.drinks || [];

      // Filter out duplicates based on IDs
      const uniqueDrinks = drinks.filter(cocktail => {
        if (!seenIds.has(cocktail.idDrink)) {
          seenIds.add(cocktail.idDrink);
          return true;
        }
        return false;
      });

      allCocktails.push(...uniqueDrinks);
    }

    res.json(allCocktails);
  } catch (error) {
    console.error('Error fetching cocktails by letter:', error);
    res.status(500).send('Error fetching cocktails by letter');
  }
});

// Search the cocktail name from API
app.get('/api/search', async (req, res) => {
  const name = req.query.name;
  if (!name) {
    return res.status(400).send('Name query parameter is required');
  }
  try {
    const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
    console.log(`Fetched data for letter ${name}:`, response.data.drinks); // Log fetched data
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from TheCocktailDB API:', error);
    res.status(500).send('Error fetching data from TheCocktailDB API');
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
