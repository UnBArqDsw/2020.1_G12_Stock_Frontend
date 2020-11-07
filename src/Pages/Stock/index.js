import React, { useState, useEffect } from 'react';
import './styles.css';
import { FaFilter, FaSortAmountUp } from 'react-icons/all';
import { Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import ProductCard from '../../Components/ProductCard';
import SelectField from '../../Components/SelectField';
import GetService from '../../Services/GetService';
import RegisterService from '../../Services/RegisterService';

export default function Stock() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productName, setProductName] = useState('');
  const [productUnitQtd, setProductUnitQtd] = useState('');
  const [productUnitMeasure, setProductUnitMeasure] = useState('');
  const [productSalePrice, setProductSalePrice] = useState('');
  const history = useHistory();

  const getProducts = async () => {
    const response = await GetService.getProducts();
    setProducts(response);
  };
  const getCategories = async () => {
    const response = await GetService.getCategories();
    setCategories(response);
  };
  useEffect(() => {
    getProducts();
    getCategories();
  }, []);
  const [newProductModalOpen, setNewProductModalOpen] = useState(false);
  const toggleNewProductModal = () => setNewProductModalOpen(!newProductModalOpen);

  const [newLotModalOpen, setNewLotModalOpen] = useState(false);
  const toggleNewLotModal = () => setNewLotModalOpen(!newLotModalOpen);

  async function registerProduct() {
    try {
      const { status } = await RegisterService.registerProduct(
        productName,
        productUnitQtd,
        productUnitMeasure,
        productSalePrice
      );
      if (status === 200) {
        toggleNewProductModal();
        alert('Produto Cadastrado com sucesso!');
        history.push('/stock');
      }
    } catch (error) {
      console.log(error.response);
      alert(`Falha ao cadastrar produto: ${error.response}`);
    }
  }

  const renderNewProductModal = () => (
    <Modal toggle={toggleNewProductModal} isOpen={newProductModalOpen}>
      <ModalHeader toggle={toggleNewProductModal}>Cadastrar novo produto</ModalHeader>
      <ModalBody>
        <form>
          <div className="new-product-input-container">
            <div>
              <span>Nome</span>
              <input type="text" onChange={(e) => setProductName(e.target.value)} />
            </div>
            <div>
              <span>Preço</span>
              <input type="text" onChange={(e) => setProductSalePrice(e.target.value)} />
            </div>
          </div>
          <div className="new-product-input-container">
            <div>
              <span>Categorias</span>
              <SelectField array={categories} />
            </div>
            <div>
              <span>Unidade de medida</span>
              <input
                type="text"
                onChange={(e) => setProductUnitMeasure(e.target.value)}
                placeholder="Litro, Kilograma, etc.."
              />
            </div>
            <div className="new-product-input-container">
              <span>Quantidade da unidade de medida</span>
              <input
                type="number"
                onChange={(e) => setProductUnitQtd(e.target.value)}
                placeholder="2 Litros, 5 Kilogramas, etc.."
              />
            </div>
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <div className="add-product-modal-footer">
          <button
            type="button"
            className="secondary"
            onClick={(toggleNewProductModal, registerProduct)}
          >
            Adicionar
          </button>
        </div>
      </ModalFooter>
    </Modal>
  );

  const renderNewLotModal = () => (
    <Modal toggle={toggleNewLotModal} isOpen={newLotModalOpen}>
      <ModalHeader toggle={toggleNewLotModal}>Cadastro de Lote</ModalHeader>
      <ModalBody>
        <form>
          <div className="new-product-input-container">
            <div>
              <span>Data de entrada</span>
              <input type="text" />
            </div>
            <div>
              <span>Data de Vencimento</span>
              <input type="text" />
            </div>
          </div>

          <div className="new-product-input-container">
            <div>
              <span>Preço da compra</span>
              <input type="text" />
            </div>
            <div>
              <span>Quantidade</span>
              <input type="text" />
            </div>
          </div>

          <div className="new-product-input-container textarea">
            <div>
              <span>Descrição</span>
              <textarea />
            </div>
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <div className="add-product-modal-footer">
          <button type="button" className="secondary" onClick={toggleNewProductModal}>
            Cadastrar Lote
          </button>
        </div>
      </ModalFooter>
    </Modal>
  );
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
            <button type="button" className="secondary" onClick={toggleNewLotModal}>
              Importar
            </button>
            <button type="button" className="secondary" onClick={toggleNewProductModal}>
              Novo Produto
            </button>
          </div>
        </div>
      </div>
      <ProductCard products={products} />
      {renderNewProductModal()}
      {renderNewLotModal()}
    </div>
  );
}
