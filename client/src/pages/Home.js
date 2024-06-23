// src/Home.js
import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './css/Home.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';


function Home({cocktails = [], loading, userEmail}) {
  const [search, setSearch] = useState('');
  const [filteredCocktails, setFilteredCocktails] = useState(cocktails);
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredCocktails(cocktails);
  }, [cocktails]);

  // Function to handle search
  const handleSearch = () => {
    if (!search) {
      setFilteredCocktails(cocktails);
    } else {
      const searchResults = cocktails.filter(cocktail =>
        cocktail.strDrink.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredCocktails(searchResults);
    }
  };

  const handleClick = (cocktailName) => {
    navigate(`/cocktail/${encodeURIComponent(cocktailName)}`);
    
  };

  return (
    <div className="Home">
      <nav>
        <ul>
          {/* <li><p>{userEmail}</p></li> */}
          <li><Link to="/home" state={userEmail}>Home</Link></li>
          <li><Link to="/favorites" state={userEmail}>Favorites</Link></li>
          <li><Link to="/profile" state={userEmail}>Profile</Link></li>
          <li><a href="/login">Logout</a></li>
        </ul>
      </nav>
      <header className="Home-header">
        <h1 className="home-h1">Cocktail Database</h1>
        <div className="center-div">
          <input
            type="text"
            id="search-bar"
            placeholder="Enter search cocktail.."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FontAwesomeIcon icon={faSearch} id="search-button" onClick={handleSearch} />
        </div>
      </header>

      <div className="cocktail-grid">
      {loading ? (
          <div>
          <ClipLoader color="#000" size={50} />
        </div>
        ) :filteredCocktails.length === 0 ? (
          <p>No results found</p>
        ) : (
          filteredCocktails.map((cocktail) => (
            <div key={cocktail.idDrink} className="cocktail-item" onClick={() => handleClick(cocktail.strDrink)}  >
                {/* onClick={() => handleClick(cocktail.idDrink)} */}
              <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink}/>
              <p>{cocktail.strDrink}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home;


