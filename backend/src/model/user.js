const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jwt');




const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: 'username is required'},
    
    email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        required: 'email is required'
    },
      password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 8,
      select: false, // When query for a user, do we want to return password ?
    },
    amount: {type: Number},
    balance: {type: Number, min: 0},
    account_Nums: {type: Number},
    date: {type: Date},
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }
    ]

},
        {
    timestamps: true
});

// Middleware before saving a document
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Assign a "matchPasswords" function to the "methods" object of our "UserSchema"
UserSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: `${process.env.JWT_EXPIRE}h`, // In hours
  });
};



const User = mongoose.model('User', UserSchema);
module.exports = User;