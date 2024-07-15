const Booking = require('../models/bookingModel');
const Room = require('../models/roomModel');

// const createBooking = async (req, res) => {
//     const { user, hotel, room, checkInDate, checkOutDate } = req.body;

//     // Checking if the room is available for the given dates
//     const existingBooking = await Booking.findOne({
//         room,
//         status: 'booked',
//         $or: [
//             { checkInDate: { $lt: checkOutDate, $gt: checkInDate } },
//             { checkOutDate: { $gt: checkInDate, $lt: checkOutDate} }
//         ]
//     });

//     if (existingBooking) {
//         return res.status(400).json({ message: 'Room is not available for the selected period' });
//     }

//     const booking = new Booking({ user, hotel, room, checkInDate, checkOutDate });

//     try {
//         const savedBooking = await booking.save();
//         res.status(201).json(savedBooking);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

const createBooking = async (req, res) => {
    const { user, hotel, room, checkInDate, checkOutDate } = req.body;

    // Convert dates to Date objects
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    // Checking if the room is available for the given dates
    const existingBooking = await Booking.findOne({
        room,
        status: 'booked',
        $or: [
            { checkInDate: { $lt: checkOut }, checkOutDate: { $gt: checkIn } },
            { checkInDate: { $lte: checkIn }, checkOutDate: { $gte: checkIn } },
            { checkInDate: { $lte: checkOut }, checkOutDate: { $gte: checkOut } }
        ]
    });

    if (existingBooking) {
        return res.status(400).json({ message: 'Room is not available for the selected period' });
    }

    const booking = new Booking({ user, hotel, room, checkInDate, checkOutDate });

    try {
        const savedBooking = await booking.save();
        res.status(201).json(savedBooking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


const getBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id).populate('user hotel room');
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};

const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('user hotel room');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};

const updateBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { createBooking, getBookings, getBooking, updateBooking, deleteBooking };