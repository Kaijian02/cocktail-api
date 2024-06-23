const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/Users');

// PUT route to change password
router.put('/change-password', async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check the old password
    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
      return res.status(400).json({ error: 'Old password is incorrect' });
    }

    // Make sure new password different from the old password
    if (oldPassword === newPassword) {
        return res.status(400).json({ error: 'New password must be different from the old password' });
      }

    user.password = newPassword;
    await user.save();

    console.log('Password changed successfully for user:', user.email);
    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
