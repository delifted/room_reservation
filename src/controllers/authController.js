const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/config');

const generateToken = (user) => {
    return jwt.sign({ userId: user._id, role: user.role }, config.jwtSecret, { expiresIn: '2h' });
};

const register = async (req, res) => {
    const { username, email, password, role } = req.body;
    const user = new User({ username, email, password, role });

    try {
        const savedUser = await user.save();
        const token = generateToken(savedUser);
        res.status(201).json({ token });
    } catch (error) {
        res. status(400).json({ message: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.status(200).json({ token });
};

const getCurrentUser = async (req, res) => {
    try {
        const user = await user.findById(req.user.userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { register, login, getCurrentUser };