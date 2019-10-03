import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Button,
  ButtonGroup
} from 'reactstrap';
import Auth from '../../services/AuthService';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { FaPlus, FaSearch, FaTrash, FaEdit } from 'react-icons/fa';
import ToolBar from '../../components/ToolBar/ToolBar';
import DeleteModal from '../../components/DeleteModal/DeleteModal';
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
    const { data } = await this.fetch.get(`/api/project/getAll`);
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
        `/api/project/delete/${client.id}`
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
        Header: 'Projects',
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
                fontWeight: '400',
              textAlign: 'left',
            },
            style: {
              textAlign: 'left',
            },
          },
          {
            Header: 'Client',
            accessor: 'client.name',
            filterMethod: (filter, row) =>
              row[filter.id].toLowerCase().includes(filter.value.toLowerCase()),
            headerStyle: {
              fontWeight: '400',
              textAlign: 'left',
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
                  title="Project details"
                  onClick={() =>
                    this.props.history.push(
                      `/project/view/${props.row._original.id}`
                    )
                  }>
                    <FaSearch/>
                </Button>
                <Button
                  color="link"
                  size="sm"
                  title="Edit project"
                  onClick={() =>
                    this.props.history.push(
                      `/project/edit/${props.row._original.id}`
                    )
                  }>
                    <FaEdit/>
                </Button>
                <Button
                  color="link"
                  size="sm"
                  title="Delete project"
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
        <DeleteModal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
          onDelete={this.handleOnDelete}
        />
        <ToolBar>
          <i
            className="add-button"
            onClick={() => this.props.history.push('/project/add')}>
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
