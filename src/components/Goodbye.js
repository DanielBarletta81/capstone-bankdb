import React from 'react'
import { Alert } from 'react-bootstrap';


function Goodbye() {
    const handleLogout = () => {
     
    signOut(auth).then(() => {
        // Sign-out successful.
           
            console.log("Signed out successfully")
        }).catch((error) => {
        // An error happened.
        });
    }
  return (
      <>
          <alert className="goodbye"> Thank you for visiting, see you soon!</alert>
          </>
  )
}

export default Goodbye;