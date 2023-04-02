import {  useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase.js';
import { useNavigate } from "react-router-dom";
import { Container,Form, Button, Row, Col, Card , Alert} from "react-bootstrap";
//import { Notify } from "../Toasts/notify.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import "./createAcct.css";
import { toast } from "react-toastify";






export const CreateAccount = () => {
  const navigate = useNavigate();
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [pwdCheck, setPwdCheck] = useState('');
  //register validation

  const validPw = () => {
    let isValid = true;
    if (password.current.value !== pwdCheck.current.value) {
      isValid = false;
      setError('Passwords do not match!')
    }
    return isValid;
  }

  const submitNewUser = async (e) => {
    e.preventDefault();

    setError('');

    if (validPw()) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          navigate("/login");
        })
        .catch((error) => {
          setError(error.message);
        });
    }
  }

  const signupData = () => {
    try {
      let data;
      let user;
       axios.post('http://localhost:8080/api/signup', data)
        .then(res => res.data)
      toast(`Success! Created User: ${user.email}`);
   navigate('/dashboard');

      setLoading(false);
      
    } catch (error) {
      setError(error);
      console.log(error);
    }


}





  //   return (<>
  //     <Card className='acct-card'>
  //        <Card.Header> Register here!</Card.Header>
  //         <CreateAcctForm/>
  //     </Card>
  //     </>
  //     )
  // }

  //  function CreateAcctForm() {

  return (
    //</> <Notify type= "success"/>
<Container className="d-flex align-items-center justify-content-center">
      <Card> 
     <Card.Header className="text-center mb-6"> Register Here!</Card.Header>
      
        {error && <Alert variant="danger">{error }</Alert>}    
    
       
    <Form onSubmit={submitNewUser}>
      <Row className="mb-3">
        <Form.Group as={Col} md="28" id="username">
        <Form.Label >Enter a Username:</Form.Label>
        <Form.Control
                onChange={(e) => setUsername(e.target.value)}
            type="text"
         
          placeholder="Username"
         
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>

 <Row className="mb-3">
        <Form.Group  md="4" >
        <Form.Label> Enter an E-mail:</Form.Label>
        <Form.Control
            type= "email"
           onChange={(e) => setEmail(e.target.value)} 
          placeholder="E-mail address"
          autoComplete= "off"
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row>
        <Form.Group  md="4" id="password">
          <Form.Label  >Create Password:
          </Form.Label>
          <Form.Control
           onChange={(e) => setPassword(e.target.value)}
            type="password"
            
            placeholder="Password"
          
           autoComplete= "off"
          />
          <Form.Control.Feedback type="valid">
            <FontAwesomeIcon icon={faCheck} /> Looks good!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
           <FontAwesomeIcon icon={faTimes}/> Looks bad!</Form.Control.Feedback>
        </Form.Group>
      </Row>
<br/>
      <Row>
      
      <Form.Group  md="4" id="pwd-check">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
        type="password"
           onChange={(e) => setPwdCheck(e.target.value)}
          placeholder="Confirm Password"
         autoComplete= "off"
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
        </Row> 
     <br/>
       
                                              
      <Button disabled={loading} type="submit" onClick={signupData}>
        Create Account
      </Button>
     
        </Form>
      
     </Card>     
        </Container>
  )
}

