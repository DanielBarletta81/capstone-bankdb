//const { ObjectId } = require('bson');
const mongoose = require('mongoose');
const { isEmail } = require('validator');


const UserSchema = new mongoose.Schema({
    username: {
        type: String
    },

    email: {
        type: String,
        required: true,
        unique: true,
validate: [isEmail, 'Please enter a valid email'],
  },
    
      password: {
      type: String,
      required: true,
      minlength: 8,
      select: false, // When query for a user, do we want to return password ?
    },
  
  
  accountNumber: { type: Number, default: Math.floor(Math.random() * 1000) + 111 },

  accountBalance: { type: Number, default: 0 },

  checkingAcct: {
    type: Number, unique: true, default: Math.floor(Math.random() * 10000)
  },
  checkingBalance: { type: Number, default: 0 },

  savingsAcct: { type: Number, unique: true, default: Math.floor(Math.random() * 10000) }, 
  savingsBalance: { type: Number, default: 0 },
  date: { type: Date },
    
  // user: {
  //   type:  mongoose.Schema.Types.ObjectId,
  //   ref: "user"
  // }

},
        {
    timestamps: true
    });

// get 
// UserSchema.set('toJSON', {
//   transform: (doc, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString();
//     console.log(doc);
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   },
// });


 const User = mongoose.model('User', UserSchema);
 module.exports = { User };