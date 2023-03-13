import React, { useState, useContext, useEffect } from 'react';
import { NavLink , useNavigate, useLocation} from 'react-router-dom';
import {UserContext} from '../services/userContext.js';
//import axios from 'axios';
import { Form, Button, Card } from 'react-bootstrap';
import './login.css';


export const Login = () => {

 const navigate = useNavigate();
 const location = useLocation();
 
 // We are consuming our user-management context to
 // get & set the user details here
 const { user, fetchUser, emailPasswordLogin } = useContext(UserContext);
 
 // We are using React's "useState" hook to keep track
 //  of the form values.
 const [form, setForm] = useState({
   email: "",
   password: ""
 });
 
 // This function will be called whenever the user edits the form.
 const onFormInputChange = (event) => {
   const { name, value } = event.target;
   setForm({ ...form, [name]: value });
 };
 
 // This function will redirect the user to the
 // appropriate page once the authentication is done.
 const redirectNow = () => {
   const redirectTo = location.search.replace("?redirectTo=", "");
   navigate(redirectTo ? redirectTo : "/");
 }
 
 // Once a user logs in to our app, we don’t want to ask them for their
 // credentials again every time the user refreshes or revisits our app, 
 // so we are checking if the user is already logged in and
 // if so we are redirecting the user to the home page.
 // Otherwise we will do nothing and let the user to login.
 const loadUser = async () => {
   if (!user) {
     const fetchedUser = await fetchUser();
     if (fetchedUser) {
       // Redirecting them once fetched.
       redirectNow();
     }
   }
 }
 
 // This useEffect will run only once when the component is mounted.
 // Hence this is helping us in verifying whether the user is already logged in
 // or not.
 useEffect(() => {
   loadUser(); // eslint-disable-next-line react-hooks/exhaustive-deps
 }, []);
 
 // This function gets fired when the user clicks on the "Login" button.
 const onSubmit = async (event) => {
   try {
     // Here we are passing user details to our emailPasswordLogin
     // function that we imported from our realm/authentication.js
     // to validate the user credentials and log in the user into our App.
     const user = await emailPasswordLogin(form.email, form.password);
     if (user) {
       redirectNow();
     }
   } catch (error) {
       if (error.statusCode === 401) {
          alert("Invalid username/password. Try again!");
      } else {
          alert(error);
      }
 
   }
 };
//  return <form style={{ display: "flex", flexDirection: "column", maxWidth: "300px", margin: "auto" }}>

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
 
//   const [error, setError] = useState(null);

// const { setUserData } = useContext(UserContext);
// const navigate = useNavigate();

// const signInUser
//   = async (e) => {

//     e.preventDefault();
//     try {
//       const loginUser = { email, password };
//       const loginResponse = await axios.post("http://localhost:8080/account/login", loginUser);
//       setUserData({
//         token: loginResponse.data.token,
//         user: loginResponse.data.user
//       });
//       localStorage.setItem("auth-token", loginResponse.data.token);
//       navigate("/dashboard");
//     } catch (err) {
//       err.msg && setError(err.msg)
//       console.log(err);
//     }
  
//   }


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
                value={form.email} placeholder="Email address"
                autoComplete='email@example.com'
                onChange={onFormInputChange} />
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
                value={form.password} placeholder="Password"
                onChange={onFormInputChange} />
     </Form.Group>

                    <Button onClick={onSubmit}> Login </Button>
     </Form>
             No account yet? {' '}
              <NavLink to="/register"> Sign up</NavLink>
     </Card.Body>        
 </Card>
    </>
  )    
}