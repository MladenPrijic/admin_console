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
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
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
    this.serverId = props.match.params.serverId;

    this.state = {
      loading: true,
      activeTab: '1',
      server: {
        name: '',
        ip: '',
        ports: '',
        cluster: '',
        cpu: '',
        storage: '',
        purpose: '',
        notes: '',
        os: '',
        version: '',
        loginUrl: '',
        instalationDate: undefined,
        createdBy: '',
        modefiedBy: '',
        deployments: [],
        projects: [],
      },
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const { data } = await this.fetch(`/api/server/${this.serverId}`);
    this.setState({ server: { ...data.data }, loading: false });
  }

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  };

  render() {
    const { cloudProvider } = this.state.server;
    const { server } = this.state;
    const { deployments } = this.state.server;
    let projects = [];
    deployments.forEach(deployment => {
      projects = [...projects, ...deployment.ProjectUses];
    });
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
                    Server / {server.name}
                  </span>
              </CardHeader>
                <div className="info-view card-background-logo">
                    <ul className="list-inline">
                        <li className="list-inline-item"><label htmlFor="Name">Name:</label></li>
                        <li className="list-inline-item view-text-marked">{server.name}</li>
                    </ul>
                    <ul className="list-inline">
                        <li className="list-inline-item"><label htmlFor="IP">IP:</label></li>
                        <li className="list-inline-item view-text-marked">{server.ip}</li>
                    </ul>
                    <ul className="list-inline">
                        <li className="list-inline-item"><label htmlFor="Ports">Ports:</label></li>
                        <li className="list-inline-item view-text-marked">{server.ports}</li>
                    </ul>
                    <ul className="list-inline">
                        <li className="list-inline-item"><label htmlFor="CPU">CPU:</label></li>
                        <li className="list-inline-item view-text-marked">{server.cpu}</li>
                    </ul>
                    <ul className="list-inline">
                        <li className="list-inline-item"><label htmlFor="RAM">RAM:</label></li>
                        <li className="list-inline-item view-text-marked">{server.ram}</li>
                    </ul>
                    <ul className="list-inline">
                        <li className="list-inline-item"><label htmlFor="Storage">Storage:</label></li>
                        <li className="list-inline-item view-text-marked">{server.storage}</li>
                    </ul>
                    <ul className="list-inline">
                        <li className="list-inline-item"><label htmlFor="OS">OS:</label></li>
                        <li className="list-inline-item view-text-marked">{server.os}</li>
                    </ul>
                    <ul className="list-inline">
                        <li className="list-inline-item"><label htmlFor="Version">Version:</label></li>
                        <li className="list-inline-item view-text-marked">{server.version}</li>
                    </ul>
                    <ul className="list-inline">
                        <li className="list-inline-item"><label htmlFor="Instalation date">Instalation date:</label></li>
                        <li className="list-inline-item bview-text-marked">{server.instalationDate}</li>
                    </ul>
                    <ul className="list-inline">
                        <li className="list-inline-item"><label htmlFor="Instalation date">Notes:</label></li>
                        <li className="list-inline-item view-text-marked">{server.notes}</li>
                    </ul>
                </div>
              <CardBody>
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === '1',
                      })}
                      onClick={() => {
                        this.toggle('1');
                      }}>
                      Cloud provider
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
                      Deployment
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === '3',
                      })}
                      onClick={() => {
                        this.toggle('3');
                      }}>
                      Projects
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === '4',
                      })}
                      onClick={() => {
                        this.toggle('4');
                      }}>
                      Software
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent className="pt-2" activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                      <CloudProvider cloudProvider={cloudProvider} />
                  </TabPane>
                </TabContent>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="2">
                    <Deployment deployments={deployments} />
                  </TabPane>
                </TabContent>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="3">
                    <Projects serverId={this.serverId} />
                  </TabPane>
                </TabContent>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="4">
                    <Software serverId={this.serverId} />
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

// eslint-disable-next-line react/no-multi-comp
const Deployment = ({ deployments }) => {
  const columns = [
    {
      Header: 'Deployments',
      headerStyle: {
        fontWeight: '400',
        fontSize: '1.125rem',
      },
      columns: [
        {
          Header: 'Name',
          accessor: 'name',
          headerStyle: {
            textAlign: 'left',
            fontWeight: '400',
          },
          style: {
            textAlign: 'left',
          },
        },
        {
          Header: 'Type',
          accessor: 'type',
          headerStyle: {
            textAlign: 'left',
            fontWeight: '400',
          },
          style: {
            textAlign: 'left',
            verticalAlign: 'middle',
          },
        },
        {
          Header: 'Start date',
          accessor: 'startDate',
          headerStyle: {
            textAlign: 'left',
            fontWeight: '400',
          },
          style: {
            textAlign: 'left',
            verticalAlign: 'middle',
          },
        },
        {
          Header: 'End date',
          accessor: 'endDate',
          headerStyle: {
            textAlign: 'left',
            fontWeight: '400',
          },
          style: {
            textAlign: 'left',
            verticalAlign: 'middle',
          },
        },
      ],
    },
  ];
  if (!deployments) {
    return null;
  } else {
    return (
      <React.Fragment>
        <ReactTable
          columns={columns}
          data={deployments}
          defaultPageSize={10}
          style={{
            height: '350px',
          }}
          className="-striped -highlight"
        />
      </React.Fragment>
    );
  }
};

// eslint-disable-next-line react/no-multi-comp
const CloudProvider = ({ cloudProvider }) => {
  if (!cloudProvider) {
    return null;
  } else {
    return (
      <React.Fragment>
          <div className="info-view">
              <ul className="list-inline">
                  <li className="list-inline-item"><label htmlFor="Name">Name:</label></li>
                  <li className="list-inline-item view-text-marked">{cloudProvider.name}</li>
              </ul>
              <ul className="list-inline">
                  <li className="list-inline-item"><label htmlFor="Short name">Short name:</label></li>
                  <li className="list-inline-item view-text-marked">{cloudProvider.shortName}</li>
              </ul>
              <ul className="list-inline">
                  <li className="list-inline-item"><label htmlFor="Support name">Support contact name:</label></li>
                  <li className="list-inline-item view-text-marked">{cloudProvider.supportContactName}</li>
              </ul>
              <ul className="list-inline">
                  <li className="list-inline-item"><label htmlFor="Support phone">Support contact phone:</label></li>
                  <li className="list-inline-item view-text-marked">{cloudProvider.supportContactPhone}</li>
              </ul>
              <ul className="list-inline">
                  <li className="list-inline-item"><label htmlFor="Sales name">Sales contact name:</label></li>
                  <li className="list-inline-item view-text-marked">{cloudProvider.salesContactName}</li>
              </ul>
              <ul className="list-inline">
                  <li className="list-inline-item"><label htmlFor="Sales phone">Sales contact phone:</label></li>
                  <li className="list-inline-item view-text-marked">{cloudProvider.salesContactPhone}</li>
              </ul>
              <ul className="list-inline">
                  <li className="list-inline-item"><label htmlFor="Address">Address:</label></li>
                  <li className="list-inline-item view-text-marked">{cloudProvider.address}</li>
              </ul>
              <ul className="list-inline">
                  <li className="list-inline-item"><label htmlFor="City">City:</label></li>
                  <li className="list-inline-item view-text-marked">{cloudProvider.city}</li>
              </ul>
              <ul className="list-inline">
                  <li className="list-inline-item"><label htmlFor="City">Postal code:</label></li>
                  <li className="list-inline-item view-text-marked">{cloudProvider.postalCode}</li>
              </ul>
          </div>
      </React.Fragment>
    );
  }
};

// eslint-disable-next-line react/no-multi-comp
class Projects extends Component {
  constructor(props) {
    super(props);
    this.fetch = auth.fetch();
    this.state = {
      data: [],
    };
  }

  async componentDidMount() {
    try {
      const res = await this.fetch.get(
        `/api/server/projects/${this.props.serverId}`
      );
      this.setState({ data: res.data.projects });
    } catch (error) {
      this.setState({ data: [] });
    }
  }

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
            Header: 'Project',
            filterable: false,
            headerStyle: {
              textAlign: 'center',
              fontWeight: '400',
            },
            style: {
              textAlign: 'center',
            },
            Cell: props => (
              <React.Fragment>
                <Link
                  color="primary"
                  size="sm"
                  to={`/project/view/${props.row._original.project_id}`}>
                  {props.row._original.project_name}
                </Link>
              </React.Fragment>
            ),
          },
          {
            Header: 'Clients',
            filterable: false,
            headerStyle: {
                textAlign: 'center',
                fontWeight: '400',
            },
            style: {
              textAlign: 'center',
            },
            Cell: props => (
              <React.Fragment>
                <Link
                  color="primary"
                  size="sm"
                  to={`/client/view/${props.row._original.client_id}`}>
                  {props.row._original.client_name}
                </Link>
              </React.Fragment>
            ),
          },
        ],
      },
    ];
    if (this.state.data === []) return null;
    return (
      <React.Fragment>
        <ReactTable
          columns={columns}
          data={this.state.data}
          defaultPageSize={10}
          style={{
            height: '350px',
          }}
          className="-striped -highlight"
        />
      </React.Fragment>
    );
  }
}

// eslint-disable-next-line react/no-multi-comp
class Software extends Component {
  constructor(props) {
    super(props);
    this.fetch = auth.fetch();
    this.state = {
      data: [],
    };
  }

  async componentDidMount() {
    try {
      const res = await this.fetch.get(
        `/api/server/software/${this.props.serverId}`
      );
      this.setState({ data: res.data.software });
    } catch (error) {
      this.setState({ data: [] });
    }
  }

  render() {
    const columns = [
      {
        Header: 'Software',
        headerStyle: {
            fontWeight: '400',
            fontSize: '1.125rem',
        },
        columns: [
          {
            Header: 'Name',
            filterable: false,
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
                  to={`/software/view/${props.row._original.software_id}`}>
                  {props.row._original.software_name}
                </Link>
              </React.Fragment>
            ),
          },
          {
            Header: 'Version',
            accessor: 'version',
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
    if (this.state.data === []) return null;
    return (
      <React.Fragment>
        <ReactTable
          columns={columns}
          data={this.state.data}
          defaultPageSize={10}
          style={{
            height: '350px',
          }}
          className="-striped -highlight"
        />
      </React.Fragment>
    );
  }
}

export default withRouter(View);
