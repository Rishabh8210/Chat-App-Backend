const UserRepository = require("./../repositories/UserRepository");
const bcrypt = require("bcryptjs");

class UserService {
	constructor() {
		this.userRepository = new UserRepository();
	}

	async createUser(userData) {
		const { name, email, password, role } = userData;

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await this.userRepository.createUser({
			name,
			email,
			password: hashedPassword,
			role,
		});

		return user;
	}

	async getUser(userId) {
		const user = await this.userRepository.getUser(userId);
		return user;
	}

	async deleteUser(userId) {
		const user = await this.userRepository.deleteUser(userId);
		return user;
	}

	async updateUser(userId, updatePatch) {
		const user = await this.userRepository.updateUser(userId, updatePatch);
		return user;
	}

	async getAllUser() {
		const user = await this.userRepository.getAllUser();
		return user;
	}
}

module.exports = UserService;
