const express = require("express");
const userController = require("./../../controllers/userController");
const authenticate = require("../../middlewares/authenticate");

const userRouter = express.Router();

userRouter.get("/chats", authenticate, userController.getAllUser);
userRouter.get("/", authenticate, userController.getCurrentUser);
userRouter.get('/:id', userController.getUser)
userRouter.delete("/:id", authenticate, userController.deleteUser);
userRouter.patch("/:id", authenticate, userController.updateUser);

module.exports = userRouter;
