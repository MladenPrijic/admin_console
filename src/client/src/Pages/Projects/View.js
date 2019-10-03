import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
} from 'reactstrap';
import { FaArrowLeft } from 'react-icons/fa';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Auth from '../../services/AuthService';
import Loading from '../../components/Loading/Loading';

const auth = new Auth();

class View extends Component {
  constructor(props) {
    super(props);
    this.fetch = auth.fetch();
    this.projectId = props.match.params.projectId;

    this.state = {
      loading: true,
      project: {
        active: null,
        clientId: '',
        cloudProvider: {},
        cloudProviderId: '',
        id: '',
        notes: '',
        server: {},
        serverId: 19,
        validFrom: '',
        validTo: '',
        software: [],
      },
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const { data } = await this.fetch(`/api/project/${this.projectId}`);
    this.setState({ loading: false, project: { ...data.project } });
  }

  render() {
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
            accessor: 'Deployment.name',
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
            accessor: 'Deployment.type',
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
            Header: 'Software',
            accessor: 'software.name',
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
            Header: 'Version',
            accessor: 'software.version',
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
    const columnsServer = [
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

    if (this.state.loading) return <Loading/>;
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
                <span className="align-text-top">Project / {this.state.project.name}</span>
              </CardHeader>
              <div className="info-view card-background-logo">
                  <ul className="list-inline">
                      <li className="list-inline-item"><label htmlFor="Client">Client:</label> </li>
                      <li className="list-inline-item">
                          <Link to={`/client/view/${this.state.project.client.id}`}>
                              {this.state.project.client.name}
                          </Link>
                      </li>
                  </ul>
                  <ul className="list-inline">
                      <li className="list-inline-item"><label htmlFor="Valid from">Valid from:</label></li>
                      <li className="list-inline-item view-text-marked">{this.state.project.startDate}</li>
                  </ul>
                  <ul className="list-inline">
                      <li className="list-inline-item"><label htmlFor="Valid to">Valid to:</label></li>
                      <li className="list-inline-item view-text-marked">{this.state.project.endDate}</li>
                  </ul>
              </div>
              <CardBody>
                  <Row>
                    <Col>
                      <ReactTable
                        columns={columns}
                        data={
                          this.state.project.ProjectUses
                            ? this.state.project.ProjectUses
                            : []
                        }
                        SubComponent={row => {
                          const { servers } = row.original.Deployment;
                          return (
                            <div style={{ padding: '20px' }}>
                              <em>Servers related to the deployment.</em>
                              <br />
                              <br />
                              <ReactTable
                                defaultPageSize={5}
                                style={{
                                  height: '350px',
                                }}
                                className="-striped -highlight"
                                columns={columnsServer}
                                data={servers}
                              />
                            </div>
                          );
                        }}
                        defaultPageSize={10}
                        style={{
                          height: '500px',
                        }}
                        className="-striped -highlight"
                      />
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
