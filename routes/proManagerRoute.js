const express = require("express");
const router = express.Router();

const proManagerController = require("../controllers/proManagerContoller");

router.post ("/", proManagerController.createDefaultProManager)
router.post("/loginpro", proManagerController.loginProManager);
router.get("/loginpro", proManagerController.getProManger);

module.exports = router;