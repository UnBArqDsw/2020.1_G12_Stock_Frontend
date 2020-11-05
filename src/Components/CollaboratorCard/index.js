import React, { useContext, useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/all';
import { AuthContext } from '../../Contexts/AuthContext';
import CollaboratorService from '../../Services/CollaboratorService'
import './styles.css';

export default function Footer() {
  const { user } = useContext(AuthContext);
  const [collaborators, setCollaborators] = useState([]);

  useEffect(() => {
    if(user) loadCollaborators();
  }, []);
  
  const loadCollaborators = async () => {
    try {
      const response = await CollaboratorService.loadCollaborator(user.idCompany);
      console.log(response);
      setCollaborators(response);

    } catch(error) {
      console.log(error);
    }
  }
  const nameAccessLevel = (user) => {
    let accessLevel;
    switch (user.idAccessLevel) {
      case 1:
        accessLevel = "Gestor";
        break;
      case 2:
        accessLevel = "Administrador";
        break;
      case 3:
        accessLevel = "Vendedor";
        break;
      default:
    }
    return accessLevel;
  }

  return (
    <div class="col-md-6">
      <div className="container">
        <div className="card-header">
          <img src='#' />
          <div className="collaborator">
            <p className="name">{user.name}</p>
            <p className="access-level">{nameAccessLevel(user)}</p>
          </div>
          <FaEdit size={25} />
        </div>
      </div>
    </div>
  );
}