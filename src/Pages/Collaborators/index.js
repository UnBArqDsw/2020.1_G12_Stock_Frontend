import React from 'react';
import { FaFilter, FaSortAmountUp } from 'react-icons/all';
import CollaboratorCard from '../../Components/CollaboratorCard';
import './styles.css';


export default function Collaborators() {
  return (
    <div className="container">
      <div className="collaborator-content">
        <h1>Colaboradores</h1>
        <div className="toolbar">
          <div className="search-filter">
            <input type="text" placeholder="Procurar colaborador" />
            <FaFilter />
            <FaSortAmountUp />
          </div>
          <div className="create-collaborator">
            <button className="secondary">Novo Colaborador</button>
          </div>
        </div>
      </div>
      <div class="row">      
          <CollaboratorCard />
          <CollaboratorCard />
          <CollaboratorCard />
      </div>
    </div>
  );
}