/* eslint react/no-multi-comp: 0, react/prop-types: 0 */
import React, { useState, useEffect } from 'react';
import { FaClosedCaptioning } from 'react-icons/fa';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import CategoryService from '../../../Services/CategoryService';

export default function CategoryFilterModal(props) {

  const { categoryModalOpen, setCategoryModalOpen, applyFilter } = props;
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const getCategories = async () => {
    const response = await CategoryService.getCategories();
    setCategories(response);
  };


  useEffect(() => {
    getCategories();
  }, []);

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


  const toggleCategoryModal = () => setCategoryModalOpen(!categoryModalOpen);

  return (
    <div>
      <Modal toggle={toggleCategoryModal} isOpen={categoryModalOpen}>
        <ModalHeader toggle={toggleCategoryModal}>Filtrar por Categorias</ModalHeader>
        <ModalBody>
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
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => {
            applyFilter({ categories: selectedCategories.join() })
            setCategoryModalOpen(false)}}>Filtrar</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
