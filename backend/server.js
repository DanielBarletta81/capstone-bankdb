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


//connect MongoDB
connectDB();

var app = express();

var port = process.env.PORT;

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
            
// var config = {
//     method: 'post',
//     url: process.env.MONGO_URL,
//     headers: {
//       'Content-Type': 'application/json',
//       'Access-Control-Request-Headers': '*',
//       'api-key': process.env.MONGO_API_KEY,
//     },
//     data: data
// };
            
// axios(config)
//     .then(function (response) {
//         console.log(JSON.stringify(response.data));
//     })
//     .catch(function (error) {
//         console.log(error);
//     });

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

//only listen if connected to DB
mongoose.connection.once('open', () => {
    console.log('Actually connected to MongoDB');
    // listen
    app.listen(port, () =>
        console.log(`Server running on port: ${port}`));
})