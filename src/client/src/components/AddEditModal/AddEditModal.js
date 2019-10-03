import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const AddEditModal = props => {
  return (
    <Modal isOpen={props.isOpen} toggle={props.toggle}>
      <ModalHeader toggle={props.toggle}>{props.headerText}</ModalHeader>
      <ModalBody>{props.children}</ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={props.handleOnConfirm}>
          {props.confirmText}
        </Button>{' '}
        <Button color="secondary" onClick={props.handleOnCancel}>
          {props.cancelText}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AddEditModal;