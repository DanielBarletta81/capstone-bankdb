import React, {useState, useEffect} from 'react';
import { NavLink, useNavigate} from 'react-router-dom';
import { useAuth} from '../authContext.js';
import './createAcct.css';
import { Card, Button, Form } from 'react-bootstrap';
//import { createUser, auth } from '../firebase';

export const CreateAccount = () => {




  return (<>
    <Card className='acct-card'>
       <Card.Header> Register here!</Card.Header>
        <CreateAcctForm/>
    </Card>
    </>
    )
  
}



// function CreateMsg() {
//     if(username, email, password !== null)
//   return(<>
//     <h5>Success!!</h5>
//      <Button type="submit"  onClick={() => setShow(true)}
//         >Add Another Account</Button>
//   </>);
// }
    

  function CreateAcctForm (){
    // const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const { currentUser, register} = useAuth(); // Get setError
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState('');

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  async function handleFormSubmit(e) {
    e.preventDefault();

    if (!password) {
      return setError("Passwords do not match");
    }

    try {
      setError(""); // Remove error when registering
      setLoading(true);
      await register(email, password);
      navigate("/dashboard");
    } catch (e) {
      setError("Failed to register"); // Replace alert
    }

    setLoading(false);
  }  

//    const handleSubmit = (e) => {
//      e.preventDefault();
  
//  fetch('http://localhost:8080/account/register', {
//          method: 'POST',
//          body: JSON.stringify({
//             username: username,
//             email: email,
//             password: password,
//          }),
//    headers: {
//            'Accept': 'application/json',
//             'Content-type': 'application/json',
//          },
//       })
//          .then((res) => res.json())
//          .then(() => {
//             setUsername('');
//             setEmail('');
//            setPassword('');
//            alert(`Success! Account for ${username} created.`)
//          })
//          .catch((err) => {
//             console.log(err.message);
//          });
//    };

    
   return (
          <>
            <Form>
        
             // <Form.Label className="username"> Create Username
             // </Form.Label>
              {/* <Form.Control type="text"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} placeholder="Enter Username" autoComplete='off' />
                 */}

              <Form.Label className="email-address"> Email address
              </Form.Label>
              <Form.Control type="text"
                label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)} placeholder="Email address" autoComplete='off' />
                

              <Form.Label className="password">
                Password
              </Form.Label>
              <Form.Control type="text"
                label="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password" autoComplete='current-password' />
                                              
              <Button type="submit" disabled={loading} onClick={handleFormSubmit}
              >Sign up</Button>
             
            </Form>
            <h5> Already have an account?{' '}
              <NavLink to="/login" > Sign in</NavLink>
            </h5>

          </>
     
        )
    }