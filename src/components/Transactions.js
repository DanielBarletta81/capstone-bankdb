import React from 'react'
import { Button, Card } from 'react-bootstrap';





export function Transactions() {
  return (
 <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Recent Transactions</Card.Title>
        <Card.Text>
         Transactions go here....
        </Card.Text>
        <Button variant="primary">View Transactions</Button>
      </Card.Body>
    </Card>
  )
}

