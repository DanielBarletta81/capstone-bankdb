import React from 'react';

import {  BrowserRouter, Route, Routes} from 'react-router-dom';

import './App.css';

import { NavBar } from './components/Navbar';
import { Home } from './components/Home';
import { CreateAccount } from './components/CreateAccount';
import { Deposit } from './components/Deposit';
import { Withdraw } from './components/Withdraw';
import { Balance } from './components/Balance';
import { Transactions } from './components/Transactions';
import { AllData } from './components/AllData';
import { Login } from './components/Login';
import { Footer } from './components/Footer';
import { Welcome } from './components/Welcome';


function App() {

  return (

    <BrowserRouter>
    <div className="container-fluid">
 <NavBar />

    <Routes>
    <Route exact path="/" element= {<Home/> } />
          
     <Route path="/Login" element={ <Login/>}/>             
     <Route path="/Welcome" element={ <Welcome/>}/>             
   
  <Route path="/CreateAccount" element={ <CreateAccount/>}/>
                    
 <Route path="/Deposit" element={<Deposit/>} />
                       
 <Route path="/Withdraw" element={<Withdraw/> } />
                      
<Route path="/Balance" element={<Balance/>} />
                      
    <Route path="/Transactions" element={<Transactions/>}/>
                        
    <Route path="/AllData" element= {<AllData/>}/>
                          
          </Routes>
         
      </div>
      <Footer/>
  </BrowserRouter>
  );
}

export default App;
