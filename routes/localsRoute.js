const express = require("express");
const router = express.Router();
// const upload = multer({ dest: "uploads/images" });
const upload = require("../configMulter/index");

const localsController = require("../controllers/localsController");
// const multer = require("../configMulter/index");


router.get("/", localsController.getAllLocals);
router.get("/:localById", localsController.getLocalById)
router.delete("/:localById", localsController.deleteLocalById);
router.delete("/", localsController.deleteAllLocals);
router.post("/add/upload", localsController.addLocal);

router.patch("/:localById", localsController.editLocal);//??




module.exports = router;