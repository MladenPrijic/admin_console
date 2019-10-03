import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Input,
  FormGroup,
  Label,
  Button,
  Card,
  CardBody,
  Container,
  Row,
  Col,
  Alert,
} from 'reactstrap';
import Auth from '../../services/AuthService';
import Loading from '../../components/Loading/Loading';

const auth = new Auth();

class Reset extends Component {
  constructor(props) {
    super(props);
    this.fetch = auth.fetch();
    this.userId = props.match.params.userId;

    this.state = {
      loading: true,
      serverError: null,
      valid: true,
      user: {
        id: this.userId,
        password: '',
        reTypePassword: '',
        email: '',
      },
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const { data } = await this.fetch(`/api/auth/${this.userId}`);
    const email = data.user.email;
    const user = { ...this.state.user };
    user.email = email;
    this.setState({ user: user, loading: false });
  }

  handleOnSave = async e => {
    e.preventDefault();
    this.setState({ serverError: null, valid: true });
    try {
      const { password, reTypePassword } = this.state.user;
      if (
        password === reTypePassword &&
        (password !== '' && reTypePassword !== '')
      ) {
        await this.fetch.post('/api/auth/reset', this.state.user);
        this.props.history.push('/user');
      } else {
        this.setState({ valid: false });
      }
    } catch (error) {
      if (error.response) {
        const { errors } = error.response.data;
        this.setState({ serverError: errors });
      } else {
        this.setState({ serverError: error.data.message });
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
                  <Alert color="danger">
                    {Array.isArray(this.state.serverError) ? (
                      <ul>
                        {this.state.serverError.map((item, index) => {
                          return <li key={index}>{item.msg}</li>;
                        })}
                      </ul>
                    ) : (
                      this.state.serverError
                    )}
                  </Alert>
                )}
                {!this.state.valid && (
                  <Alert color="danger">Passwords must match.</Alert>
                )}
                <Label>
                  Reset password for user{' '}
                  <strong>{this.state.user.email}</strong>
                </Label>
                <form onSubmit={this.handleOnSave}>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>New password</Label>
                        <Input
                          type="password"
                          name="password"
                          onChange={this.handleOnChange}
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label>Retype password</Label>
                        <Input
                          type="password"
                          name="reTypePassword"
                          onChange={this.handleOnChange}
                        />
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

export default withRouter(Reset);
