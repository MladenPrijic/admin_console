import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ButtonGroup,
} from 'reactstrap';
import Auth from '../../services/AuthService';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { FaPlus, FaSearch, FaTrash, FaEdit } from 'react-icons/fa';
import ToolBar from '../../components/ToolBar/ToolBar';
import Loading from '../../components/Loading/Loading';

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
      open: false,
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
    const { data } = await this.fetch.get(`/api/software/getAll`);
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
      const software = this.state.data[this.state.delRowIndex];
      const { data } = await this.fetch.delete(
        `/api/software/delete/${software.id}`
      );
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
  };

  render() {
    const columns = [
      {
        Header: 'Softwares',
        headerStyle: {
          fontWeight: '400',
          fontSize: '1.125rem',
        },
        columns: [
          {
            Header: 'Name',
            accessor: 'name',
            filterMethod: (filter, row) =>
              row[filter.id].toLowerCase().includes(filter.value.toLowerCase()),
            headerStyle: {
              textAlign: 'left',
              fontWeight: '400',
            },
            style: {
              textAlign: 'left',
            },
          },
          {
            Header: 'Vendor',
            accessor: 'vendor',
            filterMethod: (filter, row) =>
              row[filter.id].toLowerCase().includes(filter.value.toLowerCase()),
            headerStyle: {
              textAlign: 'left',
              fontWeight: '400',
            },
            style: {
              textAlign: 'left',
            },
          },
          {
            Header: 'Version',
            accessor: 'version',
            filterMethod: (filter, row) =>
              row[filter.id].toLowerCase().includes(filter.value.toLowerCase()),
            headerStyle: {
              textAlign: 'left',
              fontWeight: '400',
            },
            style: {
              textAlign: 'left',
            },
          },
          {
            Header: 'Licence',
            accessor: 'licence',
            filterMethod: (filter, row) =>
              row[filter.id].toLowerCase().includes(filter.value.toLowerCase()),
            headerStyle: {
              textAlign: 'left',
              fontWeight: '400',
            },
            style: {
              textAlign: 'left',
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
                  title="Software details"
                  onClick={() =>
                    this.props.history.push(
                      `/software/view/${props.row._original.id}`
                    )
                  }>
                    <FaSearch/>
                </Button>
                <Button
                  color="link"
                  size="sm"
                  title="Edit software"
                  onClick={() =>
                    this.props.history.push(
                      `/software/edit/${props.row._original.id}`
                    )
                  }>
                    <FaEdit/>
                </Button>
                <Button
                  color="link"
                  size="sm"
                  title="Delete software"
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
            onClick={() => this.props.history.push('/software/add')}>
            <FaPlus />
            <span className="toolbar">Add</span>
          </i>
        </ToolBar>
        <ReactTable
          filterable
          columns={columns}
          data={this.state.data}
          showPageSizeOptions={false}
          defaultPageSize={15}
          className="-striped -highlight border-bottom-rounded custom-height"
        />
      </React.Fragment>
    );
  }
}

export default withRouter(List);
