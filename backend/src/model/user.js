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
    amount: {type: Number},
    balance: {type: Number, min: 0},
    account_Nums: {type: Number},
  date: { type: Date },
    
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  }

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