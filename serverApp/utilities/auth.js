const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
	const payload = { id };
	const secret = "books library website secret";
	return jwt.sign(payload, secret, {
		expiresIn: maxAge,
	});
};

module.exports = {
    createToken,
    maxAge
}