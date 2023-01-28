import React, {useState} from 'react'
import { Button, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export function Deposit() {
  
  const [amounts, setAmounts] = useState({
    deposit: 0,
    withdraw: 0
  });
  const [balance, setBalance] = useState(100);


  const onChangeBalance = (e) => {
    e.preventDefault()
 let amounts = Number(e.target.value);



    if (!amounts  || amounts <= 0) {
      return alert('Invalid deposit amount');
    } else {
      let balanceNew = (Number(balance + amounts))
      setBalance(balanceNew)
    }
  }

    return (<>
      <Card style={{ display: "grid", textAlign: 'center' }}>
        <Form>
          <>
            <h5  className="card-balance mb-4" type="number" id="update-balance" 
              style={{ textAlign: 'center' }}>Current Balance = $ {balance} </h5>

            <h5 className="card-title mb-5" style={{ backgroundColor: 'limegreen' }}>Make a Deeposit</h5>


            <div>
              <h5 className='me-auto mb-3'>Deposit Amount</h5>

              <span className="input-withdraw" style={{ height: 40, width: 100, textAlign: 'center' }}>$</span>

              <input onChange={((e) => setAmounts(e.target.value))} value={amounts} style={{ height: 30, width: 225}}
                id="amount" type="number" className="event" aria-label="Amount" placeholder="Enter Deposit Amount" />
            </div>

     <Button disabled={!amounts} onClick={onChangeBalance} value={amounts} type="submit" >Deposit</Button>
          </>
        </Form>
        <Card.Footer>Click the link below to make a withdrawal
         <Link style={{ display: 'flex', position: "flex-bottom" }} to="/withdraw" className="deposit-link"><Button>Withdraw</Button></Link>
        </Card.Footer>
      </Card>
     
      </>
      )
  }
    
export default Deposit;



