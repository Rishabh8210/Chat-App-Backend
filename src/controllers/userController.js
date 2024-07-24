const { StatusCodes } = require("http-status-codes");
const UserService = require("../services/UserService");
const UserRepository = require("../repositories/UserRepository");

const userService = new UserService(new UserRepository());

function pingUserController(req, res) {
	return res.json({
		message: "User Controller is running",
	});
}

async function addUser(req, res, next) {
	try {
		console.log("Incoming req body: ", req.body);
		const newUser = await userService.createUser(req.body);
		return res.status(StatusCodes.CREATED).json({
			success: true,
			message: "Successfully created a new user",
			error: {},
			data: newUser,
		});
	} catch (error) {
		next(error);
	}
}

async function getUser(req, res, next){
	try {
		console.log(req.params.id)
		const user = await userService.getUser(req.params.id);
		if (!user) {
			return res.status(StatusCodes.NOT_FOUND).json({
				success: false,
				message: "User not found",
				error: {},
				data: {},
			});
		}

		// console.log(user)
		return res.status(StatusCodes.OK).json({
			success: true,
			message: `Successfully fetched the user with ID: ${req.params.id}`,
			error: {},
			data: user,
		});
	} catch (error) {
		next(error);
	}
}

async function getCurrentUser(req, res, next) {
	try {
		const user = await userService.getUser(req.user.id);
		if (!user) {
			return res.status(StatusCodes.NOT_FOUND).json({
				success: false,
				message: "User not found",
				error: {},
				data: {},
			});
		}
		return res.status(StatusCodes.OK).json({
			success: true,
			message: `Successfully fetched the user with ID: ${req.user.id}`,
			error: {},
			data: user,
		});
	} catch (error) {
		next(error);
	}
}

async function deleteUser(req, res, next) {
	try {
		const deletedUser = await userService.deleteUser(req.user.id);
		return res.status(StatusCodes.OK).json({
			success: true,
			message: `Successfully deleted the user with ID ${req.user.id}`,
			error: {},
			data: deletedUser,
		});
	} catch (error) {
		next(error);
	}
}

async function updateUser(req, res, next) {
	try {
		console.log(req.body)
		const updatedUser = await userService.updateUser(req.user.id, req.body);
		return res.status(StatusCodes.OK).json({
			success: true,
			message: `Successfully updated the user info with ID ${req.user.id}`,
			error: {},
			data: 'User is updated',
		});
	} catch (error) {
		next(error);
	}
}

async function getAllUser(req, res, next) {
	try {
		const getAll = await userService.getAllUser();
		return res.status(StatusCodes.OK).json({
			success: true,
			message: `Successfully deleted the user with ID ${req.user.id}`,
			error: {},
			data: getAll,
		});
	} catch (error) {
		next(error);
	}
}

module.exports = {
	pingUserController,
	addUser,
	getUser,
	getCurrentUser,
	updateUser,
	deleteUser,
	getAllUser
};
