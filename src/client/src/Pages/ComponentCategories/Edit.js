import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import validator from "validator";
import {
    Input, FormGroup, Label, Button, Card, CardBody,
    FormFeedback, Container, Row, Col
} from 'reactstrap';
import FormValidator from "../../common/FormValidator";
import Auth from "../../services/AuthService";


const auth = new Auth();

class Add extends Component {
    constructor(props) {
        super(props);
        this.fetch = auth.fetch();
        this.componentCategorieId = props.match.params.componentCategorieId;

        this.validator = new FormValidator([
            {
                field: "name",
                method: validator.isEmpty,
                validWhen: false,
                message: "Name is required."
            }
        ]);

        this.state = {
            validation: this.validator.valid(),
            serverError: null,
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

    handleOnSave = async (e) => {
        e.preventDefault();
        this.setState({ serverError: null });
        console.log(this.props);
        try {
            const validation = this.validator.validate(this.state.componentCategorie);
            if (validation.isValid) {
                await this.fetch.post('/api/component-categorie/edit', this.state.componentCategorie);
                this.props.history.push('/component-categorie');
            } else {
                this.setState({ validation });
            }
        } catch (error) {
            this.setState({ serverError: error.data.message });
        }

    }

    handleOnChange = (e) => {
        let componentCategorie = { ...this.state.componentCategorie };
        componentCategorie[e.target.name] = e.target.value;
        this.setState({ componentCategorie: componentCategorie });
    }

    render() {
        return (
            <Row>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                    <Card>
                        <CardBody>
                            <Container>
                                <form onSubmit={this.handleOnSave}>
                                    <Row>
                                        <Col md="4">
                                            <FormGroup>
                                                <Label>Name</Label>
                                                <Input
                                                    type="text"
                                                    name="name"
                                                    invalid={this.state.validation.name.isInvalid}
                                                    value={this.state.componentCategorie.name}
                                                    onChange={this.handleOnChange} />
                                                <FormFeedback valid={!this.state.validation.name.isInvalid}>
                                                    {this.state.validation.name.message}
                                                </FormFeedback>
                                            </FormGroup>
                                        </Col>

                                        <Col md="4">
                                            <FormGroup>
                                                <Label>Notes</Label>
                                                <Input
                                                    type="text"
                                                    name="note"
                                                    value={this.state.componentCategorie.note}
                                                    onChange={this.handleOnChange} />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row className="float-right">
                                        <Col md="12">
                                            <Button onClick={() => this.props.history.push("/component-categorie")}>Cancel</Button>{' '}
                                            <Button color="primary" type="submit">Save</Button>
                                        </Col>
                                    </Row>
                                </form>
                            </Container>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default withRouter(Add);