const jwt = require('jsonwebtoken');
const config = require('../config/config');

const generateToken = (id) => {
    return jwt.sign({ id }, config.sessionSecret, {
        expiresIn: '30d'
    });
};

module.exports = generateToken;