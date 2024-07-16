// src/server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const redis = require('redis');
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const config = require('./config/config');
const swaggerSetup = require('./swagger');
require('dotenv').config(); // Ensures to load environment variables

const app = express();

// Redis client
const redisClient = redis.createClient({
    host: config.redisHost,
    port: config.redisPort
});

redisClient.on('error', (err) => {
    console.error('Redis error: ', err);
});

// Middleware
app.use(bodyParser.json());
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set to true if using https
}));

// Database connection
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.log(`Error connecting to MongoDB: ${err}`);
});

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

const hotelRoutes = require('./routes/hotelRoutes');
app.use('/api/hotels', hotelRoutes);

const roomRoutes = require('./routes/roomRoutes');
app.use('/api/rooms', roomRoutes);

const bookingRoutes = require('./routes/bookingRoutes');
app.use('/api/bookings', bookingRoutes);

swaggerSetup(app);

const port = config.port || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
