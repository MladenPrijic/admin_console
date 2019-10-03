import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import validator from 'validator';
import {
  Input,
  FormGroup,
  Label,
  Button,
  Card,
  CardBody,
  CardHeader,
  FormFeedback,
  Container,
  Alert,
  Row,
  Col,
  Table,
} from 'reactstrap';
import FormValidator from '../../common/FormValidator';
import Auth from '../../services/AuthService';
import Loading from '../../components/Loading/Loading';
const auth = new Auth();

class Add extends Component {
  constructor(props) {
    super(props);
    this.fetch = auth.fetch();

    this.validator = new FormValidator([
      {
        field: 'email',
        method: validator.isEmail,
        validWhen: true,
        message: 'Email is not valid.',
      },
      {
        field: 'password',
        method: validator.isEmpty,
        validWhen: false,
        message: 'Password is requerd.',
      },
    ]);

    this.roleValidator = new FormValidator([
      {
        field: 'name',
        method: validator.isEmpty,
        validWhen: false,
        message: 'Email is not valid.',
      },
    ]);

    this.state = {
      loading: true,
      validation: this.validator.valid(),
      roleValadition: this.roleValidator.valid(),
      serverError: null,
      modalRole: false,
      roles: [],
      user: {
        email: '',
        password: '',
        name: '',
        phone: '',
        active: true,
        Roles: [],
      },
      role: {
        code: '',
        name: '',
      },
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const { data } = await this.fetch.get('/api/role/getAll');
    this.setState({ roles: data.roles, loading: false });
  }

  handleOnSave = async e => {
    e.preventDefault();
    this.setState({ serverError: null });
    const validation = this.validator.validate(this.state.user);
    if (validation.isValid) {
      try {
        await this.fetch.post('/api/auth/signup', this.state.user);
        this.props.history.push('/user');
      } catch (err) {
        if (err.response) {
          let validation = { ...this.state.validation };
          for (const item of err.response.data.errors) {
            if (validation[item.param]) {
              validation[item.param].isInvalid = true;
              validation[item.param].message = item.msg;
            }
          }
          this.setState({ validation });
        } else {
          console.log('====================================');
          console.log(err);
          console.log('====================================');
        }
      }
    } else {
      this.setState({ validation });
    }
  };

  handleOnChange = e => {
    let user = { ...this.state.user };
    user[e.target.name] =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    this.setState({ user: user });
  };

  handleOnAddRole = e => {
    e.preventDefault();
    let user = { ...this.state.user };
    user.Roles.push({ ...this.state.roles[this.refRole.value] });
    this.setState({ modalRole: false });
  };

  handleOpenAddRoleDialog = () => {
    this.setState({ modalRole: true });
  };

  render() {
    if (this.state.loading) return <Loading />;
    return (
      <Row>
          <Col xs="12" sm="12" md="12" lg="6" className="col-centered">
          <Card>
            <CardHeader>Add user</CardHeader>
            <CardBody>
              <Container>
                {this.state.serverError && (
                  <Alert color="danger">{this.state.serverError}</Alert>
                )}
                <form onSubmit={this.handleOnSave}>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>Email</Label>
                        <Input
                          type="text"
                          name="email"
                          invalid={this.state.validation.email.isInvalid}
                          onChange={this.handleOnChange}
                        />
                        <FormFeedback
                          valid={!this.state.validation.email.isInvalid}>
                          {this.state.validation.email.message}
                        </FormFeedback>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>Password</Label>
                        <Input
                          type="password"
                          name="password"
                          invalid={this.state.validation.password.isInvalid}
                          onChange={this.handleOnChange}
                        />
                        <FormFeedback
                          valid={!this.state.validation.password.isInvalid}>
                          {this.state.validation.password.message}
                        </FormFeedback>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>Name</Label>
                        <Input
                          type="text"
                          name="name"
                          onChange={this.handleOnChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>Phone</Label>
                        <Input
                          type="text"
                          name="phone"
                          onChange={this.handleOnChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup check>
                        <Label check>
                          <Input
                            name="active"
                            defaultChecked="true"
                            type="checkbox"
                            onChange={this.handleOnChange}
                          />
                          Active
                        </Label>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Table striped>
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Code</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.user.Roles.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <th>{item.name}</th>
                                  <th>{item.code}</th>
                                  <th>Actions</th>
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
                        onClick={() => this.props.history.push('/user')}>
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

export default withRouter(Add);
