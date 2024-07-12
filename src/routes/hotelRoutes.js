const express = require('express');
const { addHotel, getHotels, getHotel, updateHotel, deleteHotel } = require('../controllers/hotelController');
const router = express.Router();

router.post('/', addHotel);
router.get('/', getHotels);
router.get('/:id', getHotel);
router.put('/:id', updateHotel);
router.delete('/:id', deleteHotel);

module.exports = router;