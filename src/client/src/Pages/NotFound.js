import React from "react";
import { Row, Col, Container } from "reactstrap";
import { NavLink } from 'react-router-dom';

const NotFound = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <h3>404 Not Found</h3>
                    <a to="/">Home</a>
                </Col>
            </Row>
        </Container>
    )
}

export default NotFound;