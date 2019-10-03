import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Button,
  ButtonGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import Auth from '../../services/AuthService';
import ReactTable from 'react-table';
import { FaPlus, FaSearch, FaTrash, FaEdit } from 'react-icons/fa';
import 'react-table/react-table.css';
import ToolBar from '../../components/ToolBar/ToolBar';
import Loading from '../../components/Loading/Loading';

const auth = new Auth();

class List extends Component {
  constructor(props) {
    super(props);
    this.fetch = auth.fetch();

    this.state = {
      data: [],
      loading: false,
      currentPage: 0,
      delRowIndex: null,
      modal: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.data();
  }

  toggle = index => {
    this.setState({ modal: !this.state.modal, delRowIndex: index });
  };

  data = async () => {
    this.setState({ loading: true });
    const { data } = await this.fetch.get(`/api/client/getAll`);
    this.setState({
      data: data.data.rows,
      count: data.data.count,
      loading: false,
    });
  };

  handlePageClick = data => {
    let selected = data.selected + 1;
    this.data(selected);
  };

  handleOnDelete = async e => {
    e.preventDefault();
    try {
      const client = this.state.data[this.state.delRowIndex];
      const { data } = await this.fetch.delete(
        `/api/client/delete/${client.id}`
      );
      if (data.rowDeleted[0] > 0) {
        let list = [...this.state.data];
        list.splice(this.state.delRowIndex, 1);
        this.setState({ data: list, delRowIndex: null });
        this.toggle();
      }
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const columns = [
      {
        Header: 'Clients',
        headerStyle: {
          fontWeight: '400',
          fontSize: '1.125rem',
        },
        columns: [
          {
            Header: 'Name',
            accessor: 'name',
            headerStyle: {
              textAlign: 'left',
              fontWeight: '400',
            },
            style: {
              textAlign: 'left',
            },
            filterMethod: (filter, row) =>
              row[filter.id].toLowerCase().includes(filter.value.toLowerCase()),
          },
          {
            Header: 'Contact Person',
            accessor: 'conatactPerson',
            filterMethod: (filter, row) =>
              row[filter.id].toLowerCase().includes(filter.value.toLowerCase()),
            headerStyle: {
              textAlign: 'left',
              fontWeight: '400',
            },
            style: {
              textAlign: 'left',
              verticalAlign: 'middle',
            },
          },
          {
            Header: 'Phone',
            accessor: 'conatactPersonPhone',
            headerStyle: {
              textAlign: 'left',
              fontWeight: '400',
            },
            style: {
              textAlign: 'left',
              verticalAlign: 'middle',
            },
          },
          {
            Header: 'Actions',
            filterable: false,
            headerStyle: {
              fontWeight: '400',
            },
            style: {
              textAlign: 'center',
            },
            Cell: props => (
              <ButtonGroup>
                <Button
                  color="link"
                  size="sm"
                  title="Client details"
                  onClick={() =>
                    this.props.history.push(
                      `/client/view/${props.row._original.id}`
                    )
                  }>
                    <FaSearch/>
                </Button>
                <Button
                  color="link"
                  size="sm"
                  title="Edit client"
                  onClick={() =>
                    this.props.history.push(
                      `/client/edit/${props.row._original.id}`
                    )
                  }>
                    <FaEdit/>
                </Button>
                <Button
                  color="link"
                  size="sm"
                  title="Delete client"
                  onClick={() => this.toggle(props.row._index)}>
                    <FaTrash/>
                </Button>
              </ButtonGroup>
            ),
          },
        ],
      },
    ];
    if (this.state.loading) return <Loading />;
    return (
      <React.Fragment>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Delete</ModalHeader>
          <ModalBody>Do you realy want to delete?</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>
              Cancel
            </Button>{' '}
            <Button color="secondary" onClick={this.handleOnDelete.bind(this)}>
              Delete
            </Button>
          </ModalFooter>
        </Modal>
        <ToolBar>
          <i
            className="add-button"
            onClick={() => this.props.history.push('/client/add')}>
            <FaPlus />
            <span className="toolbar">Add</span>
          </i>
        </ToolBar>
        <ReactTable
          filterable
          columns={columns}
          data={this.state.data}
          defaultPageSize={15}
          showPageSizeOptions={false}
          className="-striped -highlight border-bottom-rounded custom-height"
        />
      </React.Fragment>
    );
  }
}

export default withRouter(List);
