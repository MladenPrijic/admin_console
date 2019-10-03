import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { Row, Col, Alert } from 'reactstrap';
import * as Yup from 'yup';
import TextField from './components/input/text_field';
import Loader from 'react-loader-spinner';
import Auth from '../src/services/AuthService';

const auth = new Auth();

class Login extends Component {
  constructor(prop) {
    super(prop);
    this.validationSchema = Yup.object().shape({
      email: Yup.string()
        .email('E-mail is not valid!')
        .required('E-mail is required!'),
      password: Yup.string()
        .min(6, 'Password has to be longer than 6 characters!')
        .required('Password is required!'),
    });
  }

  render() {
    const mode = process.env.REACT_APP_MODE;
    const connection = process.env.REACT_APP_API_URL;
    return (
      <React.Fragment>
        {mode === 'DEV' && (
          <Row>
            <Col>
              <Alert color="info" className="text-center">
              <p><strong>DEVELOPMENT</strong></p>
              <p>Connected to: {connection}</p>
              </Alert>
            </Col>
          </Row>
        )}
        <Formik
          initialValues={{ email: '', password: '', serverErrorMsg: '' }}
          onSubmit={async (values, actions) => {
            try {
              await auth.login(values.email, values.password);
              this.props.history.replace('/project');
            } catch (error) {
              actions.setErrors({ serverErrorMsg: error.data.message });
            }
            actions.setSubmitting(false);
          }}
          validationSchema={this.validationSchema}
          render={({
            handleSubmit,
            handleChange,
            values,
            errors,
            isSubmitting,
          }) => (
            <Form onSubmit={handleSubmit}>
              <div className="container login-form">
                <div className="row justify-content-sm-center">
                  <div className="card text-center">
                    <div className="card-body">
                      {errors.serverErrorMsg && (
                        <Alert color="danger">
                          <div className="text-center">
                            {errors.serverErrorMsg}
                          </div>
                        </Alert>
                      )}
                      <img
                        src="/images/logo/logo.png"
                        className="form-img"
                        alt="ConcordSoft"
                      />
                      <p className="text-center mt-3">
                        Welcome back! Please login to your account.
                      </p>
                      <div className="card-block">
                        <div className="text-field mb-5">
                          <TextField
                            inputClass="form-control only-bottom-border"
                            placeholder="Email"
                            name="email"
                            inputChange={handleChange}
                            isError={errors.email !== undefined}
                            errorText={errors.email}
                            value={values.email}
                          />
                          <TextField
                            inputClass="form-control only-bottom-border"
                            placeholder="Password"
                            textFieldType="password"
                            name="password"
                            inputChange={handleChange}
                            isError={errors.password !== undefined}
                            errorText={errors.password}
                            value={values.password}
                          />
                        </div>
                      </div>
                      <div className="form-group d-inline-block mt-5">
                        {isSubmitting ? (
                          <Loader
                            color="#2376B5"
                            width="50"
                            height="50"
                            type="Oval"
                          />
                        ) : (
                          <button
                            type="Submit"
                            disabled={isSubmitting}
                            className="btn btn-primary mb-1 mr-2">
                            Login
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(Login);
