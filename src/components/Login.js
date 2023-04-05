import {  useState } from 'react';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import './login.css';
import { NavLink, useNavigate } from 'react-router-dom';
import {  auth } from '../firebase.js';

import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';
 import {  useAuth } from '../context/AuthContext.js';
import { GoogleLogin } from '@react-oauth/google';




export const Login = () => {
 
 
  const navigate = useNavigate();

const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');

 const { user } = useAuth();
 
const handleLogin = async (e) => {
  e.preventDefault();
  
try {

  const userCredential = await
   signInWithEmailAndPassword(auth, loginEmail, loginPassword);
   toast(`Success! User Logged in: ${userCredential.user.email}`);
  if (user) {
    console.log(userCredential.user.email);
   
  }
} catch (error) {
   setError(error);
}
  
  navigate('/dashboard');
  
    setLoading(false);
}


// function showSuccess() {
//   return (
//   <Modal>
//     {user && (<div className= "display-email">
//         <span>{user.email}</span>
           
//         <Notify type="success"> Successfully logged in!</Notify>
//   </div>
//       )}
//       </Modal>)
// }


  return (
    <>
      {/* <div className='app-user'>Currently logged in user: ** {user.email} </div> */}
      <Container className="d-flex align-items-center justify-content-center"
      >
       
          <Card className='login-card'>
        <Card.Title>Welcome Back!!</Card.Title>
         {error && <Alert variant="danger">{error }</Alert>}
            <Card.Text>
              Please enter your credentials below to log in...
            </Card.Text>
           
           
              <Form className = "login">
                <Form.Group className="mb-4">
                  <Form.Label htmlFor="email">E-Mail</Form.Label>
                  <Form.Control
                type="email"
                onChange={(e) => setLoginEmail(e.target.value)}
              
              
								
                   
                    placeholder="Enter E-mail"

                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
              <Form.Label >Password</Form.Label>
              <Form.Control
                type="password"
               onChange={(e) => setLoginPassword(e.target.value)}
                id="password"
                placeholder="Password"
                  />
                </Form.Group>

            <Button disabled={loading} onClick={handleLogin}> Login </Button>
          </Form>
          <Form>
            <h5> No account yet? {' '}</h5>   
            <NavLink to="/register"> Sign up</NavLink>
            <Button className='google'>Login with Google</Button>
             <GoogleLogin/>
              </Form>
           
        </Card>
      
    </Container>
    </>
  )    
} 
