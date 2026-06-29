import { RouterProvider } from "react-router"
import {router} from './App.routes.jsx'
import { AuthProvider } from "./Features/auth/auth.context.jsx"
import Login from "./Features/auth/pages/Login.jsx"
import { BlogProvider } from "./Features/Blog/Blog.context.jsx"


function App() {
  
  return (
    <>
    <BlogProvider>

      <AuthProvider>
      <RouterProvider router ={router}/>
    </AuthProvider>
    </BlogProvider>
   
     
    </>
  )
}

export default App
