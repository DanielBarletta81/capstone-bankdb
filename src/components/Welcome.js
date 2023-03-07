import React from 'react'


import { Button, Card, Form } from 'react-bootstrap';




export function Welcome() {



    return (<>
        <Card className='welcome'>
        <div>Welcome Back!</div>
        
        <Form className='welcome-form'>
          <Form.Label>Notifications</Form.Label>
          <br/>
          <Form.Text>You currently have no notifications</Form.Text>
          <br/>
          <Form.Label>Recent Activity</Form.Label>
          <br/>
          <Form.Text>You signed in...</Form.Text>
        </Form>
        <Card.Footer>
          <Button className='btn-signout'>Sign Out</Button>
        </Card.Footer>
 
        </Card>
        
        </>
  )
}