const { default: mongoose } = require("mongoose");

const UsersNight = mongoose.model("usersNight", {
    usersName: {
        type: String,
        require: true,
    },
    email: String,
    password: String,
    dni: String,
    creditCard: Number,
}); 

module.exports = UsersNight;