import React from 'react'
import { Button, Card, Container } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext.js';
import axios from '../api/axios.js';
import './transactions.css';




export function Transactions() {
  const { user } = useAuth();

  const getUserTransacts = async () => {
  try {
    let userTransactions = await axios.get('/users/transactions')
      .then(data => console.log(data.data));
    console.log(userTransactions);
  } catch (error) {
    console.log(error);
  }
 
}




  return (
    <>
     <div className='app-user'>Currently logged in user: ** {user.email} </div>
    <Container className="fluid">
 <Card className= "transactions">
      <Card.Img variant="top" src="holder.js/100px180" />
     
          <Card.Title>Recent Transactions for:{user.email}  </Card.Title>
        <Card.Text>
         Transactions go here....
        </Card.Text>
        <Button variant="primary" onClick={getUserTransacts}>View Transactions</Button>
      
      </Card>
      </Container>
      </>
  )
}

