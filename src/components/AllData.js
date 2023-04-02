import React, {useState} from 'react';
import { Button, Table, Container, Card } from 'react-bootstrap';
import './allData.css';
import axios from "../api/axios.js";

export function AllData() {
   const [users, setUsers] = useState([]);

  const fetchData = async () => {
    return axios.get('http://localhost:8080/api/allData')
      .then(data => {
       setUsers(data?.data);
      })
  }


  if (users) {
    return (<>
      <Container className="d-flex align-items-center justify-content-start"
      >
       <Card  className="d-flex align-items-center justify-self-start"> <Button onClick={fetchData} variant="primary">Display Data</Button>
      </Card>
      </Container>
<Container className="d-flex align-items-center justify-content-center"
      >
   
  <Table striped bordered hover variant="dark">
    <thead>
      <tr>
        <th>ID</th>
       <th>Username</th>
       <th>E-Mail</th>
       <th>Account #</th>
     </tr>
 </thead> 
             <tbody>
              
        {users.map((user, index) => (
          <tr key={index}>
            <td>{user._id}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.account_Nums}</td>
          </tr>
        ))}
      </tbody>
</Table>
        </Container>
  </>
  );
  } else {
    return null;
  }
}