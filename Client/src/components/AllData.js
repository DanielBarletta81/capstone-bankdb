import React, {useState} from 'react';
import { Button, Card } from 'react-bootstrap';

import {db} from '../firebase';
import { collection, getDocs } from "firebase/firestore";


export function AllData() {
  const [data, setData] = useState([]);

 
  const  getData= async () => {
    setData([]);
    const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    console.table(data);
    setData(prevData => [...prevData, doc.data()]);
  });
}
  return (
    <Card style={{ width: '18rem' }}>

      <Card.Body>
        <Card.Title>All Data </Card.Title>
        <Card.Text className = "user-data" key={data.id}>
          User Data goes here...
         `${JSON.stringify(data)}`
        </Card.Text>
        <Button onClick={getData} value={data} variant="primary">Display Data</Button>
      </Card.Body>
    </Card>
  );
};

