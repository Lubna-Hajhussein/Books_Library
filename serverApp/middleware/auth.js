const jwt = require("jsonwebtoken");
const User = require("../models/user");

const requireAuth = (req, res, next) => {
	const token = req.cookies.jwt;
	// check json web token exists & is verified
	if (token) {
		jwt.verify(token, "books library website secret", (err, decodedToken) => {
			if (err) {
				console.log(err.message);
				res.redirect("/login");
			} else {
				console.log(decodedToken);
				next();
			}
		});
	} else {
		res.redirect("/login");
	}
};

module.exports = {
    requireAuth
}