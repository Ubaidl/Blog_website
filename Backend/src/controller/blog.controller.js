import { Blogmodel } from "../models/blog.model.js";
import generateBlog from "../aiservice/api.service.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";


const createblog = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    let imagepath = "";

    if (req.file) {
      try {
        console.log("Uploading image to Cloudinary...");

        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "blog-images",
        });

        console.log("Cloudinary Upload Success:", result);

        imagepath = result.secure_url;

        // Delete local file after uploading
        fs.unlinkSync(req.file.path);

      } catch (err) {
        console.error("Cloudinary Upload Error:", err);

        if (req.file && fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }

        return res.status(500).json({
          message: "Cloudinary upload failed",
          error: err,
        });
      }
    }

    const response = await generateBlog(title);

    const blog = await Blogmodel.create({
      title,
      content: response.content,
      image: imagepath,
      user: req.user.id,
    });

    console.log("Blog saved successfully:", blog);

    return res.status(201).json({
      message: "Blog created successfully",
      blog,
    });

  } catch (error) {
    console.error("Create Blog Error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};
const getblogbyid = async(req,res)=>{
  try {
    const {id} = req.params;

    const blog =  await Blogmodel.findById(id);
    if(!blog){
      return res.status(404).json({ message: 'Blog not found' });
    }
     res.status(200).json(blog);
    
  } catch (error) {
    res.status(500).json({ message: error.message });
    
  }
}
const getallblogs = async (req,res)=>{
  try {
    const blogs = await Blogmodel.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: blogs.length,
      blogs,
    });
    
  } catch (error) {
     res.status(500).json({
      success: false,
      message: error.message,
    });
    
  }
};
const deleteblog = async (req,res)=>{
  try {
    const {id} = req.params
    const blog = await Blogmodel.findById(id)

    if(!blog){
      return res.status(404).json({ message: 'Blog not found' });

    }
    await Blogmodel.findByIdAndDelete(blog)
    res.status(200).json({ message: 'Blog deleted successfully' });

    
  } catch (error) {
     res.status(500).json({ message: error.message })
    
  }

}
const updateblog = async (req, res) => {
  try {
    const { id } = req.params;

    console.log(req.body);

    const updatedblog = await Blogmodel.findByIdAndUpdate(
      id,
      req.body,
      {
    returnDocument: "after",   // ← return updated blog
    runValidators: true,       // ← check validation rules,like strng,requred,
  }

    );

    if (!updatedblog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    res.status(200).json(updatedblog);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyBlogs = async (req, res) => {
  try {
    const blogs = await Blogmodel.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { createblog ,getallblogs,getblogbyid,deleteblog,updateblog,getMyBlogs};