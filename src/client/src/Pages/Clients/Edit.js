import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import validator from 'validator';
import {
  Input,
  FormGroup,
  Label,
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  FormFeedback,
  Container,
  Row,
  Col,
  Table,
  Collapse,
} from 'reactstrap';
import FormValidator from '../../common/FormValidator';
import Auth from '../../services/AuthService';
import {FaEdit, FaPlus, FaTrash} from 'react-icons/fa';
import Loading from '../../components/Loading/Loading';

const auth = new Auth();

class Edit extends Component {
  constructor(props) {
    super(props);
    this.fetch = auth.fetch();
    this.clientId = props.match.params.clientId;

    this.validator = new FormValidator([
      {
        field: 'name',
        method: validator.isEmpty,
        validWhen: false,
        message: 'Name is required.',
      },
    ]);

    this.state = {
      loading: true,
      validation: this.validator.valid(),
      serverError: null,
      collapse: false,
      projectFormStatus: 'NONE', //ADD , EDIT, NONE
      selectedProjectIndex: null,
      client: {
        id: '',
        address: '',
        city: '',
        conatactPerson: '',
        conatactPersonPhone: '',
        country: '',
        email: '',
        name: '',
        phone: '',
        postalCode: '',
        website: '',
        projects: [],
      },
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const { data } = await this.fetch(`/api/client/${this.clientId}`);
    this.setState({ client: { ...data.client }, loading: false });
  }

  handleOnSave = async e => {
    e.preventDefault();
    this.setState({ serverError: null });
    console.log(this.props);
    try {
      const validation = this.validator.validate(this.state.client);
      if (validation.isValid) {
        await this.fetch.post('/api/client/edit', this.state.client);
        this.props.history.push('/client');
      } else {
        this.setState({ validation });
      }
    } catch (error) {
      this.setState({ serverError: error.data.message });
    }
  };

  handleOnChange = e => {
    let client = { ...this.state.client };
    client[e.target.name] = e.target.value;
    this.setState({ client: client });
  };

  handleOnAddProject = e => {
    e.preventDefault();
    let data = { ...this.state.client };
    if (this.state.projectFormStatus === 'ADD') {
      data.projects.push({
        name: this.projectName.value,
        notes: this.projectNote.value,
        state: 'ADD',
      });
    } else {
      data.projects[this.state.selectedProjectIndex] = {
        ...data.projects[this.state.selectedProjectIndex],
        name: this.projectName.value,
        notes: this.projectNote.value,
        state: 'EDIT',
      };
    }
    this.setState(
      { client: data, collapse: this.state.projectFormStatus === 'ADD' },
      () => {
        this.projectNote.value = '';
        this.projectName.value = '';
        this.projectName.focus();
      }
    );
  };

  handleOnDelProject = index => {
    let data = { ...this.state.client };
    if (data.projects[index].state === 'ADD') {
      data.projects.splice(index, 1);
    } else {
      data.projects[index].state = 'DEL';
    }
    this.setState({ client: data });
  };

  handleOnEditProject = index => {
    let data = { ...this.state.client };
    this.setState({
      collapse: true,
      projectFormStatus: 'EDIT',
      selectedProjectIndex: index,
    });
    this.projectName.value = data.projects[index].name;
    this.projectNote.value = data.projects[index].notes;
  };

  render() {
    const { projects } = this.state.client;
    if (this.state.loading) return <Loading />;
    return (
      <Row>
        <Col xs="12" sm="12" md="12" lg="8" className="col-centered">
          <Card>
            <CardHeader>Edit client</CardHeader>
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
                          value={this.state.client.name}
                          onChange={this.handleOnChange}
                        />
                        <FormFeedback
                          valid={!this.state.validation.name.isInvalid}>
                          {this.state.validation.name.message}
                        </FormFeedback>
                      </FormGroup>
                    </Col>

                    <Col md="4">
                      <FormGroup>
                        <Label>Contact person</Label>
                        <Input
                          type="text"
                          value={this.state.client.conatactPerson}
                          name="conatactPerson"
                          onChange={this.handleOnChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>Contact person phone</Label>
                        <Input
                          type="text"
                          value={this.state.client.conatactPersonPhone}
                          name="conatactPersonPhone"
                          onChange={this.handleOnChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <FormGroup>
                        <Label>Address</Label>
                        <Input
                          type="text"
                          value={
                            this.state.client.address
                              ? this.state.client.address
                              : ''
                          }
                          name="address"
                          onChange={this.handleOnChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>Postal code</Label>
                        <Input
                          type="text"
                          value={
                            this.state.client.postalCode
                              ? this.state.client.address
                              : ''
                          }
                          name="postalCode"
                          onChange={this.handleOnChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>City</Label>
                        <Input
                          type="text"
                          value={
                            this.state.client.city ? this.state.client.city : ''
                          }
                          name="city"
                          onChange={this.handleOnChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <FormGroup>
                        <Label>Country</Label>
                        <Input
                          type="text"
                          value={
                            this.state.client.country
                              ? this.state.client.country
                              : ''
                          }
                          name="country"
                          onChange={this.handleOnChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>Email</Label>
                        <Input
                          type="text"
                          value={this.state.client.email}
                          name="email"
                          onChange={this.handleOnChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>Website</Label>
                        <Input
                          type="text"
                          value={
                            this.state.client.website
                              ? this.state.client.website
                              : ''
                          }
                          name="website"
                          onChange={this.handleOnChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Button
                          color="primary"
                          onClick={() =>
                            this.setState({
                              collapse: !this.state.collapse,
                              projectFormStatus:
                                this.state.collapse !== true ? 'ADD' : 'NONE',
                            })
                          }>
                          <FaPlus /> Add project
                        </Button>
                      </FormGroup>
                      <Collapse isOpen={this.state.collapse} className="m-3">
                        <FormGroup>
                          <Label>Name</Label>
                          <Input
                            innerRef={el => (this.projectName = el)}
                            type="text"
                            name="project.name"
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label>Note</Label>
                          <Input
                            innerRef={el => (this.projectNote = el)}
                            type="text"
                            name="project.note"
                          />
                        </FormGroup>
                        <Row className="float-right">
                          <Col md="12">
                            <FormGroup>
                              <Button
                                color="primary"
                                onClick={this.handleOnAddProject}>
                                Save project
                              </Button>
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
                            {projects.length > 0 &&
                              projects.map((item, index) => {
                                if (item.state === 'DEL') return null;
                                return (
                                  <tr key={index}>
                                    <td> {item.name}</td>
                                    <td className="text-center">
                                        <ButtonGroup>
                                          <Button
                                            onClick={() =>
                                              this.handleOnDelProject(index)
                                            }
                                            color="link"
                                            size="sm">
                                            <FaTrash />
                                          </Button>{' '}
                                          <Button
                                            onClick={() =>
                                              this.handleOnEditProject(index)
                                            }
                                            color="link"
                                            size="sm">
                                            <FaEdit />
                                          </Button>
                                        </ButtonGroup>
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </Table>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className="float-right">
                    <Col md="12">
                      <Button
                        outline
                        onClick={() => this.props.history.push('/client')}>
                        Cancel
                      </Button>{' '}
                      <Button color="primary" type="submit">
                        Save
                      </Button>
                    </Col>
                  </Row>
                </form>
              </Container>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default withRouter(Edit);
