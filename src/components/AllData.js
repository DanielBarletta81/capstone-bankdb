import React, {useState} from 'react';
import { Button, Card, Row, Table } from 'react-bootstrap';
import './allData.css';

export function AllData() {
   const [user, setUser] = useState([]);

  const fetchData = async () => {
    return fetch('http://localhost:8080/account/allData')
          .then((response) => response.json())
      .then((user) => setUser(user))

  }






  if (user) {
    return (<>

      <Card >

        <Card.Body>
          <Card.Title>All Data </Card.Title>
        
            
          <Table>
            <Row>
           
                 <thead>
      
                  <th>ID</th>
                  <th>Username</th>
                
          <th>E-Mail</th>
          <th>Name</th>
          <th>Account #</th>
         </thead>
            
           
              </Row>
             <tbody>
               
        {user.map((user, index) => (
          <tr key={index}>
            <td>{user._id}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
           
            <td>{user.name}</td>
            <td>{user.account_Nums}</td>
          </tr>
        ))}
      </tbody>
</Table>
     
        <Button onClick={fetchData} variant="primary">Display Data</Button>
      </Card.Body>
    </Card>
  </>
  );
  } else {
    return null;
  }
}
  // const [allUsers, setAllUsers] = useState("");

  // const GetAllUsers = () => {
  //   useEffect(() => {
  //     fetch("http://localhost:8080/account/allUsers")
  //       .then((res) => res.json())
  //       .then((res) => setAllUsers({allUsers}));
  //   }, []);
  // }

