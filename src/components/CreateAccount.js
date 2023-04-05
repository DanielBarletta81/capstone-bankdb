import {  useState } from "react";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth }  from '../firebase.js';
import { useNavigate } from "react-router-dom";
import { Container,Form, Button, Row, Col, Card } from "react-bootstrap";
//import { Notify } from "../Toasts/notify.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import "./createAcct.css";
import { toast } from "react-toastify";
// import { useAuth } from "../context/AuthContext.js";


export const CreateAccount = () => {
  const navigate = useNavigate();
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [confirmPW, setConfirmPW] = useState('');


  const register = async (e) => {
    e.preventDefault();

     if (regPassword !== confirmPW) {
        return toast( 'passwords must match!' );
      }
    try {

      const user =
        await
          createUserWithEmailAndPassword(auth, regEmail, regPassword)
   
      console.log(user.email);
      toast(`Success! Created User: ${user.email}`);
  
      await axios.post("http://localhost:8080/api/signup", JSON.stringify({
      username: regUsername,
        email: regEmail,
        password: regPassword
   }),
        {
          headers: {
            'Content-type': 'application/JSON'
          }
        })
        .then((res) => {
          console.log("server response:", res);
        })
        .catch((error) => {
          console.log("error in server:", error);
        });

    setLoading(false);
    } catch (err) {
     
    console.log(err.message);
      setError(err);
      
    };
      navigate('/dashboard');
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
// hash_config {
//   algorithm: SCRYPT,
//   base64_signer_key: CrEYr9w9C9cqU/+DgpepsvhDQRp/zQ3p4UA4r3/0mLtNcTJQ6AMov0wCUzIFnDPmvXtg00/QifSRVraEVCcS8A==,
//   base64_salt_separator: Bw==,
//   rounds: 8,
//   mem_cost: 14,
// }



  return (
    //</> <Notify type= "success"/>
<Container className="d-flex align-items-center justify-content-center">
      <Card> 
     <Card.Header className="text-center mb-6"> Register Here!</Card.Header>
      
        {/* {error && <Alert variant="danger">{error }</Alert>}     */}
    
       
    <Form >
      <Row className="mb-3">
        <Form.Group as={Col} md="28" id="username">
        <Form.Label >Enter a Username:</Form.Label>
        <Form.Control
            
            type="text"
         onChange={(e)=> setRegUsername(e.target.value)}
          placeholder="Username"
         
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      </Row>

 <Row className="mb-3">
        <Form.Group  md="4" >
        <Form.Label> Enter an E-mail:</Form.Label>
        <Form.Control
                type="email"
              onChange={(e)=> setRegEmail(e.target.value)}
                
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
            
            type="password"
         onChange={(e)=> setRegPassword(e.target.value)}
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
       onChange={(e)=> setConfirmPW(e.target.value)}
          placeholder="Confirm Password"
         autoComplete= "off"
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
        </Row> 
     <br/>
       
                                              
          <Button disabled={loading} onClick={register} type="submit" >
        Create Account
      </Button>
     
        </Form>
      
     </Card>     
        </Container>
  )
}

