import React from 'react';
import { FaFilter } from 'react-icons/all';
import './styles.css'

export default function History() {
  return (
    <div className="container">
      <div className="history-content">
        <h1>Histórico</h1>
      </div>
      <div className="history-input-container">
        <span>Filtrar por:</span>
        <div className="history-icon-container">
          <FaFilter />
        </div>
        <input id="history" />
      </div>
    </div>
  );
}
