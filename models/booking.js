const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    dates: {
        type: Date,
        required: true,
    },
    localId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Local',
        required: true,
    },
});

module.exports = mongoose.model('Booking', bookingSchema);