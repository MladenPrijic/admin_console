import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ReactTable from 'react-table';
import {
  Button,
  ButtonGroup,
  ModalHeader,
  Modal,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import Auth from '../../services/AuthService';
import {FaEdit, FaPlus, FaSearch, FaTrash} from 'react-icons/fa';
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
      modal: false,
      delRowIndex: null,
    };
  }

  componentDidMount() {
    this.data();
  }

  toggle = index => {
    this.setState({ modal: !this.state.modal, delRowIndex: index });
  };

  data = async () => {
    this.setState({ loading: true });
    const { data } = await this.fetch.get(`/api/component/getAll`);
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
      const componentCategorie = this.state.data[this.state.delRowIndex];
      const { data } = await this.fetch.delete(
        `/api/component/delete/${componentCategorie.id}`
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
    const { data } = this.state;
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
            onClick={() => this.props.history.push('/component/add')}>
            <FaPlus />
            <span className="toolbar">Add</span>
          </i>
        </ToolBar>
        <ReactTable
          data={data}
          showPageSizeOptions={false}
          defaultPageSize={15}
          filterable
          className="-striped -highlight border-bottom-rounded custom-height"
          columns={[
            {
              Header: 'Components',
              headerStyle: {
                fontWeight: '400',
                fontSize: '1.125rem',
              },
              columns: [
                {
                  Header: 'Name',
                  accessor: 'name',
                  filterMethod: (filter, row) =>
                    row[filter.id]
                      .toLowerCase()
                      .includes(filter.value.toLowerCase()),
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
                        title="Component details"
                        onClick={() =>
                          this.props.history.push(
                            `/component/view/${props.row._original.id}`
                          )
                        }>
                          <FaSearch/>
                      </Button>
                      <Button
                        color="link"
                        size="sm"
                        title="Edit component"
                        onClick={() =>
                          this.props.history.push(
                            `/component/edit/${props.row._original.id}`
                          )
                        }>
                          <FaEdit/>
                      </Button>
                      <Button
                        color="link"
                        size="sm"
                        title="Delete component"
                        onClick={() => this.toggle(props.row._index)}>
                          <FaTrash/>
                      </Button>
                    </ButtonGroup>
                  ),
                },
              ],
            },
          ]}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(List);
