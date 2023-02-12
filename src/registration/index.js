import React, { useState } from 'react';
import { Button, Card, Col, Container, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap';
import { fetchService } from '../service/fetchService';
import { useLocalStorage } from '../util/useLocalStorage';

const Registration = () => {

    const [jwt, setJwt] = useLocalStorage("", "jwt");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    function submit() {
        if (!jwt) {
            const reqBody = {
                "firstName": firstName,
                "lastName": lastName,
                "username": username,
                "password": password,
                "email": email
            };

            fetchService("api/auth/register", "post", null, reqBody);
        }
    }

    return (
        <Container className='mt-5 d-flex justify-content-center'>
            <Col xs="8" md="12" xl="8">
                <Card>
                    <Card.Header className='d-flex justify-content-center'>
                        <h1>Please Register</h1>
                    </Card.Header>
                    <Card.Body>
                        <FormGroup className='mb-3' controlId='firstName'>
                            <FormLabel>First Name</FormLabel>
                            <FormControl 
                                type='text'
                                placeholder='Enter First Name' 
                                value={firstName || ""}
                                onChange={(event) => setFirstName(event.target.value)}
                                />
                        </FormGroup>
                        <FormGroup className='mb-3' controlId='lastName'>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl type='text' 
                            placeholder='Enter Last Name' 
                            value={lastName || ""}
                            onChange={(event) => setLastName(event.target.value)}
                            />
                        </FormGroup>
                        <FormGroup className='mb-3' controlId='username'>
                            <FormLabel>Username</FormLabel>
                            <FormControl type='text' 
                            placeholder='Enter Username' 
                            value={username || ""}
                            onChange={(event) => setUsername(event.target.value)}
                            />
                        </FormGroup>
                        <FormGroup className='mb-3' controlId='password'>
                            <FormLabel>Password</FormLabel>
                            <FormControl type='password' 
                            placeholder='Enter Password' 
                            value={password || ""}
                            onChange={(event) => setPassword(event.target.value)}
                            />
                        </FormGroup>
                        <FormGroup className='mb-3' controlId='email'>
                            <FormLabel>Email</FormLabel>
                            <FormControl type='email' 
                            placeholder='Enter Email' 
                            value={email || ""}
                            onChange={(event) => setEmail(event.target.value)}
                            />
                        </FormGroup>
                        <Row className="d-flex">
                            <Col className='d-flex justify-content-start'>
                                <Button size='lg' onClick={() => submit()}>Submit</Button>
                            </Col>
                            <Col className='d-flex justify-content-end'>
                                <Button size='lg' variant='secondary' onClick={() => {
                                    window.location.href = "/"
                                }}>Back</Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Container>
    );
};

export default Registration;