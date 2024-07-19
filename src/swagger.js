// swagger.js
const swaggerDoc = require('./docs/room_res.json');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Room Reservation API',
            version: '1.0.0',
            description: 'API documentation for the Room Reservation platform',
            contact: {
                name: "Oluwasegun Oyelola",
                email: "oluwasegun@delifted.com.ng"
            },
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./routes/*.js'], // Path to the API docs
};


module.exports = { swaggerUi, swaggerDoc };

