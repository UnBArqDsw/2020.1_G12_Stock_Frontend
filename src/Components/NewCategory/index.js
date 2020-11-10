import React, { useState, useEffect } from 'react';
import './styles.css';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import CategoryService from '../../Services/CategoryService';

function NewCategory({ getCategories }) {
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [newCategoryModalOpen, setNewCategoryModalOpen] = useState(false);
  const toggleNewCategoryModal = () => setNewCategoryModalOpen(!newCategoryModalOpen);

  useEffect(() => {
    if (!newCategoryModalOpen) {
      setCategoryName('');
      setCategoryDescription('');
    }
  }, [newCategoryModalOpen]);

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
        <button type="button" onClick={createCategory}>
          Criar
        </button>
      </ModalFooter>
    </Modal>
  );

  return (
    <>
      {renderNewCategoryModal()}
      <button type="button" onClick={toggleNewCategoryModal}>
        Criar Categoria
      </button>
    </>
  );
}

export default NewCategory;
