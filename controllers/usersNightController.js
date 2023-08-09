const UsersNight = require("../models/usersNight");

const getUsersNight = async (req, res) => {
    const usersNight = await UsersNight.find();
    res.json(usersNight)
};

const getUserNightById = async (req, res) => {
    const { userNightById } = req.params;
    const userNight = await UsersNight.findById(userNightById)
    res.json(userNight)
};


const deleteUserNightById = async (req, res) => {
    const { userNightById } = req.params;
    await UsersNight.deleteOne({ _id: userNightById })
    res.json("borracho borrado");
};

const postUserNight = async (req, res) => {
    const {
        usersName,
        email,
        password,
        dni,
        creditCard,
    } = req.body;
    
    const newUserNight = new UsersNight ({
        usersName,
        email,
        password,
        dni,
        creditCard,
    });
    await newUserNight.save();
    res.json("nuevo borracho");
}


module.exports = {
    getUsersNight,
    getUserNightById,
    deleteUserNightById,
    postUserNight
};