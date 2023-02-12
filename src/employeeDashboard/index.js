import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Navbar, NavDropdown, Row, Nav, Card } from 'react-bootstrap';
import { fetchService } from '../service/fetchService';
import { useLocalStorage } from '../util/useLocalStorage';

const EmployeeDashboard = () => {

    const [jwt, setJwt] = useLocalStorage("", "jwt");
    const [products, setProducts] = useState(null);
    const [displayProducts, setDisplayProducts] = useState(null);
    const displayProductsNum = 8;
    const [currentPage, setCurrentPage] = useState(0);

    function logout() {
        localStorage.removeItem("jwt");
        window.location.href = "/";
    }

    function createProduct() {
        fetchService("/api/products", "post", jwt, null)
            .then((response) => {
                if(response.status === 200) {
                    return response.json();
                }
            })
            .then((product) => {
                window.location.href = `/products/${product.id}`
            }) 
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

    function editProduct(productId) {
        window.location.href = `/products/${productId}`;
    }

    useEffect(() => {
        if (products) {
            setDisplayProducts(products.slice(0, displayProductsNum));
        }
    }, [products])

    function changePage(buttonId) {
        if (buttonId === "button-prev" && currentPage !== 0) {
            const newPage = currentPage - 1;
            setCurrentPage(currentPage - 1);
            setDisplayProducts(products.slice(displayProductsNum * newPage, displayProductsNum * newPage + displayProductsNum));
        }
        else if (buttonId === "button-next" && currentPage < products.length / displayProductsNum - 1) {
            const newPage = currentPage + 1;
            setCurrentPage(currentPage + 1);
            setDisplayProducts(products.slice(displayProductsNum * newPage, displayProductsNum * newPage + displayProductsNum));
        }
    }

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Employee Dashboard</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link onClick={() => createProduct()}>Add Product</Nav.Link>
                            <Nav.Link onClick={() => logout()}>Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container>
            </Container>
            <Row className='g-4 mt-5' xs={2} md={4} xl={8}>
                {displayProducts ? ( displayProducts.map((product) => 
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
                                    <Button onClick={() => {editProduct(product.id)}}>
                                        Edit
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
            <Container className='mt-4'>
                <Col className='d-flex justify-content-center gap-4'>
                    <Button variant='secondary' id="button-prev" onClick={(event) => changePage(event.target.id)}>Previous</Button>
                    <Button variant='secondary' id="button-next" onClick={(event) => changePage(event.target.id)}>Next</Button>
                </Col>
            </Container>
        </div>
    );
};

export default EmployeeDashboard;