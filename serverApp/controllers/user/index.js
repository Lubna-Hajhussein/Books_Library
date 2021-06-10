const path = require("path");

const bcrypt = require("bcrypt");
const { v4 } = require("uuid");

const User = require("../../models/user");
const {
	handleSignUp_errors,
	handleLogIn_errors,
	handleValidation_errors,
	handleLogInValidation_errors,
} = require("../../utilities/errors");
const { createToken, maxAge } = require("../../utilities/auth");

exports.postSignUp = async (req, res, next) => {
	const id = v4();
	const { name, email, password } = req.body;

	try {
		// check duplicated email
		const user = await User.findByEmail(email);
		if (user) {
			throw new Error("duplicated email");
		} else if (!user) {
			// check validation
			const validationErrs = handleValidation_errors(email, password);
			if (validationErrs) {
				return res.json(validationErrs);
			}
			const salt = await bcrypt.genSalt();
			const hashedPassword = await bcrypt.hash(password, salt);
			const user = new User(id, name, email, hashedPassword);
			const users = await user.signUp();
			if (users) {
				return res.redirect("/login");
			}
		}
	} catch (err) {
		const duplicatedEmailErr = handleSignUp_errors(err);
		res.json(duplicatedEmailErr);
	}
};

exports.postLogIn = async (req, res, next) => {
	const { email, password } = req.body;
	// check validation
	const validationErrs = handleLogInValidation_errors(email);
	if (validationErrs) {
		return res.json(validationErrs);
	}

	try {
		const user = await User.logIn(email, password);
		const token = createToken(user.id);
		res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
		res.send("logIn form");
	} catch (err) {
		const errors = handleLogIn_errors(err);
		res.json(errors);
	}
};
