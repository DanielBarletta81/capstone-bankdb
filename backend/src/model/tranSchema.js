const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({

    transactionType: { type: String, enum: ['Deposit', 'Withdraw', 'Transfer'] },
    accountNumber: { type: Number, required: "please ensure that the account number exists" },

    transactionAmount: { type: Number, required: "please enter a transaction amount" },
    transactionTime: { type: Date, default: Date.now },
});

const Transaction = mongoose.model('transaction', transactionSchema);
 module.exports = { Transaction };
