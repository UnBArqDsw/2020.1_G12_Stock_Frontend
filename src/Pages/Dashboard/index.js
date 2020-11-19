import React from 'react';
import CategoryGraphic from '../../Components/Graphics/CategoryGraphic';
import "./styles.css";

export default function Dashboard() {
  return (
    <div className="container">
      <h1>Dashboard</h1>
      <div className="category-graphic">
        <p>Relação de Produtos em estoque por Categoria</p>
        <CategoryGraphic />
      </div>
      
    </div>
  );
}
