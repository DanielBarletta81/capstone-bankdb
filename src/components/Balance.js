import React from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
   
    const uid = user.uid;
    console.log(uid);
  } else {
    // User is signed out
   
  }
});
export function Balance() {
  return (
    <div>Balance</div>
  )
}

