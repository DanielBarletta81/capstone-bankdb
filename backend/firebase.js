
const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");

const firebaseConfig = {
  apiKey: process.env.FIRE_API_KEY,
  authDomain: process.env.FIRE_AUTH_DOMAIN,
  projectId: process.env.FIRE_PROJ_ID,
  storageBucket: process.env.FIRE_STOR_BUCK,
  messagingSenderId:process.env.FIRE_MESS_SEND_ID,
  appId: process.env.FIRE_APP_ID,
  measurementId: process.env.FIRE_MEASURE_ID
};
firebase.initializeApp(firebaseConfig);

module.exports = firebase;