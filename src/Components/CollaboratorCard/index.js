import React from 'react';
import CollaboratorService from '../../Services/CollaboratorService';
import { FaEdit } from 'react-icons/all';
import './styles.css';

export default function CollaboratorCard(props) {

  const { activate, idCollaborator, photo, name, accessLevel } = props


  const changeStatusCollaborator = async () => {
    try {
      console.log(idCollaborator)
      console.log(!activate)
      const response = await CollaboratorService.changeStatusCollaborator(idCollaborator, !activate);
      return response
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="col-md-6">
      <div className="container">
        <div className="card-header">
          <img src={photo} />
          <div className="collaborator">
            <p className="name">{name}</p>
            <p className="access-level">{accessLevel}</p>
          </div>
          <FaEdit size={25} />
        </div>
        <div className="collaborator-actions">
          <button onClick={changeStatusCollaborator} className="deactivate">
            {activate ? (
              "Desativar Usuário"
            ) : (
                "Ativar Usuário"
              )}
          </button>
          <p className="show-sells">Visualizar Vendas</p>
        </div>
      </div>
    </div>
  );
}
