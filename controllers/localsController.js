const Locals = require('../models/locals');
// const ProManager = require('../models/proManager') USO PARA EL EDIT?
// const cloudinary = require('../cloudinaryConfig/index');
require("dotenv").config();
const upload = require('../configMulter/index');
const { uploadImage } = require("../cloudinaryConfig/index")


const getAllLocals = async (req, res) => {
    try {
        const allLocals = await Locals.find();
        res.json(allLocals);
        console.log("bringing all the locals")
    } catch (error) {
        res.status(500).json({ message: "Oops something went wrong" })
    }
};

const getLocalById = async (req, res) => {
    try {
        const { localById } = req.params;
        const LocalsId = await Locals.findById({ _id: localById })
        res.json(LocalsId);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

const deleteLocalById = async (req, res) => {
    try {
        const { localById } = req.params;
        await Locals.deleteOne({ _id: localById });
        res.json('deleted local');
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

const deleteAllLocals = async (req, res) => {
    try {
        await Locals.deleteMany({});
        res.json("borrado todos los locales");
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}; //POR AHORA SOLO PARA QUITARLOS DE GOLPE, SI NO TIENE FUNCIONALIDAD FUERA

const addLocal = async (req, res) => {
    try {
        const { discoName, deals, imgUrl } = req.body;

        if (req.files?.imgUrl) {
            const result = await uploadImage(req.files.imgUrl.tempFilePath);

            const newLocal = new Locals({
                discoName,
                deals,
                imgUrl: result.secure_url
            });
            const savedLocal = await newLocal.save();
            res.status(201).json({ message: 'Added drunk center', savedLocal });
        }
        else {
            const newLocal = new Locals({
                discoName,
                deals,
                imgUrl: ''
            });
            const savedLocal = await newLocal.save();
            console.log("Added drunk center without imgUrl")
            res.status(201).json({ message: 'Added drunk center without imgUrl', savedLocal });
        }

    } catch (error) {
        console.error('Error adding drunk center:', error);
        res.status(500).json({ message: 'Error adding drunk center', error: error.message });
    }
}; //ADDLOCAL CORRECT


const editLocal = async (req, res) => {

    try {
        const { localById } = req.params
        const { discoName, deals, imgUrl } = req.body;
        console.log('req.body:', req.body);

        const updateFields = {
            discoName,
            deals,
            imgUrl
        };
        const localModified = await Locals.findByIdAndUpdate({
            _id: localById
        }, {
            $set: updateFields
        },);
        res.json('local updated');
        console.log(localModified);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};
module.exports = {
    getAllLocals,
    addLocal,
    deleteLocalById,
    getLocalById,
    deleteAllLocals,
    editLocal,
}