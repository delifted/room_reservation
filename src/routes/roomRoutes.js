// const express = require('express');
// const { addRoom, getRooms, getRoom, updateRoom, deleteRoom } = require('../controllers/roomController');
// const router = express.Router({ mergeParams: true }); // Enable mergeParams

// router.post('/', addRoom);
// router.get('/', getRooms);
// router.get('/:id', getRoom);
// router.put('/:id', updateRoom);
// router.delete('/:id', deleteRoom);

// module.exports = router;

const express = require('express');
const { addRoom, getRooms, getRoom, updateRoom, deleteRoom } = require('../controllers/roomController');
const router = express.Router({ mergeParams: true }); // Enable mergeParams

/**
 * @swagger
 * /hotels/{hotelId}/rooms:
 *   post:
 *     summary: Add a new room to a hotel
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: hotelId
 *         required: true
 *         description: ID of the hotel
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roomNumber:
 *                 type: string
 *               roomType:
 *                 type: string
 *               price:
 *                 type: number
 *               availability:
 *                 type: boolean
 *             required:
 *               - roomNumber
 *               - roomType
 *               - price
 *               - availability
 *     responses:
 *       201:
 *         description: Room added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 roomNumber:
 *                   type: string
 *                 roomType:
 *                   type: string
 *                 price:
 *                   type: number
 *                 availability:
 *                   type: boolean
 */
router.post('/', addRoom);

/**
 * @swagger
 * /hotels/{hotelId}/rooms:
 *   get:
 *     summary: Get all rooms in a hotel
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: hotelId
 *         required: true
 *         description: ID of the hotel
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of rooms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   roomNumber:
 *                     type: string
 *                   roomType:
 *                     type: string
 *                   price:
 *                     type: number
 *                   availability:
 *                     type: boolean
 */
router.get('/', getRooms);

/**
 * @swagger
 * /hotels/{hotelId}/rooms/{id}:
 *   get:
 *     summary: Get a room by ID
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: hotelId
 *         required: true
 *         description: ID of the hotel
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the room
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Room details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 roomNumber:
 *                   type: string
 *                 roomType:
 *                   type: string
 *                 price:
 *                   type: number
 *                 availability:
 *                   type: boolean
 */
router.get('/:id', getRoom);

/**
 * @swagger
 * /hotels/{hotelId}/rooms/{id}:
 *   put:
 *     summary: Update a room
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: hotelId
 *         required: true
 *         description: ID of the hotel
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
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
 *               roomNumber:
 *                 type: string
 *               roomType:
 *                 type: string
 *               price:
 *                 type: number
 *               availability:
 *                 type: boolean
 *             required:
 *               - roomNumber
 *               - roomType
 *               - price
 *               - availability
 *     responses:
 *       200:
 *         description: Room updated successfully
 */
router.put('/:id', updateRoom);

/**
 * @swagger
 * /hotels/{hotelId}/rooms/{id}:
 *   delete:
 *     summary: Delete a room
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: hotelId
 *         required: true
 *         description: ID of the hotel
 *         schema:
 *           type: string
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the room
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Room deleted successfully
 */
router.delete('/:id', deleteRoom);

module.exports = router;
