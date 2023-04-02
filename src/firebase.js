import { initializeApp } from "firebase/app";

import { getAuth} from "firebase/auth";

// Import the functions you need from the SDKs you need



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXI_gfy_b5P0AxgGLnsWze8XJCho4IwTk",
   authDomain: "mern-goodbank.firebaseapp.com",
  projectId: "mern-goodbank-378422",
  storageBucket: "mern-goodbank.appspot.com",
  messagingSenderId: "412711755874",
  appId: "1:412711755874:web:25cbf646fe7fe38c7f313b",
  measurementId: "G-KYP3VVMWXH"
  
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
