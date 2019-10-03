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
    const { data } = await this.fetch.get(`/api/deployment/getAll`);
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
      const deployment = this.state.data[this.state.delRowIndex];
      const { data } = await this.fetch.delete(
        `/api/deployment/delete/${deployment.id}`
      );
      if (data.rowDeleted[0] > 0) {
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
        Header: 'Deployments',
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
            Header: 'Type',
            accessor: 'type',
            filterMethod: (filter, row) =>
              row[filter.id].toLowerCase().includes(filter.value.toLowerCase()),
            headerStyle: {
              textAlign: 'center',
              fontWeight: '400',
            },
            style: {
              textAlign: 'center',
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
                  title="Deployment details"
                  onClick={() => {
                    this.props.history.push(
                      `/deployment/view/${props.row._original.id}`
                    );
                  }}>
                  <FaSearch />
                </Button>
                <Button
                  color="link"
                  size="sm"
                  title="Edit deployment"
                  onClick={() =>
                    this.props.history.push(
                      `/deployment/edit/${props.row._original.id}`
                    )
                  }>
                  <FaEdit />
                </Button>
                <Button
                  color="link"
                  size="sm"
                  title="Delete deployment"
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
            onClick={() => this.props.history.push('/deployment/add')}>
            <FaPlus />
            <span className="toolbar">Add</span>
          </i>
        </ToolBar>
        <ReactTable
          filterable
          filterablePlaceholder="test"
          columns={columns}
          data={this.state.data.length > 0 ? this.state.data : undefined}
          showPageSizeOptions={false}
          defaultPageSize={15}
          noDataText="Loading servers!"
          className="-striped -highlight border-bottom-rounded custom-height"
        />
      </React.Fragment>
    );
  }
}

export default withRouter(List);
