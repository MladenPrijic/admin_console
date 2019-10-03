import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import validator from 'validator';
import ReactTable from 'react-table';
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
  InputGroup,
  InputGroupAddon,
  ButtonGroup,
} from 'reactstrap';
import FormValidator from '../../common/FormValidator';
import Auth from '../../services/AuthService';
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
        message: 'Name is requred.',
      },
      {
        field: 'version',
        method: validator.isEmpty,
        validWhen: false,
        message: 'Version is requerd.',
      },
    ]);

    this.state = {
      loading: true,
      validation: this.validator.valid(),
      serverError: null,
      modalRole: false,
      componentList: [],
      software: {
        name: '',
        version: '',
        vendor: '',
        description: '',
        licence: '',
        components: [],
        componentSelected: '',
      },
    };
  }

  async componentDidMount() {
    const { data } = await this.fetch.get('/api/component/getAll');
    this.setState({ componentList: data.data.rows, loading: false });
  }

  handleOnSave = async e => {
    e.preventDefault();
    this.setState({ serverError: null });
    const validation = this.validator.validate(this.state.software);
    if (validation.isValid) {
      try {
        let data = { ...this.state.software };
        delete data.componentSelected;
        await this.fetch.post('/api/software/add', data);
        this.props.history.push('/software');
      } catch (err) {
        let validation = { ...this.state.validation };
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
    let software = { ...this.state.software };
    software[e.target.name] =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    this.setState({ software });
  };

  handleOnSelectComponent = data => {
    let software = { ...this.state.software };
    software['component_id'] = data ? data.value : null;
    this.setState({ software });
  };

  handleOnAddComponent = e => {
    e.preventDefault();
    const componentId = +this.state.software.componentSelected;
    const index = this.state.componentList.findIndex(
      item => item.id === componentId
    );
    let software = { ...this.state.software };
    software.components.push(this.state.componentList[index]);
    this.setState({ software });
  };

  handleOnDelComponent = row => {
    const index = this.state.software.components.findIndex(
      item => item.id === row._original.id
    );
    let software = { ...this.state.software };
    software.components.splice(index, 1);
    this.setState({ software });
  };

  render() {
    const { componentList } = this.state;
    const { components } = this.state.software;
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
                  onClick={() => this.handleOnDelComponent(props.row)}>
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
          <Col xs="12" sm="12" md="12" lg="6" className="col-centered">
          <Card>
            <CardHeader>Add software</CardHeader>
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
                        <Label>Version</Label>
                        <Input
                          type="text"
                          name="version"
                          invalid={this.state.validation.version.isInvalid}
                          onChange={this.handleOnChange}
                        />
                        <FormFeedback
                          valid={!this.state.validation.version.isInvalid}>
                          {this.state.validation.version.message}
                        </FormFeedback>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>Vendor</Label>
                        <Input
                          type="text"
                          name="vendor"
                          value={this.state.software.vendor}
                          onChange={this.handleOnChange}
                        />
                      </FormGroup>
                    </Col>
                      <Col>
                          <FormGroup>
                              <Label>Licence</Label>
                              <Input
                                  type="text"
                                  name="licence"
                                  onChange={this.handleOnChange}
                              />
                          </FormGroup>
                      </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>Description</Label>
                        <Input
                          type="text"
                          name="description"
                          onChange={this.handleOnChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label>Component</Label>
                        <InputGroup>
                          <Input
                            className="custom-select"
                            type="select"
                            placeholder="Please select component"
                            name="componentSelected"
                            value={this.state.software.componentSelected || ''}
                            onChange={this.handleOnChange}>
                            <option value="">--- Please select ---</option>
                            {componentList.map(item => (
                              <option key={item.id} value={item.id}>
                                {item.name}
                              </option>
                            ))}
                          </Input>
                          <InputGroupAddon addonType="append">
                            <Button onClick={this.handleOnAddComponent}>
                              Link to component
                            </Button>
                          </InputGroupAddon>
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                        <FormGroup>
                          <ReactTable
                            columns={columns}
                            data={components ? components : []}
                            defaultPageSize={5}
                            style={{
                              height: '350px',
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
                        onClick={() => this.props.history.push('/software')}>
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
    );
  }
}

export default withRouter(Add);
