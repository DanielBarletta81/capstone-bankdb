const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

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

//  before doc saved to db
UserSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

 const User = mongoose.model('User', UserSchema);
 module.exports = { User };