import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import ReactTable from "react-table";
import {
    Button, Nav, NavItem, ButtonGroup, ModalHeader, Modal, ModalBody, ModalFooter
} from 'reactstrap';
import Auth from "../../services/AuthService";
import {FaPlus} from "react-icons/fa";


const auth = new Auth();

class List extends Component {

    constructor(props) {
        super(props);
        this.fetch = auth.fetch();

        this.state = {
            data: [],
            count: 0,
            pages: 0,
            loading: false,
            currentPage: 0,
            modal: false,
            delRowIndex: null
        }
    }

    componentDidMount() {
        this.data();
    }

    toggle = (index) => {
        this.setState({ modal: !this.state.modal, delRowIndex: index });
    };


    data = async () => {
        this.setState({ loading: true })
        const { data } = await this.fetch.get(`/api/component-categorie/getAll`);
        this.setState({ data: data.data.rows, count: data.data.count, loading: false });
    }

    handlePageClick = (data) => {
        let selected = data.selected + 1;
        this.data(selected);
    };


    handleOnDelete = async (e) => {
        e.preventDefault();
        try {
            const componentCategorie = this.state.data[this.state.delRowIndex];
            const { data } = await this.fetch.delete(`/api/component-categorie/delete/${componentCategorie.id}`);
            if (data.delRows > 0) {
                let list = [...this.state.data];
                list.splice(this.state.delRowIndex, 1);
                this.setState({ data: list, delRowIndex: null });
                this.toggle();
            }
        } catch (err) {
            console.log('====================================');
            console.log(err);
            console.log('====================================');
        }

    }

    render() {


        const { data } = this.state;
        return (
            <React.Fragment>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Delete</ModalHeader>
                    <ModalBody>
                        Do you realy want to delete?
            </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Cancel</Button>{' '}
                        <Button color="secondary" onClick={this.handleOnDelete.bind(this)}>Delete</Button>
                    </ModalFooter>
                </Modal>
                <Nav>
                    <NavItem>
                        <button
                            type="button"
                            className="btn btn-link add-btn"
                            onClick={() => this.props.history.push("/component-categorie/add")}>
                            <FaPlus />
                            <span className="toolbar"> Add</span>
                        </button>
                    </NavItem>
                </Nav>
                <ReactTable
                    data={data}
                    showPageSizeOptions={false}
                    defaultPageSize={15}
                    filterable
                    className="-striped -highlight custom-height"
                    columns={
                        [
                            {
                                Header: "Component categories",
                                headerStyle: {
                                    fontSize: "1.125rem"
                                },
                                columns: [
                                    {
                                        Header: "#",
                                        accessor: "id",
                                        headerStyle: {
                                            textAlign: "left",
                                            fontWeight: "bold",
                                            paddingLeft: "15px"
                                        },
                                        style: {
                                            textAlign: "left",
                                            paddingLeft: "15px"
                                        }
                                    },
                                    {
                                        Header: "Name",
                                        accessor: "name",
                                        headerStyle: {
                                            textAlign: "left",
                                            fontWeight: "bold",
                                        },
                                        style: {
                                            textAlign: "left"
                                        }
                                    },
                                    {
                                        Header: "Actions",
                                        headerStyle: {
                                            textAlign: "center",
                                            fontWeight: "bold",
                                        },
                                        style: {
                                            textAlign: "center"
                                        },
                                        Cell: props => (<ButtonGroup>
                                            <Button outline color="primary" size="sm" onClick={() => this.props.history.push(`/component-categorie/view/${props.row.id}`)}>View</Button>
                                            <Button outline color="primary" size="sm" onClick={() => this.props.history.push(`/component-categorie/edit/${props.row.id}`)}>Edit</Button>
                                            <Button outline color="danger" size="sm" onClick={() => this.toggle(props.row._index)}>Delete</Button>
                                        </ButtonGroup>)
                                    }
                                ]
                            },
                        ]}
                />

            </React.Fragment>
        )
    }
}

export default withRouter(List);