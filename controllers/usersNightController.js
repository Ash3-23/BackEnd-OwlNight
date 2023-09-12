const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UsersNight = require("../models/usersNight");
const { signToken, verifyToken } = require('./tokenController');
const { uploadImage, uploadUserImage } = require('../cloudinaryConfig/index');
const ProManager = require("../models/proManager")

const mySecret = process.env.TOKENSECRET

//REGISTER USERSNIGHT
const registerUserNight = async (req, res) => {
    try {
        const {
            usersName,
            email,
            password,
            dni,
            age,
        } = req.body;

        const newUserNight = new UsersNight({
            usersName,
            email,
            password,
            dni,
            age,
        });
        await newUserNight.save();
        console.log(newUserNight, "HOLA NUEVO USER");
        const token = signToken({ userId: newUserNight._id, usersName });
        res.status(200).json({ result: "new drunk created", token });

        console.log(newUserNight);
    } catch (error) {
        res.status(400).json({ message: error });
    }
};
//LOGIN USERSNIGHT Y PROMANAGER
const login = async (req, res) => {
    const { usersName, password } = req.body;
    // Buscar si es un ProManager
    const proManager = await ProManager.findOne({ proName: usersName });
    console.log(password, "Promanager");
    if (usersName === 'El Direc') {
        //ProManager
        console.log(password, "Promanager password login", proManager.password, 'password en la db' );
        const proPassword = await bcrypt.compare(password, proManager.password); //ESTO ME DEVUELVE UN FALSE
        console.log(proManager.password, "proManager.password"); //me devuelve el token
        console.log(proPassword, "paswordValid");
        const token = signToken({ userId: proManager._id, usersName });
        return res.status(200).json({ result: "ProManager logueado correctamente", token });
        
    }
    // Si no es un ProManager o la contraseña no coincide, colección de UsersNight
    const userNight = await UsersNight.findOne({ usersName: usersName });
    if (userNight) {
        const isPasswordValid = await bcrypt.compare(password, userNight.password);
        console.log(isPasswordValid, "password"); // esto me devuelve true si coincide
        if (isPasswordValid) {
            const token = signToken({ userId: userNight._id, usersName });
            return res.status(200).json({ result: "Usuario logueado correctamente", token });
        }
    }
    // Si no se encontró un ProManager ni un usuario normal, devolver un error
    return res.status(401).json({ message: 'Credenciales inválidas' });
};

const getUserNightById = async (req, res) => {
    console.log("soy el controlador del byId");
    const { userNightById } = req.params;
    try {
        const userNight = await UsersNight.findById(userNightById);
        if (!userNight) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(userNight);
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

//no la estoy dando uso, se usa con proManager
const getUsersNight = async (req, res) => {
    const usersNight = await UsersNight.find();
    res.json(usersNight)
}; //no la estoy dando uso, se usa con proManager


const deleteUserNightById = async (req, res) => {
    const { userNightById } = req.params;
    await UsersNight.deleteOne({ _id: userNightById });
    res.json("borracho borrado");
};

//Función para meter la imagen en el avatar y editar los campos del usuario en el perfil
const updateAvatar = async (req, res) => {
    try {
        const formData = new FormData();
        formData.append('avatar', req.file);
        const cloudinaryResponse = await uploadUserImage(req.file.path);

        const userNight = await UsersNight.findById(req.userId);
        userNight.avatarImg = cloudinaryResponse.secure_url;
        await userNight.save();

        res.status(200).json({ avatarUrl: userNight.avatarImg });
    } catch (error) {
        console.error('Error al actualizar la imagen de avatar:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

//hacer aquí la lógica de reservas guardando los locales en el array de usersNIGHT
const localBooking = async (req, res) => {
    try {
        const newBooking = await guardarReservaEnDB(req.body);

        const userId = req.userId;
        const reservasActuales = obtenerReservasDelUsuario(userId);

        reservasActuales.push(newBooking);

        const nuevoToken = generarNuevoTokenConReservas(userId, reservasActuales);

        res.status(200).json({ message: 'Reserva realizada con éxito', token: nuevoToken });
    } catch (error) {
        res.status(500).json({ message: 'Error al realizar la reserva' });
    }
};


// ESTA ES LA ANTIGUA Y FUNCIONA!!!!
const getUserData = async (req, res) => {
    try {
        const token = req.header('Authorization');
        const arr = token.split(' ');
        const arrToken = arr[1];

        const decoded = verifyToken(arrToken);

        const userNight = await UsersNight.findById(decoded.userId);
        if (!userNight) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(userNight);
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Token inválido' });
        }
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

module.exports = {
    login,
    getUsersNight,
    getUserNightById,
    deleteUserNightById,
    registerUserNight,
    getUserData,
    updateAvatar,
    localBooking
};