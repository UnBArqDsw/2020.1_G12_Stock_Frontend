import React from 'react';
import { FaEdit } from 'react-icons/all';
import './styles.css';

export default function CollaboratorCard(props) {
  return (
    <div class="col-md-6">
      <div className="container">
        <div className="card-header">
          <img src={props.photo} />
          <div className="collaborator">
            <p className="name">{props.name}</p>
            <p className="access-level">{props.accessLevel}</p>
          </div>
          <FaEdit size={25} />
        </div>
        <div className="collaborator-actions">
          <p className="deactivate">Desativar Colaborador</p>
          <p className="show-sells">Visualizar Vendas</p>
        </div>
      </div>
    </div>
  );
}
