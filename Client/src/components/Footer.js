import React from 'react';
import { Card } from 'react-bootstrap';
export function Footer() {
  return (
     <Card className='footer'>

      <Card.Body>
        <Card.Title>Quote of the Day</Card.Title>
        <Card.Text>
          “An investment in knowledge always pays the best interest.” - Benjamin Franklin
        </Card.Text>
      </Card.Body>
    </Card>
  )
}
