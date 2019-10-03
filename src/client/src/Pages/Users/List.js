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
import _ from 'lodash';
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
      loading: true,
      data: [],
      count: 0,
      pages: 0,
      currentPage: 0,
      open: false,
      delRowIndex: null,
      modal: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.data(1);
  }

  toggle = index => {
    this.setState({ modal: !this.state.modal, delRowIndex: index });
  };

  data = async () => {
    this.setState({ loading: true });
    const resData = await this.fetch.get(`/api/auth/getAll`);
    const data = _.get(resData, 'data.data', null);
    this.setState({
      data: data.rows,
      count: data.count,
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
      const user = this.state.data[this.state.delRowIndex];
      const { data } = await this.fetch.delete(`/api/auth/delete/${user.id}`);
      if (data.updated[0] > 0) {
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
        Header: 'Administration',
        headerStyle: {
          fontWeight: '400',
          fontSize: '1.125rem',
        },
        columns: [
          {
            Header: 'Username',
            accessor: 'email',
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
            Header: 'User',
            accessor: 'name',
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
                  onClick={() =>
                    this.props.history.push(
                      `/user/reset/${props.row._original.id}`
                    )
                  }>
                  Reset password
                </Button>
                <Button
                  color="link"
                  size="sm"
                  title="User details"
                  onClick={() =>
                    this.props.history.push(
                      `/user/view/${props.row._original.id}`
                    )
                  }>
                  <FaSearch />
                </Button>
                <Button
                  color="link"
                  size="sm"
                  title="Edit user"
                  onClick={() =>
                    this.props.history.push(
                      `/user/edit/${props.row._original.id}`
                    )
                  }>
                  <FaEdit />
                </Button>
                <Button
                  color="link"
                  size="sm"
                  title="Delete user"
                  onClick={() => this.toggle(props.row._index)}>
                  <FaTrash />
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
            onClick={() => this.props.history.push('/user/add')}>
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
          showPagination={false}
          className="-striped -highlight border-bottom-rounded custom-height"
        />
      </React.Fragment>
    );
  }
}

export default withRouter(List);
