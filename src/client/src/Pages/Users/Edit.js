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
  FormFeedback,
  Container,
  Row,
  Col,
  Alert,
  Table,
} from 'reactstrap';
import FormValidator from '../../common/FormValidator';
import Auth from '../../services/AuthService';
import Loading from '../../components/Loading/Loading';

const auth = new Auth();

class Edit extends Component {
  constructor(props) {
    super(props);
    this.fetch = auth.fetch();
    this.userId = props.match.params.userId;

    this.validator = new FormValidator([
      {
        field: 'email',
        method: validator.isEmail,
        validWhen: true,
        message: 'Email is not valid.',
      },
    ]);

    this.state = {
      loading: true,
      validation: this.validator.valid(),
      serverError: null,
      user: {
        email: '',
        password: '',
        name: '',
        phone: '',
        active: true,
        roles: [],
      },
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const { data } = await this.fetch(`/api/auth/${this.userId}`);
    this.setState({ user: { ...data.user }, loading: false });
  }

  handleOnSave = async e => {
    e.preventDefault();
    this.setState({ serverError: null });
    try {
      const validation = this.validator.validate(this.state.user);
      if (validation.isValid) {
        await this.fetch.post('/api/auth/edit', this.state.user);
        this.props.history.push('/user');
      } else {
        this.setState({ validation });
      }
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
  };

  handleOnChange = e => {
    let user = { ...this.state.user };
    user[e.target.name] =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    this.setState({ user: user });
  };

  render() {
    if (this.state.loading) return <Loading />;
    return (
      <Row>
        <Col xs="12" sm="12" md="12" lg="6" className="col-centered">
          <Card>
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
                          readOnly
                          type="text"
                          name="email"
                          invalid={this.state.validation.email.isInvalid}
                          value={this.state.user.email}
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
                          disabled
                          type="password"
                          name="password"
                          value={'123456'}
                        />
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
                          value={this.state.user.name}
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
                          value={this.state.user.phone}
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
                            checked={this.state.user.active}
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
                            {this.state.user.roles.map((item, index) => {
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

export default withRouter(Edit);
