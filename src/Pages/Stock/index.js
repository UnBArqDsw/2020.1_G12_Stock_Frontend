/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { FaFilter, FaSortAmountUp } from 'react-icons/all';
import ProductList from '../../Components/ProductList';
import GetService from '../../Services/GetService';
import NewLot from '../../Components/NewLot';
import NewProduct from '../../Components/NewProduct';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import CategoryFilterModal from '../../Components/Modals/CategoryFilterModal';
import PriceSortModal from '../../Components/Modals/PriceSortModal';
import './styles.css';

export default function Stock() {
  const [products, setProducts] = useState([]);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [priceModalOpen, setPriceModalOpen] = useState(false);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({})
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  const filterToggleDropDown = () => setFilterDropdownOpen((prevState) => !prevState);

  const sortToggleDropDown = () => setSortDropdownOpen((prevState) => !prevState);

  const getProducts = async () => {
    const response = await GetService.getProducts(filters);
    setProducts(response);
  };

  const applyFilter = async (filter) => {
    setFilters({ ...filters, ...filter });
  }

  useEffect(() => {
    getProducts();
  }, [filters]);

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
              <Dropdown isOpen={filterDropdownOpen} toggle={filterToggleDropDown}>
                <DropdownToggle color="transparent" caret>
                  <FaFilter size={25} />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => setCategoryModalOpen(true)}>Categoria</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <div className="nav-item">
              <Dropdown isOpen={sortDropdownOpen} toggle={sortToggleDropDown}>
                <DropdownToggle color="transparent" caret>
                <FaSortAmountUp size={25}/>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => setPriceModalOpen(true)}>Preço</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <div className="create-import">
            <NewLot products={products} />
            <NewProduct getProducts={getProducts} />
          </div>
        </div>
      </div>
      <PriceSortModal applyFilter={applyFilter}  setPriceModalOpen={setPriceModalOpen} priceModalOpen={priceModalOpen} />
      <CategoryFilterModal applyFilter={applyFilter} setCategoryModalOpen={setCategoryModalOpen} categoryModalOpen={categoryModalOpen} />
      <ProductList products={search.length ? productsFiltered : products} />
    </div >
  );
}
