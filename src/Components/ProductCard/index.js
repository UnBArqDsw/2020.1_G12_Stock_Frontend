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
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [productString, setProductString] = useState('');
  const toggleDecreaseProductModal = () => {
    setDecreaseProductModalOpen(!decreaseProductModalOpen)
  };
  const toggle = (idCard) => {
    if (cardSelected === idCard) {
      setCardSelected('');
      setProductId('');
    } else {
      setProductId(idCard);
      setCardSelected(idCard);
    }
    setQuantity('');
  }

  const decreaseProduct = async () =>{
    try{
      const {errorData, status} = await DecreaseService.decreaseProduct(productId, quantity);
      if(status=== 200){
        toggleDecreaseProductModal();
        alert('Baixa do produto concluída com sucesso!');
      }else{
        toggleDecreaseProductModal();
        alert(`Falha ao dar baixa em produto: ${errorData.data.details}`);
      }
    }catch(error){
      alert(`Falha ao dar baixa em produto: ${error.data}`);
    }
  }
  const setProductSelected = (p) =>{
    if(p){
      if(p.length>0){
        if(p[0].name+' '+p[0].unitQtd+' '+p[0].unitMeasure!=productString){
          setProductString(p[0].name+' '+p[0].unitQtd+' '+p[0].unitMeasure);
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
        Tem certeza que deseja dar baixa de {quantity} unidade(s) do produto {setProductSelected(products.filter((element)=>element.idProduct == productId)), productString}(s)?
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
                      <p id={product.idProduct} onClick={(e) => toggle(e.target.id)}>{product.lots.length}</p>
                    </div>
                  </CardBody>
                  <Collapse value={product.idProduct} isOpen={product.idProduct == cardSelected}>
                    <CardText>
                      <div className="product-options">
                        <button onClick={toggleDecreaseProductModal} className="decrease-button" type="button">Dar baixa</button>
                        <label>Quantidade</label>
                        <input className="input-quantity" type="number" defaultValue='' onChange={(e)=>setQuantity(e.target.value)}></input>
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
    </div>
  );
};
export default ProductCard;
