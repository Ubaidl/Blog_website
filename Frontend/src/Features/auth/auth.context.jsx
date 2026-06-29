import {createContext, useState} from 'react';


export const AuthContext = createContext();  // Create a context for authentication

export  const AuthProvider = ({children}) => {
    const [user, setuser] = useState(null);  // State to hold the authenticated user
    const [load,setloading] = useState(false);  // State to indicate loading status


    return(
        <AuthContext.Provider value={{user,setuser,load,setloading}}>
            {children}  
        </AuthContext.Provider>                                         
    )
}
            
