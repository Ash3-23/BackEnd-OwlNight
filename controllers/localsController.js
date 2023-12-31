const Locals = require('../models/locals');
require("dotenv").config();
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
};

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

const getLatestLocals = async (req, res) => {
    try {
        const latestLocals = await Locals.find({ imgUrl: { $ne: "" } })
            .sort({ createdAt: -1 })
            .limit(3);
        res.json(latestLocals);
        console.log(latestLocals, "estos son los 3 ultimos locales");
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los últimos locales" });
    }
};

const editLocal = async (req, res) => {
    try {
        const { localById } = req.params;
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
        const localModified = await Locals.findByIdAndUpdate(
            localById,
            {
                $set: updateFields
            },);
        res.json('local updated');
        console.log(localModified, "este es el local modificado");
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

module.exports = {
    getAllLocals,
    addLocal,
    getLatestLocals,
    deleteLocalById,
    getLocalById,
    deleteAllLocals,
    editLocal
}