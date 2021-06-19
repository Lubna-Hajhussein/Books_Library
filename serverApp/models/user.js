const fs = require("fs").promises;
const path = require("path");

const bcrypt = require("bcrypt");

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
	constructor(id, name, email, passowrd, role, confirmEmailCode) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.passowrd = passowrd;
		this.role = role;
		this.confirmEmailCode = confirmEmailCode;
		this.confirmed = false;
	}

	static async findByEmail(email) {
		const users = await getUsersFromFile();
		return users.find((user) => user.email === email);
	}

	static async updateUser(id, updatedData) {
		//name, role, confirmEmailCode, confirmed
		try {
			const updatedDataKeys = Object.keys(updatedData);
			if (updatedDataKeys.includes("id")) {
				throw new Error("you can't update user id!");
			}
			const users = await getUsersFromFile();
			const userIndex = users.findIndex((user) => user.id === id);
			const user = users[userIndex];
			const updatedUser = { ...user, ...updatedData };
			const updatedUsers = [...users];
			updatedUsers[userIndex] = updatedUser;
			await fs.writeFile(p, JSON.stringify(updatedUsers));
			return this.findByEmail(user.email);
		} catch (err) {
			console.log({ err });
		}
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
			if (!user.confirmed) {
				throw Error("unconfirmed email");
			}
			const auth = await bcrypt.compare(password, user.passowrd);
			if (auth) {
				return user;
			}
			throw Error("incorrect password");
		}
		throw Error("unregistered email");
	}

	static async confirmUser(email, confirmationCode) {
		const user = await this.findByEmail(email);
		if (user.confirmEmailCode === confirmationCode) {
			return await this.updateUser(user.id, { confirmed: true });
		} else {
			throw new Error("confirmation code is incorrect!");
		}
	}

	static async getNormalUsers() {
		const users = await getUsersFromFile();
		const normalUsers = users.filter((user) => user.role === "normal");
		return normalUsers;
	}

	static async deleteUserById(userId) {
		const users = await getUsersFromFile();
		const userIndex = users.findIndex((user) => user.id === userId);
		if (userIndex === -1) {
			throw new Error("User is not exist");
		}
		const user = users[userIndex];
		const updatedUsers = [...users];
		updatedUsers.splice(userIndex, 1);
		await fs.writeFile(p, JSON.stringify(updatedUsers));
		const deleted = !!this.findByEmail(user.email);
		if (deleted) {
			return { deleted: true };
		}
		return { deleted: false };
	}
};
