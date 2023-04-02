const { User } = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const firebase = require("../../firebase");

//get all user data
const getAllData = async(req, res) => {
 const data = await User.find({});
  res.send(data);
}

const getOneUser = async (req, res) => {
  const email = req.params.email;
  const user = await User.findOne({ email });
  res.send(user);
}

async function getUserByID (req, res, next) {
  let user
  try {
    user = await User.findById(req.params.id)
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find user by id' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.user = user
  next()
}


// register

const handleReg = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(422).json({
      email: "email is required",
      password: "password is required",
    });
  }
  firebase
    .auth()
    .createUserWithEmailAndPassword(req.body.email, req.body.password)
    .then((data) => {
      return res.status(201).json(data);
    })
    .catch(function (error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      if (errorCode == "auth/weak-password") {
        return res.status(500).json({ error: errorMessage });
      } else {
        return res.status(500).json({ error: errorMessage });
      }
    });
};

// login
const userLogin = async (req, res, next) => {
  User.findOne({
    email: req.body.email
  }, function (err, user) {
    if (err) throw err;
    if (!user || !user.comparePassword(req.body.password)) {
      return res.status(401).json({ message: 'Auth failed authC 70' })
    }
    return res.json({
      token: jwt.sign({ email: user.email, username: user.username, id: user._id }, process.env.JWT_SECRET)
    });
    });
  }

function checkAuth(req, res, next) {
  if (req.headers.authtoken) {
    admin.auth().verifyIdToken(req.headers.authtoken)
      .then(() => {
        next()
      }).catch(() => {
        res.status(403).send('Unauthorized')
      });
  } else {
    res.status(403).send('Unauthorized')
  }
}


const verToken = async (req, res, next) => {
     const authHeader = req.headers['authorization'];
    if (!authHeader) return res.sendStatus(401);
    console.log(authHeader); // Bearer token
    const token = authHeader.split(' ')[1];
   
    console.log(token);
    if (!token) {
        res.status(404).json({ message: "No token found" })
    }
    jwt.verify(String(token), process.env.JWT_SECRET, (err, user) => {
        if (err) {
            res.status(400).json({ message: 'Invalid token' })
        }
        console.log(user.id);
        req.id = user.id;
    });
    next();
};

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

 
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  // duplicate email
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
     console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}



module.exports = { checkAuth, getAllData, handleReg, userLogin, verToken, getOneUser, getUserByID };