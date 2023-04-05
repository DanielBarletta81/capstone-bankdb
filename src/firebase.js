// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,  GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXI_gfy_b5P0AxgGLnsWze8XJCho4IwTk",
  authDomain: "mern-goodbank.firebaseapp.com",
  projectId: "mern-goodbank",
  storageBucket: "mern-goodbank.appspot.com",
  messagingSenderId: "412711755874",
  appId: "1:412711755874:web:25cbf646fe7fe38c7f313b",
  measurementId: "G-KYP3VVMWXH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);


export const getFBUser = () => {
  const user = auth.currentUser;
  if (user !== null) {
    const email = user.email;
    const uid = user.uid;
    console.log(email, uid);
  }
  return user;
}


export const  googleLogin = async() =>  {
   
    const provider = new GoogleAuthProvider(auth);
    // create popup signIn
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
     const credential  = GoogleAuthProvider.credentialFromResult(result);
        // store  token
        const token = credential.accessToken;
        // - check  if current user has token
        const user = result.user;
        console.log(user);
        if (token) {
          // - put token in localStorage )
          localStorage.setItem("@token", token);
       
         
  }
 })
      .catch((error) => {
        console.log(error);
      })
    
}



