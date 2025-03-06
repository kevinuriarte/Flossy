const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
    const token = req.header('Authorization');
    
    if (!token) {
        return res.status(403).json({ error: 'No token provided. Access denied.' });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid token. Access denied.' });
    }
};
