const {initializeApp} = require('firebase/app');
const admin = require('firebase-admin');


var serviceAccount = require("../../serviceAccountKey.json");

const firebase = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = {firebase};



// const jwt = require("jsonwebtoken");

//   const authUser= async (request, response, next) => {
//   try {
//     //   get the token from authorization header
//     const token = await request.headers.authorization.split(" ")[1];

//     //check if the token matches origin
//     const decodedToken = await jwt.verify(token, "RANDOM-TOKEN");

//     // retrieve the user details of logged in user
//     const user = await decodedToken;

//     // pass the user down to the endpoints here
//     request.user = user;

//     // pass down functionality to the endpoint
//     next();
    
//   } catch (error) {
//     response.status(401).json({
//       error: new Error("Invalid request!"),
//     });
//   }
//   };
// module.exports = authUser;