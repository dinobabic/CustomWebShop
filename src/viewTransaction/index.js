import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { fetchService } from '../service/fetchService';
import { useLocalStorage } from '../util/useLocalStorage';

const ViewTransaction = () => {

    const [jwt, setJwt] = useLocalStorage("", "jwt");
    const [transaction, setTransaction] = useState(null);
    const transactionId = window.location.href.split("/transactions/")[1];

    useEffect(() => {
        fetchService(`/api/transactions/${transactionId}`, "get", jwt, null)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then((transactionDb) => {
                if (!transactionDb || !transactionDb.id) {
                    window.location.href = "/dashboard";
                }
                setTransaction(transactionDb);
            });
    }, []);
    

    return (
        <Container className='mt-5'>
            {transaction ? (
            <Container className='mt-5'>
                <Row className='mb-3'>
                    <Col className='d-flex justify-content-center'>
                        <h2>Your Transaction Was Successful</h2>
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
                        </tr>
                    </thead>
                    <tbody>
                        {transaction.products.map((product) => {
                            return (
                                <tr key={product.id}>
                                    <td valign='middle' align='center'><img style={{width: "150px", height: "150px"}} src={'data:image/png;base64,' + product.imageData}  /></td>
                                    <td valign='middle' align='center'>{product.name}</td>
                                    <td valign='middle' align='center'>{product.identifier}</td>
                                    <td valign='middle' align='center'>{product.description}</td>
                                    <td valign='middle' align='center'>{product.price}€</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                <Row>
                    <Col className="d-flex justify-content-end">
                        <Button size='lg' onClick={() => window.location.href = "/dashboard"}>Back</Button>
                    </Col>
                </Row>
            </Container>
            )
             : (<>Loading...</>)}
        </Container>
    );
};

export default ViewTransaction;