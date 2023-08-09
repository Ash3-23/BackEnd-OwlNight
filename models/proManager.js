const { default: mongoose } = require("mongoose");

const ProManager = mongoose.model("proManager", {
    proName: String,
    password: String,
});

module.exports = ProManager;