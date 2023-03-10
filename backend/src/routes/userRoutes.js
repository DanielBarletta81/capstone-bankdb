
const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

const User = require('../model/user');

// Routes
    
//Register a new user
router.post('/register', async (req, res) => {
  try {
    await User.create({ username: req.body.username, email: req.body.email, password: req.body.password })
    .then(data => {
        res.send(data);
        console.log(data)
      })
  } catch (err) {   
    res.send(err.message);
  }
});
//  const user = req.body;

//   const takenUsername = await User.findOne({ username: user.username });
//   const takenEmail = await User.findOne({ email: user.email });

//   if (takenUsername || takenEmail) {
//     res.json({ message: "Username or Email already in use!" })
//   } else {
//     user.password = await bcrypt.hash(req.body.password, 10)

//     const dbUser =  new  User({
//       username: user.username,
//       email: user.email,
//       password: user.password
//     })

//      dbUser.save()
//     res.json({ message: 'User Registered!' })
//   }
// })

    //Login user and authenticate
router.post('/login', async (req, res) => {

  const userLoggingIn = req.body;

  await User.findOne({username: userLoggingIn.username})
  try {
    await User.create({ username: req.body.username, email: req.body.email, password: req.body.password })
    .then(data => {
        res.send(data);
        console.log(data)
      })
  } catch (err) {   
    res.send(err.message);
  }
    });

       

// router.get('/allUsers', getAll);

// router.get('/getById/:id', getById);
 router.patch('/update/:id', async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);
    await User.save();
    res.send(newUser);
  } catch (error) {
      res.send(error);
      console.error(error.message);
  }
});

 router.delete('/delete/:id', async (req, res) => {
  try {
    const customer = await User.findByIdAndDelete(request.params.id);

    if (!customer) res.status(404).send("No customer found");
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

router.put('/deposit/:id/:account_Nums', async (req, res) => {

    try {
        const account_Nums = req.params.account_Nums;

        const amount = req.body.amount;

        await User.findOneAndUpdate(
            {
                id: ObjectId,
                account_Nums
            },
            { $inc: { balance: amount } },
            { new: true }
        )
       // await User.save();
        res.send();
        console.log();

    } catch (err) {
        return res.status(400).json({ err: err.message })
    }
}
)

// withdrawals
router.put('/withdraw/:id/:account_Nums', async (req, res) => {
  try {
      const account_Nums = req.params.account_Nums;

        const amount = req.body.amount;

        await User.findOneAndUpdate(
            {
                id: ObjectId,
                account_Nums
            },
            { $inc: { balance: - amount } },
            { new: true }
        )
      const balance = account_Nums.balance;      
      if (amount < 0 || amount > balance) {
        res.status(400).send({
        message: 'Insufficient balance to process transaction',
      })
     }      
       // await User.save();
        res.send();
        console.log();

  } catch (err) {

    res.status(400).json({ error: err.message })
  }
})

//work 3/1/23
router.put('/transfer/:fromAccount/:toAccount', async (req, res) => {

    try {
        const { fromAccount, toAccount } = req.params
        const { amount } = req.body
         await User.findOne({ account_Nums: fromAccount })
         await User.findOne({
            account_Nums: toAccount,
        })
       

        if (!fromAccount || !toAccount) {
            res.status(400).send({ message: 'Please check account info' })
        
        } if (fromAccount.balance - amount < 0) {
            res.status(400).send({
                message: 'Transaction not processed due to insufficient balance',
            })
        } else {
            await User.findOneAndUpdate(
                { account_Nums: fromAccount },
              { $inc: { balance: - amount } },
                { new: true },
            )
            await User.findOneAndUpdate(
                { account_Nums: toAccount },
               { $inc: { balance: + amount } },
                { new: true },
            )

        }

        const newFromBalances = await User.find({
            account_Nums: fromAccount,
            account_Nums: toAccount
        }).select('balance')
        res.send(newFromBalances)

    }
    catch (err) {
        res.status(400).send({ err: err.message })
    }
})

// works 2/27/23
router.get('/balance/:account_Nums', async (req, res) => {
  try {
      const account_Nums = req.params.account_Nums;

      const result = await User.findOne({
          account_Nums
      }).select('balance');
      res.send(result);
  } catch (err) {
    res
      .status(400)
      .send({ message: 'Please check account info' })
  }
})


//Get all  users (working)
router.get("/allData",async (req, res) => {
    const users = await User.find({});

  try {
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

//Get by email Method (works as of 2/27/23)
router.get("/getByEmail/:email", async (req, res) => {

    try {
 
         const foundUser = await User.findOne(req.params);
        res.send(foundUser);
	 } catch(error) {
        res.status(404).send({ error: "User doesn't exist!" });
	 }
})

//Get by ID Method (works as of 2/27/23)
router.get('/getOneById/:id', async (req, res) => {
    try {
       
       const result =  await User.findById(req.params.id );
        res.send(result);
        console.log(result);
    } catch (error) {      

        res.status(404).send({ error: "User doesn't exist!" });
    }
})

module.exports = router;