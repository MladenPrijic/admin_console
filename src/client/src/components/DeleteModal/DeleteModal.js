import React from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
  } from 'reactstrap';

const DeleteModal = (props) => {
    return ( <Modal
        isOpen={props.isOpen}
        toggle={props.toggle}
        className={props.className}>
        <ModalHeader toggle={props.toggle}>Delete</ModalHeader>
        <ModalBody>Do you realy want to delete?</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={props.toggle}>
            Cancel
          </Button>{' '}
          <Button color="secondary" onClick={props.onDelete}>
            Delete
          </Button>
        </ModalFooter>
      </Modal> );
}
 
export default DeleteModal;