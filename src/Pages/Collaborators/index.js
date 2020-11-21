import React, { useState, useEffect } from 'react';
import { FaFilter, FaSortAmountUp } from 'react-icons/all';
import CollaboratorCard from '../../Components/CollaboratorCard';
import NewCollaboratorModal from '../../Components/Modals/NewCollaboratorModal';
import CollaboratorService from '../../Services/CollaboratorService';
import './styles.css';

export default function Collaborators() {
  const [collaborators, setCollaborators] = useState([]);
  const [collaboratorsFiltered, setCollaboratorsFiltered] = useState([]);
  const [newCollaboratorModal, setNewCollaboratorModal] = useState(false);
  const [search, setSearch] = useState('');

  const loadCollaborators = async () => {
    try {
      const response = await CollaboratorService.loadCollaborators();
      setCollaborators(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadCollaborators();
  }, []);
  useEffect(() => {
    const collaboratorsFilteredBySearch = collaborators.filter((collaborator) =>
      collaborator.name.includes(search)
    );
    setCollaboratorsFiltered(collaboratorsFilteredBySearch);
  }, [search]);

  const cpfFormatted = (cpf) => {
    cpf = cpf.replace(/[^\d]/g, '');
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  return (
    <div className="container">
      <NewCollaboratorModal
        setModalVisible={setNewCollaboratorModal}
        modalVisible={newCollaboratorModal}
        loadCollaborators={loadCollaborators}
      />
      <div className="collaborator-content">
        <h1>Colaboradores</h1>
        <div className="toolbar">
          <div className="search-collaborator-filter">
            <input
              type="text"
              placeholder="Procurar colaborador"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="create-collaborator">
            <button
              type="button"
              className="secondary"
              onClick={() => {
                setNewCollaboratorModal(true);
              }}
            >
              Novo Colaborador
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        {search.length
          ? collaboratorsFiltered?.map((user) => (
              <CollaboratorCard
                name={user.name}
                idAccessLevel={user.idAccessLevel}
                photo={user.photo}
                activate={user.activate}
                idCollaborator={user.idCollaborator}
                email={user.email}
                cpf={cpfFormatted(user.document)}
                loadCollaborators={loadCollaborators}
              />
            ))
          : collaborators?.map((user) => (
              <CollaboratorCard
                name={user.name}
                idAccessLevel={user.idAccessLevel}
                photo={user.photo}
                activate={user.activate}
                idCollaborator={user.idCollaborator}
                email={user.email}
                cpf={cpfFormatted(user.document)}
                loadCollaborators={loadCollaborators}
              />
            ))}
      </div>
    </div>
  );
}
