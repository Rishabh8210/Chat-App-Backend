const express = require("express");

const userRouter = require("./userRoutes");
const authRouter = require("./authRoutes");
const conversationRouter = require('./conversationRoutes')
const v1Router = express.Router();

v1Router.use("/users", userRouter);
v1Router.use("/auth", authRouter);
v1Router.use('/conversations', conversationRouter)
module.exports = v1Router;
