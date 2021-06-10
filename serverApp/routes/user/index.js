const path = require("path");
// const x = require("../../../clientApp/pages/logIn/logIn.html")

const express = require("express");

const router = express.Router();

const userControllers = require("../../controllers/user/index");

router.post("/signUp", userControllers.postSignUp);

router.post("/logIn", userControllers.postLogIn);

module.exports = router;
