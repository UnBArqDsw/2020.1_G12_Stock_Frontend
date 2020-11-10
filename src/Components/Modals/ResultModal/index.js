/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';

export default function ConfirmationModal({
  title,
  modalVisible,
  setModalVisible,
  refresh = true,
}) {
  return (
    <Modal
      isOpen={modalVisible}
      toggle={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <ModalHeader
        isOpen={modalVisible}
        toggle={() => {
          window.location.reload();
        }}
      >
        {title}
      </ModalHeader>
      <ModalFooter>
        <Button
          color="primary"
          onClick={() => (refresh && window.location.reload()) || setModalVisible(false)}
        >
          Ok
        </Button>
      </ModalFooter>
    </Modal>
  );
}
