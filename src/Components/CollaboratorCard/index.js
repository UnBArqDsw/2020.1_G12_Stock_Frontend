import React, { useState, useEffect } from 'react';
import { FiEdit } from 'react-icons/all';
import { Link } from 'react-router-dom';
import CollaboratorService from '../../Services/CollaboratorService';
import AccessLevelService from '../../Services/AccessLevelService';
import ConfirmationModal from '../Modals/ConfirmationModal';
import ResultModal from '../Modals/ResultModal';
import UpdateCollaboratorModal from '../Modals/UpdateCollaboratorModal';
import defaultAvatar from '../../assets/images/default-user.png';
import './styles.css';

export default function CollaboratorCard(props) {
  const {
    activate,
    idCollaborator,
    photo,
    name,
    idAccessLevel,
    cpf,
    email,
    loadCollaborators,
  } = props;
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [accessLevel, setAccessLevel] = useState('');
  const [resultModal, setResultModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  useEffect(() => {
    if (idAccessLevel) nameAccessLevel();
  }, []);

  const changeStatusCollaborator = async () => {
    try {
      const response = await CollaboratorService.changeStatusCollaborator(
        idCollaborator,
        !activate
      );
      setConfirmationModal(false);
      setResultModal(true);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const nameAccessLevel = async () => {
    try {
      const response = await AccessLevelService.getAccessLevel(idAccessLevel);
      setAccessLevel(response[0].name);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="col-md-6">
      <ConfirmationModal
        modalVisible={confirmationModal}
        setModalVisible={setConfirmationModal}
        confirm={activate ? 'Desativar' : 'Ativar'}
        cancel="Cancelar"
        title={
          activate
            ? `Tem certeza que deseja desativar colaborator(a) ${name}?`
            : `Tem certeza que deseja ativar colaborator(a) ${name}?`
        }
        message={
          activate
            ? 'Ao desativar, você não perderá os dados do(a) usuário(a), porém ele(a) não terá mais acesso à plataforma.'
            : 'Ao ativar, o(a) colaborador(a) voltará a ter acesso à plataforma.'
        }
        response={changeStatusCollaborator}
      />
      <ResultModal
        modalVisible={resultModal}
        setModalVisible={setResultModal}
        title={
          activate
            ? `Colaborador(a) ${name} atualizado(a) com sucesso!`
            : `Colaborador(a) ${name} atualizado(a) com sucesso!`
        }
      />
      <UpdateCollaboratorModal
        modalVisible={updateModal}
        setModalVisible={setUpdateModal}
        idCollaborator={idCollaborator}
        loadCollaborators={loadCollaborators}
      />
      <div className="container">
        <div className="card-header">
          {photo ? (
            <img className="user-photo" src={photo} />
          ) : (
            <img className="user-photo" src={defaultAvatar} />
          )}
          <div className="collaborator">
            <p className="name">{name}</p>
            <p className="access-level">{accessLevel}</p>
          </div>
          <div className="icon-edit">
            <FiEdit size={25} onClick={() => setUpdateModal(true)} />
          </div>
        </div>
        <div className="collaborator-info">
          <p className="info-field">Email</p>
          <p className="info-data">{email}</p>
        </div>
        <div className="collaborator-info">
          <p className="info-field">CPF</p>
          <p className="info-data">{cpf}</p>
        </div>
        <div className="collaborator-actions">
          <a onClick={() => setConfirmationModal(true)} className="deactivate">
            {activate ? 'Desativar Colaborador' : 'Ativar Colaborador'}
          </a>
          <Link className="show-sells" to={{ pathname: '/history', state: { idCollaborator } }}>
            Visualizar Vendas
          </Link>
        </div>
      </div>
    </div>
  );
}
