const express = require("express");
const { registerUser, loginUser, getMe } = require("../controllers/auth.controller");
const identifyUser = require("../middlewares/auth.middleware");

const authRouter = express.Router();

authRouter.post("/register", registerUser);

authRouter.post("/login", loginUser);

authRouter.get("/get-me", identifyUser, getMe);

module.exports = authRouter;
