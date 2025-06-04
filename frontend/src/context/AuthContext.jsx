import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider =({children}) =>{
    const [user,setUser] = useState(null);

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token){
            setUser(token);
        }
    },[user]);

    return(
        <AuthContext.Provider value={{user,setUser}}>
            {children}
        </AuthContext.Provider>
    );
};