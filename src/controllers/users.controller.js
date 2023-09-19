const usersModel = require("../models/users/users.model");
const {generateJwt} = require("../services/generateJWT");
const bcrypt = require("bcryptjs");


async function httpGetUsers(req, res){
    try{
        const users = await usersModel.getUsers();
        return res.status(200).json({
            success: true,
            data: users
        });
    }catch(error){
        return res.status(400).json({
            error: true,
            errors: [
                {
                    invalidRequest: error
                }
            ]
        });
    }
}

async function httpInsertUser(req, res){
    var errors = [];
    if(!req.body.email){
        errors.push({emailRequired: "Email address is required"});
    }
    if(!req.body.firstName){
        errors.push({firstNameRequired: "First Name is required"});
    }

    if(errors.length){
        return res.status(400).json({
            error: true,
            errors: errors
        });
    }

    const emailExists = await usersModel.findUser({email:req.body.email});
    if(emailExists){
        return res.status(403).json({
            error: true,
            errors: [
                {
                    emailExist: "This email address already exists."
                }
            ]
        });
    }

    const usernameExists = await usersModel.findUser({username:req.body.username});
    if(usernameExists){
        return res.status(403).json({
            error: true,
            errors: [
                {
                    usernameExist: "This Username already exists."
                }
            ]
        });
    }
    try{
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash( req.body.password, salt);
        const userObject = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            username: req.body.username,
            password: hashPassword,
        }
        const user = await usersModel.insertUser(userObject);
        return res.status(200).json({
            success: true,
            data:user
        });
    }catch(error){
        return res.status(200).json({
            error: true,
            errors: [
                {
                    invalidRequest: error
                }
            ]
        });
    }    
}

async function httpAuthenticateUser(req, res){
    var errors = [];
    if(!req.body.email){
        errors.push({emailRequired: "Email is required"});
    }
    if(!req.body.password){
        errors.push({passwordRequired: "Password is required"});
    }

    if(errors.length){
        return res.status(400).json({
            error: true,
            errors: errors
        });
    }

    const user = await usersModel.findUser({email:req.body.email});
    if(!user){
        return res.status(403).json({
            error: true,
            errors: [
                {
                    emailExist: "No user found with the given email address."
                }
            ]
        });
    }

    const validatePassword = await bcrypt.compare(req.body.password, user.password);
    if(!validatePassword){
        return res.status(403).json({
            error: true,
            errors: [
                {
                    usernameExist: "Invalid Password. Please try again."
                }
            ]
        });
    }
    try{
        const { error, token } = await generateJwt(user.email, user._id);
        if (error) {
            return res.status(500).json({
                error: true,
                message: "Couldn't create access token. Please try again later",
            });
        }
        
        user.accessToken = token;
        await user.save();

        return res.status(200).json({
            success: true,
            data: {
                accessToken:token,
                user:user
            }
        });
    }catch(error){
        return res.status(200).json({
            error: true,
            errors: [
                {
                    invalidRequest: error
                }
            ]
        });
    }
}

module.exports = {
    httpGetUsers,
    httpInsertUser,
    httpAuthenticateUser
}