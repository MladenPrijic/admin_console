import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import validator from 'validator';
import {
  Input,
  FormGroup,
  Label,
  Button,
  Card,
  CardBody,
  FormFeedback,
  Container,
  Row,
  Col,
} from 'reactstrap';
import FormValidator from '../../common/FormValidator';
import Auth from '../../services/AuthService';
import Loading from '../../components/Loading/Loading';

const auth = new Auth();

class Add extends Component {
  constructor(props) {
    super(props);
    this.fetch = auth.fetch();
    this.cloudProviderId = props.match.params.cloudProviderId;

    this.validator = new FormValidator([
      {
        field: 'name',
        method: validator.isEmpty,
        validWhen: false,
        message: 'Name is required.',
      },
    ]);

    this.state = {
      loading: true,
      validation: this.validator.valid(),
      serverError: null,
      cloudProvider: {
        id: '',
        name: '',
        short_name: '',
        phone: '',
        address: '',
        postal_code: '',
        city: '',
        salesContactName: '',
        salesContactPhone: '',
        supportContactName: '',
        supportContactPhone: '',
      },
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const { data } = await this.fetch(
      `/api/cloud-provider/${this.cloudProviderId}`
    );
    this.setState({ cloudProvider: { ...data.cloudProvider }, loading: false });
  }

  handleOnSave = async e => {
    e.preventDefault();
    this.setState({ serverError: null });
    try {
      const validation = this.validator.validate(this.state.cloudProvider);
      if (validation.isValid) {
        await this.fetch.post(
          '/api/cloud-provider/edit',
          this.state.cloudProvider
        );
        this.props.history.push('/cloud-provider');
      } else {
        this.setState({ validation });
      }
    } catch (error) {
      this.setState({
        serverError: error.responese ? error.responese.message : error.message,
      });
    }
  };

  handleOnChange = e => {
    let cloudProvider = { ...this.state.cloudProvider };
    cloudProvider[e.target.name] = e.target.value;
    this.setState({ cloudProvider });
  };

  render() {
    if (this.state.loading) return <Loading />;
    return (
      <Row>
          <Col  xs="12" sm="12" md="12" lg="6"  className="col-centered">
          <Card>
            <CardBody>
              <Container>
                <form onSubmit={this.handleOnSave}>
                  <Row>
                    <Col md="4">
                      <FormGroup>
                        <Label>Name</Label>
                        <Input
                          type="text"
                          name="name"
                          invalid={this.state.validation.name.isInvalid}
                          value={this.state.cloudProvider.name}
                          onChange={this.handleOnChange}
                        />
                        <FormFeedback
                          valid={!this.state.validation.name.isInvalid}>
                          {this.state.validation.name.message}
                        </FormFeedback>
                      </FormGroup>
                    </Col>

                    <Col md="4">
                      <FormGroup>
                        <Label>Short name</Label>
                        <Input
                          type="text"
                          value={this.state.cloudProvider.shortName}
                          name="shortName"
                          onChange={this.handleOnChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>Support contact name</Label>
                        <Input
                          type="text"
                          value={this.state.cloudProvider.supportContactName}
                          name="supportContactName"
                          onChange={this.handleOnChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <FormGroup>
                        <Label>Support contact phone</Label>
                        <Input
                          type="text"
                          value={this.state.cloudProvider.supportContactPhone}
                          name="supportContactPhone"
                          onChange={this.handleOnChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>Salse contact name</Label>
                        <Input
                          type="text"
                          value={this.state.cloudProvider.salesContactName}
                          name="salesContactName"
                          onChange={this.handleOnChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>Salse contact phone</Label>
                        <Input
                          type="text"
                          value={this.state.cloudProvider.salesContactPhone}
                          name="salesContactPhone"
                          onChange={this.handleOnChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <FormGroup>
                        <Label>Address</Label>
                        <Input
                          type="text"
                          value={this.state.cloudProvider.address}
                          name="address"
                          onChange={this.handleOnChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>City</Label>
                        <Input
                          type="text"
                          value={this.state.cloudProvider.city}
                          name="city"
                          onChange={this.handleOnChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>Postal code</Label>
                        <Input
                          type="text"
                          value={this.state.cloudProvider.postalCode}
                          name="postalCode"
                          onChange={this.handleOnChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <FormGroup>
                        <Label>Phone</Label>
                        <Input
                          type="text"
                          value={this.state.cloudProvider.phone}
                          name="phone"
                          onChange={this.handleOnChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="4">
                      <FormGroup>
                        <Label>Portal url</Label>
                        <Input
                          type="text"
                          value={this.state.cloudProvider.portalUrl}
                          name="portalUrl"
                          onChange={this.handleOnChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className="float-right">
                    <Col md="12">
                      <Button
                        outline
                        className="btn-rounded"
                        onClick={() =>
                          this.props.history.push('/cloud-provider')
                        }>
                        Cancel
                      </Button>{' '}
                      <Button
                        className="btn-rounded"
                        color="primary"
                        type="submit">
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
