import React, { useState } from 'react'
import { Button, Container, Form, NavLink } from 'react-bootstrap'
import axios from '../api/axios.js'

export const Transfer = () => {

    const [transferAmount, setTransferAmount] = useState(0);
    const [toAcct, setToAcct] = useState('');
    const [fromAcct, setFromAcct] = useState('');
    
    const makeTransfer = async () => {
        try {
            const data = await axios.put('/api/transfer', { transferAmount, fromAcct, toAcct });
         
             console.log(data);    
        } catch (error) {
            console.log(error);
        }
}


  return (
      <Container>
        
          <Form >
              <h1>Transfer Funds</h1>

              <Form.Label>Origin Account #</Form.Label>
              <Form.Control onChange={(e) => setFromAcct(e.target.value)}>
                  
              </Form.Control>
              
               <Form.Label>Destination Account #</Form.Label>
              <Form.Control onChange={(e) => setToAcct(e.target.value)}>
                  
              </Form.Control>
              
               <Form.Label>Amount to Transfer</Form.Label>
              <Form.Control onChange={(e) => setTransferAmount(e.target.value)}>
                  
              </Form.Control>
              
              <Button onClick={makeTransfer}>Make Transfer</Button>
          </Form>


<NavLink href='/dashboard'>Back to Dashboard</NavLink>
    </Container>
  )
}
