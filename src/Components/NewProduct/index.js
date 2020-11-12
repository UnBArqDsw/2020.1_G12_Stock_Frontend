import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import CategoryService from '../../Services/CategoryService';
import RegisterService from '../../Services/RegisterService';
import NewCategoria from '../NewCategory';
import ResultModal from '../Modals/ResultModal';

export default function NewProduct() {
  const [productName, setProductName] = useState('');
  const [productUnitQtd, setProductUnitQtd] = useState('');
  const [productUnitMeasure, setProductUnitMeasure] = useState('');
  const [productSalePrice, setProductSalePrice] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [newProductModalOpen, setNewProductModalOpen] = useState(false);
  const [resultModalTitle, setResultModalTitle] = useState('');
  const [resultModalVisible, setResultModalVisible] = useState(false);

  const toggleNewProductModal = () => setNewProductModalOpen(!newProductModalOpen);

  const getCategories = async () => {
    const response = await CategoryService.getCategories();
    setCategories(response);
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (!newProductModalOpen) {
      setProductName('');
      setSelectedCategories([]);
      setProductUnitMeasure('');
      setProductUnitQtd('');
      setProductSalePrice('');
    }
  }, [newProductModalOpen]);

  async function registerProduct() {
    const result = await RegisterService.registerProduct(
      productName,
      productSalePrice,
      productUnitMeasure,
      productUnitQtd,
      selectedCategories
    );
    if (result.status === 200) {
      toggleNewProductModal();
      setResultModalTitle('Produto Cadastrado com sucesso!');
      setResultModalVisible(true);
    } else if (result.error) {
      setResultModalTitle(`Falha ao cadastrar produto: ${result.erroData.response?.data?.details}`);
      setResultModalVisible(true);
    }
  }

  const selectCategory = (e) => {
    const categoryId = Number(e.target.value);
    if (selectedCategories.includes(categoryId)) {
      const newSelectedCategories = selectedCategories.filter(
        (selectedCategoryId) => categoryId !== selectedCategoryId
      );
      setSelectedCategories(newSelectedCategories);
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

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
              <input
                value={`R$ ${productSalePrice}`}
                onChange={(e) => {
                  const price = e.target.value.split(' ')[1];
                  setProductSalePrice(price || '');
                }}
              />
            </div>
          </div>
          <div className="new-product-input-container">
            <div>
              <span>Quantidade</span>
              <input
                type="number"
                onChange={(e) => setProductUnitQtd(e.target.value)}
                placeholder="2 Litros, 5 Kilogramas, etc.."
              />
            </div>
            <div>
              <span>Unidade de medida</span>
              <input
                type="text"
                onChange={(e) => setProductUnitMeasure(e.target.value)}
                placeholder="Litro, Kilograma, etc.."
              />
            </div>
          </div>
          <div className="product-category">
            <span>Categorias</span>
            <div className="product-checks">
              {categories.map((category, i) => (
                <label htmlFor="category" key={i}>
                  <input
                    checked={selectedCategories.includes(category.idCategory)}
                    type="checkbox"
                    name="category"
                    value={category.idCategory}
                    onChange={selectCategory}
                  />{' '}
                  {category.name}
                </label>
              ))}
            </div>
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <NewCategoria getCategories={getCategories} />
        <button className="secondary" type="button" onClick={registerProduct}>
          Adicionar
        </button>
      </ModalFooter>
    </Modal>
  );

  return (
    <>
      {renderNewProductModal()}
      <ResultModal
        title={resultModalTitle}
        modalVisible={resultModalVisible}
        setModalVisible={setResultModalVisible}
        refresh={false}
      />
      <button type="button" className="secondary" onClick={toggleNewProductModal}>
        Novo Produto
      </button>
    </>
  );
}
