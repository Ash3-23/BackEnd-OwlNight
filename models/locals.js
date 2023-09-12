const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const Locals = new Schema(
    {
        discoName: {
            type: String,
            required: [true, "campo obligatorio"]
        },
        ubication: {
            type: String,
            required: [true, "campo obligatorio"]
        },
        date: {
            type: String
        },
        promotion: {
            type: String,
            required: [true, "campo obligatorio"]
        },
        deals: {
            type: Number,
            required: [true, "campo obligatorio"]
        },
        hour: {
            type: String,
            required: [true, "campo obligatorio"]
        },
        imgUrl: {
            type: Object,
            required: true,
        },
        availableDates: [{
            type: String, // Cambiar de Date a String
            required: true
          }],
        categories: [{
            type: String,
            required: true
        }],
    },
    {
        timestamps: true, versionKey: false
    }
);

Locals.methods.setImgUrl = function setImgUrl(filename) {
    this.imgUrl = `${filename}`;
};


module.exports = mongoose.model("locals", Locals);