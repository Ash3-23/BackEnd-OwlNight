const express = require("express");
const router = express.Router();

const localsController = require("../controllers/localsController");

router.get("/", localsController.getAllLocals);
router.get('/news', localsController.getLatestLocals);
router.get("/:localById", localsController.getLocalById);
router.delete("/:localById", localsController.deleteLocalById);
router.delete("/", localsController.deleteAllLocals);
router.post("/add/upload", localsController.addLocal);
router.patch("/:localById", localsController.editLocal);


module.exports = router;