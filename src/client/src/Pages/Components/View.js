import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ReactTable from "react-table";
import { FaArrowLeft } from "react-icons/fa";
import {
  Card,
  CardHeader,
  CardBody,
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
    this.componentId = props.match.params.componentId;

    this.state = {
      loading: true,
      component: {
        name: "",
        componentCategorieId: "",
        purpose: "",
        vendor: "",
        version: "",
        stateOfImplementation: "",
        softwares: []
      }
    };
  }

  async componentDidMount() {
    const { data } = await this.fetch.get(`/api/component/${this.componentId}`);
    this.setState({ component: { ...data.data }, loading: false });
  }

  render() {
    const columns = [
      {
        Header: "Software",
        headerStyle: {
          fontWeight: "400",
          fontSize: "1.125rem"
        },
        columns: [
          {
            Header: "Name",
            accessor: "name",
            headerStyle: {
              textAlign: "left",
              fontWeight: "400",
            },
            style: {
              textAlign: "left"
            }
          },
          {
            Header: "Vendor",
            accessor: "vendor",
            headerStyle: {
              textAlign: "left",
              fontWeight: "400",
            },
            style: {
              textAlign: "left",
              verticalAlign: "middle"
            }
          },
          {
            Header: "Version",
            accessor: "version",
            headerStyle: {
              textAlign: "left",
              fontWeight: "400",
            },
            style: {
              textAlign: "left",
              verticalAlign: "middle"
            }
          }
        ]
      }
    ];
    if (this.state.loading) return <Loading />;
    return (
      <React.Fragment>
        <Row>
          <Col  xs="12" sm="12" md="12" lg="8"  className="col-centered">
            <Card className="info">
              <CardHeader className="text-center">
                  <Button className="btn back-button float-left pl-o" onClick={() => this.props.history.goBack()}>
                      <FaArrowLeft />
                  </Button>
                  <span className="align-text-top">
                    Component / {this.state.component.name}
                  </span>
              </CardHeader>
              {/*<div className="info-view card-background-logo">*/}
              {/*<ul className="list-inline">*/}
              {/*<li className="list-inline-item"><label htmlFor="Name">Name:</label> </li>*/}
              {/*<li className="list-inline-item view-text-marked">{this.state.component.name}</li>*/}
              {/*</ul>*/}
              {/*</div>*/}
              <CardBody>
                <ReactTable
                  columns={columns}
                  data={
                    this.state.component.softwares
                      ? this.state.component.softwares
                      : []
                  }
                  defaultPageSize={10}
                  style={{
                    height: "500px"
                  }}
                  className="-striped -highlight"
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default withRouter(View);
