import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.js';
import { Button, Card, Form, Container, Alert, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import  cardTop  from './withdrawCard.jpg';

export function Withdraw() {
  
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [balance, setBalance] = useState(100);
  const [loading, setLoading] = useState(false);
  const [account_Nums, setAccount_Nums] = useState('');
  const [error, setError] = useState(false);

  const { user } = useAuth();

  const onWithdraw = (e) => {
    e.preventDefault()

  }

  return (
      
    <>
       <div className='app-user'>Currently logged in user:{user.email} </div>
  <Container className="d-flex align-items-center justify-content-center">
        <Card className="depCard">
          <Card.Img src={cardTop}></Card.Img>
        {/* <Card.Header className="cardhead">Make a Deposit</Card.Header> */}
        {/* { currentUser.email} */}
        {error && <Alert variant="danger">{error }</Alert>}   
          <Card.Header className="user">Logged in as: {user.email }</Card.Header>
          <Form>
            <FormGroup>
              <FormLabel className="balance">Current Balance: $ {balance} </FormLabel>
            
            </FormGroup>


            <FormGroup>
              <FormLabel className= "amt" >Deposit Amount</FormLabel>
                <FormControl onChange={((e) => setWithdrawAmount(e.target.value))} value={withdrawAmount}
              type="number" className="event" aria-label="Amount" />
            </FormGroup>

             <FormGroup>
              <FormLabel className= "acct" >Account Number</FormLabel>
                <FormControl onChange={((e) => setAccount_Nums(e.target.value))} 
                value={account_Nums} type="number" className="event"  />
            </FormGroup>
      
 <Button className="withdraw" disabled={loading} onClick={onWithdraw} value={withdrawAmount} type="submit" >Withdraw</Button>
      
 </Form>
          
  
     <NavLink to="/deposit" className="mb-4">Click here to deposit</NavLink>
       
            </Card>
              </Container>
    </>
    )

     
        
       
  }
    
export default Withdraw;

