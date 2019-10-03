import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import TextField from "./components/input/text_field";
import Auth from "./services/AuthService";

const auth = new Auth();

class Password extends Component {
  constructor(props) {
    super(props);
    this.fetch = auth.fetch();

    this.state = {
      password: "",
      repeatPassword: ""
    };
  }

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleOnSetPassword = async e => {
    e.preventDefault();
    try {
      await this.fetch.post("/api/auth/password", this.state);
      auth.logout();
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    if (auth.loggedIn() === false) {
      return <Redirect to="/" />;
    }

    return (
      <React.Fragment>
        <form>
          <div className="container login-form">
            <div className="row justify-content-sm-center">
              <div className="card text-center">
                <div className="card-body">
                  <img
                    src="/images/logo/logo.png"
                    className="form-img"
                    alt="ConcordSoft"
                  />
                  <p className="text-center mt-3">
                    Your account is active. You must to set password.
                  </p>
                  <div className="text-field mb-5">
                    <TextField
                      inputClass="form-control only-bottom-border"
                      placeholder="Password"
                      name="password"
                      textFieldType="password"
                      inputChange={this.handleOnChange}
                    />
                    <TextField
                      inputClass="form-control only-bottom-border"
                      placeholder="Repeat password"
                      name="repeatPassword"
                      textFieldType="password"
                      inputChange={this.handleOnChange}
                    />
                  </div>
                  <div className="form-group d-inline-block mt-5">
                    <button
                      onClick={this.handleOnSetPassword}
                      className="btn btn-secondary mb-1"
                    >
                      Set password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default Password;
