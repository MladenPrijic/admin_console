import React, {Component} from 'react';
import TextField from "./components/input/text_field";

class ForgotPassword extends Component {

    render() {
        return (
            <React.Fragment>
                <form>
                    <div className="container login-form">
                        <div className="row justify-content-sm-center">
                            <div className="card text-center">
                                <div className="card-body">
                                    <img src="/images/logo/logo.png" className="form-img" alt="ConcordSoft" />
                                    <p className="text-center mt-3">Enter your email and we send you a password reset link.</p>
                                    <div className="text-field mb-5">
                                        <TextField
                                            inputClass="form-control only-bottom-border"
                                            placeholder="Email"
                                            name="email"
                                        />
                                    </div>
                                    <div className="form-group d-inline-block mt-5">
                                        <button className="btn btn-secondary mb-1">Send request</button>
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

export default ForgotPassword;