import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import classnames from 'classnames';
import { FaArrowLeft } from 'react-icons/fa';
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import ReactTable from 'react-table';
import Auth from '../../services/AuthService';
import 'react-table/react-table.css';
import Loading from '../../components/Loading/Loading';

const auth = new Auth();

class View extends Component {
  constructor(props) {
    super(props);
    this.fetch = auth.fetch();
    this.clientId = props.match.params.clientId;

    this.state = {
      activeTab: '1',
      loading: true,
      client: {
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
      servers: [],
      isOpen: false,
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const { data } = await this.fetch(`/api/client/${this.clientId}`);
    const resServers = await this.fetch.get(
      `/api/client/servers/${this.clientId}`
    );
    this.setState({
      client: { ...data.client },
      servers: resServers.data.servers,
      loading: false,
    });
  }

  handleOnServer = (e, servers) => {
    e.preventDefault();
    this.setState({ servers, isOpen: true });
  };

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  };

  render() {
    const columns = [
      {
        Header: 'Projects',
        headerStyle: {
          fontWeight: '400',
          fontSize: '1.125rem',
        },
        columns: [
          {
            Header: 'Name',
            filterable: false,
            headerStyle: {
              textAlign: 'center',
              fontWeight: '400',
            },
            style: {
              textAlign: 'left',
            },
            Cell: props => (
              <React.Fragment>
                <Link
                  color="primary"
                  size="sm"
                  to={`/project/view/${props.row._original.id}`}>
                  {props.row._original.name}
                </Link>
              </React.Fragment>
            ),
          },
        ],
      },
    ];
    const columnsServers = [
      {
        Header: 'Servers',
        headerStyle: {
          fontWeight: '400',
          fontSize: '1.125rem',
        },
        columns: [
          {
            Header: 'Deployment name',
            accessor: 'deployment_name',
            headerStyle: {
              textAlign: 'left',
              fontWeight: '400',
            },
            style: {
              textAlign: 'left',
            },
          },
          {
            Header: 'Server name',
            headerStyle: {
              textAlign: 'left',
              fontWeight: '400',
            },
            style: {
              textAlign: 'left',
            },
            Cell: props => (
              <React.Fragment>
                <Link
                  color="primary"
                  size="sm"
                  to={`/server/view/${props.row._original.server_id}`}>
                  {props.row._original.server_name}
                </Link>
              </React.Fragment>
            ),
          },
          {
            Header: 'IP',
            accessor: 'ip',
            headerStyle: {
              textAlign: 'left',
              fontWeight: '400',
            },
            style: {
              textAlign: 'left',
            },
          },
          {
            Header: 'CPU',
            accessor: 'cpu',
            headerStyle: {
              textAlign: 'left',
              fontWeight: '400',
            },
            style: {
              textAlign: 'left',
            },
          },
          {
            Header: 'RAM',
            accessor: 'ram',
            headerStyle: {
              textAlign: 'left',
              fontWeight: '400',
            },
            style: {
              textAlign: 'left',
            },
          },
          {
            Header: 'Ports',
            accessor: 'ports',
            headerStyle: {
              textAlign: 'left',
              fontWeight: '400',
            },
            style: {
              textAlign: 'left',
            },
          },
          {
            Header: 'Storage',
            accessor: 'storage',
            headerStyle: {
              textAlign: 'left',
              fontWeight: '400',
            },
            style: {
              textAlign: 'left',
            },
          },
        ],
      },
    ];
    if (this.state.loading) return <Loading />;
    return (
      <React.Fragment>
        <Row>
          <Col xs="12" sm="12" md="12" lg="8" className="col-centered">
            <Card className="info">
                <CardHeader className="text-center">
                    <Button
                        className="btn back-button float-left pl-0"
                        onClick={() => this.props.history.goBack()}>
                        <FaArrowLeft />
                    </Button>
                    <span className="align-text-top">
                        Client / {this.state.client.name}
                    </span>
                </CardHeader>
                <div className="info-view card-background-logo">
                    <ul className="list-inline">
                        <li className="list-inline-item"><label htmlFor="Name">Name:</label> </li>
                        <li className="list-inline-item view-text-marked">{this.state.client.name}</li>
                    </ul>
                    <ul className="list-inline">
                        <li className="list-inline-item"><label htmlFor="Contact person">Contact person:</label></li>
                        <li className="list-inline-item view-text-marked">{this.state.client.conatactPerson}</li>
                    </ul>
                    <ul className="list-inline">
                        <li className="list-inline-item"><label htmlFor="Contact phone">Contact person phone:</label></li>
                        <li className="list-inline-item view-text-marked">{this.state.client.conatactPersonPhone}</li>
                    </ul>
                    <ul className="list-inline">
                        <li className="list-inline-item"><label htmlFor="Address">Address:</label></li>
                        <li className="list-inline-item view-text-marked">{this.state.client.address}</li>
                    </ul>
                    <ul className="list-inline">
                        <li className="list-inline-item"><label htmlFor="Postal code">Postal code:</label></li>
                        <li className="list-inline-item view-text-marked">{this.state.client.postalCode}</li>
                    </ul>
                    <ul className="list-inline">
                        <li className="list-inline-item"><label htmlFor="City">City:</label></li>
                        <li className="list-inline-item view-text-marked">{this.state.client.city}</li>
                    </ul>
                </div>
                <CardBody>
                  <Row>
                    <Col>
                      <Nav tabs>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: this.state.activeTab === '1',
                            })}
                            onClick={() => {
                              this.toggle('1');
                            }}>
                            Projects
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
                            Servers
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                          <ReactTable
                            columns={columns}
                            data={this.state.client.projects}
                            defaultPageSize={10}
                            style={{
                              height: '500px',
                            }}
                            className="-striped -highlight border-bottom-rounded"
                          />
                        </TabPane>
                      </TabContent>
                      <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="2">
                          <ReactTable
                            columns={columnsServers}
                            data={this.state.servers}
                            defaultPageSize={10}
                            style={{
                              height: '500px',
                            }}
                            className="-striped -highlight border-bottom-rounded"
                          />
                        </TabPane>
                      </TabContent>
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
