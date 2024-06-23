// src/pages/Favorites.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './css/Favorites.css';
import { ClipLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt  } from '@fortawesome/free-solid-svg-icons';

function Favorites({cocktails = [], loading, userEmail}) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        console.log('Fetching favorites for user:', userEmail);
        const response = await axios.get(`/api/favorites/${userEmail}`);
        setFavorites(response.data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };


    if (userEmail) {
      fetchFavorites();
    }
  }, [userEmail]);

  // Remove from db
  const handleRemove = async (id) => {

    const confirmRemove = window.confirm("Are you sure you want to remove this favorite?");

    if (confirmRemove) {
    try {
      await axios.delete(`/api/favorites/${userEmail}/${id}`);
      setFavorites(favorites.filter(favorite => favorite._id !== id));
      alert('Favorite removed successfully!');
    } catch (error) {
      console.error('Error removing favorite:', error);
      alert('Failed to remove favorite. Please try again.');
    }
    } else{
    console.log('Removal cancelled by user.');
    }
  };
  

  return (
    <div>
      <nav>
      <ul>
          <li><Link to="/home" state={userEmail}>Home</Link></li>
          <li><Link to="/favorites" state={userEmail}>Favorites</Link></li>
          <li><Link to="/profile" state={userEmail}>Profile</Link></li>
          <li><a href="/login">Logout</a></li>
        </ul>
      </nav>
      <div className={`favorites-grid ${favorites.length <= 3 ? 'center' : ''}`}>
        {loading ? (
          <div>
          <ClipLoader color="#000" size={50} />
        </div>
        ) : favorites.length === 0 ? (
          <p>No favorites found</p>
        ) : (
          favorites.map((favorite, index) => (
            <div key={index} className="favorite-item">
               <div className="remove-icon" title="Remove from favorites" onClick={() => handleRemove(favorite._id)}>
                <FontAwesomeIcon icon={faTrashAlt} />
              </div>
              <img src={favorite.imageUrl} alt={favorite.cocktailName} />
              <p>{favorite.cocktailName}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Favorites;
