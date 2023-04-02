import { useRef, useState } from 'react';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import './login.css';
import {  NavLink, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword , GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth';
import { toast } from 'react-toastify';

import { auth } from '../firebase.js';


export const Login = () => {
 
  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const emailRef = useRef();
  const passwordRef = useRef();

  
   
  function googleLogin() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider(auth);
    // create popup signIn
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
     const credential  = GoogleAuthProvider.credentialFromResult(result);
        // store  token
        const token = credential.accessToken;
        // - check  if current user has token
        const user = result.user;
        console.log(user);
        if (token) {
          // - put token in localStorage )
          localStorage.setItem("@token", token);
          // - navigate user to dash
          navigate("/dashboard");
  }
 })
      .catch((error) => {
        console.log(error);
      })
    
}
const handleLogin = (e) => {
    e.preventDefault();


    signInWithEmailAndPassword(auth,emailRef.current.value, passwordRef.current.value)

   toast(`Success! User Logged in:'` );
     navigate('/dashboard');
  setError(error);
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
                ref= {emailRef}
              
              
								
                   
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
                ref = {passwordRef}
                id="password"
                placeholder="Password"
                  />
                </Form.Group>

            <Button disabled={loading} onClick={handleLogin}> Login </Button>
     <Button onClick={googleLogin}>Login with Google</Button>
                No account yet? {' '}
                <NavLink to="/register"> Sign up</NavLink>
              </Form>
           
        </Card>
       
    </Container>
    </>
  )    
} 
