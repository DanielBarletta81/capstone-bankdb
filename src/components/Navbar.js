import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';


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
                  <Link to="/login">Login</Link>
                        <Link to="/register">Create Account</Link>
                         <Link to="/deposit">Deposit</Link>
              <Link to="/withdraw">Withdraw</Link>
              <Link to="/transactions">Transactions</Link>
              <Link to="/allData"> All Data</Link>
                </Nav>
                </Navbar.Collapse>
    </Navbar>
 </>
  )
}

