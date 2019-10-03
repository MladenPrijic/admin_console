import React, {Component} from 'react';

import {
    Row,
    Col

} from 'reactstrap';

class HomePage extends Component {

    render() {
        return (
            <div>
                <Row>
                    <Col xs="6" sm="4">Service</Col>
                    <Col xs="6" sm="4">Technology</Col>
                    <Col sm="4">Best Practices</Col>
                </Row>
            </div>
        );
    }
}

export default HomePage;