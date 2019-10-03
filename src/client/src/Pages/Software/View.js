import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ReactTable from 'react-table';
import { FaArrowLeft } from 'react-icons/fa';
import classnames from 'classnames';
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  TabContent,
} from 'reactstrap';
import Auth from '../../services/AuthService';
import Loading from '../../components/Loading/Loading';

const auth = new Auth();

class View extends Component {
  constructor(props) {
    super(props);
    this.fetch = auth.fetch();
    this.softwareId = props.match.params.softwareId;

    this.state = {
      loading: true,
      activeTab: '1',
      servers: [],
      projects: [],
      software: {
        name: '',
        version: '',
        description: '',
        licence: '',
        components: [],
      },
    };
  }

  async componentDidMount() {
    const { data } = await this.fetch(`/api/software/${this.softwareId}`);
    const resProjects = await this.fetch.get(
      `/api/software/projects/${this.softwareId}`
    );
    const resServers = await this.fetch.get(
      `/api/software/servers/${this.softwareId}`
    );
    this.setState({
      software: { ...data.software },
      projects: resProjects.data.projects,
      servers: resServers.data.servers,
      loading: false
    });
  }

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
        Header: 'Component',
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
            Header: 'Deployment',
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
            Header: 'Ip',
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
            Header: 'RAM',
            accessor: 'ram',
            headerStyle: {
              textAlign: 'center',
              fontWeight: '400',
            },
            style: {
              textAlign: 'center',
            },
          },
          {
            Header: 'CPU',
            accessor: 'cpu',
            headerStyle: {
              textAlign: 'center',
              fontWeight: '400',
            },
            style: {
              textAlign: 'center',
            },
          },
          {
            Header: 'Ports',
            accessor: 'ports',
            headerStyle: {
              textAlign: 'center',
              fontWeight: '400',
            },
            style: {
              textAlign: 'center',
            },
          },
          {
            Header: 'Storage',
            accessor: 'storage',
            headerStyle: {
              textAlign: 'center',
              fontWeight: '400',
            },
            style: {
              textAlign: 'center',
            },
          },
          {
            Header: 'OS',
            accessor: 'os',
            headerStyle: {
              textAlign: 'center',
              fontWeight: '400',
            },
            style: {
              textAlign: 'center',
            },
          },
        ],
      },
    ];
    const columnsProjects = [
      {
        Header: 'Projects',
        headerStyle: {
          fontWeight: '400',
          fontSize: '1.125rem',
        },
        columns: [
          {
            Header: 'Name',
            accessor: 'project_name',
            headerStyle: {
              textAlign: 'left',
              fontWeight: '400',
            },
            style: {
              textAlign: 'left',
            },
          },
          {
            Header: 'Client',
            accessor: 'client_name',
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
    const { projects, servers } = this.state;
    if (this.state.loading) return <Loading />;
    return (
      <React.Fragment>
        <Row>
            <Col xs="12" sm="12" md="12" lg="8" className="col-centered">
            <Card className="info">
              <CardHeader className="text-center">
                  <Button
                      className="btn back-button float-left pl-o"
                      onClick={() => this.props.history.goBack()}>
                      <FaArrowLeft />
                  </Button>
                  <span className="align-text-top">
                    Software / {this.state.software.name}
                  </span>
              </CardHeader>
              <div className="info-view card-background-logo">
                  <ul className="list-inline">
                      <li className="list-inline-item"><label htmlFor="Name">Name:</label></li>
                      <li className="list-inline-item view-text-marked">{this.state.software.name}</li>
                  </ul>
                  <ul className="list-inline">
                      <li className="list-inline-item"><label htmlFor="Version">Version:</label></li>
                      <li className="list-inline-item view-text-marked">{this.state.software.version}</li>
                  </ul>
                  <ul className="list-inline">
                      <li className="list-inline-item"><label htmlFor="Description">Description:</label></li>
                      <li className="list-inline-item view-text-marked">{this.state.software.description}</li>
                  </ul>
                  <ul className="list-inline">
                      <li className="list-inline-item"><label htmlFor="Licence">Licence:</label></li>
                      <li className="list-inline-item view-text-marked">{this.state.software.licence}</li>
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
                      Components
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
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    <ReactTable
                      columns={columns}
                      data={
                        this.state.software.components
                          ? this.state.software.components
                          : []
                      }
                      defaultPageSize={10}
                      style={{
                        height: '350px',
                      }}
                      className="-striped -highlight"
                    />
                  </TabPane>
                  <TabPane tabId="2">
                    <ReactTable
                      columns={columnsServers}
                      data={servers ? servers : []}
                      defaultPageSize={10}
                      style={{
                        height: '350px',
                      }}
                      className="-striped -highlight"
                    />
                  </TabPane>
                  <TabPane tabId="3">
                    <ReactTable
                      columns={columnsProjects}
                      data={projects ? projects : []}
                      defaultPageSize={10}
                      style={{
                        height: '350px',
                      }}
                      className="-striped -highlight"
                    />
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

export default withRouter(View);
