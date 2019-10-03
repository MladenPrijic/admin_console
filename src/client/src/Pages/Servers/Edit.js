import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import validator from 'validator';
import DatePicker from 'react-datepicker';
import moment from 'moment/moment';
import {
  Input,
  FormGroup,
  Label,
  Button,
  Card,
  CardBody,
  FormFeedback,
  Container,
  InputGroup,
  InputGroupAddon,
  Row,
  Col,
  Alert,
  InputGroupText,
} from 'reactstrap';
import { FaCalendar } from 'react-icons/fa';
import FormValidator from '../../common/FormValidator';
import Auth from '../../services/AuthService';
import Loading from '../../components/Loading/Loading';

const auth = new Auth();

class Edit extends Component {
  constructor(props) {
    super(props);
    this.fetch = auth.fetch();
    this.serverId = props.match.params.serverId;

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

    this.state = {
      loading: true,
      validation: this.validator.valid(),
      serverError: null,
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
        instalationDate: undefined,
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
    const { data } = await this.fetch(`/api/server/${this.serverId}`);
    data.data.instalationDate = data.data.instalationDate
      ? moment(data.data.instalationDate).toDate()
      : null;
    this.setState({
      server: { ...data.data },
      cloudProviderList,
      loading: false,
    });
  }

  handleOnSave = async e => {
    e.preventDefault();
    this.setState({ serverError: null });
    try {
      const validation = this.validator.validate(this.state.server);
      if (validation.isValid) {
        let data = { ...this.state.server };
        data.instalationDate
          ? (data.instalationDate = moment(data.instalationDate, 'YYYY-MM-DD'))
          : (data.instalationDate = null);
        await this.fetch.post('/api/server/edit', data);
        this.props.history.push('/server');
      } else {
        this.setState({ validation });
      }
    } catch (error) {
      this.setState({
        serverError: error.response
          ? error.response.data.message
          : 'Server error.',
      });
    }
  };

  handleOnChange = e => {
    let server = { ...this.state.server };
    server[e.target.name] =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
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
        <Col xs="12" sm="12" md="12" lg="6" className="col-centered">
          <Card>
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
                          value={this.state.server.name}
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
                          value={this.state.server.ip}
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
                          value={this.state.server.ports}
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
                          value={this.state.server.cluster}
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
                          value={this.state.server.ram}
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
                          value={this.state.server.storage}
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
                          value={this.state.server.purpose}
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
                          value={this.state.server.notes}
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
                          value={this.state.server.os}
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
                          value={this.state.server.version}
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
                          value={this.state.server.loginUrl}
                          onChange={this.handleOnChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label>Instalation date</Label>
                        <InputGroup>
                          <InputGroupAddon addonType="append">
                            <DatePicker
                              autoComplete="off"
                              name="instalationDate"
                              className="form-control"
                              dateFormat="yyyy-MM-dd"
                              selected={
                                this.state.server.instalationDate
                                  ? this.state.server.instalationDate
                                  : null
                              }
                              onChange={this.handleOnChangeDate}
                            />
                            <InputGroupText>
                              <FaCalendar />
                            </InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
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
                          value={this.state.server.cloudProviderId}
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
                        outline
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

export default withRouter(Edit);
