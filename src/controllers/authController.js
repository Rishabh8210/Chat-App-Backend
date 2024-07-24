const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models/index");
const AuthService = require("./../services/AuthService");
const UserRepository = require("./../repositories/UserRepository");

const authService = new AuthService(new UserRepository());

const signup = async (req, res, next) => {
	try {
		console.log(req.body)
		const newUser = await authService.createUser(req.body);
		return res.status(StatusCodes.CREATED).json({
			success: true,
			message: "Successfully created a new user",
			error: {},
			data: newUser,
		});
	} catch (error) {
		next(error);
	}
};

const signin = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		
		const result = await authService.signin(email, password);
		// console.log(result)
		return res.json(result);
	} catch (error) {
		if (error.message === "User not found") {
			return res.status(404).json({ message: "User not found" });
		} else if (error.message === "Invalid password") {
			return res.status(401).json({ message: "Invalid password" });
		} else {
			next(error);
		}
	}
};

module.exports = {
	signup,
	signin,
};
