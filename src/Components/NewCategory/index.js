import React, { useState, useEffect } from 'react';
import './styles.css';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import CategoryService from '../../Services/CategoryService';
import ResultModal from '../Modals/ResultModal';

function NewCategory({ getCategories }) {
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [newCategoryModalOpen, setNewCategoryModalOpen] = useState(false);
  const toggleNewCategoryModal = () => setNewCategoryModalOpen(!newCategoryModalOpen);
  const [resultModalVisible, setResultModalVisible] = useState(false);
  const [resultModalTitle, setResultModalTitle] = useState('');

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
      setResultModalTitle('Erro ao salvar a categoria!');
      setResultModalVisible(true);
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
      <ResultModal
        title={resultModalTitle}
        modalVisible={resultModalVisible}
        setModalVisible={setResultModalVisible}
        refresh={false}
      />
      <button type="button" className="secondary-light" onClick={toggleNewCategoryModal}>
        Criar Categoria
      </button>
    </>
  );
}

export default NewCategory;
