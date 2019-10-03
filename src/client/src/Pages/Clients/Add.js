import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import validator from "validator";
import {
    Input, FormGroup, Label, Button, Card, CardHeader, CardBody,
    FormFeedback, Container, Col, Row, Table, Collapse, ButtonGroup
} from 'reactstrap';
import FormValidator from "../../common/FormValidator";
import Auth from "../../services/AuthService";
import {FaEdit, FaPlus, FaTrash} from "react-icons/fa";
import Loading from "../../components/Loading/Loading";



const auth = new Auth();

class Add extends Component {
    constructor(props) {
        super(props);
        this.fetch = auth.fetch();

        this.validator = new FormValidator([
            {
                field: "name",
                method: validator.isEmpty,
                validWhen: false,
                message: "Name is required."
            }
        ]);

        this.state = {
            loading: true,
            collapse: false,
            validation: this.validator.valid(),
            serverError: null,
            selectedProjectIndex: null,
            client: {
                address: "",
                city: "",
                conatactPerson: "",
                conatactPersonPhone: "",
                country: "",
                email: "",
                name: "",
                phone: "",
                postalCode: "",
                website: "",
                projects: []
            }
        }
    }

    componentDidMount() {
        this.setState({loading: false})
    }

    handleOnSave = async (e) => {
        e.preventDefault();
        this.setState({ serverError: null });
        console.log(this.props);
        try {
            const validation = this.validator.validate(this.state.client);
            if (validation.isValid) {
                await this.fetch.post('/api/client/add', this.state.client);
                this.props.history.push('/client');
            } else {
                this.setState({ validation });
            }
        } catch (error) {
            this.setState({ serverError: error.data.message });
        }

    }

    handleOnChange = (e) => {
        let client = { ...this.state.client };
        client[e.target.name] = e.target.value;
        this.setState({ client: client });
    }

    handleOnAddProject = (e) => {
        e.preventDefault();
        let data = { ...this.state.client };
        if (this.state.selectedProjectIndex === null) {
            data.projects.push({ name: this.projectName.value, notes: this.projectNote.value });
        } else {
            data.projects[this.state.selectedProjectIndex] = { ...data.projects[this.state.selectedProjectIndex], name: this.projectName.value, notes: this.projectNote.value };
        }
        this.setState({ client: data, collapse: false, selectedProjectIndex: null }, () => {
            this.projectNote.value = '';
            this.projectName.value = '';
        });
    }

    handleOnDelProject = (index) => {
        let data = { ...this.state.client };
        data.projects.splice(index, 1);
        this.setState({ client: data });
    }

    handleOnEditProject = (index) => {
        let data = { ...this.state.client };
        this.setState({ collapse: true, selectedProjectIndex: index });
        this.projectName.value = data.projects[index].name;
        this.projectNote.value = data.projects[index].notes;
    }

    render() {
        if (this.state.loading) return <Loading />;
        return (
            <Row>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                    <Card>
                        <CardHeader>Add client</CardHeader>
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
                                                    onChange={this.handleOnChange} />
                                                <FormFeedback valid={!this.state.validation.name.isInvalid}>
                                                    {this.state.validation.name.message}
                                                </FormFeedback>
                                            </FormGroup>
                                        </Col>
                                        <Col md="4">
                                            <FormGroup>
                                                <Label>Contact person</Label>
                                                <Input type="text" name="conatactPerson" onChange={this.handleOnChange} />
                                            </FormGroup>
                                        </Col>
                                        <Col md="4">
                                            <FormGroup>
                                                <Label>Contact person phone</Label>
                                                <Input type="text" name="conatactPersonPhone" onChange={this.handleOnChange} />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="4">
                                            <FormGroup>
                                                <Label>Address</Label>
                                                <Input type="text" name="address" onChange={this.handleOnChange} />
                                            </FormGroup>
                                        </Col>
                                        <Col md="4">
                                            <FormGroup>
                                                <Label>Postal code</Label>
                                                <Input type="text" name="postalCode" onChange={this.handleOnChange} />
                                            </FormGroup>
                                        </Col>
                                        <Col md="4">
                                            <FormGroup>
                                                <Label>City</Label>
                                                <Input type="text" name="city" onChange={this.handleOnChange} />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="4">
                                            <FormGroup>
                                                <Label>Country</Label>
                                                <Input type="text" name="country" onChange={this.handleOnChange} />
                                            </FormGroup>
                                        </Col>
                                        <Col md="4">
                                            <FormGroup>
                                                <Label>Email</Label>
                                                <Input type="text" name="email" onChange={this.handleOnChange} />
                                            </FormGroup>
                                        </Col>
                                        <Col md="4">
                                            <FormGroup>
                                                <Label>Website</Label>
                                                <Input type="text" name="website" onChange={this.handleOnChange} />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Button color="primary" onClick={() => this.setState({ collapse: !this.state.collapse })}><FaPlus /> Add project</Button>
                                            </FormGroup>
                                            <Collapse isOpen={this.state.collapse} className="m-3">
                                                <FormGroup>
                                                    <Label>Name</Label>
                                                    <Input innerRef={el => this.projectName = el} type="text" name="project.name" />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label>Note</Label>
                                                    <Input innerRef={el => this.projectNote = el} type="text" name="project.note" />
                                                </FormGroup>
                                                <Row className="float-right">
                                                    <Col md="12">
                                                        <FormGroup>
                                                            <Button color="primary" onClick={this.handleOnAddProject}>Save project</Button>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                            </Collapse>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <FormGroup>
                                                <Table>
                                                    <thead>
                                                    <tr>
                                                        <th>Project Name</th>
                                                        <th className="text-center">Actions</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {this.state.client.projects.length > 0 && this.state.client.projects.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{item.name}</td>
                                                                <td className="text-center">
                                                                    <ButtonGroup>
                                                                        <Button
                                                                            color="link"
                                                                            size="sm"
                                                                            onClick={() => this.handleOnDelProject(index)}>
                                                                            <FaTrash />
                                                                        </Button>
                                                                        <Button
                                                                            color="link"
                                                                            size="sm"
                                                                            onClick={() => this.handleOnEditProject(index)}>
                                                                            <FaEdit />
                                                                        </Button>
                                                                    </ButtonGroup>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                    </tbody>
                                                </Table>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row className="float-right">
                                        <Col md="12">
                                            <Button outline onClick={() => this.props.history.push("/client")}>Cancel</Button>{' '}
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