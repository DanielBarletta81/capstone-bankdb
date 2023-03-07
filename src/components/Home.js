import React from 'react';
import {Button, Card} from 'react-bootstrap';

import logo from './bank.png';
import './Home.css';


export function Home() {
    return (<>
        <Card className='home-card'>
            <Card.Img variant="top" src={logo} className="App-logo" alt="logo" />
            <Card.Body>
                <Card.Title>Welcome to Good Bank, Inc.</Card.Title>
                <Card.Text>
                    Welcome to Good Bank( formerly Bad Bank)!
                    How can we serve you today? Click below to login or register...
                </Card.Text>
                <Button variant="primary" href='/Login'>Get Started</Button>
            </Card.Body>
        </Card>
    </>
    );
}

