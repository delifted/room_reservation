const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    number: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    available: { type: Boolean, required: true },
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true } // Ensure this is defined
});

module.exports = mongoose.model('Room', roomSchema);


// const mongoose = require('mongoose');

// const roomSchema = new mongoose.Schema({
//     hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
//     number: { type: String, required: true },
//     type: { type: String, required: true },
//     price: { type: Number, required: true },
//     description: { type: String }
// }, { timestamps: true });

// const Room = mongoose.model('Room', roomSchema);

// module.exports = Room;