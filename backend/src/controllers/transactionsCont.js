const { User } = require ("../model/user");
const { Transaction } = require("../model/tranSchema");





const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USA'
});

//get transactions
const getTransactions = async (req, res) => {
    const { accountNumber } = req.body;
    try {

        let result = await Transaction.find({ 'accountNumber': accountNumber });
          res.status(201).send(result);
    } catch (error) {
         res.status(404).send(`User with account number ${Transaction.accountNumber} has no recent transactions`);
    }

}

// deposit
const makeDeposit = async (req, res) => {

  const {accountNumber, depositAmount} = req.body;
    try {
        const deposit = { $inc: { 'accountBalance': + depositAmount } };
        let user = await User.findOneAndUpdate(
            { 'accountNumber': accountNumber },deposit,
            { new: true , returnOriginal: false}
        );

        if (user === null) {
            res.status(404).send(`The User with account number ${accountNumber} does not exist`);
        }
        if (depositAmount < 10) {
            res.status(400).send(`Sorry, deposit amount cannot be less than 10`);
        }
     
        if (depositAmount >= 10) {

            let transactionDetails = {
                transactionType: 'Deposit',
                accountNumber: accountNumber,
                transactionAmount: depositAmount
            };
             
            await Transaction.create(transactionDetails)
            res.status(201).send(`Deposit of ${formatter.format(depositAmount)} to Acct# ${accountNumber} was successful.`)
        }
      
    } catch (err) {
        return res.json({ message: err.message });
    }
}


/// couldn't get this to work, changed to put req and worked
const makeWithdraw = async (req, res) => {
  const { accountNumber, withdrawAmount } = req.body;
    try {
      
 const withdraw = { $inc: { 'accountBalance': - withdrawAmount } };
        let theUser = await User.findOneAndUpdate(
             {'accountNumber': accountNumber} , withdraw,
            { new: true , returnOriginal: false}
        );

        if (theUser === null) {
            res.status(404).send(`This User with account number ${accountNumber} does not exist`);
        }


            let transactionDetails = {
                transactionType: 'Withdraw',
                accountNumber: accountNumber,
                transactionAmount: withdrawAmount
            };
             
            await Transaction.create(transactionDetails)
            res.status(201).send(`Withdrawal of ${formatter.format(withdrawAmount)} from Acct# ${accountNumber} was successful.`)
        
     
    } catch (err) {
        return res.json({ message: err.message });
    }
}

// transfer
const makeTransfer =  async (req, res) => {
  
        const { transferAmount, fromAcct, toAcct } = req.body
    try {
      
         await User.findOne({ 'accountNumber': fromAcct })
         await User.findOne({
            'accountNumber': toAcct,
        })

        if (!fromAcct || !toAcct) {
            res.status(400).send({ message: 'Please check account info' })
        
        } if (fromAcct.balance - transferAmount < 0) {
            res.status(400).send({
                message: 'Transaction not processed due to insufficient balance',
            })
        } else {
            let fromUser = await User.findOneAndUpdate(
                { 'accountNumber': fromAcct },
                { $inc: { 'accountBalance': - transferAmount } },
                { new: true, returnOriginal: false },
            );
            
            let toUser = await User.findOneAndUpdate(
                { 'accountNumber': toAcct },
                { $inc: { 'accountBalance': + transferAmount } },
                { new: true },
            );
            console.log(toUser);

 let transactionDetails = {
                transactionType: 'Transfer',
                accountNumber: toAcct,
               description: 'incoming transfer',
                sender: fromUser,
                transactionAmount: transferAmount
            };

        await Transaction.create(transactionDetails);

             res.status(200).send(`Transfer of ${formatter.format(transferAmount)} to ${toUser.accountNumber} was successful. Account# ${toUser.accountNumber} new balance: ${toUser.accountBalance}`);
        }

    }
    catch (err) {
        res.status(400).send({ err: err.message })
    }
}


const getBalance = async (req, res) => {
    const { accountNumber } = req.body;
   try {
  let user = await User.findOne({ 'accountNumber': accountNumber },'accountBalance email');
        res.status(201).json(` ${user.email} your account Balance is ${user.accountBalance}`);
   } catch (error) {
       console.log(error);
   }
};

// const getRec = async (req, res) => {
//     const { accountNumber } = req.body;
//    try {
//   let user = await User.findOne({ 'accountNumber': accountNumber },'accountBalance email');
//         res.status(201).json(` ${user.email} your account Balance is ${user.accountBalance}`);
//    } catch (error) {
//        console.log(error);
//    }
// };




module.exports = {getBalance, makeDeposit, makeWithdraw, makeTransfer, getTransactions}