// const mongoose = require('mongoose');

// const bookingSchema = new mongoose.Schema({
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
//     room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
//     checkInDate: { type: Date, required: true },
//     checkOutDate: { type: Date, required: true },
//     status: { type: String, enum: ['booked', 'cancelled'], default: 'booked' }
// }, { timestamps: true });

// const Booking = mongoose.model('Booking', bookingSchema);

// module.exports = Booking;

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    guestEmail: { type: String, required: true }, // Add guest email field
    status: { type: String, enum: ['booked', 'cancelled'], default: 'booked' }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
