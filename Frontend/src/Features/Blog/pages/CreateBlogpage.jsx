import { useState } from "react";
import { useNavigate } from "react-router";
import { useblog } from "../hooks/useblog";
import "../style2/createblog.scss"

const CreateBlog = () => {
  const navigate = useNavigate()

    const [title,settitle]= useState("")
    const [image,setimage]= useState("")
    const [content,setcontent]= useState("")
    const {handlecreateblog} = useblog()


   const handlesubmit = async (e) => {
  e.preventDefault();

  try {
    await handlecreateblog({
      title,
      image,
       // use 'content' instead of 'context' if that's your field name
    });

    alert("Blog created successfully!");
    navigate("/")
   
  } catch (error) {
    alert(error.response?.data?.message || "Failed to create blog");
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10 px-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Create Blog
        </h1>

        <form className="space-y-6" onSubmit={handlesubmit}>
          {/* Blog Title */}
          <div>
            <label className="block text-lg font-medium mb-2">
              Blog Title
            </label>
            <input onChange={(e)=>settitle(e.target.value)}
              type="text"
              name="title"
              placeholder="Enter blog title"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Blog Image */}
          <div>
            <label className="block text-lg font-medium mb-2">
              Blog Image
            </label>
            <input onChange={(e) => setimage(e.target.files[0])}
              type="file"
              name="image"
              accept="image/*"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          {/* Blog Content
          <div>
            <label className="block text-lg font-medium mb-2">
              Blog Content
            </label>
            <textarea onChange={(e)=>setcontent(e.target.value)}
              name="content"
              rows="8"
              placeholder="Write your blog here..."
              className="w-full border border-gray-300 rounded-md p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div> */}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
          >
            Publish Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;