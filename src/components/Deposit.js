import React, {useState} from 'react'
import { Button, Card, Form, Container, Alert, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { toast } from "react-toastify";
import { useAuth } from '../context/AuthContext.js';
import axios from "../api/axios.js";
import depositPic from "./coinPlant.jpg"
import "./deposit.css";


export const Deposit = () => {
  const { currentUser } = useAuth();

  const [depositAmount, setDepositAmount] = useState(0);

  const [account_Nums, setAccount_Nums] = useState(0);
  const [balance, setBalance] = useState(100);
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
           balance: balance,
            account_Nums: account_Nums
          }),
          headers: {
           
            'Content-type': 'application/json',
          },
        })
          .then(response => {
            setBalance(response.data.balance);
          })

          setDepositAmount('');
          setAccount_Nums('');
          setBalance('');
          setError('');
          setLoading(false);
          toast(`Success! You have deposited ${depositAmount} into Account #: ${account_Nums}.`);
        
} catch (error) {
  console.log(error.message);
}


    };

  return (

    <>
  <Container className="d-flex align-items-center justify-content-center">
        <Card className="depCard">
          <Card.Img src={depositPic}></Card.Img>
        {/* <Card.Header className="cardhead">Make a Deposit</Card.Header> */}
        {/* { currentUser.email} */}
        {error && <Alert variant="danger">{error }</Alert>}   
          <Card.Header className="user">Logged in as: -- {currentUser.email }</Card.Header>
          <Form>
            <FormGroup>
              <FormLabel className="balance">Current Balance: $ {balance} </FormLabel>
            
            </FormGroup>


            <FormGroup>
              <FormLabel className= "amt" >Deposit Amount</FormLabel>
                <FormControl onChange={((e) => setDepositAmount(e.target.value))} value={depositAmount}
              type="number" className="event" aria-label="Amount" />
            </FormGroup>

             <FormGroup>
              <FormLabel className= "acct" >Account Number</FormLabel>
                <FormControl onChange={((e) => setAccount_Nums(e.target.value))} 
                value={account_Nums} type="number" className="event"  />
            </FormGroup>
      
 <Button className="deposit" disabled={loading} onClick={onDeposit} value={depositAmount} type="submit" >Deposit</Button>
      
 </Form>
          
  
     <NavLink to="/withdraw" className="deposit-link">Click to make a withdrawal</NavLink>
       
            </Card>
              </Container>
    </>
    )

  }
