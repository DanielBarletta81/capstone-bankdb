import React from 'react'
import { Button, Card, Container } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext.js';
import axios from '../api/axios.js';





export function Transactions() {
  const { currentUser } = useAuth();

  const getUserBalance = async () => {
  try {
    let userBalance = await axios.get('/users/balance/:userId')
      .then(data => console.log(data.data));
    console.log(userBalance);
  } catch (error) {
    console.log(error);
  }
    getUserBalance();
}




  return (
    <Container className="d-flex align-items-center justify-content-center">
 <Card className= "d-flex">
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
          <Card.Title>Recent Transactions for:{currentUser}  </Card.Title>
        <Card.Text>
         Transactions go here....
        </Card.Text>
        <Button variant="primary" onClick={getUserBalance}>View Transactions</Button>
      </Card.Body>
      </Card>
      </Container>
  )
}

