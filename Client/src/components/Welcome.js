import React from 'react'

import { auth } from '../firebase';
import { Button, Card, Form } from 'react-bootstrap';


const user = auth.currentUser;

export function Welcome() {


if (user !== null) {
  // User is signed in, see docs for a list of available properties
  // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
  const email = user.email;

    console.log(uid, email);
} else {
    console.log('No user logged in.');
}

    return (<>
        <Card className='welcome'>
        <div>Welcome Back,{user.email}!</div>
        
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