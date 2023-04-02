import React from 'react';
import {Button, Card, Container} from 'react-bootstrap';

import logo from './homeImg.jpg';
import './Home.css';


export function Home() {
    return (<>
        <Container  className="d-flex align-items-center justify-content-center">
        <Card className='home-card'>
            <Card.Img variant="top" src={logo} className="logo" alt="logo" />
            <Card.Body>
                <Card.Title>Welcome to Good Bank, Inc.</Card.Title>
                <Card.Text>
                    Welcome to Good Bank( formerly Bad Bank)!
                    How can we serve you today? 
                </Card.Text>
                <Button variant="primary" href='/Login'>Get Started</Button>
            </Card.Body>
            </Card>
            </Container>
    </>
    );
}

