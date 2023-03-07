const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: {type: String},
    name: {type: String},
    email: {type: String},
    password: {type: String},
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

const User = mongoose.model('User', userSchema);
module.exports = User;