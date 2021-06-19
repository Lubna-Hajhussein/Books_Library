const path = require("path");

const bcrypt = require("bcrypt");
const { v4 } = require("uuid");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const { confirmationHtml } = require("../../utilities/helpers");
const User = require("../../models/user");
const Book = require("../../models/book");

const transporter = nodemailer.createTransport(
	sendgridTransport({
		auth: {
			api_key:
				"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",
		},
	})
);

const {
	handleSignUp_errors,
	handleLogIn_errors,
	handleValidation_errors,
	handleLogInValidation_errors,
} = require("../../utilities/errors");
const { createToken, maxAge } = require("../../utilities/auth");

const sendConfEmail = async (email, htmlConfEmail) => {
	try {
		await transporter.sendMail({
			to: email,
			from: "lubnasupervisor@gmail.com",
			subject: "Sign up succeeded!",
			html: htmlConfEmail,
		});
		return "email sent";
	} catch (err) {
		return err;
	}
};

exports.postSignUp = async (req, res, next) => {
	const id = v4();
	const confirmEmailCode = Math.floor(Math.random() * 1000000000);
	const { username, email, password } = req.body;
	const role = "normal";
	const htmlConfEmail = confirmationHtml(confirmEmailCode);

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
			// const result = await sendConfEmail(email, htmlConfEmail);
			// if(result==="email sent"){
			const salt = await bcrypt.genSalt();
			const hashedPassword = await bcrypt.hash(password, salt);
			const user = new User(
				id,
				username,
				email,
				hashedPassword,
				role,
				confirmEmailCode
			);
			const users = await user.signUp();
			if (users) {
				// await sendConfEmail(email);
				// localStorage
				return res.redirect("/confirmEmail");
			}
		}
		// else {
		// 	res.json("something went wrong");
		// }
		// }
	} catch (err) {
		console.log({err})
		const duplicatedEmailErr = handleSignUp_errors(err);
		res.json(duplicatedEmailErr);
	}
};

exports.postConfirmEmail = async (req, res, next) => {
	const { confirmationCode, email } = req.body;
	try {
		const user = await User.confirmUser(email, Number(confirmationCode));
		if (user.confirmed) {
			return res.json({ confirmed: true });
		}
	} catch (err) {
		console.log({ err });
		res.json("err");
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
		res.json({ role: user.role });
	} catch (err) {
		const errors = handleLogIn_errors(err);
		res.status(400).json({ err: errors });
	}
};

exports.getConfirmEmail = (req, res, next) => {
	res.sendFile(
		path.join(
			__dirname,
			"../../../",
			"clientApp/pages/signUp/confirmEmail.html"
		)
	);
};

exports.getUserHome = (req, res, next) => {
	res.sendFile(
		path.join(__dirname, "../../../", "clientApp/pages/user/home.html")
	);
};

exports.getBooks = async (req, res, next) => {
   const books = await Book.getBooks();
   res.json({books:books});
};
