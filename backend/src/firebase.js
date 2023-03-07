var admin = require("firebase-admin");

var serviceAccount = require("../serviceAccountKey.json");


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;

// // Import the functions you need from the SDKs you need

// const { initializeApp } = require("firebase/app");

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API,
//   authDomain: "mern-goodbank.firebaseapp.com",
//   projectId: "mern-goodbank",
//   storageBucket: "mern-goodbank.appspot.com",
//   messagingSenderId: "412711755874",
//   appId: "1:412711755874:web:25cbf646fe7fe38c7f313b",
//   measurementId: "G-KYP3VVMWXH"
// };

// // Initialize Firebase
// const appFirebase = initializeApp(firebaseConfig);

// module.exports = appFirebase;