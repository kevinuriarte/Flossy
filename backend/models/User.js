const db = require('../config/db');

const User = {
    findByUsername: (username, callback) => {
        db.query('SELECT * FROM users WHERE Username = ?', [username], callback);
    },
    create: (username, passwordHash, role, callback) => {
        db.query('INSERT INTO users (Username, Password, Role) VALUES (?, ?, ?)', [username, passwordHash, role], callback);
    }
};

module.exports = User;
