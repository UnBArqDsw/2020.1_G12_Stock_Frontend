import React, { Component } from 'react';
import { Modal, Collapse, CardBody, Card, CardText, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './styles.css';
import { useContext, useState } from 'react';
import { DeviceContext } from '../../Contexts/DeviceContext';
import DecreaseService from '../../Services/DecreaseService';

const ProductCard = ({ products }) => {
  const { isMobile } = useContext(DeviceContext);
  const [cardSelected, setCardSelected] = useState('');
  const [decreaseProductModalOpen, setDecreaseProductModalOpen] = useState(false);
  const [decreaseLotModalOpen, setDecreaseLotModalOpen] = useState(false);
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [product, setProduct] = useState({});
  const [lot, setLot] = useState({});
  const [showLotInfo, setShowLotInfo] = useState(false);
  const toggleDecreaseProductModal = () => {
    setDecreaseProductModalOpen(!decreaseProductModalOpen)
  };
  const toggleDecreaseLotModal = () => {
    console.log(product.lots);
    setDecreaseLotModalOpen(!decreaseLotModalOpen)
  };
  const toggle = (idCard) => {
    setCardSelected('');
    setProductId('');
    setProductSelected({});
    setLot({});
    setProduct({});
    if (cardSelected !== idCard) {
      setProductId(idCard);
      setCardSelected(idCard);
      setProductSelected(products.filter((element) => element.idProduct == idCard));
    }
    setQuantity('');
  }
  const setLotSelected = (l) => {
    if (product) {
      setLot(product.lots.filter((lot) => lot.idLot == l)[0]);
    }
    if(l!==''){
      setShowLotInfo(true);
    }else{
      setShowLotInfo(false);
    }
  }
  const decreaseProduct = async () => {
    try {
      const { errorData, status } = await DecreaseService.decreaseProduct(productId, quantity);
      if (status === 200) {
        toggleDecreaseProductModal();
        alert('Baixa do produto concluída com sucesso!');
      } else {
        toggleDecreaseProductModal();
        alert(`Falha ao dar baixa em produto: ${errorData.data.details}`);
      }
    } catch (error) {
      alert(`Falha ao dar baixa em produto: ${error.data}`);
    }
  }
  const setProductSelected = (p) => {
    if (p) {
      if (p.length > 0) {
        if (p[0] != product) {
          setProduct(p[0]);
        }
      }
    }
  }

  const renderDecreseProductModal = () => (
    <Modal toggle={toggleDecreaseProductModal} isOpen={decreaseProductModalOpen}>
      <ModalHeader toggle={toggleDecreaseProductModal}>
        Dar baixa em produto
      </ModalHeader>
      <ModalBody>
        Tem certeza que deseja dar baixa de {quantity} unidade(s) do produto {product.name + ' ' + product.unitQtd + ' ' + product.unitMeasure}(s)?
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
  const lotInfo = () => (
    <div className="lot-info">
      <h5>Informações sobre esse lote:</h5>
      <p>Data de adição {lot?.entryDate}</p>
      <p>Quantidade disponível: {lot?.productQty}</p>
      <p>Preço de compra: R${lot?.purchasePrice}</p>
    </div>
  );
  const renderDecreaseLotModal = () => (
    <Modal toggle={toggleDecreaseLotModal} isOpen={decreaseLotModalOpen}>
      <ModalHeader toggle={toggleDecreaseLotModal}> Remover produto com defeito</ModalHeader>
      <ModalBody>
        <p>De qual lote deseja remover?</p>
        <select className="select-alone" type="select" onChange={(e) => setLotSelected(e.target.value)}>
          <option value="" />
          {product?.lots?.filter((lot) => lot.productQty > 0).map((lot) => {
            return (
              <option key={lot.idLot} value={lot.idLot}>
                {lot.description}
              </option>
            );
          })}
        </select>
        {showLotInfo? lotInfo():null}
      </ModalBody>
      <ModalFooter>
        <p>
          A remoção do produto não será contabilizada como venda, apenas remoção por motivo específico de indisponibilidade do produto.
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
              <span>Unidade</span>
            </div>
            <div>
              <span>Lotes</span>
            </div>
          </CardBody>
        </Card>
        <div className="cards">
          {products.map((product) => {
            return (
              <div>
                <Card>
                  <CardBody id={product.idProduct} onClick={(e) => toggle(e.target.id)} className="product-card">
                    <div id={product.idProduct} onClick={(e) => toggle(e.target.id)}>
                      <p id={product.idProduct} onClick={(e) => toggle(e.target.id)}>{product.name}</p>
                    </div>
                    <div id={product.idProduct} onClick={(e) => toggle(e.target.id)}>
                      <p id={product.idProduct} onClick={(e) => toggle(e.target.id)}>{product.quantity}</p>
                    </div>
                    <div id={product.idProduct} onClick={(e) => toggle(e.target.id)}>
                      <p id={product.idProduct} onClick={(e) => toggle(e.target.id)}>
                        {product.uniQtd} {product.unitMeasure}(s)
                      </p>
                    </div>
                    <div id={product.idProduct} onClick={(e) => toggle(e.target.id)}>
                      <p id={product.idProduct} onClick={(e) => toggle(e.target.id)}>{product.lots.filter((l) => l.productQty > 0).length}</p>
                    </div>
                  </CardBody>
                  <Collapse value={product.idProduct} isOpen={product.idProduct == cardSelected}>
                    <CardText>
                      <div className="product-options-container">
                        <div className="product-options">
                          <button onClick={toggleDecreaseProductModal} className="decrease-button" type="button">Dar baixa</button>
                          <label>Quantidade</label>
                          <input className="input-quantity" type="number" defaultValue='' onChange={(e) => setQuantity(e.target.value)}></input>
                        </div>
                        <div className="decrease-link">
                          <a onClick={toggleDecreaseLotModal}>Remover produto com defeito</a>
                        </div>
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
    </div>
  );
};
export default ProductCard;
