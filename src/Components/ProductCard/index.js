import React, { Component } from 'react';
import { Collapse, Button, CardBody, Card, CardText } from 'reactstrap';
import './styles.css';
import { useContext, useState } from 'react';
import { DeviceContext } from '../../Contexts/DeviceContext';

const ProductCard = ({ products }) => {
  const { isMobile } = useContext(DeviceContext);
  const [cardSelected, setCardSelected] = useState('');
  const toggle = (idCard)=>{
    console.log(idCard);
    if (cardSelected === idCard){
      setCardSelected('');
    }else{
      setCardSelected(idCard);
    }
  }
  return (
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
                <CardBody id = {product.idProduct} onClick={(e)=>toggle(e.target.id)} className="product-card">
                  <div id = {product.idProduct} onClick={(e)=>toggle(e.target.id)}>
                    <p id = {product.idProduct} onClick={(e)=>toggle(e.target.id)}>{product.name}</p>
                  </div>
                  <div id = {product.idProduct} onClick={(e)=>toggle(e.target.id)}>
                    <p id = {product.idProduct} onClick={(e)=>toggle(e.target.id)}>{product.quantity}</p>
                  </div>
                  <div id = {product.idProduct} onClick={(e)=>toggle(e.target.id)}>
                    <p id = {product.idProduct} onClick={(e)=>toggle(e.target.id)}>
                      {product.uniQtd} {product.unitMeasure}(s)
                    </p>
                  </div>
                  <div id = {product.idProduct} onClick={(e)=>toggle(e.target.id)}>
                    <p id = {product.idProduct} onClick={(e)=>toggle(e.target.id)}>{product.lots.length}</p>
                  </div>
                </CardBody>
                <Collapse value={product.idProduct} isOpen={product.idProduct == cardSelected}>
                  <CardText>
                  Some quick example text to build on the card title and make up the bulk of
      the card's content.
                  </CardText>
                </Collapse>
              </Card>
              
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ProductCard;
