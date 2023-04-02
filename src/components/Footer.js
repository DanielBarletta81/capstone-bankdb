import React from 'react';
import { Card, Container } from 'react-bootstrap';
export function Footer() {
  return (
    <Container  className="d-flex align-items-center justify-content-center "
    >
    
      <Card style={{marginTop: "auto"}} className='footer'>

      <Card.Body>
        <Card.Title>Quote of the Day</Card.Title>
        <Card.Text>
          “An investment in knowledge always pays the best interest.” - Benjamin Franklin
        </Card.Text>
      </Card.Body>
      </Card>
      </Container>
  )
}
