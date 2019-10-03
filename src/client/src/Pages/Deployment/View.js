import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import classnames from 'classnames';
import ReactTable from 'react-table';
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
import Auth from '../../services/AuthService';
import Loading from '../../components/Loading/Loading';

const auth = new Auth();

class View extends Component {
  constructor(props) {
    super(props);
    this.fetch = auth.fetch();
    this.deploymentId = props.match.params.deploymentId;

    this.state = {
      loading: true,
      activeTab: '1',
      deployment: {
        name: '',
        type: '',
        note: '',
        active: '',
        servers: [],
      },
    };
  }

  async componentDidMount() {
    this.setState({loading: true});
    const { data } = await this.fetch(`/api/deployment/${this.deploymentId}`);
    this.setState({ deployment: { ...data.data } });
    this.setState({loading: false});
  }

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  };

  render() {
    const { deployment } = this.state;
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
                    Deployment / {deployment.name}
                </span>
              </CardHeader>
              <div className="info-view card-background-logo">
                  <ul className="list-inline">
                      <li className="list-inline-item"><label htmlFor="Name">Name:</label> </li>
                      <li className="list-inline-item view-text-marked">{deployment.name}</li>
                  </ul>
                  <ul className="list-inline">
                      <li className="list-inline-item"><label htmlFor="Type">Type:</label></li>
                      <li className="list-inline-item view-text-marked">{deployment.type}</li>
                  </ul>
                  <ul className="list-inline">
                      <li className="list-inline-item"><label htmlFor="Note">Note:</label></li>
                      <li className="list-inline-item view-text-marked">{deployment.note}</li>
                  </ul>
                  <ul className="list-inline">
                      <li className="list-inline-item"><label htmlFor="Note">Active:</label></li>
                      <li className="list-inline-item view-text-marked">{deployment.active}</li>
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
                      Projects/Software
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
                      Servers
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    <Project data={deployment} />
                  </TabPane>
                  <TabPane tabId="3">
                    <Server data={deployment} />
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
const Server = ({ data }) => {
  const columns = [
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
          filterMethod: (filter, row) =>
            row[filter.id].toLowerCase().includes(filter.value.toLowerCase()),
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
          filterMethod: (filter, row) =>
            row[filter.id].toLowerCase().includes(filter.value.toLowerCase()),
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
          filterMethod: (filter, row) =>
            row[filter.id].toLowerCase().includes(filter.value.toLowerCase()),
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
          filterMethod: (filter, row) =>
            row[filter.id].toLowerCase().includes(filter.value.toLowerCase()),
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
          filterMethod: (filter, row) =>
            row[filter.id].toLowerCase().includes(filter.value.toLowerCase()),
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
          filterMethod: (filter, row) =>
            row[filter.id].toLowerCase().includes(filter.value.toLowerCase()),
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
          filterMethod: (filter, row) =>
            row[filter.id].toLowerCase().includes(filter.value.toLowerCase()),
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
  return (
    <ReactTable
      filterable
      columns={columns}
      data={data.servers}
      defaultPageSize={10}
      noDataText="Loading servers!"
      style={{
        height: '500px',
      }}
      className="-striped -highlight border-bottom-rounded"
    />
  );
};
// eslint-disable-next-line react/no-multi-comp
const Project = ({ data }) => {
  const columns = [
    {
      Header: 'Projects / Software',
      headerStyle: {
        fontSize: '1.125rem',
      },
      columns: [
        {
          Header: 'Project name',
          accessor: 'project.name',
          filterMethod: (filter, row) =>
            row[filter.id].toLowerCase().includes(filter.value.toLowerCase()),
          headerStyle: {
            textAlign: 'left',
            fontWeight: '400',
          },
          style: {
            textAlign: 'left',
          },
        },
        {
          Header: 'Client name',
          accessor: 'project.client.name',
          filterMethod: (filter, row) =>
            row[filter.id].toLowerCase().includes(filter.value.toLowerCase()),
          headerStyle: {
            textAlign: 'left',
            fontWeight: '400',
          },
          style: {
            textAlign: 'left',
          },
        },
        {
          Header: 'Software',
          accessor: 'software.name',
          filterMethod: (filter, row) =>
            row[filter.id].toLowerCase().includes(filter.value.toLowerCase()),
          headerStyle: {
            textAlign: 'center',
            fontWeight: '400',
          },
          style: {
            textAlign: 'center',
          },
        },
        {
          Header: 'Software version',
          accessor: 'software.version',
          filterMethod: (filter, row) =>
            row[filter.id].toLowerCase().includes(filter.value.toLowerCase()),
          headerStyle: {
            textAlign: 'center',
            fontWeight: '400',
          },
          style: {
            textAlign: 'center',
          },
        },
        {
          Header: 'Software vendor',
          accessor: 'software.vendor',
          filterMethod: (filter, row) =>
            row[filter.id].toLowerCase().includes(filter.value.toLowerCase()),
          headerStyle: {
            textAlign: 'center',
            fontWeight: '400',
          },
          style: {
            textAlign: 'center',
          },
        }
      ],
    },
  ];
  return (
    <ReactTable
      filterable
      columns={columns}
      data={data.ProjectUses}
      defaultPageSize={10}
      noDataText="Loading projects / softwares!"
      style={{
        height: '500px',
      }}
      className="-striped -highlight border-bottom-rounded"
    />
  );
};
export default withRouter(View);
