const { default: mongoose } = require("mongoose");
const express = require("express");
const cors = require("cors");
const fileupload = require("express-fileupload")
const morgan = require("morgan");
const multer = require('multer');

require("dotenv").config();

const app = express();
const port = 4000;

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: "./uploads/images"
}))
mongoose.connect('mongodb+srv://nereatrebol2:TTxjK39mS2dspDGS@cluster0.p3y0lbb.mongodb.net/OwlNight')
//poner la conexión en .env

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const usersNight = require("./routes/usersNightRoute");
const locals = require("./routes/localsRoute");
const proManager = require("./routes/proManagerRoute");
const bookings = require("./routes/bookingRoute")


app.use("/usersNight", usersNight);
app.use("/locals", locals);
app.use("/proManager", proManager);
app.use("/bookings", bookings)

app.listen(port, () => {
    console.log(`Conectados correctamente a la emisora de la noche, ${port}`);
})
