
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
   apiKey: "process.env.FIREBASE_API",
  authDomain: "process.env.FIREBASE_AUTH_DOMAIN",
    projectId: "process.env.FIREBASE_PROJ_ID",
  storageBucket: "process.env.FIREBASE_STOR_BUCKET",
  messagingSenderId: "process.env.FIREBASE_MESS_SEND_ID",
  appId: "process.env.FIREBASE_APP_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export default auth;