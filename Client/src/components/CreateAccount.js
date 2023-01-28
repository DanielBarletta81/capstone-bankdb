import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../firebase';
import './createAcct.css';
import { Card, Button, Form } from 'react-bootstrap';
import { createUser } from '../firebase';


 export const CreateAccount = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
      e.preventDefault()

      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            navigate("/login")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ..
        });
    }

  return (
    <main >
      <section>
        <Card className= 'acct-card'>
<div>
      <div>
    <Card.Header> Register here!</Card.Header>
              <Form onSubmit={ onSubmit }>  
<div>
       <label htmlFor="email-address"> Email address
             </label>
                  <input type="email"
                    label="Email address"
                    value={email}
                  onChange={(e) => setEmail(e.target.value)}                                     placeholder="Email address"                     autoComplete='off' />
                </div>
  <div>
     <Form.Label htmlFor="password">
         Password
            </Form.Label>
     <input type="password"
            label="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password"      autoComplete='current-password'/>
   </div>                                             
      <Button type="submit" 
              onClick={createUser}>Sign up</Button>
 </Form>
        <p> Already have an account?{' '}
            <NavLink to="/login" > Sign in</NavLink>
          </p>                   
               </div>
          </div>
          </Card>
        </section>
    </main>
  )
}
 
