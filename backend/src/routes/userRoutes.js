const express = require('express');

const router = express.Router();
const { userLogin, handleReg, getAllData, getOneUser, getUserByID } = require('../controllers/authController.js');
const { getBalance, makeDeposit, makeWithdraw, makeTransfer, getTransactions } = require('../controllers/transactionsCont.js');
// const authMiddleware = require('../middleware/authMid.js');
const { User } = require('../model/user');


router.post('/signup', handleReg);

router.post('/login', userLogin); 

router.patch('/deposit', makeDeposit);

router.patch('/:id', getUserByID, async (req, res) => {
  if (req.body.name != null) {
    res.user.name = req.body.name
  }

  try {
    const updatedUser = await res.user.save()
    res.json(updatedUser)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.get('/allData', getAllData);//add auth middleware

router.get('/balance', getBalance);
router.get('/transactions', getTransactions);
router.get('/users/:email', getOneUser);
// router.delete('/users/:userId', requireSignIn, hasAuthorization, async (req, res) => {
//     try {
//         let user = req.profile;
//         let userDeleted = await user.remove();
//         userDeleted.hashed_password = undefined;
//         userDeleted.salt = undefined;
       
//         res.json(userDeleted)
//     } catch (err) {
//        return res.status(400).json({
//             error: errorHandler.getErrorMessage(err)
//         });  
//     }
// });
router.get('/transactions/:accountNumber', getTransactions)
 
// withdrawals
router.put('/withdraw', makeWithdraw);

//work 3/1/23
router.put('/transfer/', makeTransfer);
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
// router.get("/allData",async (req, res) => {
//     const users = await User.find({});

//   try {
//     res.send(users);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

//Get by email Method (works as of 2/27/23)
// router.get("/getByEmail/:email", async (req, res) => {

//     try {
 
//          const foundUser = await User.findOne(req.params);
//         res.send(foundUser);
// 	 } catch(error) {
//         res.status(404).send({ error: "User doesn't exist!" });
// 	 }
// })

//Get by ID Method (works as of 2/27/23)
// router.get('/getOneById/:id', async (req, res) => {
//     try {
       
//        const result =  await User.findById(req.params.id );
//         res.send(result);
//         console.log(result);
//     } catch (error) {      

//         res.status(404).send({ error: "User doesn't exist!" });
//     }
// })

module.exports = router;