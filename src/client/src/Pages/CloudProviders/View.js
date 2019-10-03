import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import {
  Card,
  CardHeader,
  Row,
  Col,
  Button
} from "reactstrap";
import Auth from "../../services/AuthService";
import Loading from "../../components/Loading/Loading";

const auth = new Auth();

class View extends Component {
  constructor(props) {
    super(props);
    this.fetch = auth.fetch();
    this.cloudProviderId = props.match.params.cloudProviderId;

    this.state = {
      loading: true,
      cloudProvider: {
        id: "",
        name: "",
        short_name: "",
        phone: "",
        address: "",
        postal_code: "",
        city: "",
        salse_contact_name: "",
        salse_contact_phone: "",
        support_contact_name: "",
        support_contact_phone: ""
      }
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const { data } = await this.fetch.get(
      `/api/cloud-provider/${this.cloudProviderId}`
    );
    this.setState({ cloudProvider: { ...data.cloudProvider }, loading: false });
  }

  render() {
    if(this.state.loading) return <Loading />
    return (
      <React.Fragment>
        <Row>
          <Col  xs="12" sm="12" md="12" lg="6"  className="col-centered">
            <Card className="info">
              <CardHeader className="text-center">
                  <Button className="btn back-button float-left pl-0" onClick={() => this.props.history.goBack()}>
                      <FaArrowLeft />
                  </Button>
                  <span className="align-text-top">
                    Client / {this.state.cloudProvider.shortName}
                  </span>
              </CardHeader>
                <div className="info-view card-background-logo">
                    <ul className="list-inline">
                        <li className="list-inline-item"><label htmlFor="Name">Name:</label></li>
                        <li className="list-inline-item view-text-marked">{this.state.cloudProvider.name}</li>
                    </ul>
                    <ul className="list-inline">
                        <li className="list-inline-item"><label htmlFor="Short name">Short name:</label></li>
                        <li className="list-inline-item view-text-marked">{this.state.cloudProvider.shortName}</li>
                    </ul>
                    <ul className="list-inline">
                        <li className="list-inline-item"><label htmlFor="Support name">Support contact name:</label></li>
                        <li className="list-inline-item view-text-marked">{this.state.cloudProvider.supportContactName}</li>
                    </ul>
                    <ul className="list-inline">
                        <li className="list-inline-item"><label htmlFor="Support phone">Support contanct phone:</label></li>
                        <li className="list-inline-item view-text-marked">{this.state.cloudProvider.supportContactPhone}</li>
                    </ul>
                    <ul className="list-inline">
                        <li className="list-inline-item"><label htmlFor="Support name">Sales contact name:</label></li>
                        <li className="list-inline-item view-text-marked">{this.state.cloudProvider.supportContactName}</li>
                    </ul>
                    <ul className="list-inline">
                        <li className="list-inline-item"><label htmlFor="Sales phone">Sales contact phone:</label></li>
                        <li className="list-inline-item view-text-marked">{this.state.cloudProvider.supportContactName}</li>
                    </ul>
                </div>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default withRouter(View);
