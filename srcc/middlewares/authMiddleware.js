const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/userModel');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    console.log('Token:', token);
    console.log('Secret:', config.jwtSecret);

    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        console.log('Decoded Token:', decoded);
        req.user = await User.findById(decoded._id).select('-password');
        console.log('Authenticated User:', req.user);
        req.token = token;  // Added this line to attach the token to the request
        if (!req.user) {
            return res.status(401).json({ message: 'User not found, authorization denied' });
        }
        next();
    } catch (error) {
        console.error('Token verification failed', error);
        res.status(401).json({ message: 'Token is not valid' });
    }
};

const adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};

module.exports = { authMiddleware, adminMiddleware };
