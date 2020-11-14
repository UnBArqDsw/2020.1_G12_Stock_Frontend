/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default function PriceSortModal(props) {
  const { priceModalOpen, setPriceModalOpen, applyFilter } = props;
  const [selectOrder, setSelectedOrder] = useState('');

  const togglePriceModal = () => setPriceModalOpen(!priceModalOpen);

  return (
    <div>
      <Modal toggle={togglePriceModal} isOpen={priceModalOpen}>
        <ModalHeader toggle={togglePriceModal}>Ordenar por Preço</ModalHeader>
        <ModalBody>
          <div className="product-checks">
            <select type="select" onChange={(e) => setSelectedOrder(e.target.value)}>
              <option value=""> </option>
              <option value="ASC">Ordem Crescente</option>
              <option value="DESC">Ordem Decrescente</option>
            </select>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => {
            applyFilter({ orderPrice: selectOrder })
            setPriceModalOpen(false)
          }}>Ordenar</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
