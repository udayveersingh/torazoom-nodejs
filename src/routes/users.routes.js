const express = require("express");
const usersController = require("../controllers/users.controller");

const userRoutes = express.Router();

userRoutes.get("/", usersController.httpGetUsers );
userRoutes.post("/", usersController.httpInsertUser );

module.exports = userRoutes;