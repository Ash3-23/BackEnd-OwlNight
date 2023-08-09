const Locals = require('../models/locals');


const getAllLocals = async (req, res) => {
    const allLocals = await Locals.find();
    res.json(allLocals)
    console.log("trayendo todos los locales")
}

const postLocal = async (req, res) => {
    const {
        discoName,
        deals
    } = req.body;
    
    const newLocal = new Locals ({
        discoName,
        deals
    });
    await newLocal.save();
    res.json("nuevo centro pa los borrachos");
}


module.exports = {
    getAllLocals,
    postLocal
}