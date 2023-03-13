import React, {useState, useEffect} from 'react';

import {  BrowserRouter, Route, Routes} from 'react-router-dom';

import './App.css';
import {PrivateRoute} from './auth/privRoutes.js';
//import {  UserProvider } from './services/userContext.js';
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
import { Welcome } from './components/Welcome.js';
import { AuthProvider } from './auth/authContext.js';


function App() {
 
// const [ userData, setUserData] = useState({
// token: undefined,
// user: undefined
// });
// useEffect(() => {
// const checkLoggedIn = async () => {
// let token = localStorage.getItem("Authorization");
// if(token === null){
// localStorage.setItem("Authorization", "x-access-token ");
// token = "";
// }
// const tokenResponse = await axios.post('http://localhost:8080/api/auth/tokenIsValid', null, {headers: {"Authorization": token}});
// if (tokenResponse.data) {
// const userRes = await axios.get("http://localhost:8080/api/auth", {
// headers: { "Authorization":  'x-access-token', token },
// });
//   console.log(userData);
// setUserData({
// token,
// user: userRes.data,
// });
// }
// }
// checkLoggedIn();
// }, [userData]);



  return (

    <BrowserRouter>
      <AuthProvider>
     
    <div className="container-fluid">
 <NavBar />

    <Routes>
    <Route exact path="/" element= {<Home/> } />
          
            <Route path="/login" element={<Login />} />  
            
     <Route path="/welcome" element={ <Welcome/>}/>             
   
  <Route path="/register" element={ <CreateAccount/>}/>
       <Route element={<PrivateRoute />}>
           <Route exact path="/deposit" element={<Deposit />} />
         </Route>             
 
         <Route element={<PrivateRoute />}>
           <Route exact path="/withdraw" element={<Withdraw/> } />
         </Route>              

        <Route element={<PrivateRoute />}>
         <Route exact path="/dashboard" element={<Dashboard/>} />
         </Route>
                      
      <Route element={<PrivateRoute />}>
         <Route exact path="/transactions" element={<Transactions/>}/>
         </Route>

       <Route element={<PrivateRoute />}>
         <Route exact path="/allData" element= {<AllData/>}/>
         </Route>                
          </Routes>
         
      </div>
        <Footer />
       
        </AuthProvider>
      </BrowserRouter>
    
  );
}

export default App;
