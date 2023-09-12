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
  
      // Busca la reserva por su ID
      const booking = await Booking.findById(bookingId);
  
      // Verifica si la reserva existe
      if (!booking) {
        return res.status(404).json({ message: 'Reserva no encontrada' });
      }
  
      // Agrega las nuevas fechas al array de fechas en la reserva
      booking.dates = [...booking.dates, ...newDates];
  
      // Guarda la reserva actualizada en la base de datos
      await booking.save();
  
      return res.status(200).json({ message: 'Reserva actualizada correctamente', booking });
    } catch (error) {
      console.error('Error al actualizar la reserva:', error);
      return res.status(500).json({ message: 'Error al actualizar la reserva' });
    }
  };

// Nueva función para crear múltiples reservas
// const createBookings = async (req, res) => {
//     try {
//         // Obtener el ID del usuario y del local desde la solicitud
//         const userId = req.userId; // Supongo que tienes un middleware que extrae el ID del usuario del token
//         console.log(userId, "este es el userId");
//         const localId = req.body.localId; // Esto depende de cómo se envíe el localId desde el cliente

//         // Obtener las fechas de reserva desde la solicitud
//         const { dates } = req.body; // Esto también depende de cómo se envíen las fechas desde el cliente

//         // Verificar si el usuario y el local existen en la base de datos
//         const user = await UsersNight.findById(userId);
//         const local = await Locals.findById(localId);

//         if (!user || !local) {
//             return res.status(404).json({ message: 'Usuario o local no encontrado' });
//         }

//         // Crear una nueva instancia de Booking por cada fecha
//         const bookings = dates.map(date => new Booking({
//             userId: userId,
//             localId: localId,
//             dates: [date], // Agrega la fecha actual al array de fechas de la reserva
//         }));

//         // Guardar las nuevas reservas en la base de datos
//         await Booking.insertMany(bookings);

//         res.status(200).json({ message: 'Reservas realizadas con éxito' });
//     } catch (error) {
//         console.error('Error al realizar las reservas:', error);
//         res.status(500).json({ message: 'Error al realizar las reservas' });
//     }
// };

module.exports = {
    createBooking,
    updateBooking,
    getAllBookings
    // createBookings
};
