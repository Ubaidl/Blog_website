import {createBrowserRouter} from 'react-router';
import Login from './Features/auth/pages/Login';
import Signup from './Features/auth/pages/Signup';

import CreateBlog from './Features/Blog/pages/CreateBlogpage';
import Homepage from './Features/Blog/pages/Homepage';
import MyBlogs from './Features/Blog/pages/MyBlogs';




export const  router = createBrowserRouter([
    {
        path: '/', element:<Homepage/>
    },

    {
        path: "/login", element:<Login/>
    },
    {
        path:"/signup", element:<Signup/>
    },
    {
        path:"/createblog",element:<CreateBlog/>
    },
    {
        path:"/homepage",element:<Homepage/>
    },
    {
        path: "/myblogs",element:<MyBlogs/>
    }
])