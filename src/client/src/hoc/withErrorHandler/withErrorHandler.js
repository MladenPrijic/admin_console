import React, { Component } from 'react';
import { Modal, ModalBody } from 'reactstrap';

const withErrorHandler = (WrappedComponent, axios) => {
  // eslint-disable-next-line react/display-name
  return class extends Component {
    state = {
      error: null,
    };

    componentDidMount() {
      axios.interceptors.request.use(request => {
        this.setState({ error: null });
      });
      axios.interceptors.response.use(null, error => {
          console.log('====================================');
          console.log('errorhandler',error);
          console.log('====================================');
        this.setState({ error: error });
      });
    }

    handleOnErrorConfirmedError = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <React.Fragment>
          <Modal
            isOpen={this.state.error}
            onClick={this.handleOnErrorConfirmedError}>
            <ModalBody>
              {this.state.error ? this.state.error.message : null}
            </ModalBody>
          </Modal>
          <WrappedComponent {...this.props} />
        </React.Fragment>
      );
    }
  };
};

export default withErrorHandler;
