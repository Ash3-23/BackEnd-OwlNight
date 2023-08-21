const express = require("express");
const router = express.Router();

const localsController = require("../controllers/localsController");
// const multer = require("../configMulter/index");


router.get("/", localsController.getAllLocals);
router.get("/:localById", localsController.getLocalById)
router.delete("/:localById", localsController.deleteLocalById);
router.delete("/", localsController.deleteAllLocals);
router.post("/add/upload", localsController.addLocal);

// la funcion de cloudinary de upload
router.post("/upload", localsController.uploadLocal);//??

router.patch("/edit", localsController.uploadLocal);//??





module.exports = router;