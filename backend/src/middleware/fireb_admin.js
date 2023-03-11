const User = require('../model/user');
const admin = require('firebase-admin');


var serviceAccount = require("../../serviceAccountKey.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'process.env.MONGODB_URL'
});

async function decodeIDToken(req, res, next) {
  const header = req.headers?.authorization;//had ? before auth
  if (header !== 'Bearer null' && req.headers?.authorization?.startsWith('Bearer ')) {
const idToken = req.headers.authorization.split('Bearer')[1];
try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
    req['currentUser'] = decodedToken;

    if (!decodedToken) {
      // Unauthorized
      return res.sendStatus(401);
    }

    const usersCollection =  await User.find({});

    const user = await usersCollection.findOne({
      firebaseId: firebaseUser.user_id
    });

    if (!user) {
      // Unauthorized
      return res.sendStatus(401);
    }

    req.user = user;

    next();

    } catch (err) {
         res.sendStatus(401);
      console.log(err);
    }
  }
next();
}
module.exports = decodeIDToken;




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