import mongoose from "mongoose";
import { type } from "os";

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true,
    },
    content:{
        type: String,
        
    },
    image:{
        type: String,
        requires:true
    },
     user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
//     

},{
    timestamps:true,
})
export const Blogmodel = mongoose.model("Blogmodel", blogSchema)
 