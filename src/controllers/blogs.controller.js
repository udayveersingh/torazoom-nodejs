const blogsModel = require("../models/blogs/blogs.model");
const requestHandler = require("../services/request.handler");

async function httpGetBlogs(req, res){
    try{
        const args = requestHandler(req.body);        
        const blogs = await blogsModel.getBlogs(args);
        return res.status(200).json({
            success: true,
            limit: args.limit,
            page: args.page,
            total: (blogs.length) ? await blogsModel.getBlogsTotalCount(args) : 0,
            data: blogs
        });
    }catch(error){
        console.log("Error ", error);
        return res.status(400).json({
            error: true,
            errors: [
                {
                    invalidRequest : error
                }
            ]
        });
    }
}


async function httpInsertBlog(req, res){
    var errors = [];
    if(!req.body.title){
        errors.push({titleRequired: "Blog Title is required"});
    }
    if(!req.body.content){
        errors.push({contentRequired: "Blog Content is required"});
    }
    if(!req.body.userId){
        errors.push({userIdRequired: "UserId is required"});
    }

    if(errors.length){
        return res.status(400).json({
            error: true,
            errors: errors
        });
    }

    
    try{
        const blogObject = {
            title: req.body.title,
            content: req.body.content,
            userId: req.body.userId,
        };
        const blog = await blogsModel.insertBlog(blogObject);
        if(blog){
            return res.status(200).json({
                success: true,
                data: blog
            });
        }else{
            return res.status(400).json({
                error: true,
                errors: [
                    {
                        requestFailed : "Something went wrong. Please try again later"
                    }
                ]
            });
        }
    }catch(error){
        return res.status(400).json({
            error: true,
            errors: [
                {
                    invalidRequest : error
                }
            ]
        });
    }
}

module.exports = {
    httpGetBlogs,
    httpInsertBlog
}