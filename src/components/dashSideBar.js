import React, {useState} from 'react';
import axios from '../api/axios.js';
import { Card , NavLink, Button} from 'react-bootstrap';
//import { useAuth } from '../context/AuthContext.js';
import clip from './cashclip.jpg';
import './dashb.css';
import { useAuth } from '../context/AuthContext.js';

function DashSideBar() {
  const [account, setAccount] = useState(0);
  const [err, setErr] = useState(null);

  const user = useAuth();

  const getBalance = async () => {
    try {
      const data =  await axios.get('http://localhost:8080/api/balance', {accountNumber: account})
    } catch (error) {
      setErr(error)
    }
  
   
   
 }

  return (
      <div><Card style={{ height: 1000, width: 400 }}>
          <Card.Img src={clip} ></Card.Img>
         
         <input onChange={(e) => setAccount(e.target.value)}></input>
      <Button onClick={ getBalance} style={{margin: 10, padding: 10}}>Display Balances</Button>
     
     <NavLink href= '/transfer' style={{margin: 10, padding: 10}}>Make a Transfer</NavLink>
          <NavLink href= '/transactions' style={{margin: 10, padding: 10}}>Recent Transactions</NavLink>
          <NavLink style={{margin: 10, padding: 10}}>Statements</NavLink>
          <NavLink style={{margin: 10, padding: 10}}>Messages</NavLink>
          <NavLink style={{margin: 10, padding: 10}}>Contact Good Bank</NavLink>
          <NavLink style={{margin: 10, padding: 10}}>Support</NavLink>
          
      </Card>
         </div>
  )
}

export default DashSideBar;