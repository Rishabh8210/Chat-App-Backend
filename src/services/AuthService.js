const jwt = require("jsonwebtoken");
const UserRepository = require("./../repositories/UserRepository");
const bcrypt = require("bcryptjs");

class AuthService {
	constructor() {
		this.userRepository = new UserRepository();
	}

	async createUser(userData) {
		const { name, email, password, role, phone } = userData;

		const hashedPassword = await bcrypt.hash(password, 10);


		const user = await this.userRepository.createUser({
			name,
			email,
			password: hashedPassword,
			role,
			phone
		});

		return user;
	}

	async signin(email, password) {
		
		const user = await this.userRepository.getUserByEmail(email);
		if (!user) {
			throw new Error("User not found");
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		console.log("SJDFNCSIDJNFSID")
		if (!isPasswordValid) {
			throw new Error("Invalid password");
		}

		const token = jwt.sign(
			{ id: user.id, email: user.email },
			"YourSecretKey",
			{ expiresIn: "1h" }
		);

		return {
			token,
			user: {
				id: user.id,
				email: user.email,
				role: user.role,
			},
		};
	}
}

module.exports = AuthService;
