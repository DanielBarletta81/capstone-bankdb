const { User } = require ("../model/user");
const { Transaction } = require("../model/tranSchema");


const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USA'
});

const makeDeposit = async (req, res) => {

   const {account_Nums, depositAmount} = req.body;
    try {

        let user =  await User.findById(req.user.user_id)

        if (user === null) {
            res.status(404).send(`This User with account number ${account_Nums} does not exist`);
        }
        if (depositAmount < 10) {
            res.status(400).send(`Sorry, deposit amount cannot be less than 10`);
        }
        if (depositAmount >= 10) {
            user.balance = user.balance + depositAmount;
            let transactionDetails = {
                transactionType: 'Deposit',
                accountNumber: account_Nums,
                transactionAmount: depositAmount
            };
             
            await Transaction.create(transactionDetails)
            res.status(201).send(`Deposit of ${formatter.format(depositAmount)} to Acct# ${account_Nums} was successful.`)
        }

    } catch (err) {
        return res.json({ message: err.message });
    }
}

const makeWithdraw = async function(req, res) {
    try {
        const { withdrawAmount } = req.body;
        if (!withdrawAmount) {
            res.status(400).send("Please input the amount you'd like to withdraw");
        }
        let currentUser = await User.findById(req.user.user_id);
        if (withdrawAmount > currentUser.accountBalance) {
            res.status(400).send("Insufficient funds to make this withdrawal");
        }
        currentUser.accountBalance = currentUser.accountBalance - withdrawAmount;
        let transactionDetails = {
            transactionType: 'Withdraw',
            account_Nums: currentUser.account_Nums,
            description: `GoodBank withdrawal of ${formatter.format(withdrawAmount)}`,

            transactionAmount: withdrawAmount
        };
        await currentUser.save();
        await Transaction.create(transactionDetails);
        res.status(200).send(`Withdrawal of ${formatter.format(withdrawAmount)} was successful`);
    } catch (err) {
        res.json({ message: err });
    }
}


 const getBalance =  function(req, res) {
     User.findById(req.params.userId, function(err, user) {
        if (err)
            res.status(404).send(`User with Id ${Id} does not exist in the database`);
        res.json(` ${user.email} your account balance is $${user.balance}`);
    });
};

//         const amount = req.body.amount;

//         await User.findOneAndUpdate(
//             {
//                 id: ObjectId,
//                 account_Nums
//             },
//             { $inc: { balance: amount } },
//             { new: true }
//         )
//        // await User.save();
//         res.send();
//         console.log();

//     } catch (err) {
//         return res.status(400).json({ err: err.message })
//     }
// }
// )
module.exports = {getBalance, makeDeposit, makeWithdraw}