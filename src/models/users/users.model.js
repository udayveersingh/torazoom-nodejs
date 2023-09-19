const usersSchema = require("./users.schema");
const throwError = require("../../services/throwError");
const { ignoreColumns } = require("../../services/schema.helper");

async function getUsers(){
    try{
        return await usersSchema.find({}, ignoreColumns());
    }catch(error){
        throwError(error);
    }
}

async function insertUser(user){
    try{
        const userData = await usersSchema.create(user);
        if(userData){
            return await usersSchema.findById(userData._id,  ignoreColumns() );
        }
    }catch(error){
        throwError(error);
    }
}

async function findUser(filter){
    return await usersSchema.findOne(filter, ignoreColumns() );
}

module.exports = {
    getUsers,
    insertUser,
    findUser
}