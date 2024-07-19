// const express = require('express');
// const { createBooking, getBookings, getBooking, updateBooking, deleteBooking } = require('../controllers/bookingController');
// const router = express.Router({ mergeParams: true }); // Enable mergeParams to access hotelId and roomId

// // Update the route to use roomId
// router.post('/', createBooking);
// router.get('/', getBookings);
// router.get('/:id', getBooking);
// router.put('/:id', updateBooking);
// router.delete('/:id', deleteBooking);

// module.exports = router;


// const express = require('express');
// const { createBooking, getBookings, getBooking, updateBooking, deleteBooking } = require('../controllers/bookingController');
// const router = express.Router();

// router.post('/', createBooking);
// router.get('/', getBookings);
// router.get('/:id', getBooking);
// router.put('/:id', updateBooking);
// router.delete('/:id', deleteBooking);

// module.exports = router;

const express = require('express');
const { createBooking, getBookings, getBooking, updateBooking, deleteBooking } = require('../controllers/bookingController');
const router = express.Router({ mergeParams: true }); // Enable mergeParams to access hotelId and roomId

/**
 * @swagger
 * /hotels/{hotelId}/rooms/{roomId}/bookings:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: hotelId
 *         required: true
 *         description: ID of the hotel
 *         schema:
 *           type: string
 *       - in: path
 *         name: roomId
 *         required: true
 *         description: ID of the room
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               checkInDate:
 *                 type: string
 *                 format: date
 *               checkOutDate:
 *                 type: string
 *                 format: date
 *             required:
 *               - userId
 *               - checkInDate
 *               - checkOutDate
 *     responses:
 *       201:
 *         description: Booking created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 roomId:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 checkInDate:
 *                   type: string
 *                   format: date
 *                 checkOutDate:
 *                   type: string
 *                   format: date
 */
router.post('/', createBooking);

/**
 * @swagger
 * /hotels/{hotelId}/rooms/{roomId}/bookings:
 *   get:
 *     summary: Get all bookings
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: hotelId
 *         required: true
 *         description: ID of the hotel
 *         schema:
 *           type: string
 *       - in: path
 *         name: roomId
 *         required: true
 *         description: ID of the room
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   roomId:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   checkInDate:
 *                     type: string
 *                     format: date
 *                   checkOutDate:
 *                     type: string
 *                     format: date
 */
router.get('/', getBookings);

/**
 * @swagger
 * /hotels/{hotelId}/rooms/{roomId}/bookings/{id}:
 *   get:
 *     summary: Get a booking by ID
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: hotelId
 *         required: true
 *         description: ID of the hotel
 *         schema:
 *           type: string
 *       - in: path
 *         name: roomId
 *         required: true
 *         description: ID of the room
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the booking
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 roomId:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 checkInDate:
 *                   type: string
 *                   format: date
 *                 checkOutDate:
 *                   type: string
 *                   format: date
 */
router.get('/:id', getBooking);

/**
 * @swagger
 * /hotels/{hotelId}/rooms/{roomId}/bookings/{id}:
 *   put:
 *     summary: Update a booking
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: hotelId
 *         required: true
 *         description: ID of the hotel
 *         schema:
 *           type: string
 *       - in: path
 *         name: roomId
 *         required: true
 *         description: ID of the room
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the booking
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               checkInDate:
 *                 type: string
 *                 format: date
 *               checkOutDate:
 *                 type: string
 *                 format: date
 *             required:
 *               - userId
 *               - checkInDate
 *               - checkOutDate
 *     responses:
 *       200:
 *         description: Booking updated successfully
 */
router.put('/:id', updateBooking);

/**
 * @swagger
 * /hotels/{hotelId}/rooms/{roomId}/bookings/{id}:
 *   delete:
 *     summary: Delete a booking
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: hotelId
 *         required: true
 *         description: ID of the hotel
 *         schema:
 *           type: string
 *       - in: path
 *         name: roomId
 *         required: true
 *         description: ID of the room
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the booking
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Booking deleted successfully
 */
router.delete('/:id', deleteBooking);

module.exports = router;
