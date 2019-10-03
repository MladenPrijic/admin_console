import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  Row,
  Col,
  Button,
} from 'reactstrap';
import Auth from '../../services/AuthService';
import Loading from '../../components/Loading/Loading';

const auth = new Auth();

class View extends Component {
  constructor(props) {
    super(props);
    this.fetch = auth.fetch();
    this.userId = props.match.params.userId;

    this.state = {
      loading: true,
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

  render() {
    if (this.state.loading) return <Loading />;
    return (
      <React.Fragment>
        <Row>
          <Col xs="12" sm="12" md="12" lg="6" className="col-centered">
            <Card className="info">
              <CardHeader className="text-center">
                  <Button
                      className="btn back-button float-left pl-0"
                      onClick={() => this.props.history.goBack()}>
                      <FaArrowLeft />
                  </Button>
                  <span className="align-text-top">
                    User / {this.state.user.name}
                  </span>
              </CardHeader>
                <div className="info-view card-background-logo">
                    <ul className="list-inline">
                        <li className="list-inline-item"><label htmlFor="Name">Name:</label></li>
                        <li className="list-inline-item view-text-marked">{this.state.user.name}</li>
                    </ul>
                    <ul className="list-inline">
                        <li className="list-inline-item"><label htmlFor="Phone">Phone:</label></li>
                        <li className="list-inline-item view-text-marked">{this.state.user.phone}</li>
                    </ul>
                    <ul className="list-inline">
                        <li className="list-inline-item"><label htmlFor="Email">Email:</label></li>
                        <li className="list-inline-item view-text-marked">{this.state.user.email}</li>
                    </ul>
                </div>
              <CardBody>
                  <Row>
                    <Col>
                      <h4>Roles</h4>
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
                    </Col>
                  </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default withRouter(View);
