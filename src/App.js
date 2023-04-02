import React from 'react';

import {  BrowserRouter, Route, Routes} from 'react-router-dom';

import './App.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { NavBar } from './components/Navbar.js';
import { Home } from './components/Home.js';
import { CreateAccount } from './components/CreateAccount.js';
import { Deposit } from './components/Deposit.js';
import { Withdraw } from './components/Withdraw.js';
import { Dashboard } from './components/Dashboard.js';
import { Transactions } from './components/Transactions.js';
import { AllData } from './components/AllData.js';
import { Login } from './components/Login.js';
import { Footer } from './components/Footer.js';
//import { setAuthToken } from './auth/authHeader.js';
// import { AuthProvider } from './auth/authContext.js';
import 'react-toastify/dist/ReactToastify.min.css';
import { AuthProvider, useAuth } from './context/AuthContext.js';
//import { RequireAuth } from './auth/RequireAuth.js';
function App() {
//check jwt token
//  const token = localStorage.getItem("token");
//  if (token) {
//      setAuthToken(token);
//  }

  // const { user } = useAuth();
  return (
    <GoogleOAuthProvider clientId='412711755874-47is1si61kd9v8srifbh1akbltdaqo52.apps.googleusercontent.com'>
<AuthProvider>
    <BrowserRouter>
     
     
          <div className="container-fluid">
            <div className='app-user'>Currently logged in: </div>
 <NavBar />

    <Routes>
    <Route exact path="/" element= {<Home/> } />
          
            <Route path="/login" element={<Login />} />  
            
              
   
  <Route path="/register" element={ <CreateAccount/>}/>
       
           <Route exact path="/deposit" element={<Deposit />} />
                  
 
           <Route exact path="/withdraw" element={<Withdraw/> } />
                  

       
         <Route exact path="/dashboard" element={<Dashboard/>} />
         
                      
    
         <Route exact path="/transactions" element={<Transactions/>}/>
        
         <Route exact path="/allData" element= {<AllData/>}/>
                   
          </Routes>
         
      </div>
        <Footer />
       
       
      </BrowserRouter>
      </AuthProvider>
      </GoogleOAuthProvider>
  );
}

export default App;
