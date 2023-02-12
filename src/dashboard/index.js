import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Navbar, NavDropdown, Row, Nav, Card } from 'react-bootstrap';
import { fetchService } from '../service/fetchService';
import { useLocalStorage } from '../util/useLocalStorage';

const Dashboard = () => {

    const [jwt, setJwt] = useLocalStorage("", "jwt");
    const [products, setProducts] = useState(null);
    const [carts, setCarts] = useState(JSON.parse(localStorage.getItem("carts") || "[]"));

    
    function logout() {
        localStorage.removeItem("jwt");
        localStorage.removeItem("carts");
        window.location.href = "/";
    }
    
    useEffect(() => {
        fetchService("/api/products", "get", jwt, null)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then((products) => {
                setProducts(products);
            }
    )}, []);


    function addToCart(product) {
        carts.push(product);
        localStorage.setItem("carts", JSON.stringify(carts));
        let newProducts = [...products];
        newProducts = newProducts.filter((productNew) => productNew.id !== product.id);
        console.log(newProducts);
        setProducts(newProducts);
    }

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Webshop</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/viewProfile">My Profile</Nav.Link>
                            <Nav.Link onClick={() => window.location.href = "/viewCarts"}>View Cart</Nav.Link>
                            <Nav.Link onClick={() => logout()}>Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container>
            </Container>
            <Row className='g-4 mt-5' xs={2} md={4} xl={8}>
                {products ? ( products.map((product) => 
                    <Col key={product.id} className="d-flex justify-content-center">
                        <Card style={{ width: '12rem', height: "20rem" }}>
                            <Card.Img style={{width: "100%", height: "150px"}} variant='top' src={'data:image/png;base64,' + product.imageData}  />
                            <Card.Body>   
                                <Card.Title className='d-flex justify-content-center'>{product.name}</Card.Title>
                                <Card.Text style={{marginTop: "15px"}}>
                                        Identifier: {product.identifier}
                                        <br/>
                                        <strong>Price: {product.price}€</strong>
                                </Card.Text>
                                <Row className='ms-3 me-3'>
                                    <Button onClick={() => addToCart(product)}>
                                        Add To Cart
                                    </Button>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                )
                )
                
                :
                (
                    <>Loading</>
                )
                }
            </Row>            
        </div>
    );
};

export default Dashboard;