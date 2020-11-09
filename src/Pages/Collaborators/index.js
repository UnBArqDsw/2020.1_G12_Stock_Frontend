import React, { useContext, useState, useEffect } from 'react';
import { FaFilter, FaSortAmountUp } from 'react-icons/all';
import CollaboratorCard from '../../Components/CollaboratorCard';
import { AuthContext } from '../../Contexts/AuthContext';
import NewCollaboratorModal from '../../Components/Modals/NewCollaboratorModal';
import CollaboratorService from '../../Services/CollaboratorService';
import './styles.css';

export default function Collaborators() {
  const { user } = useContext(AuthContext);
  const [collaborators, setCollaborators] = useState([]);
  const [newCollaboratorModal, setNewCollaboratorModal] = useState(false);

  useEffect(() => {
    if (user) loadCollaborators();
  }, []);

  const loadCollaborators = async () => {
    try {
      const response = await CollaboratorService.loadCollaborator(user.idCompany);
      setCollaborators(response);

    } catch (error) {
      console.log(error);
    }
  }

  const cpfFormatted = (cpf) => {
    cpf = cpf.replace(/[^\d]/g, '');
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  return (
    <div className="container">
      <NewCollaboratorModal setModalVisible={setNewCollaboratorModal} modalVisible={newCollaboratorModal} />
      <div className="collaborator-content">
        <h1>Colaboradores</h1>
        <div className="toolbar">
          <div className="search-filter">
            <input type="text" placeholder="Procurar colaborador" />
            <FaFilter />
            <FaSortAmountUp />
          </div>
          <div className="create-collaborator">
            <button className="secondary" onClick={() => { setNewCollaboratorModal(true) }}>Novo Colaborador</button>
          </div>
        </div>
      </div>
      <div className="row">
        {collaborators.length ? collaborators.map(user =>
          <CollaboratorCard
            name={user.name}
            idAccessLevel={user.idAccessLevel}
            photo={user.photo}
            activate={user.activate}
            idCollaborator={user.idCollaborator}
            email={user.email}
            cpf={cpfFormatted(user.document)}
          />
        )
          : (<p>Você ainda não possui colaboradores cadastrados</p>)}
      </div>
    </div>
  );
}
