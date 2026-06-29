
import express from "express";
import { registeruser,loginuser,logoutuser } from "../controller/auth.controller.js";

const authroute = express.Router();

authroute.post('/register', registeruser);
authroute.post('/login',loginuser );

authroute.post('/logout', logoutuser)
export default authroute;