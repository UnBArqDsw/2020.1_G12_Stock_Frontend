/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import { FaFilter, FaSortAmountUp } from 'react-icons/all';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import ProductList from '../../Components/ProductList';
import ProductService from '../../Services/ProductService';
import NewLot from '../../Components/NewLot';
import NewProduct from '../../Components/NewProduct';
import CategoryFilterModal from '../../Components/Modals/CategoryFilterModal';
import './styles.css';

export default function Stock() {
  const [products, setProducts] = useState([]);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({});
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  const filterToggleDropDown = () => setFilterDropdownOpen((prevState) => !prevState);

  const sortToggleDropDown = () => setSortDropdownOpen((prevState) => !prevState);

  const getProducts = async () => {
    const response = await ProductService.getProducts(filters);
    setProducts(response);
  };

  const applyFilter = async (filter) => {
    setFilters({ ...filters, ...filter });
  };

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
                  <FaSortAmountUp size={25} />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={() => applyFilter({ orderPrice: 'ASC' })}>
                    Preço Crescente
                  </DropdownItem>
                  <DropdownItem onClick={() => applyFilter({ orderPrice: 'DESC' })}>
                    Preço Decrescente
                  </DropdownItem>
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
      <CategoryFilterModal
        applyFilter={applyFilter}
        setCategoryModalOpen={setCategoryModalOpen}
        categoryModalOpen={categoryModalOpen}
      />
      <ProductList products={search.length ? productsFiltered : products} />
    </div>
  );
}
