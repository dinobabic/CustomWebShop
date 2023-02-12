import React, { useEffect } from 'react';
import { Carousel, Container, Nav, Navbar } from 'react-bootstrap';
import image1 from "../images/image1.jpg"
import image2 from "../images/image2.jpg"
import image3 from "../images/image3.jpg"
import image4 from "../images/image4.jpg"
import background from "../images/background.webp"
import { useLocalStorage } from '../util/useLocalStorage';


const Homepage = () => {

    const [jwt, setJwt] = useLocalStorage("", "jwt");

    useEffect(() => {
        const element = document.querySelector("#logout-login");
        if (jwt) {
            element.innerHTML = "Logout";
        }
        else {
            element.innerHTML = "Login";
        }
    }, [jwt]);

    function logout() {
        localStorage.removeItem("jwt");
        localStorage.removeItem("carts");
        window.location.href = "/";
    }

    function loginOrLogout() {
        if (jwt) {
            logout();
        }
        else {
            window.location.href = "/login"
        }
    }

    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">Webshop</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                            <Nav.Link id="logout-login" onClick={() => loginOrLogout()}>Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container style={{backgroundImage: {background}}}>
                <Carousel>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={image1}
                        alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={image2}
                        alt="Second slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={image3}
                        alt="Third slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src={image4}
                        alt="Third slide"
                        />
                    </Carousel.Item>
                </Carousel>
            </Container>
        </div>
    );
};

export default Homepage;