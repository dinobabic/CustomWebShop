import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, FormControl, FormGroup, FormLabel, Nav, Navbar, Row } from 'react-bootstrap';
import { fetchService } from '../service/fetchService';
import { useLocalStorage } from '../util/useLocalStorage';
import { AiOutlineArrowDown } from 'react-icons/ai';

const ViewProfile = () => {

    const [jwt, setJwt] = useLocalStorage("", "jwt");
    const [user, setUser] = useState(null);
    const [transactions, setTransactions] = useState(null);
    const [totalPrices, setTotalPrice] = useState(null);

    useEffect(() => {
        fetchService("/api/auth", "get", jwt, null) 
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then((userDb) => {
                setUser(userDb);
                console.log(userDb);
            })
    }, []);

    useEffect(() => {
        fetchService("/api/transactions", "get", jwt, null) 
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then((transactionsDb) => {
                setTransactions(transactionsDb);
                console.log(transactionsDb);
            })
    }, []);

    useEffect(() => {
        if (transactions !== null) {
            const newTotalPrices = [];
            for (const transaction of transactions) {
                let totalPrice = 0;
                for (const product of transaction.products) {
                    totalPrice += Number(product.price);
                }
                newTotalPrices.push(totalPrice);
            }
            setTotalPrice(newTotalPrices);
        }
    }, [transactions])

    function logout() {
        localStorage.removeItem("jwt");
        localStorage.removeItem("carts");
        window.location.href = "/";
    }

    function updateUser(property, value) {
        const newUser = {...user};
        newUser[property] = value;
        setUser(newUser);
    }

    function submit() {
        fetchService("/api/auth/update", "put", jwt, user)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then((userSaved) => {
                console.log(userSaved);
            })
    }

    function changePassword() {
        const btnChangePassword = document.querySelector("#change-password");
        const fieldChangePassword = document.querySelector("#change-password-field");
        
        btnChangePassword.classList.add("d-none");
        fieldChangePassword.classList.remove("d-none");
    }

    function expandTransaction(transactionId) {
        const transactionElement = document.querySelector(`#transaction-${transactionId}`);
        if (transactionElement.classList.contains("d-none")) {
            transactionElement.classList.remove("d-none");
        }
        else {
            transactionElement.classList.add("d-none");
        }
    }

    return (
        <div>
            {transactions && user && totalPrices ? (
            <div>
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand href="#home">Hi, {user.username}</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="/">Home</Nav.Link>
                                <Nav.Link onClick={() => logout()}>Logout</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Container className='mt-5 d-flex justify-content-center'>
                    <Col xs="8" md="12" xl="8">
                        <Card>
                            <Card.Header className='d-flex justify-content-center'>
                                <h1>Account Details</h1>
                            </Card.Header>
                            <Card.Body>
                                <FormGroup className='mb-3' controlId='firstName'>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl 
                                        type='text'
                                        placeholder='Enter First Name' 
                                        value={user.firstName}
                                        onChange={(event) => updateUser("firstName" ,event.target.value)}
                                        />
                                </FormGroup>
                                <FormGroup className='mb-3' controlId='lastName'>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl type='text' 
                                    placeholder='Enter Last Name' 
                                    value={user.lastName}
                                    onChange={(event) => updateUser("lastName" ,event.target.value)}
                                    />
                                </FormGroup>
                                <FormGroup className='mb-3' controlId='username'>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl type='text' 
                                    placeholder='Enter Username' 
                                    value={user.username}
                                    onChange={(event) => updateUser("username" ,event.target.value)}
                                    />
                                </FormGroup>
                                <Button id='change-password' variant='danger' onClick={() => changePassword()}>Change Password</Button>
                                <FormGroup id='change-password-field' className='mb-3 d-none' controlId='password'>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl type='password' 
                                    placeholder='Enter Password' 
                                    value={user.password}
                                    onChange={(event) => updateUser("password" ,event.target.value)}
                                    />
                                </FormGroup>
                                <FormGroup className='mb-3' controlId='email'>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl type='email' 
                                    placeholder='Enter Email' 
                                    value={user.email}
                                    onChange={(event) => updateUser("email" ,event.target.value)}
                                    />
                                </FormGroup>
                                <Row className="d-flex">
                                    <Col className='d-flex justify-content-start'>
                                        <Button size='lg' onClick={() => submit()}>Submit</Button>
                                    </Col>
                                    <Col className='d-flex justify-content-end'>
                                        <Button size='lg' variant='secondary' onClick={() => {
                                            window.location.href = "/dashboard"
                                        }}>Back</Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Container>
                <Container>
                    <Row className='mt-5'>
                        <Col className='d-flex justify-content-center'>
                            <h1>
                                Your Transactions
                            </h1>
                        </Col>
                    </Row>
                </Container>
                {transactions.map((transaction) => {
                    return (
                        <div key={transaction.id}>
                            <Container>
                                <Row style={{cursor: "pointer"}} onClick={() => expandTransaction(transaction.id)} className="shadow-sm p-3 mb-2 mt-4 bg-white rounded">
                                    <Col className='col-10'>
                                        <h3>
                                            Transaction: Issue Date: {transaction.issueDate}, Total Price: {totalPrices.shift()}€
                                        </h3>
                                    </Col>
                                    <Col className='d-flex justify-content-end'>
                                        <h3 style={{cursor: "pointer"}} ><AiOutlineArrowDown ></AiOutlineArrowDown></h3>
                                    </Col>
                                    <Container className='d-none' id={`transaction-${transaction.id}`}>
                                        <Row className='g-4' xs={2} md={4} xl={8}>
                                        {transaction.products.map((product) => {
                                            return (
                                                <Col key={product.id}>
                                                    <Card style={{ width: '12rem' }}>
                                                        <Card.Body>
                                                            <Card.Title className='text-center'>{product.name}</Card.Title>
                                                            <Card.Subtitle className="mb-2 text-muted">Identifier: {product.identifier}</Card.Subtitle>
                                                            <Card.Text>
                                                                Description: {product.description}
                                                                <br/>
                                                                <strong>Price: {product.price}€</strong>
                                                            </Card.Text>
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            )
                                        })}
                                        </Row>
                                    </Container>
                                </Row>
                            </Container>
                        </div>
                    )
                })}
            </div>
            )
            : (<></>)}
        </div>
    );
};

export default ViewProfile;