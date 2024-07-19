// const express = require('express');
// const { addHotel, getHotels, getHotel, updateHotel, deleteHotel } = require('../controllers/hotelController');
// const router = express.Router();

// router.post('/', addHotel);
// router.get('/', getHotels);
// router.get('/:id', getHotel);
// router.put('/:id', updateHotel);
// router.delete('/:id', deleteHotel);

// module.exports = router;

const express = require('express');
const { addHotel, getHotels, getHotel, updateHotel, deleteHotel } = require('../controllers/hotelController');
const router = express.Router();

/**
 * @swagger
 * /hotels:
 *   post:
 *     summary: Add a new hotel
 *     tags: [Hotels]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               rating:
 *                 type: number
 *               amenities:
 *                 type: array
 *                 items:
 *                   type: string
 *             required:
 *               - name
 *               - location
 *     responses:
 *       201:
 *         description: Hotel added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 location:
 *                   type: string
 *                 rating:
 *                   type: number
 *                 amenities:
 *                   type: array
 *                   items:
 *                     type: string
 */
router.post('/', addHotel);

/**
 * @swagger
 * /hotels:
 *   get:
 *     summary: Get all hotels
 *     tags: [Hotels]
 *     responses:
 *       200:
 *         description: List of hotels
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   location:
 *                     type: string
 *                   rating:
 *                     type: number
 *                   amenities:
 *                     type: array
 *                     items:
 *                       type: string
 */
router.get('/', getHotels);

/**
 * @swagger
 * /hotels/{id}:
 *   get:
 *     summary: Get a hotel by ID
 *     tags: [Hotels]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the hotel
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Hotel details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 location:
 *                   type: string
 *                 rating:
 *                   type: number
 *                 amenities:
 *                   type: array
 *                   items:
 *                     type: string
 */
router.get('/:id', getHotel);

/**
 * @swagger
 * /hotels/{id}:
 *   put:
 *     summary: Update a hotel
 *     tags: [Hotels]
 *     parameters:
 *       - in: path
 *         name: id
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
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               rating:
 *                 type: number
 *               amenities:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Hotel updated successfully
 */
router.put('/:id', updateHotel);

/**
 * @swagger
 * /hotels/{id}:
 *   delete:
 *     summary: Delete a hotel
 *     tags: [Hotels]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the hotel
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Hotel deleted successfully
 */
router.delete('/:id', deleteHotel);

module.exports = router;
