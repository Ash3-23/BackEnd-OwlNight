const { default: mongoose } = require("mongoose");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const port = 4000;
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
mongoose.connect('mongodb+srv://nereatrebol2:TTxjK39mS2dspDGS@cluster0.p3y0lbb.mongodb.net/OwlNight')


const usersNight = require("./routes/usersNightRoute");
const locals = require("./routes/localsRoute");
const proManager = require("./routes/proManagerRoute");


app.use("/usersNight", usersNight);
app.use("/locals", locals);
app.use("/proManager", proManager);

app.listen(port, () => {
    console.log(`Conectados correctamente a la emisora de la noche, ${port}`);
})
