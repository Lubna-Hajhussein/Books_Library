const path = require("path");

const Book = require("../../models/book");
const User = require("../../models/user");

exports.getAdminHome = (req, res, next) => {
	res.sendFile(
		path.join(__dirname, "../../../", "clientApp/pages/admin/home.html")
	);
};

exports.getAddBooks = (req, res, next) => {
	res.sendFile(
		path.join(
			__dirname,
			"../../../",
			"clientApp/pages/admin/addBooks/addBooks.html"
		)
	);
};

exports.postAddBook = async (req, res, next) => {
	const { id, title, genre, img, previewLink } = req.body;
	try {
		const book = await Book.findById(id);
		if (book) {
			throw new Error("duplicated book");
		} else if (!book) {
			const book = new Book(id, title, genre, img, previewLink);
			const books = await book.addBook();
			if (books) {
				res.json({ bookAdded: true });
			}
		}
	} catch (err) {
		console.log({ err });
	}
};

exports.getUsers = async (req, res, next) => {
	try {
		const users = await User.getNormalUsers();
		res.json({ users: users });
	} catch (err) {
		console.log({ err });
	}
};

exports.getUsersPage = (req, res, next) => {
	res.sendFile(
		path.join(__dirname, "../../../", "clientApp/pages/admin/users/users.html")
	);
};

exports.deleteUser = async (req, res, next) => {
	try {
		const {userId} = req.params;
		const deleted = await User.deleteUserById(userId);
		res.json(deleted);
	} catch (err) {
		res.json({err});
	}
};

exports.getProfile = (req, res, next) => {
	res.sendFile(
		path.join(__dirname, "../../../", "clientApp/pages/admin/profile/profile.html")
	);
};
