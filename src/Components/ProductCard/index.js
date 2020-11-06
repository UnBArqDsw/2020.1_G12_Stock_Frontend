import React, { Component, useState, useEffect } from 'react';
import { Card, CardBody } from 'reactstrap';
import './styles.css';
import GetService from '../../Services/GetService';

class ProductCard extends Component {
  render() {
    return (
      <div className="list-container">
        <Card>
          <CardBody className="product-header">
            <div>
              <span>Nome e Descrição</span>
            </div>
            <div>
              <span>Quantidade</span>
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
          {this.props.products.map((product) => {
            return (<Card>
              <CardBody className="product-card">
                <div>
                  <p>{product.name}</p>
                </div>
                <div>
                  <p>{product.quantity}</p>
                </div>
                <div>
                  <p>{product.uniQtd} {product.unitMeasure}(s)</p>
                </div>
                <div>
                  {console.log(product, product.lots)}
                <p>{product.lots}</p>
                </div>
              </CardBody>
            </Card>);
          })}

        </div>
      </div>
    );
  }
}
export default ProductCard;