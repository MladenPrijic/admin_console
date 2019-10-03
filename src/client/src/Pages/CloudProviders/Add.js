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
  Col,
  Row,
} from 'reactstrap';
import FormValidator from '../../common/FormValidator';
import Auth from '../../services/AuthService';

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
        message: 'Name is required.',
      },
    ]);

    this.state = {
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
        salse_contact_name: '',
        salse_contact_phone: '',
        support_contact_name: '',
        support_contact_phone: '',
      },
    };
  }

  handleOnSave = async e => {
    e.preventDefault();
    this.setState({ serverError: null });
    console.log(this.props);
    try {
      const validation = this.validator.validate(this.state.cloudProvider);
      if (validation.isValid) {
        await this.fetch.post(
          '/api/cloud-provider/add',
          this.state.cloudProvider
        );
        this.props.history.push('/cloud-provider');
      } else {
        this.setState({ validation });
      }
    } catch (error) {
      this.setState({ serverError: error.data.message });
    }
  };

  handleOnChange = e => {
    let cloudProvider = { ...this.state.cloudProvider };
    cloudProvider[e.target.name] = e.target.value;
    this.setState({ cloudProvider });
  };

  render() {
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
                        onClick={() =>
                          this.props.history.push('/cloud-provider')
                        }>
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
