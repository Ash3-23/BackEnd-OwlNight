const Locals = require('../models/locals');
// const ProManager = require('../models/proManager') USO PARA EL EDIT?
const cloudinary = require('../cloudinaryConfig/index')
// const cloudinary = require('cloudinary').v2;

const getAllLocals = async (req, res) => {
    const allLocals = await Locals.find();
    res.json(allLocals)
    console.log("trayendo todos los locales")
}
const getLocalById = async (req, res) => {
    const { localById } = req.body;
    const LocalsId = await Locals.findById({ _id: localById })
    res.json(LocalsId);
}

const deleteLocalById = async (req, res) => {
    const { localById } = req.params;
    await Locals.deleteOne({ _id: localById });
    res.json('deleted local');
};

const deleteAllLocals = async (req, res) => {
    await Locals.deleteMany({});
    res.json("borrado todos los locales");
}; //POR AHORA SOLO PARA QUITARLOS DE GOLPE, SI NO TIENE FUNCIONALIDAD FUERA

const addLocal = async (req, res) => {
    const {
        discoName,
        deals,
        imgUrl
    } = req.body;

    const addNewLocal = new Locals({
        discoName,
        deals,
        imgUrl
    });
    const savedLocal = await addNewLocal.save();
    return res.json({
        savedLocal,
    });
} // esta funciona en /add/upload

const uploadLocal = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        
        const fileStr = req.file.path;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: "hdcs5ief"
        });

        const imgUrl = uploadResponse.secure_url;
        const newLocal = new Locals({
            discoName: req.body.discoName,
            deals: req.body.deals,
            imgUrl: imgUrl,
        });

        await newLocal.save();

        res.json({ message: 'uploaded image' });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ message: 'Error uploading image:', error: error.message });
    }
}

const editLocal = async (req, res) => {
    const { localById } = req.body;
    const localModified = Locals.updateOne({
       localById
    });
    await localModified.save();
    res.json('local updated');
}


module.exports = {
    getAllLocals,
    addLocal,
    deleteLocalById,
    uploadLocal,
    getLocalById,
    deleteAllLocals,
    editLocal
}