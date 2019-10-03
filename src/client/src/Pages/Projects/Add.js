import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import validator from 'validator';
import moment from 'moment';
import {
  Input,
  FormGroup,
  Label,
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  Col,
  Row,
  FormFeedback,
  ButtonGroup,
} from 'reactstrap';
import ReactTable from 'react-table';
import { FaPlus } from 'react-icons/fa';
import Select from '../../components/AdminConsoleSelect';
import FormValidator from '../../common/FormValidator';
import Auth from '../../services/AuthService';
import 'react-table/react-table.css';
import AddEditModal from '../../components/AddEditModal/AddEditModal';
import Loading from '../../components/Loading/Loading';
import { DatePicker } from 'antd';

const auth = new Auth();

class Add extends Component {
  constructor(props) {
    super(props);
    this.fetch = auth.fetch();

    this.validator = new FormValidator([
      {
        field: 'clientId',
        method: validator.isEmpty,
        validWhen: false,
        message: 'Client is required.',
      },
      {
        field: 'name',
        method: validator.isEmpty,
        validWhen: false,
        message: 'Name is required.',
      },
      {
        field: 'startDate',
        method: validator.isEmpty,
        validWhen: false,
        message: 'Start date is required.',
      },
    ]);

    this.state = {
      loading: true,
      modal: false,
      modalSoftware: false,
      modalState: 'NONE', //ADD,EDIT,NONE
      validation: this.validator.valid(),
      serverError: null,
      selectedDeployment: null,
      deployment: {
        deploymentId: '',
        deploymentError: null,
        softwareId: '',
        softwareError: null,
      },
      project: {
        clientId: '',
        name: '',
        startDate: '',
        endDate: '',
        notes: '',
        deployments: [],
      },
      clients: [],
      servers: [],
      deployments: [],
      softwares: [],
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
   
    const clients = await this.fetch.get('/api/client/getAll');
    const deployments = await this.fetch.get('/api/deployment/getAll');
    const softwares = await this.fetch.get('/api/software/getAll');

    this.setState({
      clients: clients.data.data.rows,
      deployments: deployments.data.data.rows,
      softwares: softwares.data.data.rows,
      loading: false
    });
  }

  toggle = modalState => {
    this.setState({
      modal: !this.state.modal,
      modalState: modalState ? modalState : 'NONE',
    });
  };

  handleOnSave = async e => {
    e.preventDefault();
    this.setState({ serverError: null });
    try {
      const validation = await this.validator.validate(this.state.project);
      if (validation.isValid) {
        let data = {...this.state.project};
        data.startDate = data.startDate === '' ? null : data.startDate;
        data.endDate = data.endDate === '' ? null : data.endDate;
        await this.fetch.post('/api/project/add', data);
        this.props.history.push('/project');
      } else {
        this.setState({ validation });
      }
    } catch (err) {
      console.error(err.response);
      let validation = { ...this.state.validation };
      this.setState({
        serverError: err.response ? err.response.data.message : 'Server error.',
        validation: validation,
      });
    }
  };

  handleOnChange = e => {
    let project = { ...this.state.project };
    project[e.target.name] =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    this.setState({ project: project });
  };

  handleOnAddDeployment = e => {
    e.preventDefault();
    const { deploymentId, softwareId } = this.state.deployment;
    if (deploymentId === '' || softwareId === '') {
      let deploymentError,
        softwareError = '';
      if (deploymentId === '') (deploymentError = 'Deployment is required.');
      if (softwareId === '') (softwareError = 'Software is required.');
      let deployment = { ...this.state.deployment };
      deployment.deploymentError = deploymentError;
      deployment.softwareError = softwareError;
      this.setState({ deployment });
      return;
    }
    let data = { ...this.state.project };
    const deployment = this.state.deployments.find(
      item => item.id === +this.state.deployment.deploymentId
    );
    const software = this.state.softwares.find(
      item => item.id === +this.state.deployment.softwareId
    );
    const item = {
      deploymentId: deployment.id,
      deploymentName: deployment.name,
      deploymentType: deployment.type,
      softwareId: software.id,
      softwareName: software.name,
      softwareVersion: software.version,
    };
    data.deployments.push(item);

    let deploymentData = { ...this.state.deployment };
    deploymentData['deploymentId'] = '';
    deploymentData['softwareId'] = '';
    deploymentData['deploymentError'] = '';
    deploymentData['softwareError'] = '';
    this.setState({
      project: data,
      modal: false,
      selectedSoftwareIndex: null,
      deployment: deploymentData,
    });
  };

  handleOnDelDeployment = index => {
    let data = { ...this.state.project };
    data.deployments.splice(index, 1);
    this.setState({ project: data });
  };

  handleOnSelectChange = (name, data) => {
    let project = { ...this.state.project };
    project[name] = data ? data.value : '';
    this.setState({ project });
  };

  handleOnChangeDate = (name, date) => {
    let project = { ...this.state.project };
    project[name] = date === undefined ? '' : date;
    this.setState({ project });
  };

  handleOnSelectModalChange = (name, data) => {
    let deployment = { ...this.state.deployment };
    deployment[name] = data ? data.value : null;
    this.setState({ deployment });
  };

    //ANT DATEPICKER
    disabledStartDate = startValue => {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    };

    disabledEndDate = endValue => {
        const startValue = this.state.startValue;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    };

    onChange = (field, value) => {
        let project = { ...this.state.project };
        project[field] = value;
        this.setState({ project });
    };

    onStartChange = value => {
        this.onChange('startDate', value ? value.format('YYYY-MM-DD') : '');
    };

    onEndChange = value => {
        this.onChange('endDate', value ? value.format('YYYY-MM-DD') : '');
    };

    handleStartOpenChange = open => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    };

    handleEndOpenChange = open => {
        this.setState({ endOpen: open });
    };
    //END ANT DATEPICKER

  render() {
    // const serversList = _.differenceWith(
    //   this.state.deployments,
    //   this.state.project.deployments,
    //   (depSelect, depTable) => {
    //     return depSelect.id === depTable.id;
    //   }
    // );
    const { endOpen } = this.state;
    const serversList = [...this.state.deployments];
    const deployments = serversList.map(item => {
      return { value: item.id, label: item.name };
    });
    const clients = this.state.clients.map(item => {
      return { value: item.id, label: item.name };
    });
    const softwares = this.state.softwares.map(item => {
      return { value: item.id, label: item.name };
    });
    const columns = [
      {
        Header: 'Deployments',
        headerStyle: {
          fontSize: '1.125rem',
            fontWeight: '300',
        },
        columns: [
          {
            Header: 'Name',
            accessor: 'deploymentName',
            headerStyle: {
              textAlign: 'left',
              fontWeight: '300',
            },
            style: {
              textAlign: 'left',
            },
          },
          {
            Header: 'Type',
            accessor: 'deploymentType',
            headerStyle: {
              textAlign: 'left',
              fontWeight: '300',
            },
            style: {
              textAlign: 'left',
              verticalAlign: 'middle',
            },
          },
          {
            Header: 'Software',
            accessor: 'softwareName',
            headerStyle: {
              textAlign: 'left',
              fontWeight: '300',
            },
            style: {
              textAlign: 'left',
              verticalAlign: 'middle',
            },
          },
          {
            Header: 'Version',
            accessor: 'softwareVersion',
            headerStyle: {
              textAlign: 'left',
              fontWeight: '300',
            },
            style: {
              textAlign: 'left',
              verticalAlign: 'middle',
            },
          },
          {
            Header: 'Actions',
            headerStyle: {
              textAlign: 'center',
              fontWeight: '300',
            },
            style: {
              textAlign: 'center',
            },
            Cell: props => (
              <ButtonGroup>
                <Button
                  outline
                  color="danger"
                  size="sm"
                  onClick={() => this.handleOnDelDeployment(props.row._index)}>
                  Delete
                </Button>
              </ButtonGroup>
            ),
          },
        ],
      },
    ];
    if (this.state.loading) return <Loading />;
    const startDate =
        this.state.project.startDate !== ''
            ? moment(this.state.project.startDate, 'DD-MM-YYYY')
            : null;
    const endDate =
        this.state.project.endDate !== ''
            ? moment(this.state.project.endDate, 'DD-MM-YYYY')
            : null;

    return (
      <React.Fragment>
        <AddEditModal
          isOpen={this.state.modal}
          toggle={() => this.toggle('NONE')}
          handleOnConfirm={this.handleOnAddDeployment}
          headerText="Project use"
          confirmText="Add"
          cancelText="Cancel"
          handleOnCancel={() => this.toggle('NONE')}>
          <FormGroup>
            <Label>Deployment</Label>
            <Select
              name="deployment"
              value={deployments.find(
                option => option.value === this.state.deployment.deploymentId
              )}
              onChange={(data, event) =>
                this.handleOnSelectModalChange('deploymentId', data, event)
              }
              isClearable
              options={deployments}
            />
            <span className="text-danger">{this.state.deployment.deploymentError}</span>
          </FormGroup>
          <FormGroup>
            <Label>Software</Label>
            <Select
              name="software"
              value={softwares.find(
                option => option.value === this.state.deployment.softwareId
              )}
              onChange={(data, event) =>
                this.handleOnSelectModalChange('softwareId', data, event)
              }
              isClearable
              options={softwares}
            />
            <span className="text-danger">{this.state.deployment.softwareError}</span>
          </FormGroup>
        </AddEditModal>

        <Row>
          <Col className="col-md-8 mx-auto">
            <Card>
                <CardHeader>Add project</CardHeader>
              <CardBody>
                <Container>
                  <form onSubmit={this.handleOnSave}>
                    <Row>
                      <Col md="6">
                        <FormGroup>
                          <Label>Name</Label>
                          <Input
                            name="name"
                            placeholder="Add project name"
                            title="Add name"
                            invalid={this.state.validation.name.isInvalid}
                            onChange={this.handleOnChange}
                          />
                          <FormFeedback
                            valid={!this.state.validation.name.isInvalid}>
                            {this.state.validation.name.message}
                          </FormFeedback>
                        </FormGroup>
                      </Col>
                        <Col md="6">
                            <FormGroup>
                                <Label>Client</Label>
                                <Select
                                    name="Client"
                                    onChange={(data, event) =>
                                        this.handleOnSelectChange('clientId', data, event)
                                    }
                                    isValid={!this.state.validation.clientId.isInvalid}
                                    isClearable
                                    options={clients}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                      <Col md="6">
                        <FormGroup>
                          <Label>Start date</Label>
                            <DatePicker
                                className={{"mr-3 d-block":true, "has-error":this.state.validation.startDate.isInvalid === true}}
                                disabledDate={this.disabledStartDate}
                                style={ {
                                  width:"100%"
                                }}
                                showTime
                                format="DD-MM-YYYY"
                                value={startDate}
                                validateStatus="error"
                                placeholder="Start date"
                                onChange={this.onStartChange}
                                onOpenChange={this.handleStartOpenChange}
                            />
                          {/*<DataPicker*/}
                            {/*className="d-block"*/}
                            {/*format="YYYY-MM-DD"*/}
                            {/*placeholder="YYYY-MM-DD"*/}
                            {/*valid={this.state.validation.startDate.isInvalid}*/}
                            {/*onDayChange={date =>*/}
                              {/*this.handleOnChangeDate('startDate', date)*/}
                            {/*}*/}
                          {/*/>*/}
                          <span className="is-invalid">
                            {this.state.validation.startDate.message}
                          </span>
                        </FormGroup>
                      </Col>
                      <Col md="6">
                        <FormGroup>
                          <Label>End date</Label>
                            <DatePicker
                                className="d-block"
                                disabledDate={this.disabledEndDate}
                                style={ {
                                    width:"100%"
                                }}
                                showTime
                                format="DD-MM-YYYY"
                                value={endDate}
                                placeholder="End date"
                                onChange={this.onEndChange}
                                open={endOpen}
                                onOpenChange={this.handleEndOpenChange}
                            />
                          {/*<DataPicker*/}
                            {/*className="d-block"*/}
                            {/*format="YYYY-MM-DD"*/}
                            {/*placeholder="YYYY-MM-DD"*/}
                            {/*onDayChange={date =>*/}
                              {/*this.handleOnChangeDate('endDate', date)*/}
                            {/*}*/}
                          {/*/>*/}
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="col-sm-12 col-md-8">
                        <FormGroup>
                          <Label>Notes</Label>
                          <Input
                            type="textarea"
                            name="notes"
                            onChange={this.handleOnChange}
                          />
                        </FormGroup>
                      </Col>
                        <Col className="d-flex flex-column col-sm-12 col-md-4">
                            <FormGroup className="mt-auto">
                                <Button
                                    className="float-right"
                                    color="primary"
                                    onClick={() => this.toggle('ADD')}>
                                    <FaPlus /> Add deployment
                                </Button>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup>
                          <ReactTable
                            columns={columns}
                            data={this.state.project.deployments}
                            defaultPageSize={10}
                            style={{
                                height: '400px',
                            }}
                            className="-striped -highlight"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row className="float-right">
                      <Col md="12">
                        <Button
                          outline
                          onClick={() => this.props.history.push('/project')}>
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
      </React.Fragment>
    );
  }
}

export default withRouter(Add);
