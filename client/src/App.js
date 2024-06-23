// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './pages/Home';
import CocktailDetails from './pages/CocktailDetails';
import Favorite from './pages/Favorite';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';

function App() {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(true); // Set loading initially to true
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const fetchCocktails = async () => {
      try {
        const response = await axios.get('/api/cocktails');
        console.log('Initial data fetched:', response.data);
        // Set the fetched cocktails
        setCocktails(response.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching cocktails:', error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchCocktails();
  }, []); // Fetch data only once on component mount


  const handleLogin = (email) => {
    setLoggedInUser(email); // Store logged-in user email
    setIsAuthenticated(true);
  };

  return (
   
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Navigate to = "/login" />} />
            <Route path="/login" element={<Login onLogin= {handleLogin}/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home cocktails={cocktails} loading={loading} userEmail={loggedInUser}/>} />
            <Route path="/cocktail/:name" element={<CocktailDetails userEmail={loggedInUser}/>} />
            <Route path="/favorites" element={<Favorite cocktails={cocktails} loading={loading} userEmail={loggedInUser}/>} />
            <Route path="/profile" element={<Profile userEmail={loggedInUser} />} />         
          </Routes>
        </div>
      </Router>
    
  );
}


export default App;
