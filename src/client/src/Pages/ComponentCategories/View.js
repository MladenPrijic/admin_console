import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import {
    Card, CardBody,
    CardTitle, Row, Col, Container
} from 'reactstrap';
import Auth from "../../services/AuthService";


const auth = new Auth();

class View extends Component {
    constructor(props) {
        super(props);
        this.fetch = auth.fetch();
        this.componentCategorieId = props.match.params.componentCategorieId;

        this.state = {
            componentCategorie: {
                name: "",
                note: ""
            }
        }
    }

    async componentDidMount() {
        const { data } = await this.fetch(`/api/component-categorie/${this.componentCategorieId}`);
        this.setState({ componentCategorie: { ...data.data } });
    }

    render() {
        return (
            <Row>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                    <Card>
                        <CardBody>
                            <CardTitle>Component category <strong>{this.state.componentCategorie.name}</strong></CardTitle>
                        </CardBody>
                        <CardBody>
                            <Container>
                                <Row>
                                    <Col>Name</Col>
                                    <Col>{this.state.componentCategorie.name}</Col>
                                </Row>
                                <Row>
                                    <Col>Note</Col>
                                    <Col>{this.state.componentCategorie.note}</Col>
                                </Row>

                            </Container>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default withRouter(View);