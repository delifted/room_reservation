# Hotel and Room Reservation System

## Overview

The Hotel and Room Reservation System is a web application designed to facilitate the booking and management of hotel rooms. The system provides an interactive interface for users to search for hotels, view available rooms, make bookings, and manage their reservations. It also includes administrative functionalities for managing hotels, rooms, and bookings.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [System Architecture](#system-architecture)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Contributing](#contributing)

## Features

- User authentication and authorization
- Hotel and room management
- Room booking and reservation management
- Payment processing integration
- Real-time updates and notifications
- Interactive API documentation

## Technologies Used

### Backend

- Node.js
- Express.js

### Database

- MongoDB

### Caching & Session Management

- Redis

### Authentication

- JSON Web Tokens (JWT)

### API Documentation

- Swagger (OpenAPI)

### Testing

- Mocha
- Chai
- Supertest

### DevOps

- GitHub Actions

### Deployment

- Heroku or AWS

## System Architecture

![System Architecture](../../../Figure_1.png)

## Installation

### Prerequisites

- Node.js (v20.15.1)
- MongoDB
- Redis
- Git

### Backend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/room_reservation.git
    cd room_reservation
    ```

2. Install backend dependencies:
    ```bash
    cd backend
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the `backend` directory with the following content:
    ```env
    MONGODB_URI=your_mongodb_uri
    REDIS_URI=your_redis_uri
    JWT_SECRET=your_jwt_secret
    SMTP_HOST=your_smtp_host
    SMTP_PORT=your_smtp_port
    SMTP_USER=your_smtp_user
    SMTP_PASS=your_smtp_password
    ```

4. Start the backend server:
    ```bash
    npm start
    ```

## Usage

### Booking a Room

1. Ensure the backend server is running:
    ```bash
    cd backend
    npm start
    ```

2. Make a POST request to the booking endpoint:
    ```bash
    curl -X POST http://localhost:3000/api/hotels/{hotelId}/rooms/{roomId}/bookings \
    -H "Content-Type: application/json" \
    -d '{ "userId": "{userId}", "checkInDate": "2024-09-18", "checkOutDate": "2024-09-20" }'
    ```

### Managing Hotels and Rooms

- Use the provided API endpoints to manage hotels and rooms. Refer to the [API Documentation](#api-documentation) section for detailed information.

## API Documentation

Interactive API documentation is available at `/api-docs` when the backend server is running. It provides detailed information on all available endpoints, request parameters, and response formats.

## Testing

To run tests, use the following command in the backend directory:
```bash
npm test
