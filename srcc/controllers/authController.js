const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/config');

const generateToken = (id) => {
    console.log('Generated token:', generateToken);
    return jwt.sign({ _id: id }, config.jwtSecret, { expiresIn: '2h' });
};

const register = async (req, res) => {
    const { username, email, password, role } = req.body;
    const user = new User({ username, email, password, role });

    try {
        const savedUser = await user.save();
        const token = generateToken(savedUser._id);
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

const getMe = (req, res) => {
    console.log('Authenticated User:', req.user);
    res.status(200).json(req.user);
};

module.exports = { getMe, register, login, getCurrentUser };