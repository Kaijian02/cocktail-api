import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom'
import './css/Login.css';

function Login({onLogin}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/auth/login', { email, password });
      setMessage(response.data.message);
      onLogin(email);
      navigate('/home');

    } catch (error) {
      setMessage(error.response.data.error || 'Error logging in');
    }
  };

  return (
    <div className="page-wrapper">
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" cl>Login</button>
      </form>
      <Link to="/register" className="link">Register</Link>
      {message && <p className="error-p">{message}</p>}
      
    </div>
    </div>
  );
}

export default Login;
