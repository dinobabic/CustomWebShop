import React, { useState } from 'react';
import { Button, Card, Col, Container, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap';
import { fetchService } from '../service/fetchService';

const CredentialsReset = () => {

    const [email, setEmail] = useState("");

    function submitEmail() {
        console.log("Clicked");
        const reqBody = {
            "email": email
        };
        fetchService("/api/auth/forgotCredentials", "post", null, reqBody)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then((isValid) => {
                if (isValid) {
                    const messageSuccess = document.querySelector(".valid-user");
                    const messageFailure = document.querySelector(".invalid-user");

                    messageSuccess.classList.remove("d-none");
                    messageFailure.classList.add("d-none");
                }
                else {
                    const messageSuccess = document.querySelector(".valid-user");
                    const messageFailure = document.querySelector(".invalid-user");

                    messageSuccess.classList.add("d-none");
                    messageFailure.classList.remove("d-none");
                }
            });
    }

    return (
        <Container className='mt-5 d-flex justify-content-center'>
            <Col xs="8" md="12" xl="8">
                <Card>
                    <Card.Header className='d-flex justify-content-center'>
                        <h1>Please Enter Your Email</h1>
                    </Card.Header>
                    <Card.Body>
                        <FormGroup className='mb-3' controlId='email'>
                            <FormLabel>Email</FormLabel>
                            <FormControl type='email' 
                            placeholder='Enter Email' 
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            />
                        </FormGroup>
                        <Row>
                            <Col className='d-flex justify-content-end'>
                                <Button onClick={() => submitEmail()}>Submit</Button>
                            </Col>
                        </Row>
                        <Row>
                            <h3 className='d-none valid-user'>Your credentials have been sent to your email address.</h3>
                            <h3 className='d-none invalid-user'>User with this email address does not exist.</h3>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Container>
    );
};

export default CredentialsReset;