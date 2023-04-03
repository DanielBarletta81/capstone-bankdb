const { User } = require('../model/user');

// const jwt = require('jsonwebtoken');
const { getAuth } = require('firebase-admin/auth');
const {createUserWithEmailAndPassword} = require('firebase/auth');
const { initializeApp } = require('firebase-admin/app');

const firebaseConfig = {
  apiKey: process.env.FIRE_API_KEY,
  authDomain: process.env.FIRE_AUTH_DOMAIN,
  projectId: process.env.FIRE_PROJ_ID,
  storageBucket: process.env.FIRE_STOR_BUCK,
  messagingSenderId:process.env.FIRE_MESS_SEND_ID,
  appId: process.env.FIRE_APP_ID,
  measurementId: process.env.FIRE_MEASURE_ID
};
// firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

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
  const { username, email, password } = req.body;
  
    await createUserWithEmailAndPassword(auth, email, password)
    .then((userRecord) => {
      res.status(201).json(userRecord);
      console.log('created: ', userRecord.uid)
    })
.catch((error)  =>  {
    console.log(error.message)
  }) ;
}

const createDBUser = async () => {
   const authUser = req.currentUser;
  if (authUser) {
    const user =  await User.create({ email: authUser.email, password: authUser.password });
    const savedUser = user.save();
    return res.status(201).json(savedUser)
};
}

// login
const userLogin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(422).json({
      email: "email is required",
      password: "password is required",
    });
  }

    await signInWithEmailAndPassword({ email: "req.body.email", password: "req.body.password" })
    .then((userRecord) => {
      return res.status(200).json(userRecord.uid);
    })
    .catch(function (error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      if (errorCode === "auth/wrong-password") {
        return res.status(500).json({ error: errorMessage });
      } else {
        return res.status(500).json({ error: errorMessage });
      }
    });
};




//   User.findOne({
//     email: req.body.email
//   }, function (err, user) {
//     if (err) throw err;
//     if (!user || !user.comparePassword(req.body.password)) {
//       return res.status(401).json({ message: 'Auth failed authC 70' })
//     }
//     return res.json({
//       token: jwt.sign({ email: user.email, username: user.username, id: user._id }, process.env.JWT_SECRET)
//     });
//     });
//   }

const forgotPw = (req, res) => {
  if (!req.body.email) {
    return res.status(422).json({ email: "email is required" });
  }
  firebase
    .auth()
    .sendPasswordResetEmail(req.body.email)
    .then(function () {
      return res.status(200).json({ status: "Password Reset Email Sent" });
    })
    .catch(function (error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      if (errorCode == "auth/invalid-email") {
        return res.status(500).json({ error: errorMessage });
      } else if (errorCode == "auth/user-not-found") {
        return res.status(500).json({ error: errorMessage });
      }
    });
};

 const sendUserToDB = (req, res) => {

  if (auth) {
    const user =  User(req.body);
    const savedUser = user.save();
return res.status(201).json(savedUser);
  }
  return res.status(403).send('Not authorized');
};

async function checkAuth(req, res, next) {
  if (req.headers.authtoken) {
    await verifyIdToken(req.headers.authtoken)
      .then(() => {
        next()
      }).catch(() => {
        res.status(403).send('Unauthorized')
      });
  } else {
    res.status(403).send('Unauthorized')
  }
}



module.exports = { checkAuth, getAllData, handleReg, userLogin, getOneUser, getUserByID, sendUserToDB , forgotPw};