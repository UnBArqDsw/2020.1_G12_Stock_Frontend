import React from 'react';
import { Card, CardBody } from 'reactstrap';
import './styles.css';

export default function ProductCard() {
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
      <Card>
        <CardBody className="product-card">
          <div>
            <p>Chá de camomila</p>
            <p>aazzzzzzzzzzzzzzzzzzzzzssssssssssssssssssssssssssssssssssssssssszzzzzz</p>
          </div>
          <div>
            <p>10</p>
          </div>
          <div>
            <p>100g</p>
          </div>
          <div>
            <p>4</p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
