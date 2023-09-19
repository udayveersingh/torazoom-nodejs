const express = require("express");
const { verifyToken } = require("../services/auth");

const userRoutes = require("./users.routes");
const blogRoutes = require("./blogs.route");

const v1 = express.Router();

v1.use("/users", userRoutes);
v1.use("/blogs", verifyToken, blogRoutes);

module.exports = v1;
