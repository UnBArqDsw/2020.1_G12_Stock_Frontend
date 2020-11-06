import React, { useState } from 'react';
import './styles.css';
import { FaFilter, FaSortAmountUp } from 'react-icons/all';
import { Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import ProductCard from '../../Components/ProductCard';

export default function Stock() {
  const [newProductModalOpen, setNewProductModalOpen] = useState(false);
  const toggleNewProductModal = () => setNewProductModalOpen(!newProductModalOpen);

  const [newLotModalOpen, setNewLotModalOpen] = useState(false);
  const toggleNewLotModal = () => setNewLotModalOpen(!newLotModalOpen);

  const renderNewProductModal = () => (
    <Modal toggle={toggleNewProductModal} isOpen={newProductModalOpen}>
      <ModalHeader toggle={toggleNewProductModal}>Cadastrar novo produto</ModalHeader>
      <ModalBody>
        <form>
          <div className="new-product-input-container">
            <div>
              <span>Nome</span>
              <input type="text" />
            </div>
            <div>
              <span>Preço</span>
              <input type="text" />
            </div>
          </div>

          <div className="new-product-input-container">
            <div>
              <span>Categorias</span>
              <select>
                <option>teste</option>
                <option>teste</option>
                <option>teste</option>
                <option>teste</option>
                <option>teste</option>
              </select>
            </div>
            <div>
              <span>Unidade de medida</span>
              <select>
                <option>teste</option>
                <option>teste</option>
                <option>teste</option>
                <option>teste</option>
                <option>teste</option>
              </select>
            </div>
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <div className="add-product-modal-footer">
          <button type="button" className="secondary" onClick={toggleNewProductModal}>
            Adicionar
          </button>
        </div>
      </ModalFooter>
    </Modal>
  );

  const renderNewLotModal = () => (
    <Modal toggle={toggleNewLotModal} isOpen={newLotModalOpen}>
      <ModalHeader toggle={toggleNewLotModal}>Cadastro de Lote</ModalHeader>
      <ModalBody>
        <form>
          <div className="new-product-input-container">
            <div>
              <span>Data de entrada</span>
              <input type="text" />
            </div>
            <div>
              <span>Data de Vencimento</span>
              <input type="text" />
            </div>
          </div>

          <div className="new-product-input-container">
            <div>
              <span>Preço da compra</span>
              <input type="text" />
            </div>
            <div>
              <span>Quantidade</span>
              <input type="text" />
            </div>
          </div>

          <div className="new-product-input-container textarea">
            <div>
              <span>Descrição</span>
              <textarea />
            </div>
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <div className="add-product-modal-footer">
          <button type="button" className="secondary" onClick={toggleNewProductModal}>
            Cadastrar Lote
          </button>
        </div>
      </ModalFooter>
    </Modal>
  );
  return (
    <div className="container">
      <div className="stock-content">
        <h1>Estoque</h1>
        <div className="toolbar">
          <div className="search-filter">
            <input type="text" placeholder="Procurar produtos" />
            <FaFilter />
            <FaSortAmountUp />
          </div>
          <div className="create-import">
            <button type="button" className="secondary" onClick={toggleNewLotModal}>
              Importar
            </button>
            <button type="button" className="secondary" onClick={toggleNewProductModal}>
              Novo Produto
            </button>
          </div>
        </div>
      </div>
      <ProductCard />
      {renderNewProductModal()}
      {renderNewLotModal()}
    </div>
  );
}
