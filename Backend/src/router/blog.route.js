import express from 'express'
import { createblog,getallblogs,getblogbyid,deleteblog,updateblog,getMyBlogs } from '../controller/blog.controller.js'
 import upload from '../multer/imagemidlemare.js';
 import verifyToken from "../middleware/auth.middleware.js";
 

const blogroute = express.Router();

blogroute.post("/createblog",verifyToken,  upload.single("image"),createblog); // ← router → blogroute
blogroute.get("/allblogs",getallblogs)
blogroute.get('/getblogsbyid/:id',verifyToken,getblogbyid)
blogroute.delete('/deleteblog/:id',verifyToken,deleteblog)
blogroute.get ('/myblogs',verifyToken,getMyBlogs)
blogroute.put ("/updateblog/:id",verifyToken,upload.single("image"),updateblog)

export default blogroute;