import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../Firebase";
import React from 'react'
import { createUserWithEmailAndPassword, signOut,signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export function AuthContextProvider({children}) {

    const [user, setUser] = useState({})
    function signUp(email,password){
        return createUserWithEmailAndPassword(auth,email,password)
    }

    function logOut(){
        return signOut(auth)
    }

    function logIn(email,password) {
        return signInWithEmailAndPassword(auth,email,password);
    }

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
    setUser(currentUser)
  })

  return () => {
    unsubscribe();
  }
}, [])


    return(
        <AuthContext.Provider value={{signUp, logIn, logOut, user}}>
            {children}
        </AuthContext.Provider>
    )
}

export function UserAuth(){
    return useContext(AuthContext);
}