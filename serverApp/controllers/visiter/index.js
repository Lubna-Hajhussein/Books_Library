const path = require("path");

exports.getSignUpForm = (req, res, next) => {
	res.sendFile(path.join(__dirname, "../../../", "clientApp/pages/signUp/signUp.html"));
};

exports.getLogInForm = (req, res, next) => {
	res.sendFile(path.join(__dirname, "../../../", "clientApp/pages/logIn/logIn.html"));
};

exports.getHistoryBooks = (req, res, next) => {
	res.sendFile(
		path.join(__dirname, "../../../", "clientApp/pages/books/history/history.html")
	);
};

exports.getLiteratureBooks = (req, res, next) => {
	res.sendFile(
		path.join(__dirname, "../../../", "clientApp/pages/books/literature/literature.html")
	);
};

exports.getPsychologyBooks = (req, res, next) => {
	res.sendFile(
		path.join(__dirname, "../../../", "clientApp/pages/books/psychology/psychology.html")
	);
};

exports.getReligionBooks = (req, res, next) => {
	res.sendFile(
		path.join(__dirname, "../../../", "clientApp/pages/books/religion/religion.html")
	);
};

exports.getSociologyBooks = (req, res, next) => {
	res.sendFile(
		path.join(__dirname, "../../../", "clientApp/pages/books/sociology/sociology.html")
	);
};
