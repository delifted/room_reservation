const express = require('express');
const { registerUser, login, logout } = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', login);
router.post('/logout', authMiddleware, logout);
router.get('/me', authMiddleware, (req, res) => {
    res.send(req.user);
});

module.exports = router;