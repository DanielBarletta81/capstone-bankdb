
import { initializeApp } from 'firebase/app';
import { getAuth }  from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
   apiKey: "process.env.REACT_APP_API_KEY",
  authDomain: "process.env.REACT_APP_AUTH_DOMAIN",
    projectId: "process.env.REACT_APP_PROJ_ID",
  storageBucket: "process.env.REACT_APP_STOR_BUCKET",
  messagingSenderId: "process.env.REACT_APP_MESS_SEND_ID",
  appId: "process.env.REACT_APP_APP_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
 const auth = getAuth(app);
export {auth} ;

