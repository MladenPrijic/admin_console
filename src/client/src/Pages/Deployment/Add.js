import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import validator from 'validator';
import ReactTable from 'react-table';
import {
  Input,
  InputGroup,
  InputGroupAddon,
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
  ButtonGroup,
} from 'reactstrap';
import FormValidator from '../../common/FormValidator';
import Auth from '../../services/AuthService';
import 'react-datepicker/dist/react-datepicker.css';
import Loading from '../../components/Loading/Loading';
import {FaTrash} from "react-icons/fa";
const auth = new Auth();

class Add extends Component {
  constructor(props) {
    super(props);
    this.fetch = auth.fetch();

    this.validator = new FormValidator([
      {
        field: 'name',
        method: validator.isEmpty,
        validWhen: false,
        message: 'Deployment name is not requred.',
      },
      {
        field: 'type',
        method: validator.isIn,
        args: [['VM', 'CLUSTER', 'DEDICATED']],
        validWhen: true,
        message: 'Type is requerd.',
      },
    ]);

    this.state = {
      loading: true,
      validation: this.validator.valid(),
      modal: false,
      serverError: null,
      modalProject: false,
      selectedServer: '',
      servers: [],
      deployment: {
        name: '',
        type: '',
        note: '',
        servers: [],
      },
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const { data } = await this.fetch.get('/api/server/getAll');
    this.setState({ servers: data.data.rows, loading: false });
  }

  handleOnSave = async e => {
    e.preventDefault();
    this.setState({ serverError: null });
    const validation = this.validator.validate(this.state.deployment);
    if (validation.isValid) {
      try {
        let data = { ...this.state.deployment };
        await this.fetch.post('/api/deployment/add', data);
        this.props.history.push('/deployment');
      } catch (err) {
        let validation = { ...this.state.validation };
        console.log(err);
        for (const item of err.response.data.data) {
          if (validation[item.param]) {
            validation[item.param].isInvalid = true;
            validation[item.param].message = item.msg;
          }
        }
        this.setState({ validation });
      }
    } else {
      this.setState({ validation });
    }
  };

  handleOnChange = e => {
    let deployment = { ...this.state.deployment };
    deployment[e.target.name] =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    deployment[e.target.name] =
      e.target.type === 'select' && e.target.value === ''
        ? null
        : e.target.value;
    this.setState({ deployment: deployment });
  };

  handleOnChangeDate = date => {
    let deployment = { ...this.state.deployment };
    deployment['instalationDate'] = date;
    this.setState({ deployment });
  };

  handleOnSelectServer = e => {
    this.setState({ selectedServer: e.target.value });
  };

  handleOnAddServer = () => {
    let servers = [...this.state.deployment.servers];
    let deployment = this.state.deployment;
    servers.push(
      this.state.servers[
        this.state.servers.findIndex(
          item => item.id === +this.state.selectedServer
        )
      ]
    );
    deployment.servers = servers;
    deployment.server = '';
    this.setState({ deployment: deployment, selectedServer: '' });
  };

  handlerOnServerDel = id => {
    let servers = [...this.state.deployment.servers];
    let deployment = this.state.deployment;
    servers.splice(servers.findIndex(item => item.id === +id), 1);
    deployment.servers = servers;
    this.setState({ deployment: deployment, selectedServer: '' });
  };

  render() {
    const { servers } = this.state;
    const choosedServers = this.state.deployment.servers;
    const serversList = _.differenceWith(servers, choosedServers, !_.isEqual);
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
            Header: 'Actions',
            filterable: false,
            headerStyle: {
              textAlign: 'center',
              fontWeight: '400',
            },
            style: {
              textAlign: 'center',
            },
            Cell: props => (
              <ButtonGroup>
                <Button
                  color="link"
                  size="sm"
                  onClick={() =>
                    this.handlerOnServerDel(props.row._original.id)
                  }>
                  <FaTrash />
                </Button>
              </ButtonGroup>
            ),
          },
        ],
      },
    ];
    if (this.state.loading) return <Loading />;
    return (
      <Row>
          <Col sm="12" md={{ size: 8, offset: 2 }}>
          <Card>
            <CardHeader>Add deployment</CardHeader>
            <CardBody>
              <Container>
                {this.state.serverError && (
                  <Alert color="danger">{this.state.serverError}</Alert>
                )}
                <form onSubmit={this.handleOnSave}>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>Name</Label>
                        <Input
                          type="text"
                          name="name"
                          invalid={this.state.validation.name.isInvalid}
                          onChange={this.handleOnChange}
                        />
                        <FormFeedback
                          valid={!this.state.validation.name.isInvalid}>
                          {this.state.validation.name.message}
                        </FormFeedback>
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>Type</Label>
                        <Input
                          className="custom-select"
                          type="select"
                          name="type"
                          onChange={this.handleOnChange}
                          invalid={this.state.validation.type.isInvalid}>
                          <option value="">--- Choose server type ---</option>
                          <option value="VM">Virtual machine</option>
                          <option value="CLUSTER">Cluster</option>
                          <option value="DEDICATED">Dedicated</option>
                        </Input>
                        <FormFeedback
                          valid={!this.state.validation.type.isInvalid}>
                          {this.state.validation.type.message}
                        </FormFeedback>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Label>Deployment use servers</Label>
                      <InputGroup>
                        <Input
                          className="custom-select"
                          type="select"
                          name="server"
                          innerRef={el => (this.serverSelect = el)}
                          value={this.state.selectedServer}
                          onChange={this.handleOnSelectServer}>
                          <option value="">--- Choose the server ---</option>
                          {serversList.map(item => (
                            <option key={item.id} value={item.id}>
                              {`Name:${item.name} IP:${item.ip}`}
                            </option>
                          ))}
                        </Input>
                        <InputGroupAddon addonType="append">
                          <Button
                            color="secondary"
                            disabled={this.state.selectedServer === ''}
                            onClick={this.handleOnAddServer}>
                            Add server
                          </Button>
                        </InputGroupAddon>
                      </InputGroup>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col>
                      <ReactTable
                        filterable
                        columns={columns}
                        data={choosedServers}
                        defaultPageSize={10}
                        noDataText="Loading servers!"
                        style={{
                          height: '500px',
                        }}
                        className="-striped -highlight border-bottom-rounded"
                      />
                    </Col>
                  </Row>
                  <br />
                  <Row className="float-right">
                    <Col md="12">
                      <Button
                        onClick={() => this.props.history.push('/deployment')}>
                        Cancel
                      </Button>{' '}
                      <Button type="submit" color="primary">
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
