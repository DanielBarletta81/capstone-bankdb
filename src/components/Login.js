import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'

import { Form, Button, Card } from 'react-bootstrap';
import './login.css';
export const Login = () => {
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <Card className='login-card'>
       
          <Card.Title>Welcome Back!!</Card.Title>
              <Card.Text>
                   Please enter your credentials below to log in...
              </Card.Text>
        <Card.Body>
           
          <Form >
          
 <Form.Group className="mb-3">
      <Form.Label>Email address</Form.Label>
          <Form.Control id="email-address"
                name="email"
                type="email"
                value={email} placeholder="Email address"
                autoComplete='email@example.com'
                onChange={(e) => setEmail(e.target.value)} />
                     <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                          </Form.Text>
     </Form.Group>

 <Form.Group className="mb-3">
     <Form.Label>Password</Form.Label>
           <Form.Control id="password"
                name="password"
                type="password"
                autoComplete='current-password'
                value={password} placeholder="Password"
                onChange={(e) => setPassword(e.target.value)} />
     </Form.Group>

                    <Button> Login </Button>
     </Form>
             No account yet? {' '}
              <NavLink to="/register"> Sign up</NavLink>
     </Card.Body>        
 </Card>
    </>
  )
      
    }

