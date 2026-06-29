import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from "../models/user.model.js";

const registeruser = async (req,res)=>{
    const {username,email,password} = req.body;

    try {
        if (!username || !email || !password){
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existeduser = await User.findOne({ email });
        if(existeduser){
            return res.status(400).json({message: "user already existed"})
        }
        
         const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password : hashedPassword,

        });
         res.status(201).json({
      message: 'User registered successfully',
      
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
    console.log(user)
        
    } catch (error) {
        res.status(500).json({ message: error.message });
        
    }
}


const loginuser = async (req,res)=>{
    
    try {
        const {email,password} = req.body;
        

        if(!email || !password){
            return res.status(400).json({ message: 'All fields are required' });
        }


        const user = await User.findOne({email})

        if (!user){
             return res.status(400).json({ message: 'user not found' });

        }

         const ispasswordcorrect = await bcrypt.compare(password, user.password)
         if(!ispasswordcorrect){
            return res.status(400).json({ message: 'password is incorrect' });

         }
         console.log("SECRET WHEN SIGNING:", process.env.JWT_SECRET);
            const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "10h" }
    );

    res.cookie("token", token);
    return res.status(200).json({
        message: "loggin successful",
        token,
        user:{
            id: user._id,
            username: user.username,
            email:user.email
        }
    })
        
    } catch (error) {
        res.status(500).json({ message: error.message });
        
    }
}

const logoutuser = async (req, res) => {
  try {
    res.clearCookie("token", {
    //   
     
    });
 
    return res.status(200).json({ message: "Logged out successfully" });
 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export{registeruser,loginuser,logoutuser}