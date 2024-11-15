const express = require("express");
const router = express.Router();
const { signUpSchema, loginSchema } = require("../validators/auth-validator");
const validator = require("../middleware/validate-middleware");
const { Register,Login } = require("../controllers/auth-controllers");

router.route("/register").post(validator(signUpSchema),Register)
router.route("/login").post(validator(loginSchema),Login)

module.exports = router