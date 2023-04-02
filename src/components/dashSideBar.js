import React from 'react';

import { Dropdown, Card , NavLink} from 'react-bootstrap';
import clip from './cashclip.jpg';
import './dashb.css';

function DashSideBar() {
  return (
      <div><Card style={{ height: 1000, width: 400 }}>
          <Card.Img src={clip} ></Card.Img>
         
         
          <NavLink style={{margin: 10, padding: 10}}>Display Balances</NavLink>
          <NavLink style={{margin: 10, padding: 10}}>Withdraw Funds</NavLink>
          <NavLink style={{margin: 10, padding: 10}}>Deposit Funds</NavLink>
           <NavLink style={{margin: 10, padding: 10}}>Make a Transfer</NavLink>
          <NavLink style={{margin: 10, padding: 10}}>Recent Transactions</NavLink>
          <NavLink style={{margin: 10, padding: 10}}>Statements</NavLink>
          <NavLink style={{margin: 10, padding: 10}}>Messages</NavLink>
          <NavLink style={{margin: 10, padding: 10}}>Contact Good Bank</NavLink>
          <NavLink style={{margin: 10, padding: 10}}>Support</NavLink>
          
      </Card>
         </div>
  )
}

export default DashSideBar;