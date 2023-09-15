const express = require("express");
const router = express.Router();

const proManagerController = require("../controllers/proManagerContoller");

router.get("/loginpro", proManagerController.getProManger);
router.post("/", proManagerController.createDefaultProManager);
router.post("/loginpro", proManagerController.loginProManager);

module.exports = router;