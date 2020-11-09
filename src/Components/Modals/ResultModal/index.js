/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalFooter } from 'reactstrap';

export default function ConfirmationModal(props) {
  const {
    title,
    modalVisible,
    setModalVisible,
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Modal isOpen={modalVisible} toggle={() => {
        setModalVisible(!modalVisible);
      }}>
        <ModalHeader isOpen={modalVisible} toggle={() => {
          window.location.reload()
        }}>{title}
        </ModalHeader>
        <ModalFooter>
          <Button color="primary" onClick={() => window.location.reload()}>Ok</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
