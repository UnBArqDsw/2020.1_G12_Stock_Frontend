import React from 'react';
import './styles.css';
import { FaFilter, FaSortAmountUp } from 'react-icons/all';
import { Table } from 'reactstrap';
import ProductCard from '../../Components/ProductCard';

export default function Stock() {
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
            <button type="button" className="secondary">
              Importar
            </button>
            <button type="button" className="secondary">
              Novo Produto
            </button>
          </div>
        </div>
      </div>
      <ProductCard />
      {/* <Table hover style={{backgroundColor: "#fff", marginTop: 20}}>
      <thead>
        <tr>
          <th>Nome e descrição</th>
          <th>Quantidade</th>
          <th>Unidade</th>
          <th>Lotes</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>
           <p>Chá Camomila</p> 
           <p>Chá de Camomila LEÃO 10g com 10 Saquinhos</p>
            </th>
          <td>10</td>
          <td>100g</td>
          <td>4</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table> */}
    </div>
  );
}
