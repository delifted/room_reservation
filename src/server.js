const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const redis = require('redis');
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const config = require('./config/config');
const { swaggerUi, swaggerDoc } = require('./swagger');
require('dotenv').config();

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
    cookie: { secure: false }
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
const hotelRoutes = require('./routes/hotelRoutes');
const roomRoutes = require('./routes/roomRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

app.use('/api/users', userRoutes);
app.use('/api/hotels', hotelRoutes);
app.use('/api/hotels/:hotelId/rooms', roomRoutes);
app.use('/api/hotels/:hotelId/rooms/:roomId/bookings', bookingRoutes);

app.use('/api/bookings', bookingRoutes); // To get all bookings

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
// app.use('/api-docs', swaggerUi.serveFiles(swaggerSpec));
// app.use('/api-docs', swaggerUi.setup(swaggerSpec));


const port = config.port || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const redis = require('redis');
// const session = require('express-session');
// const RedisStore = require('connect-redis').default;
// const config = require('./config/config');
// const swaggerUi = require('swagger-ui-express');
// const swaggerSpec = require('./swagger');
// require('dotenv').config();

// const app = express();

// // Redis client
// const redisClient = redis.createClient({
//     host: config.redisHost,
//     port: config.redisPort
// });

// redisClient.on('error', (err) => {
//     console.error('Redis error: ', err);
// });

// // Middleware
// app.use(bodyParser.json());
// app.use(session({
//     store: new RedisStore({ client: redisClient }),
//     secret: config.sessionSecret,
//     resave: false,
//     saveUninitialized: false,
//     cookie: { secure: false }
// }));

// // Database connection
// mongoose.connect(config.mongoURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// mongoose.connection.on('connected', () => {
//     console.log('Connected to MongoDB');
// });

// mongoose.connection.on('error', (err) => {
//     console.log(`Error connecting to MongoDB: ${err}`);
// });

// // Routes
// const userRoutes = require('./routes/userRoutes');
// app.use('/api/users', userRoutes);

// const hotelRoutes = require('./routes/hotelRoutes');
// app.use('/api/hotels', hotelRoutes);

// const roomRoutes = require('./routes/roomRoutes');
// app.use('/api/hotels/:hotelId/rooms', roomRoutes);

// app.use((req, res, next) => {
//     console.log(`Received request: ${req.method} ${req.url}`);
//     next();
// });

// app.use('/api/rooms', roomRoutes);

// const bookingRoutes = require('./routes/bookingRoutes');
// app.use('/api/hotels/:hotelId/rooms/:roomId/bookings', bookingRoutes);

// // const swaggerSetup = require('./swagger');
// // swaggerSetup(app);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// const port = config.port || 3000;
// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });
