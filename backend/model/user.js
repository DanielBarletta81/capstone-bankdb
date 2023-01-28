import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    balance: Number,
    account_num: String,
},
    {
        timestamps: true
    });
module.exports = mongoose.model('User', userSchema);