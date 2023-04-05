import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.js';
import { Button, Card, Form, Container, Alert, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import  cardTop  from './withdrawCard.jpg';

export function Withdraw() {
  
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [balance, setBalance] = useState(100);
  const [loading, setLoading] = useState(false);
  const [accountNumber, setAccountNumber] = useState('');
  const [error, setError] = useState(false);

  const { user } = useAuth();

  const onWithdraw = async (e) => {
    e.preventDefault();

      try {
        if (!withdrawAmount || withdrawAmount <= 0) {
          setError("Please enter valid withdrawal amount");
        }
  await axios.patch('http://localhost:8080/api/withdraw', {
          body: JSON.stringify({
            withdrawAmount: withdrawAmount,
           accountBalance: accountBalance + withdrawAmount,
            accountNumber: accountNumber
          }),
          headers: {
           
            'Content-type': 'application/json',
          },
        })
          .then(response => {
            setBalance(response.data.accountBalance);
          })

          setWithdrawAmount('');
          setAccountNumber('');
          setError('');
          setLoading(false);
          toast(`Success! You have withdrawn  ${withdrawAmount} from Account #: ${accountNumber}.`);
        
} catch (error) {
  console.log(error.message);
}

 };

  return (
      
    <>
       <div className='app-user'>Currently logged in user:{user.email} </div>
  <Container className="d-flex align-items-center justify-content-center">
        <Card className="depCard">
          <Card.Img src={cardTop}></Card.Img>
        {error && <Alert variant="danger">{error }</Alert>}   
          <Card.Header className="user">Logged in as: {user.email }</Card.Header>
          <Form>
            <FormGroup>
              <FormLabel className="balance">Current Balance: $ {user.accountBalance} </FormLabel>
            
            </FormGroup>


            <FormGroup>
              <FormLabel className= "amt" >Withdrawal Amount</FormLabel>
                <FormControl onChange={((e) => setWithdrawAmount(e.target.value))} value={withdrawAmount}
              type="number" className="event" aria-label="Amount" />
            </FormGroup>

             <FormGroup>
              <FormLabel className= "acct" >Account Number</FormLabel>
                <FormControl onChange={((e) => setAccountNumber(e.target.value))} 
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

