import React, { useState} from 'react';
import {  signOut } from 'firebase/auth';
import { Card, Button, Alert, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext.js';

import DashSideBar from './dashSideBar.js';

import mountain from './Mountain_Profile.jpg';
import './dashb.css';
import { auth} from '../firebase.js';
import { toast } from 'react-toastify';



export function Dashboard() {
  const [error, setError] = useState('');

  const { user } = useAuth();
  
  const navigate = useNavigate();
  

//  useEffect(()=>{
//         onAuthStateChanged(auth, (user) => {
//             if (user) {
            
//               const uid = user.uid;
      
//               console.log("uid", uid)
//             } else {
//              toast('No logged in user found!!')


  
  const handleLogout = async() => {
    setError('');
    await signOut(auth);
     toast(`${user.email} now logged out!`)
       navigate('/login')
  }
     
    if (error) {
      setError('Failed to log out!')
    }


  return (
    <div>
      <div className='app-user'>Currently logged in user: ** {user && <p> {user.email}</p>}  </div>
<Container className="d-flex align-items-center justify-content-center"
      >
       
      <Card className='dashboard' style={{ height: 1000, width: 400 }}>
        <Card.Header>Welcome to your dashboard 
          </Card.Header>
           <Card.Img src={mountain}></Card.Img>
        
          <Card.Body>
            <strong>User: {user && <p> {user.email}</p>}</strong>
         
          {error && <Alert variant="danger">{error}</Alert>}
        
        </Card.Body>
        <Button onClick = {handleLogout}>Log Out</Button>
      </Card>
        <DashSideBar />
        </Container>
    </div>
  )
}

