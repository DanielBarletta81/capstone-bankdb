import React from 'react';

import {  BrowserRouter, Route, Routes} from 'react-router-dom';

import './App.css';

import { NavBar } from './components/Navbar.js';
import { Home } from './components/Home.js';
import { CreateAccount } from './components/CreateAccount.js';
import { Deposit } from './components/Deposit.js';
import { Withdraw } from './components/Withdraw.js';
import { Balance } from './components/Balance.js';
import { Transactions } from './components/Transactions.js';
import { AllData } from './components/AllData.js';
import { Login } from './components/Login.js';
import { Footer } from './components/Footer.js';
import { Welcome } from './components/Welcome.js';



function App() {

  return (

    <BrowserRouter>
    <div className="container-fluid">
 <NavBar />

    <Routes>
    <Route exact path="/" element= {<Home/> } />
          
     <Route path="/Login" element={ <Login/>}/>             
     <Route path="/Welcome" element={ <Welcome/>}/>             
   
  <Route path="/register" element={ <CreateAccount/>}/>
                    
 <Route path="/Deposit" element={<Deposit/>} />
                       
 <Route path="/Withdraw" element={<Withdraw/> } />
                      
<Route path="/Balance" element={<Balance/>} />
                      
    <Route path="/Transactions" element={<Transactions/>}/>
                        
    <Route path="/allData" element= {<AllData/>}/>
                          
          </Routes>
         
      </div>
      <Footer/>
  </BrowserRouter>
  );
}

export default App;
