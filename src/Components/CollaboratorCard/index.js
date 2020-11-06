import React, { useState } from 'react';
import CollaboratorService from '../../Services/CollaboratorService';
import { FaEdit } from 'react-icons/all';
import ConfirmationModal from '../ConfirmationModal';
import ResultModal from '../ResultModal';
import './styles.css';

export default function CollaboratorCard(props) {

  const { activate, idCollaborator, photo, name, accessLevel } = props;
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [resultModal, setResultModal] = useState(false);

  const changeStatusCollaborator = async () => {
    try {
      const response = await CollaboratorService.changeStatusCollaborator(idCollaborator, !activate);
      setConfirmationModal(false);
      setResultModal(true)
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="col-md-6">
      <ConfirmationModal modalVisible={confirmationModal}
        setModalVisible={setConfirmationModal}
        confirm={activate ? (
          "Desativar"
        ) : (
            "Ativar"
          )}
        cancel="Cancelar"
        title={activate ? (
          `Tem certeza que deseja desativar colaborator(a) ${name}?`
        ) : (
            `Tem certeza que deseja ativar colaborator(a) ${name}?`
          )}
        message={activate ? (
          "Ao desativar, você não perderá os dados do(a) usuário(a), porém ele(a) não terá mais acesso à plataforma."
        ) : (
            "Ao ativar, o(a) colaborador(a) voltará a ter acesso à plataforma."
          )}
        response={changeStatusCollaborator} />
      <ResultModal modalVisible={resultModal}
      setModalVisible={setResultModal}
      title={activate ? (
        `Colaborador(a) ${name} desativado(a) com sucesso!`
      ) : (
          `Colaborador(a) ${name} ativado(a) com sucesso!`
        )} />
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
          <a onClick={() => setConfirmationModal(true)} className="deactivate">
            {activate ? (
              "Desativar Colaborador"
            ) : (
                "Ativar Colaborador"
              )}
          </a>
          <p className="show-sells">Visualizar Vendas</p>
        </div>
      </div>
    </div>
  );
}
