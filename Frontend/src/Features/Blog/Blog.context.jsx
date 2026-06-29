import {createContext, useState} from 'react';


export const BlogContext = createContext();  // Create a context for authentication

export  const BlogProvider = ({children}) => {
   const [blog, setblog] = useState([]); // State to hold the authenticated user
   const [myBlogs, setMyBlogs] = useState([]);
   


    return(
        <BlogContext.Provider value={{blog,setblog,myBlogs,setMyBlogs}}>
            {children}  
        </BlogContext.Provider>                                         
    )
}
            
