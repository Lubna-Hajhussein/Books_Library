const fs = require("fs").promises;
const path = require("path");

const bcrypt = require("bcrypt");
const { uuid } = require("uuidv4");

const rootDir = require("../utilities/path");

const p = path.join(rootDir, "data", "user.json");

const getUsersFromFile = async () => {
	try {
		const data = await fs.readFile(p, "binary");
		return JSON.parse(data);
	} catch (err) {
		if (err.code === "ENOENT") {
			return [];
		}
		return err;
	}
};

module.exports = class User {
	constructor(id, name, email, passowrd) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.passowrd = passowrd;
	}

	static async findByEmail(email) {
		const users = await getUsersFromFile();
		return users.find((user) => user.email === email);
	}

	async signUp() {
		try {
			const users = await getUsersFromFile();
			users.push(this);
			await fs.writeFile(p, JSON.stringify(users));
			return users;
		} catch (err) {
			console.log({ err });
		}
	}

	static async logIn(email, password) {
		const user = await this.findByEmail(email);
		if (user) {
			const auth = await bcrypt.compare(password, user.passowrd);
			if (auth) {
				return user;
			}
			throw Error("incorrect password");
		}
		throw Error("unregistered email");
	}
};
