const express = require("express");
const router = express.Router();
// const upload = multer({ dest: "uploads/images" }); lo voy a usar??
const upload = require("../configMulter/index");

const localsController = require("../controllers/localsController");
// const multer = require("../configMulter/index");


router.get("/", localsController.getAllLocals);
// router.get("/dates", localsController.getAvailableDates); // Ruta para obtener fechas disponibles
router.get('/news', localsController.getLatestLocals); //3 locales de Novedad
router.get("/:localById", localsController.getLocalById);
router.delete("/:localById", localsController.deleteLocalById);
router.delete("/", localsController.deleteAllLocals);
router.post("/add/upload", localsController.addLocal);
router.patch("/:localById", localsController.editLocal);//Hacer esta página


module.exports = router;