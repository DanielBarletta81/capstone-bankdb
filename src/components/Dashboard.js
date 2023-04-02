import React, { useState, useEffect } from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { Card, Button, Alert, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext.js';

import DashSideBar from './dashSideBar.js';

import mountain from './Mountain_Profile.jpg';
import './dashb.css';
import { auth } from '../firebase.js';
import { toast } from 'react-toastify';



export function Dashboard() {
  const [error, setError] = useState('');

  const { currentUser } = useAuth();
  
  const navigate = useNavigate();
  

 useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
            
              const uid = user.uid;
      
              console.log("uid", uid)
            } else {
             toast('No logged in user found!!')
              console.log("user is logged out")
            }
          });
         
    }, [])



  
 async function handleLogout (){
    setError('');

    try {
      await signOut(auth, currentUser)
      toast(`${currentUser.email} now logged out!`)
       navigate('/login')
    } catch (error) {
      setError('Failed to log out!')
    }
   

  }

  return (
    <div>
<Container className="d-flex align-items-center justify-content-center"
      >
       
      <Card className='dashboard' style={{ height: 1000, width: 400 }}>
        <Card.Header>Welcome to your dashboard 
          </Card.Header>
           <Card.Img src={mountain}></Card.Img>
        
          <Card.Body>
            <strong>User:</strong>{currentUser.email}
         
          {error && <Alert variant="danger">{error}</Alert>}
        
        </Card.Body>
        <Button onClick = {handleLogout}>Log Out</Button>
      </Card>
        <DashSideBar />
        </Container>
    </div>
  )
}

