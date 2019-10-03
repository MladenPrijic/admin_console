import React, { Component, Fragment } from 'react';
import Auth from '../services/AuthService';
import {
  Button,
  Form,
  Collapse,
  Label,
  FormGroup,
  Input,
  Container,
  Col,
  Row,
  Alert,
  CardBody,
  TabContent,
  TabPane,
  NavItem,
  NavLink,
  Nav
} from 'reactstrap';
import classnames from 'classnames';

const auth = new Auth();
class Profile extends Component {
  constructor(props) {
    super(props);
    this.fetch = auth.fetch();

    this.state = {
      activeTab: '1',
      isOpen: false,
      serverError: null,
      succesPaswordChange: null,
      succesProfileChange: null,
      user: {
        email: '',
        name: '',
        phone: '',
        roles: [],
      },
      password: {
        currentPassword: '',
        newPassword: '',
        repeatNewPassword: '',
      },
    };
  }

  async componentDidMount() {
    const { data } = await this.fetch(`/api/auth/profile`);
    this.setState({ user: { ...data.user } });
  }

    toggle = tab => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
            });
        }
    };

  setAllProps = (obj, setVal) => {
    Object.keys(obj).forEach(k => (obj[k] = setVal));
    console.log(obj);
  };

  handleOnChange = e => {
    let user = { ...this.state.user };
    user[e.target.name] =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    this.setState({ user: user });
  };

  handleOnChangePasswordState = e => {
    let password = { ...this.state.password };
    password[e.target.name] =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    this.setState({ password: password });
  };

  handleOnChangePassword = async e => {
    e.preventDefault();
    this.setState({ serverError: null, succesPaswordChange: null });
    try {
      const res = await this.fetch.post(
        `/api/auth/change-password`,
        this.state.password
      );
      let passwordFromData = { ...this.state.password };
      this.setAllProps(passwordFromData, '');
      this.setState({
        succesPaswordChange: res.data.message,
        isOpen: false,
        password: passwordFromData,
      });
    } catch (err) {
      console.log(err.response);
      this.setState({
        serverError: err.response
          ? err.response.data
          : { message: 'Server error', errors: [] },
      });
    }
  };

  handleOnChangeProfile = async e => {
    e.preventDefault();
    this.setState({succesProfileChange:null});
    try {
      let profile = { ...this.state.user };
      delete profile.email;
      delete profile.roles;
      const res = await this.fetch.post(`/api/auth/change-profile`, profile);
      this.setState({succesProfileChange:res.data.message});
    } catch (err) {
      this.setState({
        serverError: err.response
          ? err.response.data
          : { message: 'Server error', errors: [] },
      });
    }
  };

  render() {
    const { email, name, phone } = this.state.user;
    const {
      currentPassword,
      newPassword,
      repeatNewPassword,
    } = this.state.password;
    const { isOpen, serverError, succesPaswordChange,succesProfileChange } = this.state;
    return (
      <Fragment>
          <Container className="profile-page h-100">
              {serverError && (
                  <Alert color="danger">
                      <Fragment>
                          <span>{serverError.message}</span>
                          <ul>
                              {serverError.errors.map((item, i) => (
                                  <li key={i}>{item.msg}</li>
                              ))}
                          </ul>
                      </Fragment>
                  </Alert>
              )}
              {succesProfileChange && (
                  <Alert color="success">
                      <span>{succesProfileChange}</span>
                  </Alert>
              )}
              {succesPaswordChange && (
                  <Alert color="success">
                      <span>{succesPaswordChange}</span>
                  </Alert>
              )}
              <Nav tabs>
                  <NavItem>
                      <NavLink
                          className={classnames({
                              active: this.state.activeTab === '1',
                          })}
                          onClick={() => {
                              this.toggle('1');
                          }}>
                          Personal Info
                      </NavLink>
                  </NavItem>
                  <NavItem>
                      <NavLink
                          className={classnames({
                              active: this.state.activeTab === '2',
                          })}
                          onClick={() => {
                              this.toggle('2');
                          }}>
                          Change Password
                      </NavLink>
                  </NavItem>
              </Nav>

              <TabContent activeTab={this.state.activeTab} className="pt-3">
                  <TabPane tabId="1">
                      <Row className="h-100 justify-content-center align-items-center">
                          <Col xs="12" md="6" className="personal-info">
                              <div className="md-12 xs-12 card card-profile">
                                  <div className="text-center">
                                      <h3>Personal info</h3>
                                      <img
                                          alt=""
                                          className="card-img-top"
                                          src="http://brandtimes.com.ng/wp-content/uploads/2018/04/big-data-responsibility-content-2018.jpg"
                                      />
                                  </div>
                                  <CardBody>
                                      <Form>
                                          <FormGroup>
                                              <Label>Name</Label>
                                              <Input
                                                  type="text"
                                                  name="name"
                                                  id="profileName"
                                                  placeholder="Name"
                                                  onChange={this.handleOnChange}
                                                  value={name}
                                              />
                                          </FormGroup>
                                          <FormGroup>
                                              <Label>Phone</Label>
                                              <Input
                                                  type="text"
                                                  name="phone"
                                                  id="profilePhone"
                                                  placeholder="Phone"
                                                  onChange={this.handleOnChange}
                                                  value={phone || ""}
                                              />
                                          </FormGroup>
                                          <FormGroup>
                                              <Label>Email</Label>
                                              <Input
                                                  readOnly
                                                  type="email"
                                                  name="email"
                                                  id="profileEmail"
                                                  placeholder="Enter Email"
                                                  onChange={this.handleOnChange}
                                                  value={email}
                                              />
                                          </FormGroup>
                                          <FormGroup>
                                              <Button
                                                  color="primary"
                                                  size="sm"
                                                  onClick={this.handleOnChangeProfile}>
                                                  Save Profile
                                              </Button>{' '}
                                          </FormGroup>
                                      </Form>
                                  </CardBody>
                              </div>
                          </Col>
                      </Row>
                  </TabPane>
                  <TabPane tabId="2">
                      <Row className="h-100 justify-content-center align-items-center">
                          <Col xs="12" md="6">
                              <div className="card card-profile">
                                  <div className="text-center">
                                      <img
                                          alt=""
                                          className="card-img-top"
                                          src="http://brandtimes.com.ng/wp-content/uploads/2018/04/big-data-responsibility-content-2018.jpg"
                                      />
                                      <div className="card-block">
                                          <img
                                              alt=""
                                              className="card-img-profile"
                                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYyy5LOjrGMJiU4pf6a9PtIpIVovXkxpilFB1ptx46fXrh2_u_dg"
                                          />
                                          <h4>{name}</h4>
                                      </div>
                                  </div>
                                  <CardBody>
                                      <Form>
                                          <FormGroup className="text-center">
                                              <Button
                                                  color="primary"
                                                  onClick={() =>
                                                      this.setState({
                                                          isOpen: !isOpen,
                                                          serverError: null,
                                                          succesPaswordChange: null,
                                                      })
                                                  }
                                                  size="sm">
                                                  {isOpen ? 'Close form' : 'Change password'}
                                              </Button>
                                          </FormGroup>

                                          <Collapse isOpen={isOpen}>

                                              <FormGroup>
                                                  <Label for="examplePassword">Current password</Label>
                                                  <Input
                                                      type="password"
                                                      name="currentPassword"
                                                      value={currentPassword}
                                                      onChange={this.handleOnChangePasswordState}
                                                      placeholder="Enter current password"
                                                  />
                                              </FormGroup>
                                              <FormGroup>
                                                  <Label for="examplePassword">New password</Label>
                                                  <Input
                                                      type="password"
                                                      name="newPassword"
                                                      value={newPassword}
                                                      onChange={this.handleOnChangePasswordState}
                                                      placeholder="Enter new password"
                                                  />
                                              </FormGroup>
                                              <FormGroup>
                                                  <Label for="examplePassword">Repeat password</Label>
                                                  <Input
                                                      type="password"
                                                      name="repeatNewPassword"
                                                      value={repeatNewPassword}
                                                      onChange={this.handleOnChangePasswordState}
                                                      placeholder="Repeat new password"
                                                  />
                                              </FormGroup>
                                              <Row className="p-0">
                                                  <Col>
                                                      <Button
                                                          color="primary"
                                                          size="sm"
                                                          block
                                                          onClick={this.handleOnChangePassword}>
                                                          Change password
                                                      </Button>
                                                  </Col>
                                              </Row>
                                          </Collapse>
                                      </Form>
                                  </CardBody>
                              </div>
                          </Col>
                      </Row>
                  </TabPane>
              </TabContent>
        </Container>
      </Fragment>
    );
  }
}

export default Profile;
