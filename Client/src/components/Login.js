import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, signInUser } from '../firebase';

 
export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
       
    const onSubmitLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/Welcome")
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
       
    }
 
  return (
 <>
 <main>
        <section>
          <Card className= 'login-card'>
 <div>
       <Form onSubmit={signInUser}>
             <div>
              <label htmlFor="email-address">
                  Email address </label>
                <input id="email-address"
                       name="email"
                  type="email" placeholder="Email address"
                  autoComplete='current-password'
                    onChange={(e)=>setEmail(e.target.value)}/>
   </div>
      <div>
 <label htmlFor="password"> Password
      </label>
              <input id="password"
                   name="password"
                   type="password"                          placeholder="Password"
                   onChange={(e)=>setPassword(e.target.value)}/>
    </div>
          <div>
             <Button onClick ={onSubmitLogin}                          >      
              Login                                             </Button>
    </div>                               
           </Form>
                       
   <p className="text-sm text-white text-center">
             No account yet? {' '}
       <NavLink to="/signup"> Sign up</NavLink>
                        </p>
            </div>
            </Card>
      </section>
            </main>
        </>


   // <Card style={{ width: '22rem' }}>
     // <Card.Img variant="top" src="./coins.jpg" />
     // <Card.Body>
       // <Card.Title>Welcome Back!!</Card.Title>
        //<Card.Text>
        //  Please enter your credentials below to log in...
      //  </Card.Text>
       //  <Form>
     // <Form.Group className="mb-3" controlId="formBasicEmail">
      //  <Form.Label>Email address</Form.Label>
      //  <Form.Control type="email" placeholder="Enter email" autoComplete='current-email'/>
       // <Form.Text className="text-muted">
        //  We'll never share your email with anyone else.
      //  </Form.Text>
     // </Form.Group>

     // <Form.Group className="mb-3" controlId="formBasicPassword">
      //  <Form.Label>Password</Form.Label>
      //  <Form.Control type="password" placeholder="Password" autoComplete='current-password'/>
    //  </Form.Group>
        //  <Button variant="primary" onSubmit=//{onSubmitLogin}>Log in</Button>
       // </Form>
       // <br/>
       // <Button variant="muted">Register</Button>
     // </Card.Body>
   // </Card>
  )
}

