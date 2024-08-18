import { createContext, useState } from "react";

export const UserContext=createContext({})

export function UserContextProvider({children}){

    const [user,setUser]=useState(null)

    use

    return(
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
        
    )
}