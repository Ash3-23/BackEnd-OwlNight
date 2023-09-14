const Booking = require('../models/booking');
const Locals = require('../models/locals');
const UsersNight = require('../models/usersNight');

const getAllBookings = async (req, res) => {
    try {
        const {userId} = req.params;
        console.log(userId, "este es el usuario desde mi reserva")
        const userBookings = await Booking.find({ userId: userId });
        console.log(userBookings, "este es userBookings")
        res.status(200).json({ bookings: userBookings });
    } catch (error) {
        console.error('Error al obtener las reservas del usuario:', error);
        res.status(500).json({ message: 'Error al obtener las reservas del usuario' });
    }
};


const createBooking = async (req, res) => {
    try {
        const { userId, localId, dates } = req.body;

        const userExists = await UsersNight.findById(userId);
        console.log(userId, "este es el usuario identificado");

        const localExists = await Locals.findById(localId);
        console.log(localId, "este es el localId");

        if (!userExists || !localExists) {
            return res.status(404).json({ message: 'Usuario o local no encontrado' });
        }
        const newBooking = new Booking({
            userId: userId,
            localId: localId,
            dates: dates,
        });
        const savedBooking = await newBooking.save();

        res.status(200).json({ message: 'Reserva realizada con éxito', booking: savedBooking });
    } catch (error) {
        console.error('Error al realizar la reserva:', error);
        res.status(500).json({ message: 'Error al realizar la reserva' });
    }
};

const updateBooking = async (req, res) => {
    try {
      const { bookingId } = req.params;
      const { newDates } = req.body;
  
      if (!bookingId || !newDates || newDates.length === 0) {
        return res.status(400).json({ message: 'Solicitud incorrecta' });
      }
      const booking = await Booking.findById(bookingId);
      if (!booking) {
        return res.status(404).json({ message: 'Reserva no encontrada' });
      }
      booking.dates = [...booking.dates, ...newDates];
      await booking.save();
      return res.status(200).json({ message: 'Reserva actualizada correctamente', booking });
    } catch (error) {
      console.error('Error al actualizar la reserva:', error);
      return res.status(500).json({ message: 'Error al actualizar la reserva' });
    }
  };


module.exports = {
    createBooking,
    updateBooking,
    getAllBookings
};
