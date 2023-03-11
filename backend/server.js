const dotenv = require ('dotenv');
dotenv.config();
const mongoose = require ('mongoose');
const express = require('express');

const path = require('path');
const cors = require ('cors');
const bodyParser = require('body-parser');


//const uuid = require('uuid');
//const session = require('express-session');
const connectDB = require ('./src/db/dbConn.js');
//const sessionOptions = require('./src/middleware/sessions');
// get authentication router from authenticate.js

require('firebase/auth');

const decodeIDToken = require('./src/middleware/fireb_admin');


//connect MongoDB
connectDB();

var app = express();

var port = process.env.PORT;

app.use(decodeIDToken);

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "process.env.FIREBASE_API",
  authDomain: "process.env.FIREBASE_AUTH_DOMAIN",
    projectId: "process.env.FIREBASE_PROJ_ID",
  storageBucket: "process.env.FIREBASE_STOR_BUCKET",
  messagingSenderId: "process.env.FIREBASE_MESS_SEND_ID",
  appId: "process.env.FIREBASE_APP_ID",
 
};

// Initialize Firebase


//bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// var axios = require('axios');
// var data = JSON.stringify({
//     "collection": "users",
//     "database": "GoodBank",
//     "dataSource": "Bank-CapStone",
//     "projection": {
//         "_id": 1
//     }
// });
            



app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static('public'));

// cors
app.use(cors());

//bodyParser


// middleware



//app.use(session(sessionOptions));
// app.use(session({
//   genid: (req) => {
   
//     console.log(req.sessionID)
//     return uuid.v4() // use UUIDs for session IDs
//   },
//   secret: process.env.SECRET,
//   saveUninitialized: true
// }))


// api routes
app.use('/account', require('./src/routes/userRoutes.js'));

// auth routes
// app.use('/auth', require('./src/routes/fireAuthRoutes'));

//only listen if connected to DB
mongoose.connection.once('open', () => {
    console.log('Actually connected to MongoDB');
    // listen
    app.listen(port, () =>
        console.log(`Server running on port: ${port}`));
})