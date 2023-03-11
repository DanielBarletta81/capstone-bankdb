import React, {useState} from 'react'
import { Button, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
  
    const uid = user.uid;
    console.log(uid);
  } else {
    // User is signed out
    
  }
});

export function Withdraw() {
  
  const [amounts, setAmounts] = useState({
    deposit: 0,
    withdraw: 0
  });
  const [balance, setBalance] = useState(100);


  const onChangeBalance = (e) => {
    e.preventDefault()
 let amounts = Number(e.target.value);



    if (amounts >= balance || balance <= 0) {
      return alert('Insufficient funds');
    } else if (amounts <= balance) {
      let balanceNew = (Number(balance - amounts))
      setBalance(balanceNew)
    }else if (!amounts || amounts === isNaN){
      return alert('Error, please enter a valid withdrawal Amount!');
    }
  }

    return (
      <Card style={{ display: "grid", textAlign: 'center' }}>
        <Form>
          <>
            <h5  className="card-balance mb-4" type="number" id="update-balance" 
              style={{ textAlign: 'center' }}>Current Balance = $ {balance} </h5>

            <h5 className="card-title mb-5" style={{ backgroundColor: 'limegreen' }}>Make a Withdrawal</h5>


            <div>
              <h5 className='me-auto mb-3'>Withdraw Amount</h5>

              <span className="input-withdraw" style={{ height: 40, width: 100, textAlign: 'center' }}>$</span>

              <input onChange={((e) => setAmounts(e.target.value))} value={amounts} style={{ height: 30, width: 225}}
                id="amount" type="number" className="event" aria-label="Amount" placeholder="Enter Withdraw Amount" />
            </div>

     <Button disabled={!amounts} onClick={onChangeBalance} value={amounts} type="submit" >Withdraw</Button>
          </>
        </Form>
        <Card.Footer>
          <Card.Text>Click the link below to make a deposit</Card.Text>
          <Link style={{ display: 'flex', position: "flex-bottom" }} to="/deposit" className="deposit-link"><Button>Deposit</Button></Link>
        </Card.Footer>
      </Card>)
  }
    
export default Withdraw;

