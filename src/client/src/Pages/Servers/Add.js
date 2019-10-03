import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import validator from 'validator';
import moment from 'moment/moment';
import {
  Input,
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
} from 'reactstrap';
import FormValidator from '../../common/FormValidator';
import Auth from '../../services/AuthService';
import 'react-datepicker/dist/react-datepicker.css';
import Loading from '../../components/Loading/Loading';
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
        message: 'Server name is not requred.',
      },
      {
        field: 'ip',
        method: validator.isEmpty,
        validWhen: false,
        message: 'ip is requerd.',
      },
    ]);

    this.projectValidator = new FormValidator([
      {
        field: 'name',
        method: validator.isEmpty,
        validWhen: false,
        message: 'Project name is not valid.',
      },
    ]);

    this.state = {
      loading: true,
      validation: this.validator.valid(),
      modal: false,
      projectValadition: this.projectValidator.valid(),
      serverError: null,
      modalProject: false,
      projectList: [],
      cloudProviderList: [],
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
        instalationDate: null,
        createdBy: '',
        modefiedBy: '',
        cloudProviderId: null,
        projects: [],
      },
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const cloudProviders = await this.fetch.get('/api/cloud-provider/getAll');
    const cloudProviderList = cloudProviders.data.data.rows.map(item => {
      return { value: item.id, label: item.name };
    });
    this.setState({ cloudProviderList, loading: false });
  }

  handleOnSave = async e => {
    e.preventDefault();
    this.setState({ serverError: null });
    const validation = this.validator.validate(this.state.server);
    if (validation.isValid) {
      try {
        let data = { ...this.state.server };
        debugger;
        data.cloudProviderId = +data.cloudProviderId;
        data.instalationDate
          ? (data.instalationDate = moment(data.instalationDate, 'YYYY-MM-DD'))
          : (data.instalationDate = null);
        await this.fetch.post('/api/server/add', data);
        this.props.history.push('/server');
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
    let server = { ...this.state.server };
    server[e.target.name] =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    server[e.target.name] =
      e.target.type === 'select' && e.target.value === ''
        ? null
        : e.target.value;
    this.setState({ server: server });
  };

  handleOnChangeDate = date => {
    let server = { ...this.state.server };
    server['instalationDate'] = date;
    this.setState({ server });
  };

  render() {
    if (this.state.loading) return <Loading />;
    return (
      <Row>
          <Col  xs="12" sm="12" md="12" lg="6"  className="col-centered">
          <Card>
            <CardHeader>Add server</CardHeader>
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
                        <Label>IP</Label>
                        <Input
                          type="text"
                          name="ip"
                          invalid={this.state.validation.ip.isInvalid}
                          onChange={this.handleOnChange}
                        />
                        <FormFeedback
                          valid={!this.state.validation.ip.isInvalid}>
                          {this.state.validation.ip.message}
                        </FormFeedback>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>Ports</Label>
                        <Input
                          type="text"
                          name="ports"
                          onChange={this.handleOnChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>Cluster</Label>
                        <Input
                          type="text"
                          name="cluster"
                          onChange={this.handleOnChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>Ram</Label>
                        <Input
                          type="text"
                          name="ram"
                          onChange={this.handleOnChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>CPU</Label>
                        <Input
                          type="text"
                          name="cpu"
                          value={this.state.server.cpu}
                          onChange={this.handleOnChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>Storage</Label>
                        <Input
                          type="text"
                          name="storage"
                          onChange={this.handleOnChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>Purpose</Label>
                        <Input
                          type="text"
                          name="purpose"
                          onChange={this.handleOnChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>Notes</Label>
                        <Input
                          type="text"
                          name="notes"
                          onChange={this.handleOnChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>Operation system</Label>
                        <Input
                          type="text"
                          name="os"
                          onChange={this.handleOnChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>Version</Label>
                        <Input
                          type="text"
                          name="version"
                          onChange={this.handleOnChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>Login url</Label>
                        <Input
                          type="text"
                          name="loginUrl"
                          onChange={this.handleOnChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>Instalation date</Label>
                        <div className="d-block">
                          <DatePicker
                            dateFormat="yyyy-MM-dd"
                            className="form-control d-block"
                            autoComplete="off"
                            selected={this.state.server.instalationDate}
                            name="instalationDate"
                            onChange={this.handleOnChangeDate}
                          />
                        </div>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>Cloud provider</Label>
                        <Input
                          className="custom-select"
                          type="select"
                          name="cloudProviderId"
                          onChange={this.handleOnChange}>
                          <option value="">Choose provider</option>
                          {this.state.cloudProviderList.map((item, index) => (
                            <option key={index} value={item.value}>
                              {item.label}
                            </option>
                          ))}
                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className="float-right">
                    <Col md="12">
                      <Button
                        onClick={() => this.props.history.push('/server')}>
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
