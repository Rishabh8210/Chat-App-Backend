// const {User} = require("../models/index");
const User = require('../models/Users')
class UserRepository {
	async createUser(userData) {
		const isUser = await User.findOne({email: userData.email});
		if(isUser){
			throw new Error("User already registered");
		}
		const user = new User({...userData});
		return await user.save()
	}

	async getUser(userId) {
		return await User.findById(userId);
	}

	async getUserByEmail(email) {
		return await User.findOne({ email });
	}

	async deleteUser(userId) {
		const user = await User.findByIdAndDelete(userId);
		return user;
	}

	async updateUser(userId, updatePatch) {
		const user = await User.findByIdAndUpdate(userId, updatePatch, { new: true });
		return user;
	}

	async getAllUser() {
		const user = await User.find({});
		return user;
	}
}

module.exports = UserRepository;
