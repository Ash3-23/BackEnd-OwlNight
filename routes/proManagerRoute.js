const express = require("express");
const router = express.Router();

const proManagerController = require("../controllers/proManagerContoller");

router.post("/login", proManagerController.loginProManager);

module.exports = router;