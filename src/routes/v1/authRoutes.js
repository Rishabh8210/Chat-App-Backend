const express = require("express");
const authenticate = require("./../../middlewares/authenticate");
const authController = require("../../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);

module.exports = router;
