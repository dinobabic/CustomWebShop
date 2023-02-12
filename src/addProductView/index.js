import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap';
import { fetchService } from '../service/fetchService';
import { useLocalStorage } from '../util/useLocalStorage';

const AddProduct = () => {

    const productId = window.location.href.split("products/")[1];
    const [product, setProduct] = useState({
        id: productId,
        name: "",
        price: "",
        description: "",
        identifier: ""
    });
    const [image, setImage] = useState(null);
    const [jwt, setJwt] = useLocalStorage("", "jwt");
    const formData = new FormData();

    function updateProduct(subject, value) {
        let newProduct = {...product};
        if (subject === "price") {
            newProduct[subject] = parseInt(value);
        }
        else {
            newProduct[subject] = value;
        }
        setProduct(newProduct);
    }

    function save() {

        if (document.querySelector("#image").value) {
            const json = JSON.stringify(product);
            const blob = new Blob([json], {
                type: "application/json"
            });
            formData.append("properties", blob);

            if (image) {
                formData.append("file", image);
            }
            fetch(`/api/products/${productId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                },
                method: "put",
                body: formData
            })
            window.location.href = "/dashboard";
        }
    }

    function removeProduct() {
        fetchService(`/api/products/${productId}`, "delete", jwt, null)
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            }
        })
        .then((deleted) => {
            if  (deleted) {
                window.location.href = "/dashboard"
            }
        })
    }

    useEffect(() => {
        fetchService(`/api/products/${productId}`, "get", jwt, null)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
            })

            .then((storedProduct) => {
                if (!storedProduct.name) storedProduct.name = "";
                if (!storedProduct.price) storedProduct.price = "";
                if (!storedProduct.identifier) storedProduct.identifier = "";
                if (!storedProduct.description) storedProduct.description = "";
                setProduct(storedProduct);
            })
    }, []);

    return (
        <Container className="mt-5">
            <Card>
                <Card.Header className='d-flex justify-content-center'>
                    <h1>Create Product</h1>
                </Card.Header>
                <Card.Body>
                    <FormGroup className='mb-3' controlId='Name'>
                        <FormLabel>Name</FormLabel>
                        <FormControl type='text' 
                        placeholder='Enter product name'
                        value={product.name}
                        onChange={(event) => updateProduct("name", event.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className='mb-3' controlId='description'>
                        <FormLabel>Description</FormLabel>
                        <FormControl type='text' 
                        placeholder='Enter product description'
                        value={product.description}
                        onChange={(event) => updateProduct("description", event.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className='mb-3' controlId='identifier'>
                        <FormLabel>Identifier</FormLabel>
                        <FormControl type='text' 
                        placeholder='Enter product identifier'
                        value={product.identifier}
                        onChange={(event) => updateProduct("identifier", event.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className='mb-3' controlId='price'>
                        <FormLabel>Price</FormLabel>
                        <FormControl type='text' 
                        placeholder='Enter product price'
                        value={product.price}
                        onChange={(event) => updateProduct("price", event.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className='mb-3' controlId='image'>
                        <FormLabel>Image</FormLabel>
                        <FormControl type='file'
                        accept="image/*"
                        onChange={(event) => {
                            setImage(event.target.files[0])
                        }}
                        />
                    </FormGroup>
                    <Row>
                        <Col>
                            <Button size='lg' onClick={() => save()}>Add Product</Button>
                        </Col>
                        <Col className='d-flex justify-content-end'>
                            <Button variant='secondary' size='lg' onClick={() => {
                                removeProduct();
                            }}>Delete</Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default AddProduct;