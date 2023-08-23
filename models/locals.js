const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const Locals = new Schema(
    {
        discoName: {
            type: String,
            required: [true, "campo obligatorio"]
        },
        deals: {
            type: Number,
            required: [true, "campo obligatorio"]
        },
        imgUrl: {
            type: String,
            required: true,
        }
        //TODO
        //CXLOIUDINARY

    },
    {
        timestamps: true, versionKey: false
    }
);

Locals.methods.setImgUrl = function setImgUrl(filename) {
    this.imgUrl = `${filename}`;
};


module.exports = mongoose.model("locals", Locals);