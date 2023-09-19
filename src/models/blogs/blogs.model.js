const blogsSchema = require("./blogs.schema");
const { ignoreColumns } = require("../../services/schema.helper");
const throwError = require("../../services/throwError");

async function getBlogs(args){
    try{
        if(args.populate){
            return await blogsSchema.find(args.filter, ignoreColumns() ).populate(args.populate).skip(args.skip).limit(args.limit);
        }else{
            return await blogsSchema.find(args.filter, ignoreColumns() ).skip(args.skip).limit(args.limit);
        }
    }catch(error){
        throwError(error);
    }    
}

async function getBlogsTotalCount(args){
    try{
        const blogs = await blogsSchema.find(args.filter, ignoreColumns() );
        return blogs.length;
    }catch(error){
        throwError(error);
    }    
}

async function getBlog(filter){
    try{
        return await blogsSchema.findOne(filter, ignoreColumns() );
    }catch(error){
        throwError(error);
    }
}

async function insertBlog(blog){
    try{
        const blogData = await blogsSchema.create(blog);
        if(blogData){
            return await blogsSchema.findById(blogData._id, ignoreColumns() );
        }
    }catch(error){
        throwError(error);
    }
}

module.exports = {
    getBlogs,
    getBlog,
    insertBlog,
    getBlogsTotalCount
}