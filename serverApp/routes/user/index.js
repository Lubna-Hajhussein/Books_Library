const path = require("path");

const express = require("express");

const router = express.Router();

const userControllers = require("../../controllers/user/index");

router.post("/signUp", userControllers.postSignUp);

router.post("/logIn", userControllers.postLogIn);

router.post("/confirmEmail", userControllers.postConfirmEmail);

router.get("/confirmEmail", userControllers.getConfirmEmail);

router.get("/userHome", userControllers.getUserHome);

router.get("/getBooks", userControllers.getBooks);

module.exports = router;