import React, {useState} from 'react'
import { Button, Card, Form, Container, Alert, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { toast } from "react-toastify";
import { useAuth } from '../context/AuthContext.js';
import axios from "../api/axios.js";
import depositPic from "./coinPlant.jpg"
import "./deposit.css";


export const Deposit = () => {
  const { user } = useAuth();

  const [depositAmount, setDepositAmount] = useState(0);

  const [accountNumber, setAccountNumber] = useState(0);
  const [accountBalance, setAccountBalance] = useState(0);
  const [error, setError] = useState('');
   const [loading, setLoading] = useState(false);


  
    const onDeposit = async (e) => {
      e.preventDefault();

  
      try {
       

        if (!depositAmount || depositAmount <= 0) {
          setError("Please enter valid deposit amount");
        }
  await axios.patch('http://localhost:8080/api/deposit', {
          body: JSON.stringify({
            depositAmount: depositAmount,
           accountBalance: accountBalance + depositAmount,
            accountNumber: accountNumber
          }),
          headers: {
           
            'Content-type': 'application/json',
          },
        })
          .then(response => {
            setAccountBalance(response?.data?.accountBalance);
            console.log(accountBalance);
          })

          setDepositAmount('');
          setAccountNumber('');
          setError('');
          setLoading(false);
          toast(`Success! You have deposited \$ ${depositAmount} into Account #: ${accountNumber}.`);
        
} catch (error) {
  console.log(error.message);
}

};

  // const showBalance = async () => {
  //   try {
  //     await axios.get('http://localhost:8080/api/deposit')
  //       .then(data => {
  //         setAccountBalance(data.data.accountBalance);
  //       });
  //   } catch (error) {
  //     console.log(error)
  //   }
  //   showBalance();
  // }

  return (

    <>
       <div className='app-user'>Currently logged in user:{user.email} </div>
  <Container className="d-flex align-items-center justify-content-center">
        <Card className="depCard">
          <Card.Img src={depositPic}></Card.Img>
        {/* <Card.Header className="cardhead">Make a Deposit</Card.Header> */}
        {/* { currentUser.email} */}
        {error && <Alert variant="danger">{error }</Alert>}   
          <Card.Header className="user">Logged in as: -- {user.email }</Card.Header>
          <Form>
            <FormGroup>
              <FormLabel className="balance">Current Balance: $ {user.accountBalance} </FormLabel>
            
            </FormGroup>


            <FormGroup>
              <FormLabel className= "amt" >Deposit Amount</FormLabel>
                <FormControl onChange={((e) => setDepositAmount(e.target.value))} value={depositAmount}
              type="number" className="event" aria-label="Amount" />
            </FormGroup>

             <FormGroup>
              <FormLabel className= "acct" >Account Number</FormLabel>
                <FormControl onChange={((e) => setAccountNumber(e.target.value))} 
                value={accountNumber} type="number" className="event"  />
            </FormGroup>
      
 <Button className="deposit" disabled={loading} onClick={onDeposit} value={depositAmount} type="submit" >Deposit</Button>
      
 </Form>
          
  
     <NavLink to="/withdraw" className="deposit-link">Click to make a withdrawal</NavLink>
       
            </Card>
              </Container>
    </>
    )

  }
