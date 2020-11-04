import React from 'react';
import { FaEdit } from 'react-icons/all';
import './styles.css';

export default function Footer() {
  return (
    <div class="col-md-6">
      <div className="container">
        <div className="card-header">
          <img src='#' />
          <div className="collaborator">
            <p className="name">Nome</p>
            <p className="access-level">Vendedor</p>
          </div>
          <FaEdit size={25} />
        </div>
      </div>
    </div>
  );
}