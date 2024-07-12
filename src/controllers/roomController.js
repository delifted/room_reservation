const Room = require('../models/roomModel');
const Hotel = require('../models/hotelModel');

const addRoom = async (req, res) => {
    try {
        const room = new Room(req.body);
        const savedRoom = await room.save();

        await Hotel.findByIdAndUpdate(savedRoom.hotel, { $push: { rooms: savedRoom._id } });

        res.status(201).json(savedRoom);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find().populate('hotel');
        res.status(200).json(rooms);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id).populate('hotel');
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.status(200).json(room);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateRoom = async (req, res) => {
    try {
        const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.status(200).json(room);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteRoom = async (req, res) => {
    try {
        const room = await Room.findByIdAndDelete(req.params.id);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        res.status(200).json({ message: 'Room deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { addRoom, getRooms, getRoom, updateRoom, deleteRoom };