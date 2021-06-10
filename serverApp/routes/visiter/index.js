const express = require("express");

const router = express.Router();

const visiterControllers = require("../../controllers/visiter/index");

router.get("/signUp", visiterControllers.getSignUpForm);

router.get("/logIn", visiterControllers.getLogInForm);

router.get("/history", visiterControllers.getHistoryBooks);

router.get("/literature", visiterControllers.getLiteratureBooks);

router.get("/psychology", visiterControllers.getPsychologyBooks);

router.get("/religion", visiterControllers.getReligionBooks);

router.get("/sociology", visiterControllers.getSociologyBooks);

module.exports = router;
