const mongoose = require('mongoose');

const User  = require('../model/user');
const extend = require('lodash/extend');


const create = async (req, res, next) => {
    const { username, email, password, passwordCheck } = req.body;
    try {
        // Check if any of them is undefined
        if (!username || !email || !password || passwordCheck) {
            return next()
    
        }
   

        // Check if user already exists in our DB
        const userExists = await User.findOne({ email }).exec();

        if (userExists) {
            throw new Error('User already exists!')
        }

        // Register and store the new user
        const user = await User.create(
            {
                username,
                email,
                password,

            }
        );

        return sendAuth(user, 201, res);
    } catch (err) {
        res.json(err.message)
    }
}

const getAll =  async (req, res, next) => {
    try {
        let users = await User.find().select(' name email updated created');
         res.json(users)
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}

const userByID = async (req, res, next, id) => {
    try {
        let user = await User.findById(id);
        if (!user) {
            return res.status('400').json({
                error: "User not found"
            })
        }
        req.profile = user;
        next()
    } catch (err) {
        return res.status('400').json({
            error: "Unable to retrieve user"
        })
    }
}

const read = (req, res) => {
    
    return res.json(req.profile);
}

const update = async (req, res, next) => {
    try {
        let user = req.profile;
        user = extend(user, req.body);
        user.updated = Date.now();
        await user.save();
     
        res.json(user);

    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        })
    }
}
const remove = async (req, res, next) => {
   try {
       let user = req.profile;
       let deletedUser = await user.remove();
      
       res.json(deletedUser);
   } catch (error) {
     return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
      })
   }
}
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return next(error("Please provide email and password", 400));
        }

        const user = await User.findOne({ email }).select("+password"); // Explicitly adding password

        if (!user) {
            return next(error("Invalid credentials", 401));
        }

        // Using custom method to compare passwords
        const isMatched = await user.matchPasswords(password);

        if (!isMatched) {
            return next(error("Invalid credentials", 401));
        }

        return sendAuth(user, 200, res);
    } catch (error) {
        return next(error);
    }
}
const sendAuth = (user, statusCode, res) => {
  return res.status(statusCode).json({
    success: true,
   username: user.username,
    email: user.email,
  
    token: user.getSignedToken(),
    expires_at: new Date(Date.now() + process.env.JWT_EXPIRE * 60 * 60 * 1000),
  });
};
    module.exports = {create,login, userByID, getAll, read, update, remove}