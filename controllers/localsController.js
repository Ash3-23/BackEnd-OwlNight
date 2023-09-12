const Locals = require('../models/locals');
// const ProManager = require('../models/proManager') USO PARA EL EDIT?
// const cloudinary = require('../cloudinaryConfig/index');
require("dotenv").config();
// const upload = require('../configMulter/index');
const { uploadImage } = require("../cloudinaryConfig/index")


const getAllLocals = async (req, res) => {
    try {
        const queryParams = req.query;
        console.log(queryParams.categories, "es esto");
        const filter = {};
        if (queryParams.categories) {
            filter.categories = queryParams.categories;
        }
        const allLocals = await Locals.find(filter);
        res.json(allLocals);
        console.log("bringing all the locals")
    } catch (error) {
        res.status(500).json({ message: "Oops something went wrong" })
    }
}; //aplicar logica filtros

const getLocalById = async (req, res) => {
    try {
        const { localById } = req.params;
        const LocalsId = await Locals.findById({ _id: localById })
        res.json(LocalsId);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

// const getAvailableDates = async (req, res) => {
//     try {
//         // Aquí obtienes las fechas disponibles desde tu fuente de datos
//         const localDates = req.body;
//         const dates = localDates.availableDates;
//         console.log(dates, "estas son las dates que me llegan");
        
//         res.status(200).json({ availableDates: dates });
//     } catch (error) {
//         res.status(500).json({ error: 'Error al obtener las fechas disponibles' });
//     }
// };


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
}; // AÑADIR LA FUNCIÓN PARA QUE BORRE LAS IMÁGENES EN CLOUDINARY //BORRAR!!!

const addLocal = async (req, res) => {
    try {
        const {
            discoName,
            ubication,
            date,
            promotion,
            deals,
            hour,
            imgUrl,
            availableDates,
            categories
        } = req.body;
        if (req.files?.imgUrl) {
            const result = await uploadImage(req.files.imgUrl.tempFilePath);

            const newLocal = new Locals({
                discoName,
                deals,
                imgUrl: result.secure_url,
                ubication,
                date,
                promotion,
                hour,
                availableDates,
                categories
            });
            const savedLocal = await newLocal.save();
            res.status(201).json({ message: 'Local added successfully', savedLocal });
        }
        else {
            const newLocal = new Locals({
                discoName,
                deals,
                imgUrl: '',
                ubication,
                date,
                promotion,
                hour,
                availableDates,
                categories
            });
            const savedLocal = await newLocal.save();
            res.status(201).json({ message: 'Local added successfully without imgUrl', savedLocal });
        }

    } catch (error) {
        console.error('Error adding local:', error);
        res.status(500).json({ message: 'Error adding local', error: error.message });
    }
};

const editLocal = async (req, res) => {
    try {
        const { localById } = req.params
        const {
            discoName,
            ubication,
            date,
            promotion,
            deals,
            hour,
            imgUrl,
            availableDates,
            categories
        } = req.body;
        console.log('req.body:', req.body);

        const updateFields = {
            discoName,
            ubication,
            date,
            promotion,
            deals,
            hour,
            imgUrl,
            availableDates,
            categories
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
    // getAvailableDates,
    deleteLocalById,
    getLocalById,
    deleteAllLocals,
    editLocal
    
}