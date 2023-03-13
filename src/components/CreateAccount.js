import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Form, Button, Spinner } from "react-bootstrap";

import { AuthState } from "../auth/authContext.js";
import { Notify } from "../Toasts/notify.js";


 export const CreateAccount = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
   
  });
  const [isLoading, setIsLoading] = useState(false);
  

  const navigate = useNavigate();
  const { setAuth } = AuthState('');

  const handleCredentials = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  
  const registerHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // If any field is missing
    if (
      !credentials.name ||
      !credentials.email ||
      !credentials.password ||
      !credentials.confirmPassword
    ) {
      setIsLoading(false);
      return Notify("Please Fill all the Fields", "warn");
    }

    // If password and confirm password doesn't match
    if (credentials.password !== credentials.confirmPassword) {
      setIsLoading(false);
      return Notify("Passwords Do Not Match", "warn");
    }

    // If password is less than 8 characters
    if (credentials.password.length < 8) {
      setIsLoading(false);
      return Notify("Password must be at least 8 characters", "warn");
    }

    try {
      // Register user
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        
        }),
      });
      const data = await response.json();

      if (data.success) {
        localStorage.setItem("auth", JSON.stringify(data)); // Save auth details in local storage
        setAuth(data);
        setIsLoading(false);
        navigate("/"); // Go to home page
        return Notify("Your account has been successfully created", "success");
      } else {
        setIsLoading(false);
        return Notify(data.error, "error");
      }
    } catch (error) {
      setIsLoading(false);
      return Notify("Internal server error", "error");
    }
  };


// import React, {useState} from 'react';
// import { NavLink, useNavigate} from 'react-router-dom';
// // import { useAuth} from '../authContext.js';
// import './createAcct.css';
// import { Card, Button, Form } from 'react-bootstrap';
// //import AuthService from '../services/authService.js';

// export const CreateAccount = () => {




//   return (<>
//     <Card className='acct-card'>
//        <Card.Header> Register here!</Card.Header>
//         <CreateAcctForm/>
//     </Card>
//     </>
//     )
  
// }



// // function CreateMsg() {
// //     if(username, email, password !== null)
// //   return(<>
// //     <h5>Success!!</h5>
// //      <Button type="submit"  onClick={() => setShow(true)}
// //         >Add Another Account</Button>
// //   </>);
// // }
    

//   function CreateAcctForm (){
//     const [username, setUsername] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//   const [passwordCheck, setPasswordCheck] = useState('');
//   //  const { currentUser, register} = useAuth(); // Get setError
//     const navigate = useNavigate();

//   //   const [loading, setLoading] = useState(false);

//   //   const [error, setError] = useState('');

//   // useEffect(() => {
//   //   if (currentUser) {
//   //     navigate("/");
//   //   }
//   // }, [currentUser, navigate]);

//   // async function handleFormSubmit(e) {
//   //   e.preventDefault();

//   //   if (!password) {
//   //     return setError("Passwords do not match");
//   //   }

//   //   try {
//   //     setError(""); // Remove error when registering
//   //     setLoading(true);
//   //     await register(email, password);
//   //     navigate("/dashboard");
//   //   } catch (e) {
//   //     setError("Failed to register"); // Replace alert
//   //   }

//   //   setLoading(false);
//   // }  

//    const handleSubmit = (e) => {
//      e.preventDefault();
  
//  fetch('http://localhost:8080/api/users', {
//          method: 'POST',
//          body: JSON.stringify({
//             username: username,
//             email: email,
//            password: password,
//             passwordCheck: passwordCheck,
//          }),
//    headers: {
//            'Accept': 'application/json',
//      'Content-type': 'application/json',
//          },
//       })
//          .then((res) => res.json())
//          .then(() => {
//             setUsername('');
//             setEmail('');
//            setPassword('');
//            setPasswordCheck('');
//            alert(`Success! Account for ${username} created.`);
//            navigate('/welcome');
//          })
//          .catch((err) => {
//             console.log(err.message);
//          });
//    };

    
   return (
          <>
 <Form className="reg_form" onSubmit={registerHandler}>
        
 <Form.Group className="mb-3" controlId="username">
           <Form.Label className="username"> Create Username
              </Form.Label>
 <Form.Control
          type="text"
          name="username"
          tabIndex="1"
          placeholder="Enter a username"
          value={credentials.username || ''}
          onChange={(e) => handleCredentials(e)}
           />
 </Form.Group>
                
 <Form.Group className="mb-3" controlId="email">
              <Form.Label className="email-address"> Email address
              </Form.Label>
              <Form.Control  type="email"
          name="email"
          tabIndex="2"
          placeholder="Enter email"
          value={credentials.email || ''}
          onChange={(e) => handleCredentials(e)} />
                </Form.Group>
         
 <Form.Group className="mb-3" controlId="password">
              <Form.Label className="password">
                Password
              </Form.Label>
         <Form.Control
            type="password"
          name="password"
          tabIndex="3"
          placeholder="Password"
          value={credentials.password || ''}
          onChange={(e) => handleCredentials(e)} />
       </Form.Group>
         
          <Form.Group className="mb-3" controlId="confirm_pw">
         <Form.Label className="password-check">
                Password
              </Form.Label>
              <Form.Control  type="password"
          name="confirmPassword"
          tabIndex="4"
          placeholder="Confirm password"
          value={credentials.confirmPassword || ''}
          onChange={(e) => handleCredentials(e)} />
     </Form.Group>
                                              
               <Button
        tabIndex="6"
        variant="success"
        type="submit"
        className="mb-3"
        disabled={isLoading}
      >
        {isLoading ? (
          <Spinner animation="border" role="status" size="sm" />
        ) : (
          "Create Account"
        )}
      </Button>
             
            </Form>
            <h5> Already have an account?{' '}
              <NavLink to="/login" > Sign in</NavLink>
            </h5>

          </>
     
        )
}
