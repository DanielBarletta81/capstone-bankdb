import React, {useState} from 'react'
import { Button, Card, Container, Form, Table } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext.js';
import axios from '../api/axios.js';
import './transactions.css';
import  transImg  from './transactions.jpg';



export function Transactions() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  

  const getUserTransacts = async () => {
    return axios.get('http://localhost:8080/api/transactions')
      .then(data => {
        setTransactions(data?.data);
      })
  }


  if (transactions) {


    return (<>
      <div className='app-user'>Currently logged in user: ** {user.email} </div>
     
      <Container className="d-flex align-items-center justify-content-center"
      >
        <Card className="transactions">
          <Card.Img className='img' variant="top" src={transImg} />
          <Card.Title>Recent Transactions for: {user.email}  </Card.Title>
       
         
          <Form className='d-flex'>
            <Form.Label>Enter Account #</Form.Label>
            <Form.Control></Form.Control>
            <Button onClick={getUserTransacts} variant="primary">Show Transactions</Button>
          </Form>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Acct #</th>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              
              {transactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.accountNumber}</td>
                  <td>{transaction.transactionTime}</td>
                  <td>{transaction.transactionType}</td>
                  <td>{transaction.transactionAmount}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
  
      </Container>
    </>
    );

  } else {
    return null;
  }
}