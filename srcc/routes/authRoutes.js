const express = require('express');
const { register, login, getCurrentUser } = require('../controllers/authController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { getMe } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, getMe);

module.exports = router;