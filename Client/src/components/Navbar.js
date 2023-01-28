import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import  "https://kit.fontawesome.com/806907d79d.js";
import './navbar.css';


export function NavBar() {
    return (<>
        <Navbar expand="lg">
<span className='fa-solid fa-guarani-sign'></span>
 <Navbar.Brand>
                Good Bank Inc.</Navbar.Brand>
           
       <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to ="/">Home</Link>
                  <Link to="/Login">Login</Link>
                        <Link to="/CreateAccount">Create Account</Link>
                         <Link to="/Deposit">Deposit</Link>
              <Link to="/Withdraw">Withdraw</Link>
              <Link to="/Transactions">Transactions</Link>
              <Link to="/AllData"> All Data</Link>
                </Nav>
                </Navbar.Collapse>
    </Navbar>
 </>
  )
}

