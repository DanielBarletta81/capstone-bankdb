import { useState, createContext, useContext, useEffect } from 'react';

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.js";


const AuthContext = createContext(null);


export const AuthProvider = ({children} ) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  

  


  useEffect(() => {
   const unsubscribe =  onAuthStateChanged( auth,(currentUser) => {
      setUser(currentUser);
      setLoading(false);
      
    })
    return unsubscribe
}, [])

  const value = {
   
    user

  }

  return (<AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>)
}

export const useAuth = () => {
  return useContext(AuthContext);
}