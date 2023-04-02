import { useState, createContext, useContext, useEffect } from 'react';

import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../firebase.js';
const AuthContext = createContext(null);


export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);


  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
   const unsubscribe =  onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false);
      
    })
    return unsubscribe
}, [])

  const value = {
    currentUser,
   
    logout
  }

  return (<AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>)
}

export const useAuth = () => {
  return useContext(AuthContext);
}