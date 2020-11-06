/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { GiCancel } from 'react-icons/all';
export default function ConfirmationModal(props) {
  const {
    confirm,
    cancel,
    message,
    title
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="danger" onClick={toggle}><GiCancel size={20} /></Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>
          {message}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>{confirm}</Button>{' '}
          <Button color="secondary" onClick={toggle}>{cancel}</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
