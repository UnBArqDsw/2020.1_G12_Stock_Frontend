/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default function ConfirmationModal(props) {
  const {
    confirm,
    cancel,
    message,
    title,
    modalVisible,
    setModalVisible,
    response
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Modal isOpen={modalVisible} toggle={() => {
            setModalVisible(!modalVisible);
        }}>
        <ModalHeader isOpen={modalVisible} toggle={() => {
            setModalVisible(false)}}>{title}</ModalHeader>
        <ModalBody>
          {message}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={response}>{confirm}</Button>
          <Button color="secondary" onClick={() => setModalVisible(false)}>{cancel}</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
