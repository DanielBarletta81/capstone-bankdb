// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
 
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

//import firebase database //
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCMPjQjb6WqGVlgWVe2IrFYCs76tjxE1m4",
  authDomain: "goodbank-app-2022.firebaseapp.com",
  databaseURL: "https://goodbank-app-2022-default-rtdb.firebaseio.com",
  projectId: "goodbank-app-2022",
  storageBucket: "goodbank-app-2022.appspot.com",
  messagingSenderId: "621879085408",
  appId: "1:621879085408:web:b14fe25d2072e813d13605",
  measurementId: "G-ZXS2YNKXHP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
export default app;

export const createUser = async (email, password) => {
  return createUserWithEmailAndPassword(getAuth(app), email, password);
}

export const signInUser = async (email, password) => {
  return signInWithEmailAndPassword(getAuth(app), email, password);
}