/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect, useContext } from 'react';
import { FaFilter, FaSortAmountUp } from 'react-icons/all';
import ProductList from '../../Components/ProductList';
import GetService from '../../Services/GetService';
import { AuthContext } from '../../Contexts/AuthContext';
import NewLot from '../../Components/NewLot';
import NewProduct from '../../Components/NewProduct';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './styles.css';

export default function Stock() {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropDown = () => setDropdownOpen((prevState) => !prevState);

  const getProducts = async () => {
    const response = await GetService.getProducts(user.idCompany);
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
            <div className="nav-item">
              <Dropdown isOpen={dropdownOpen} toggle={toggleDropDown}>
                <DropdownToggle color="transparent" caret>
                  <FaFilter size={25} />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>Categoria</DropdownItem>
                  <DropdownItem>Preço</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
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
