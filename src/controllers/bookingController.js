const nodemailer = require('nodemailer');
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

// const createBooking = async (req, res) => {
//     const { hotelId, roomId } = req.params; // Extract parameters from the request

//     const { user, checkInDate, checkOutDate } = req.body;

//     // Convert dates to Date objects
//     const checkIn = new Date(checkInDate);
//     const checkOut = new Date(checkOutDate);

//     // Checking if the room is available for the given dates
//     const existingBooking = await Booking.findOne({
//         room: roomId, // Use roomId from params
//         status: 'booked',
//         $or: [
//             { checkInDate: { $lt: checkOut }, checkOutDate: { $gt: checkIn } },
//             { checkInDate: { $lte: checkIn }, checkOutDate: { $gte: checkIn } },
//             { checkInDate: { $lte: checkOut }, checkOutDate: { $gte: checkOut } }
//         ]
//     });

//     if (existingBooking) {
//         return res.status(400).json({ message: 'Room is not available for the selected period' });
//     }

//     const booking = new Booking({ user, hotel: hotelId, room: roomId, checkInDate: checkIn, checkOutDate: checkOut });

//     try {
//         const savedBooking = await booking.save();
//         res.status(201).json(savedBooking);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: '78e7da001@smtp-brevo.com',
        pass: 'YaQB2Op57Xd9nbAK',
    },
});

// Function to send booking confirmation email
const sendBookingConfirmationEmail = async (bookingDetails, guestEmail) => {
    const msg = {
        from: 'seguncrown2009@gmail.com', // Use the same from address
        to: guestEmail, // Guest email address
        subject: 'Booking Confirmation', // Subject of the email
        text: `Dear Valued Guest, your booking for room ${bookingDetails.room} from ${bookingDetails.checkInDate.toDateString()} to ${bookingDetails.checkOutDate.toDateString()} has been confirmed. Thank you for booking with us!`,
        html: `<p>Dear Valued Guest,</p><p>Your booking for room ${bookingDetails.room} from ${bookingDetails.checkInDate.toDateString()} to ${bookingDetails.checkOutDate.toDateString()} has been confirmed. Thank you for booking with us!</p>`,
    };

    try {
        const info = await transporter.sendMail(msg);
        console.log('Booking confirmation email sent successfully:', info.messageId);
        console.log('Email details:', msg);
    } catch (error) {
        console.error('Error sending booking confirmation email:', error);
    }
};

const createBooking = async (req, res) => {
    const { hotelId, roomId } = req.params; // Extract parameters from the request
    const { user, guestEmail, checkInDate, checkOutDate } = req.body;

    // Convert dates to Date objects
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    // Checking if the room is available for the given dates
    const existingBooking = await Booking.findOne({
        room: roomId, // Use roomId from params
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

    const booking = new Booking({ user, hotel: hotelId, room: roomId, checkInDate: checkIn, checkOutDate: checkOut, guestEmail });

    try {
        const savedBooking = await booking.save();
        console.log('Booking created successfully');
        console.log('Booking details:', savedBooking);

        // Send confirmation email
        await sendBookingConfirmationEmail(savedBooking, guestEmail);
        console.log('Booking details sent in email:', savedBooking);

        res.status(201).json(savedBooking);
    } catch (error) {
        console.error('Error creating booking:', error);
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
    const { checkInDate, checkOutDate, room } = req.body;

    // Convert the dates to JavaScript Date objects
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    try {
        // Check for overlapping bookings
        const existingBooking = await Booking.findOne({
            room: room,
            status: 'booked',
            _id: { $ne: req.params.id }, // Exclude the current booking
            $or: [
                { checkInDate: { $lt: checkOut, $gt: checkIn } },
                { checkOutDate: { $gt: checkIn, $lt: checkOut } },
                { checkInDate: { $lte: checkIn }, checkOutDate: { $gte: checkIn } },
                { checkInDate: { $lte: checkOut }, checkOutDate: { $gte: checkOut } }
            ]
        });

        if (existingBooking) {
            return res.status(400).json({ message: 'Room is not available for the selected period' });
        }

        // Update the booking
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