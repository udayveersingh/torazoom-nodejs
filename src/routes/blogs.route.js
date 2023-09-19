const express = require("express");
const blogsController = require("../controllers/blogs.controller");

const blogRoutes = express.Router();

blogRoutes.get("/", blogsController.httpGetBlogs );
blogRoutes.post("/", blogsController.httpInsertBlog );

module.exports = blogRoutes;