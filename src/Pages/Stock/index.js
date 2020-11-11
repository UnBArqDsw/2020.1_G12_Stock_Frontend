/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import './styles.css';
import { FaFilter, FaSortAmountUp } from 'react-icons/all';
import ProductList from '../../Components/ProductList';
import GetService from '../../Services/GetService';
import NewLot from '../../Components/NewLot';
import NewProduct from '../../Components/NewProduct';

export default function Stock() {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [search, setSearch] = useState('');

  const getProducts = async () => {
    const response = await GetService.getProducts();
    setProducts(response);
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    const productsFilteredBySearch = products.filter((product) => product.name.includes(search));
    setProductsFiltered(productsFilteredBySearch);
  }, [search]);

  return (
    <div className="container">
      <div className="stock-content">
        <h1>Estoque</h1>
        <div className="toolbar">
          <div className="search-filter">
            <input
              type="text"
              placeholder="Procurar produtos"
              onChange={(e) => setSearch(e.target.value)}
            />
            <FaFilter />
            <FaSortAmountUp />
          </div>
          <div className="create-import">
            <NewLot products={products} />
            <NewProduct getProducts={getProducts} />
          </div>
        </div>
      </div>
      <ProductList products={search.length ? productsFiltered : products} />
    </div>
  );
}
