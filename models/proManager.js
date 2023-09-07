const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require('bcrypt');


const ProManagerSchema = new Schema({
    imgUrl: Object,
    proName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

ProManagerSchema.pre('save', async function(next) {
    const proManager = this;

    if (!proManager.isModified('password')) return next();

    try {
        const hashedPassword = await bcrypt.hash(proManager.password, 10);
        proManager.password = hashedPassword;
        console.log(hashedPassword);
        next();
    } catch (error) {
        return next(error);
    }
});


const ProManager = mongoose.model("ProManager", ProManagerSchema);

module.exports = ProManager;