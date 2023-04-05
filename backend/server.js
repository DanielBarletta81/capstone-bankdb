

const dotenv = require ('dotenv');
dotenv.config();
const mongoose = require ('mongoose');
const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const cors = require ('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const session = require('express-session');
const connectDB = require ('./src/db/dbConn.js');
//const db = require('./src/model/dbModel');
const { User } = require('./src/model/user');

const userRoutes = require('./src/routes/userRoutes.js');
// const decodeIDToken = require('./src/middleware/authMid');
//connect MongoDB
connectDB();

var app = express();
//https://cloud.mongodb.com/v2/63a14080cf3f305459004a73#/metrics/replicaSet/63d2e15013b7bf581fcac512/explorer/GoodBank/users/find


var port = process.env.PORT;
//cors

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
// app.use(decodeIDToken);
app.use(cookieParser());
// app.use(methodOverride('_method'));
//bodyParser
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));


//routes
//login
app.use('/api', userRoutes);

app.get('/dashboard', (req, res) => {
  res.send({ username: req.user.username });
});


//only listen if connected to DB
mongoose.connection.once('open', () => {
    console.log('Actually connected to MongoDB');

// function initial() {
//   Role.estimatedDocumentCount((err, count) => {
//     if (!err && count === 0) {
//       new Role({
//         name: "user"
//       }).save(err => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'user' to roles collection");
//       });

//       new Role({
//         name: "employee"
//       }).save(err => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'employee' to roles collection");
//       });

//       new Role({
//         name: "bigboss"
//       }).save(err => {
//         if (err) {
//           console.log("error", err);
//         }

//         console.log("added 'bigboss' to roles collection");
//       });
//     }
//   });
// }

    // listen
    app.listen(port, () =>
        console.log(`Server running on port: ${port}`));
})

module.exports = app;