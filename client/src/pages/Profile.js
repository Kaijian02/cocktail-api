// src/pages/Profile.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './css/Profile.css'; // Add some CSS for styling if needed

function Profile({ userEmail }) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setMessage('New password and confirm password do not match.');
      return;
    }

    try {
      const response = await axios.put('/api/users/change-password', {
        email: userEmail,
        oldPassword,
        newPassword,
      });
      setMessage(response.data.message);
      setOldPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (error) {
      setMessage(error.response.data.error || 'Error changing password.');
    }
  };

  return (
    <div>
      <nav>
      <ul>
          {/* <li><p>{userEmail}</p></li> */}
          <li><Link to="/home" state={userEmail}>Home</Link></li>
          <li><Link to="/favorites" state={userEmail}>Favorites</Link></li>
          <li><Link to="/profile" state={userEmail}>Profile</Link></li>
          <li><a href="/login">Logout</a></li>
        </ul>
      </nav>
    <div className="profile-page">   
      <h1>Profile</h1>
      <div className="profile-info">
        <label style={{display: 'block'}}>Email</label>
        <input type="text" value={userEmail} readOnly className="input-email"/>
      </div>
      <form onSubmit={handleChangePassword} className="change-password-form">
        <div>
          <label>Old Password:</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm New Password:</label>
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Change Password</button>
      </form>
      {message && <p className="error-p">{message}</p>}
    </div>
   </div>
  );
}

export default Profile;
