//Library
import express  from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Models
import { UserModel } from "../../database/allModels";


//Router
const Router = express.Router();

Router.post("/signup" , async (req,res) => {
    try{
        const { fullname , email , password ,  phonenumber } = req.body.credentials;
        const checkUserByEmail = await UserModel.findOne({email});
        const checkUserbyphonenumber = await UserModel.findOne({ phonenumber });

        if(checkUserByEmail || checkUserbyphonenumber){
            return res.json({email: "user already exist"});     
        }

        // hash password
        const bcryptSalt = await bcrypt.genSalt(8);
        const hashedPassword = await bcrypt.hash(password,bcryptSalt);

        //save data to database 
        await UserModel.create({...req.body.credentials, password: hashedPassword});

        //generate jwt token
        const token = jwt.sign({user: {fullname, email} }, "myzomatoapp");
        return res.status(200).json({ token , status: "success"});
    }
    catch(error){
        return res.status(500).json({ error: error.message });
    }
});

export default Router;