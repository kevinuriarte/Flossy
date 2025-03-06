const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

// Login User
exports.login = (req, res) => {
    const { username, password } = req.body;

    User.findByUsername(username, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (results.length === 0) return res.status(401).json({ error: 'Invalid username or password' });

        const user = results[0];
        bcrypt.compare(password, user.Password, (err, isMatch) => {
            if (err) return res.status(500).json({ error: 'Password comparison failed' });
            if (!isMatch) return res.status(401).json({ error: 'Invalid username or password' });

            // Generate JWT Token
            const token = jwt.sign({ userId: user.UserID, username: user.Username, role: user.Role }, process.env.JWT_SECRET, { expiresIn: '1d' });

            res.json({ token });
        });
    });
};

// Get User Profile
exports.getProfile = (req, res) => {
    res.json({ userId: req.user.userId, username: req.user.username, role: req.user.role });
};
