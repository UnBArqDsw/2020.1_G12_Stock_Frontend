import React, { useState, useEffect } from 'react';
import './styles.css';
import { FaFilter, FaSortAmountUp } from 'react-icons/all';
import { Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import ProductCard from '../../Components/ProductCard';
import ProductService from '../../Services/ProductService';
import RegisterService from '../../Services/RegisterService';
import CategoryService from '../../Services/CategoryService';

export default function Stock() {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState('');
  const [productUnitQtd, setProductUnitQtd] = useState('');
  const [productUnitMeasure, setProductUnitMeasure] = useState('');
  const [productSalePrice, setProductSalePrice] = useState('');
  const [lotProduct, setLotProduct] = useState('');
  const [lotEntryDate, setLotEntryDate] = useState('');
  const [lotDueDate, setLotDueDate] = useState('');
  const [lotProductQty, setLotProductQty] = useState('');
  const [lotDescription, setLotDescription] = useState('');
  const [lotPurchasePrice, setLotPurchasePrice] = useState('');
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [newProductModalOpen, setNewProductModalOpen] = useState(false);
  const toggleNewProductModal = () => setNewProductModalOpen(!newProductModalOpen);

  const [newLotModalOpen, setNewLotModalOpen] = useState(false);
  const toggleNewLotModal = () => setNewLotModalOpen(!newLotModalOpen);

  const [newCategoryModalOpen, setNewCategoryModalOpen] = useState(false);
  const toggleNewCategoryModal = () => setNewCategoryModalOpen(!newCategoryModalOpen);

  const getProducts = async () => {
    const response = await ProductService.getProducts();
    setProducts(response);
  };

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  useEffect(() => {
    if (!newCategoryModalOpen) {
      setProductName('');
      setSelectedCategories([]);
      setProductUnitMeasure('');
      setProductUnitQtd('');
      setProductSalePrice('');
    }
  }, [newProductModalOpen]);

  useEffect(() => {
    if (!newLotModalOpen) {
      setLotProduct('');
      setLotEntryDate('');
      setLotDueDate('');
      setLotProductQty('');
      setLotDescription('');
      setLotPurchasePrice('');
    }
  }, [newLotModalOpen]);

  useEffect(() => {
    if (!newCategoryModalOpen) {
      setCategoryName('');
      setCategoryDescription('');
    }
  }, [newCategoryModalOpen]);

  async function registerProduct() {
    try {
      const { status } = await RegisterService.registerProduct(
        productName,
        productSalePrice,
        productUnitMeasure,
        productUnitQtd,
        selectedCategories
      );
      if (status === 200) {
        toggleNewProductModal();
        alert('Produto Cadastrado com sucesso!');
      }
    } catch (error) {
      console.log(error.response);
      alert(`Falha ao cadastrar produto: ${error.response}`);
    }
  }

  async function registerLot() {
    try {
      const { status } = await RegisterService.registerLot(
        lotProduct,
        lotEntryDate,
        lotDueDate,
        lotProductQty,
        lotDescription,
        lotPurchasePrice
      );
      if (status === 200) {
        toggleNewLotModal();
        alert('Lote Cadastrado com sucesso!');
      }
    } catch (error) {
      console.log(error.response);
      alert(`Falha ao cadastrar lote: ${error.response}`);
    }
  }

  const getCategories = async () => {
    const response = await CategoryService.getCategories();
    setCategories(response);
  };

  const createCategory = async () => {
    const response = await CategoryService.createCategory({
      name: categoryName,
      description: categoryDescription,
    });
    if (!response.error) {
      getCategories();
      toggleNewCategoryModal();
    } else {
      alert('Erro ao salvar a categoria!');
    }
  };

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
              <input type="number" onChange={(e) => setProductSalePrice(e.target.value)} />
            </div>
          </div>
          <div className="new-product-input-container">
            <div>
              <span>Unidade de medida</span>
              <input
                type="text"
                onChange={(e) => setProductUnitMeasure(e.target.value)}
                placeholder="Litro, Kilograma, etc.."
              />
            </div>
            <div>
              <span>Quantidade</span>
              <input
                type="number"
                onChange={(e) => setProductUnitQtd(e.target.value)}
                placeholder="2 Litros, 5 Kilogramas, etc.."
              />
            </div>
          </div>
          <div className="product-category">
            <span>Categorias</span>
            <div className="product-checks">
              {categories.map((category, i) => (
                <label for="category" key={i}>
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
        <button type="button" onClick={toggleNewCategoryModal}>
          Criar Categoria
        </button>

        <button className="secondary" type="button" onClick={registerProduct}>
          Adicionar
        </button>
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
              <input type="date" onChange={(e) => setLotEntryDate(e.target.value)} />
            </div>
            <div>
              <span>Data de Vencimento</span>
              <input type="date" onChange={(e) => setLotDueDate(e.target.value)} />
            </div>
          </div>

          <div className="new-product-input-container">
            <div>
              <span>Preço da compra</span>
              <input type="number" onChange={(e) => setLotPurchasePrice(e.target.value)} />
            </div>
            <div>
              <span>Quantidade</span>
              <input type="number" onChange={(e) => setLotProductQty(e.target.value)} />
            </div>
          </div>
          <div className="new-product-input-container">
            <div>
              <span>Produto</span>
              <select type="select" onChange={(e) => setLotProduct(e.target.value)}>
                <option value="" />
                {products.map((product, i) => {
                  return (
                    <option key={i} value={product.idProduct}>
                      {product.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="new-product-input-container textarea">
            <div>
              <span>Descrição</span>
              <textarea maxLength="255" onChange={(e) => setLotDescription(e.target.value)} />
            </div>
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <div className="add-product-modal-footer">
          <button type="button" className="secondary" onClick={registerLot}>
            Cadastrar Lote
          </button>
        </div>
      </ModalFooter>
    </Modal>
  );

  const renderNewCategoryModal = () => (
    <Modal isOpen={newCategoryModalOpen} toggle={toggleNewCategoryModal} size="sm">
      <ModalHeader toggle={toggleNewCategoryModal}>Criar Categoria</ModalHeader>
      <ModalBody>
        <div className="new-category-form">
          <label>Nome</label>
          <input onChange={(e) => setCategoryName(e.target.value)} value={categoryName} />
          <label>Descrição</label>
          <textarea
            onChange={(e) => setCategoryDescription(e.target.value)}
            value={categoryDescription}
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <button onClick={createCategory}>Criar</button>
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
              Novo lote de produto
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
      {renderNewCategoryModal()}
    </div>
  );
}
