import React,  { useContext, useEffect } from 'react';
import { Card, CardBody } from 'reactstrap';
import './styles.css';
import { DeviceContext } from '../../Contexts/DeviceContext';
import CategoryService from '../../Services/CategoryService';

const ProductCard = ({ products }) => {
  const { isMobile } = useContext(DeviceContext);


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
          <div>
            <span>Categorias</span>
          </div>
        </CardBody>
      </Card>
      <div className="cards">
        {products.map((product) => {
          return (
            <Card>
              <CardBody className="product-card">
                <div>
                  <p>{product.name}</p>
                </div>
                <div>
                  <p>{product.quantity}</p>
                </div>
                <div>
                  <p>
                    {product.uniQtd} {product.unitMeasure}(s)
                  </p>
                </div>
                <div>
                  <p>{product.lots.length}</p>
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
export default ProductCard;
