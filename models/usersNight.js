const { default: mongoose } = require("mongoose");
const bcrypt = require('bcrypt');

const BookingSchema = new mongoose.Schema({
  
    fecha: {
      type: Date,
      required: true,
    },
    local: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UsersImages', 
      required: true,
    }
  });

const UsersNight = new mongoose.Schema({
    usersName: {
        type: String,
        required: true,
    },
    email: 
    {
        type: String,
        required: true,
    },
    password:
    {
        type: String,
        required: true,
    },
    dni:
    {
        type: String,
        required: true,
    },
    age:{
        type: Number,
        required: true,
    },
    avatarImg:{
        type: String,
    },
    reservas: [BookingSchema],

}); 

UsersNight.pre('save', function(next) {
    const user = this;

    if (!user.isModified('password')) return next();

    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) return next(err);

        user.password = hash;
        next();
    });
});

// UsersNight.methods.agregarReserva = function(reserva) {
//     this.reservas.push(reserva);
//   };


UsersNight.methods.setImgUrl = function setImgUrl(filename) {
    this.avatarImg = `${filename}`;
};


module.exports = mongoose.model('User', UsersNight);
