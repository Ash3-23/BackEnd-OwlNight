const express = require("express");
const router = express.Router();

const localsController = require("../controllers/localsController");

router.get("/", localsController.getAllLocals);
router.post("/", localsController.postLocal);


module.exports = router;