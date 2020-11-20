/* eslint-disable camelcase */
/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useContext, useState } from 'react';
import {
  Modal,
  Collapse,
  CardBody,
  Card,
  CardText,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import './styles.css';
import { DeviceContext } from '../../Contexts/DeviceContext';
import DecreaseService from '../../Services/DecreaseService';
import CollaboratorService from '../../Services/CollaboratorService';

const ProductCard = ({ products }) => {
  const { isMobile } = useContext(DeviceContext);
  const [cardSelected, setCardSelected] = useState('');
  const [decreaseProductModalOpen, setDecreaseProductModalOpen] = useState(false);
  const [decreaseLotModalOpen, setDecreaseLotModalOpen] = useState(false);
  const [productId, setProductId] = useState('');
  const [lotId, setLotId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [product, setProduct] = useState({});
  const [lot, setLot] = useState({});
  const [collaborator, setCollaborator] = useState({});
  const [collaborators, setCollaborators] = useState({});
  const [showLotInfo, setShowLotInfo] = useState(false);
  const [confirmDecreaseLotModalOpen, setConfirmDecreaseLotModalOpen] = useState(false);

  const toggleDecreaseProductModal = () => {
    setDecreaseProductModalOpen(!decreaseProductModalOpen);
  };
  const toggleDecreaseLotModal = () => {
    setDecreaseLotModalOpen(!decreaseLotModalOpen);
    if (!decreaseLotModalOpen) {
      setShowLotInfo(false);
      setQuantity('');
    }
  };
  const toggleConfirmDecreaseLotModal = () => {
    setConfirmDecreaseLotModalOpen(!confirmDecreaseLotModalOpen);
  };
  const loadCollaborators = async () => {
    const response = await CollaboratorService.loadCollaborators();
    setCollaborators(response);
  };
  useEffect(() => {
    loadCollaborators();
  }, []);
  const toggle = (idCard) => {
    setCardSelected('');
    setProductId('');
    setProduct({});
    setLot({});
    setProduct({});
    if (cardSelected !== idCard) {
      setProductId(idCard);
      setCardSelected(idCard);
      setProduct(products.find((element) => element.idProduct === idCard));
    }
    setQuantity('');
  };
  const setLotSelected = (selectedLot) => {
    setQuantity('');

    if (!selectedLot) {
      setShowLotInfo(false);
    } else {
      setLot(selectedLot);
      setLotId(selectedLot.idLot);
      setCollaborator(collaborators.find((c) => c.idCollaborator === selectedLot.idCollaborator));
      setShowLotInfo(true);
    }
  };
  const decreaseProduct = async () => {
    try {
      const { errorData, status } = await DecreaseService.decreaseProduct(productId, quantity);

      if (status === 200) {
        alert('Baixa do produto concluída com sucesso!');
      } else {
        alert(`Falha ao dar baixa em produto: ${errorData.data.details}`);
      }
      toggleDecreaseProductModal();
      setCardSelected('');
    } catch (error) {
      alert(`Falha ao dar baixa em produto: ${error.data}`);
    }
  };
  const decreaseLot = async () => {
    try {
      const { errorData, status } = await DecreaseService.decreaseLot(lotId, quantity);
      if (status === 200) {
        toggleConfirmDecreaseLotModal();
        toggleDecreaseLotModal();
        alert('Produto removido com sucesso!');
        setCardSelected('');
      } else {
        toggleConfirmDecreaseLotModal();
        alert(`Falha ao remover produto: ${errorData.data.details}`);
        setCardSelected('');
      }
    } catch (error) {
      alert(`Falha ao remover produto: ${error.data}`);
    }
  };

  const renderDecreseProductModal = () => (
    <Modal toggle={toggleDecreaseProductModal} isOpen={decreaseProductModalOpen}>
      <ModalHeader toggle={toggleDecreaseProductModal}>Dar baixa em produto</ModalHeader>
      <ModalBody>
        Tem certeza que deseja dar baixa de {quantity} unidade(s) do produto{' '}
        {`${product.name} ${product.unitQtd} ${product.unitMeasure}`}(s)?
      </ModalBody>
      <ModalFooter>
        <button type="button" onClick={decreaseProduct}>
          Sim
        </button>
        <button type="button" onClick={toggleDecreaseProductModal}>
          Não
        </button>
      </ModalFooter>
    </Modal>
  );

  const renderConfirmDecreaseLotModal = () => {
    return (
      <Modal toggle={toggleConfirmDecreaseLotModal} isOpen={confirmDecreaseLotModalOpen}>
        <ModalHeader toggle={toggleConfirmDecreaseLotModal}>
          Remover produto com defeito
        </ModalHeader>
        <ModalBody>
          Tem certeza que deseja remover {quantity} unidade(s) do produto
          {`${product.name} ${product.unitQtd} ${product.unitMeasure}`}(s) do lote {lot.description}
          inserido pelo colaborador {collaborator.name}?
        </ModalBody>
        <ModalFooter>
          <button type="button" onClick={decreaseLot}>
            Sim
          </button>
          <button type="button" onClick={toggleConfirmDecreaseLotModal}>
            Não
          </button>
        </ModalFooter>
      </Modal>
    );
  };

  const lotInfo = () => (
    <div className="lot-info">
      <h5>Informações sobre esse lote:</h5>
      <div>
        <label>Data de adição:</label>
        <span> {new Date(lot?.entryDate).toLocaleDateString()}</span>
      </div>
      <div>
        <label>Data de vencimento:</label>
        <span>{new Date(lot?.dueDate).toLocaleDateString()} </span>
      </div>
      <div>
        <label>Quantidade disponível:</label>
        <span> {lot?.productQty}</span>
      </div>
      <div>
        <label>Preço de compra:</label>
        <span> R${lot?.purchasePrice}</span>
      </div>
      <div>
        <label>Responsável:</label>
        <span>{collaborator?.name}</span>
      </div>
      <div className="div-input">
        <label>Quantidade a ser removida:</label>
        <span>
          <input
            className="input-quantity"
            type="number"
            defaultValue=""
            onChange={(e) => setQuantity(e.target.value)}
          />
        </span>
      </div>
    </div>
  );
  const decreaseLotButton = () => (
    <button onClick={toggleConfirmDecreaseLotModal} type="button">
      Remover
    </button>
  );
  const renderDecreaseLotModal = () => (
    <Modal toggle={toggleDecreaseLotModal} isOpen={decreaseLotModalOpen}>
      <ModalHeader toggle={toggleDecreaseLotModal}> Remover produto com defeito</ModalHeader>
      <ModalBody>
        <h4>De qual lote deseja remover?</h4>
        <select
          className="select-alone"
          type="select"
          onChange={(e) => setLotSelected((e.target.value && JSON.parse(e.target.value)) || '')}
        >
          <option value=""> </option>
          {product?.lots?.map((productLot) => {
            return (
              <option key={productLot.idLot} value={JSON.stringify(productLot)}>
                {productLot.description}
              </option>
            );
          })}
        </select>
        {showLotInfo ? lotInfo() : null}
      </ModalBody>
      <ModalFooter>
        {showLotInfo ? decreaseLotButton() : null}
        <p>
          A remoção do produto não será contabilizada como venda, apenas remoção por motivo
          específico de indisponibilidade do produto.
        </p>
      </ModalFooter>
    </Modal>
  );

  return (
    <div>
      <div className="list-container">
        <Card>
          <CardBody className="product-header">
            <div>
              <span>Nome</span>
            </div>
            <div>
              <span>{isMobile ? 'Qtd' : 'Quantidade'}</span>
            </div>
            <div>
              <span>Tamanho</span>
            </div>
            <div>
              <span>Lotes</span>
            </div>
          </CardBody>
        </Card>
        <div className="cards">
          {products?.map((productFromList) => {
            return (
              <div>
                <Card>
                  <CardBody
                    className="product-card"
                    onClick={() => toggle(productFromList.idProduct)}
                  >
                    <div>
                      <p>{productFromList.name}</p>
                    </div>
                    <div>
                      <p>{productFromList.quantity}</p>
                    </div>
                    <div>
                      <p>{`${productFromList.unitQtd} ${productFromList.unitMeasure}`}(s)</p>
                    </div>
                    <div>
                      <p>{productFromList.lots.filter((l) => l.productQty > 0).length}</p>
                    </div>
                  </CardBody>
                  <Collapse
                    value={productFromList.idProduct}
                    isOpen={productFromList.idProduct === cardSelected}
                  >
                    <CardText>
                      <div className="product-options-container">
                        <div className="product-options">
                          <div className="product-quantity">
                            <label>Quantidade</label>
                            <input
                              className="input-quantity"
                              type="number"
                              defaultValue="0"
                              min="0"
                              onChange={(e) => setQuantity(e.target.value)}
                            />
                          </div>
                          <button
                            onClick={toggleDecreaseProductModal}
                            className="decrease-button"
                            type="button"
                          >
                            Dar baixa
                          </button>
                        </div>
                        <button className="secondary" onClick={toggleDecreaseLotModal}>
                          Remover produto com defeito
                        </button>
                      </div>
                    </CardText>
                  </Collapse>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
      {renderDecreseProductModal()}
      {renderDecreaseLotModal()}
      {renderConfirmDecreaseLotModal()}
    </div>
  );
};

export default ProductCard;
