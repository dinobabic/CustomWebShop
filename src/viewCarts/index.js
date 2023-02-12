import React, { useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { fetchService } from '../service/fetchService';
import { useLocalStorage } from '../util/useLocalStorage';

const ViewCarts = () => {

    const [jwt, setJwt] = useLocalStorage("", "jwt");
    const [carts, setCarts] = useState(JSON.parse(localStorage.getItem("carts") || "[]"));

    function removeFromCart(productId) {
        const newCarts = carts.filter((product) => product.id !== productId);
        setCarts(newCarts);
        localStorage.setItem("carts", JSON.stringify(newCarts));
    }

    function deleteCarts() {
        const newCarts = [];
        setCarts(newCarts);
        localStorage.setItem("carts", JSON.stringify(newCarts));
        window.location.href="/dashboard";
    }

    function checkout() {
        if (carts.length !== 0) {
            const productIds = [];
            for (const product of carts) {
                productIds.push(product.id);
            }
            fetchService("/api/transactions", "post", jwt, productIds)
                .then((response) => {
                    if (response.status === 200) {
                        return response.json();
                    }
                })
                .then((transaction) => {
                    window.location.href =`/transactions/${transaction.id}`
                });
            localStorage.removeItem("carts");
        }
    }

    return (
        <Container className='mt-5'>
            <Row className='mb-3'>
                <Col className='d-flex justify-content-center'>
                    <h2>Your Carts</h2>
                </Col>
            </Row>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className='text-center'>Image</th>
                        <th className='text-center'>Name</th>
                        <th className='text-center'>Identifier</th>
                        <th className='text-center'>Description</th>
                        <th className='text-center'>Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {carts.map((product) => {
                        return (
                            <tr key={product.id}>
                                <td valign='middle' align='center'><img style={{width: "150px", height: "150px"}} src={'data:image/png;base64,' + product.imageData}  /></td>
                                <td valign='middle' align='center'>{product.name}</td>
                                <td valign='middle' align='center'>{product.identifier}</td>
                                <td valign='middle' align='center'>{product.description}</td>
                                <td valign='middle' align='center'>{product.price}€</td>
                                <td valign='middle' align='center'>
                                    <div>
                                        <Button onClick={() => removeFromCart(product.id)}>Remove From Cart</Button>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <Row>
                <Col>
                    <Button variant="success" onClick={() => checkout()}>Checkout</Button>
                </Col>
                <Col className="d-flex justify-content-end gap-4">
                    <Button variant='danger' onClick={() => deleteCarts()}>Delete Carts</Button>
                    <Button variant='secondary' onClick={() => window.location.href="/dashboard"}>Back</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default ViewCarts;