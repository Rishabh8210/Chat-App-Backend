const express = require("express");
const convoController = require("../../controllers/conversationController");
const authenticate = require("../../middlewares/authenticate");

const convoRouter = express.Router();

convoRouter.get("/:id", authenticate, convoController.getAllMessage);
convoRouter.post('/', authenticate, convoController.createMessage)
module.exports = convoRouter;
