import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import moment from 'moment';
import RegisterService from '../../Services/RegisterService';
import ResultModal from '../Modals/ResultModal';

export default function NewLot({ products }) {
  const [lotProduct, setLotProduct] = useState('');
  const [lotEntryDate, setLotEntryDate] = useState(moment().format('YYYY-MM-DD'));
  const [lotDueDate, setLotDueDate] = useState('');
  const [lotProductQty, setLotProductQty] = useState('');
  const [lotDescription, setLotDescription] = useState('');
  const [lotPurchasePrice, setLotPurchasePrice] = useState('');
  const [newLotModalOpen, setNewLotModalOpen] = useState(false);
  const toggleNewLotModal = () => setNewLotModalOpen(!newLotModalOpen);

  const [resultModalTitle, setResultModalTitle] = useState('');
  const [resultModalVisible, setResultModalVisible] = useState(false);

  useEffect(() => {
    if (!newLotModalOpen) {
      setLotProduct('');
      setLotEntryDate(moment().format('YYYY-MM-DD'));
      setLotDueDate('');
      setLotProductQty('');
      setLotDescription('');
      setLotPurchasePrice('');
    }
  }, [newLotModalOpen]);

  async function registerLot() {
    try {
      const { status } = await RegisterService.registerLot(
        lotProduct,
        lotEntryDate,
        lotDueDate,
        lotProductQty,
        lotDescription,
        lotPurchasePrice
      );
      if (status === 200) {
        toggleNewLotModal();
        setResultModalTitle('Lote Cadastrado com sucesso!');
        setResultModalVisible(true);
      }
    } catch (error) {
      setResultModalTitle(`Falha ao cadastrar lote: ${error.response}`);
      setResultModalVisible(true);
    }
  }

  const renderNewLotModal = () => (
    <Modal toggle={toggleNewLotModal} isOpen={newLotModalOpen}>
      <ModalHeader toggle={toggleNewLotModal}>Cadastro de Lote</ModalHeader>
      <ModalBody>
        <form>
          <div className="new-product-input-container">
            <div>
              <span>Data de entrada</span>
              <input
                type="date"
                onChange={(e) => setLotEntryDate(e.target.value)}
                defaultValue={moment().format('YYYY-MM-DD')}
              />
            </div>
            <div>
              <span>Data de Vencimento</span>
              <input type="date" onChange={(e) => setLotDueDate(e.target.value)} />
            </div>
          </div>

          <div className="new-product-input-container">
            <div>
              <span>Preço da compra</span>
              <input
                value={`R$ ${lotPurchasePrice}`}
                onChange={(e) => {
                  const price = e.target.value.split(' ')[1];
                  setLotPurchasePrice(price || '');
                }}
              />
            </div>
            <div>
              <span>Quantidade</span>
              <input type="number" onChange={(e) => setLotProductQty(e.target.value)} />
            </div>
          </div>
          <div className="new-product-input-container">
            <div>
              <span>Produto</span>
              <select type="select" onChange={(e) => setLotProduct(e.target.value)}>
                <option value=""> </option>
                {products.map((product, i) => {
                  return (
                    <option key={i} value={product.idProduct}>
                      {product.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="new-product-input-container textarea">
            <div>
              <span>Descrição</span>
              <textarea maxLength="255" onChange={(e) => setLotDescription(e.target.value)} />
            </div>
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <div className="add-product-modal-footer">
          <button type="button" className="secondary" onClick={registerLot}>
            Cadastrar Lote
          </button>
        </div>
      </ModalFooter>
    </Modal>
  );

  return (
    <>
      <ResultModal
        title={resultModalTitle}
        modalVisible={resultModalVisible}
        setModalVisible={setResultModalVisible}
        refresh={false}
      />
      {renderNewLotModal()}
      <button type="button" className="secondary" onClick={toggleNewLotModal}>
        Novo lote de produto
      </button>
    </>
  );
}
