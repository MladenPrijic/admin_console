import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
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
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Auth from '../../services/AuthService';

const auth = new Auth();

class Add extends Component {
  constructor(props) {
    super(props);
    this.fetch = auth.fetch();
    this.validationSchema = Yup.object().shape({
      name: Yup.string().required('Name is required!'),
    });

  }

  handleOnSave = async e => {
    e.preventDefault();
    this.setState({ serverError: null });
    try {
      const validation = this.validator.validate(this.state.component);
      if (validation.isValid) {
        await this.fetch.post('/api/component/add', this.state.component);
        this.props.history.push('/component');
      } else {
        this.setState({ validation });
      }
    } catch (error) {
      this.setState({ serverError: error.data.message });
    }
  };

  handleOnChange = e => {
    let component = { ...this.state.component };
    component[e.target.name] = e.target.value;
    this.setState({ component });
  };

  render() {
    return (
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Card>
            <CardBody>
              <Container>
                <Formik
                  initialValues={{ name: '', description: '' }}
                  validationSchema={this.validationSchema}
                  onSubmit={async (values, { setSubmitting }) => {
                    try {
                      await this.fetch.post('/api/component/add', values);
                      this.props.history.push('/component');
                    } catch (error) {
                      this.setState({ serverError: error.data.message });
                    }
                    setSubmitting(false);
                  }}
                  render={({ handleChange, values, errors, isSubmitting }) => (
                    <Form>
                      <Row>
                        <Col>
                          <FormGroup>
                            <Label>Name</Label>
                            <Input
                              type="text"
                              name="name"
                              invalid={errors.name !== undefined}
                              value={values.name}
                              onChange={handleChange}
                            />
                            <FormFeedback valid={errors.name === undefined}>
                              {errors.name}
                            </FormFeedback>
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
                              value={values.description}
                              onChange={handleChange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row className="float-right">
                        <Col md="12">
                          <Button
                            outline
                            onClick={() =>
                              this.props.history.push('/component')
                            }>
                            Cancel
                          </Button>{' '}
                          <Button
                            color="primary"
                            type="submit"
                            disabled={isSubmitting}>
                            Save
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  )}
                />
              </Container>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default withRouter(Add);
