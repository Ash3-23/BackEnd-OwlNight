const { default: mongoose } = require("mongoose");

const Locals = mongoose.model("locals", {
    discoName: String,
    deals: Number,
});

module.exports = Locals;