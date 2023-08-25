const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const ProManager = mongoose.model("proManager", {

    imgUrl: { type: Schema.Types.ObjectId, ref: "locals" },
    proName: String,
    password: String,
});

module.exports = ProManager;