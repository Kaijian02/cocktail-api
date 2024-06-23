// src/pages/CocktailDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './css/CocktailDetails.css';
import { ClipLoader } from 'react-spinners';


function CocktailDetails({userEmail}) {
  const { name } = useParams();
  const [cocktail, setCocktail] = useState(null);

  useEffect(() => {
    const fetchCocktailDetails = async () => {
      try {
        const response = await axios.get(`/api/search?name=${encodeURIComponent(name)}`);
        if (response.data.drinks && response.data.drinks.length > 0) {
          setCocktail(response.data.drinks[0]);
        } else {
          setCocktail(null);
        }
      } catch (error) {
        console.error('Error fetching cocktail details:', error);

      }
    };

    fetchCocktailDetails();
  }, [name]);

  if (!cocktail) {
    return <div>
    <ClipLoader color="#000" size={50} />
  </div>;
  }

  // Extracting ingredients and measures
  const ingredients = [];
  for (let i = 1; i <= 15; i++) {
    const ingredient = cocktail[`strIngredient${i}`];
    const measure = cocktail[`strMeasure${i}`];
    if (ingredient) {
      ingredients.push({ ingredient, measure });
    }
  }

  const handleSave = async () => {
    try {
      const response = await axios.post('/api/favorites', {
        cocktailName: cocktail.strDrink,
        imageUrl: cocktail.strDrinkThumb,
        userEmail: userEmail //save the userEmail as well for later fetch at Favorite.js
      });
      console.log('Favorite saved:', response.data);
      alert('Cocktail has been added to your favorites!');
    } catch (error) {
      console.error('Error saving favorite:', error);
      alert('Failed to add cocktail to favorites. Please check your network connection and try again.');
    }
  };

  return (
    <div>
      <h1 className="cocktail-details-h1">{cocktail.strDrink}</h1>
      <h2 className="details-center-div">Ingredients</h2>
      <div className="container">
        <div className="cocktail-image"><img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} /></div>
        <div className="ingredient-list-container">
        <ul id="ingredient-list" className="ingredient-list">
            {ingredients.map((item, index) => (
              <li key={index}>
                {item.measure ? `${item.measure} - ` : ''}
                {item.ingredient}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <h2 className="details-center-div">Instructions</h2>
      <p className="details-p">{cocktail.strInstructions}</p>
      <h2 className="details-center-div">Glass</h2>
      <p className="details-p">{cocktail.strGlass}</p>

      <div className="container" style={{ maxWidth: '400px', margin: '0 auto'}}>
        <div style={{ flex: '1 1 auto' }}><Link to="/home" className="go-back-btn">Go Back</Link></div>
        <div style={{ flex: '1 1 auto' }}> <button className="favorite-btn" onClick={handleSave}>Add to Favorite</button></div>
      </div>
      
     
    </div>
  );
}

export default CocktailDetails;
