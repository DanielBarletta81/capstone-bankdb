import React, { useContext} from 'react';
import { Card, Button } from 'react-bootstrap';
//import { useNavigate } from 'react-router-dom';
import {UserContext} from '../services/userContext.js';

export function Dashboard() {

 const { logOutUser } = useContext(UserContext);
 
 // This function is called when the user clicks the "Logout" button.
 const logOut = async () => {
   try {
     // Calling the logOutUser function from the user context.
     const loggedOut = await logOutUser();
     // Now we will refresh the page, and the user will be logged out and
     // redirected to the login page because of the <PrivateRoute /> component.
     if (loggedOut) {
       window.location.reload(true);
     }
   } catch (error) {
     alert(error)
   }
 }

  return (
    <div>
      <Card className='dashboard'>
        <Card.Header>Welcome to your dashboard,{user.username}!
        </Card.Header>
        <Button onClick={logOut}>Log Out</Button>
      </Card>
    </div>
  )
}

