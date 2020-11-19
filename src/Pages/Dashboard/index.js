import React from 'react';
import CategoryGraphic from '../../Components/Graphics/CategoryGraphic';
import "./styles.css";

export default function Dashboard() {
  return (
    <div className="container">
      <div className="dashboard-content">
        <h1>Painel de Controle</h1>
        <div className="row">
            <CategoryGraphic />  
            <CategoryGraphic />  
        </div>
        <div className="row">
        </div>
      </div>
    </div>
  );
}
