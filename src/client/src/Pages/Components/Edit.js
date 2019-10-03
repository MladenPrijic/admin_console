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
  Row,
  Col,
} from 'reactstrap';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Auth from '../../services/AuthService';
import Loading from '../../components/Loading/Loading';

const auth = new Auth();

class Edit extends Component {
  constructor(props) {
    super(props);
    this.fetch = auth.fetch();
    this.componentId = props.match.params.componentId;
    this.validationSchema = Yup.object().shape({
      name: Yup.string().required('Name is required!'),
    });

    this.state = {
      loading: true,
      serverError: null,
      component: {
        name: '',
        description: '',
      },
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const component = await this.fetch.get(
      `/api/component/${this.componentId}`
    );
    this.setState({ component: component.data.data, loading: false });
  }

  render() {
    const { name, description, id } = this.state.component;
    if (this.state.loading) return <Loading />;
    return (
      <Row>
        <Col xs="12" sm="12" md="6" lg="4" className="col-centered">
          <Card>
            <CardBody>
              <Container>
                <Formik
                  initialValues={{
                    name: name,
                    description: description,
                    id: id,
                  }}
                  validationSchema={this.validationSchema}
                  onSubmit={async (values, { setSubmitting }) => {
                    try {
                      await this.fetch.post('/api/component/edit', values);
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

export default withRouter(Edit);
