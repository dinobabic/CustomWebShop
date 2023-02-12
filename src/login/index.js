import React, { useState } from 'react';
import { Button, Card, Col, Container, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap';
import { Form } from 'react-router-dom';
import { fetchService } from '../service/fetchService';
import { useLocalStorage } from '../util/useLocalStorage';

const Login = () => {

    const [jwt, setJwt] = useLocalStorage("", "jwt");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function submit() {
        if (!jwt) {
            const reqBody = {
                "username": username,
                "password": password
            };

            fetchService("api/auth/login", "post", null, reqBody)
                .then(response => {
                    if (response.status === 200) {
                        return Promise.all([response.json(), response.headers]);
                    }
                    else {
                        return Promise.reject("Invalid Login Attempt!")
                    }
                })
                .then(([body, headers]) => {
                    setJwt(headers.get("authorization"));
                    window.location.href = "/dashboard";
                })
                .catch((message) => alert(message));
         }
    }

    return (
        <Container className='mt-5 d-flex justify-content-center'>
            <Col xs="8" md="12" xl="8">
                <Card>
                    <Card.Header className='d-flex justify-content-center'>
                        <h1>Please Login</h1>
                    </Card.Header>
                    <Card.Body>
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
                        <Row className='mb-2'>
                            <Col className='d-flex justify-content-end'>
                                <a className='link-primary' href="/credentialsReset">Forgot Your Password or Username?</a>
                            </Col>
                        </Row>
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

export default Login;