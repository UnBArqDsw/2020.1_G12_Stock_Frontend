import React, { useState, useContext, useEffect } from 'react';
import './styles.css';
import { Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import { AuthContext } from '../../../Contexts/AuthContext';
import CollaboratorService from '../../../Services/CollaboratorService';
import AccessLevelService from '../../../Services/AccessLevelService';
import ResultModal from '../ResultModal';
import InputMask from 'react-input-mask';

export default function UpdateCollaboratorModal(props) {
  const { user } = useContext(AuthContext);
  const { modalVisible, setModalVisible, idCollaborator } = props;

  const [resultModal, setResultModal] = useState(false)
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [idAccessLevel, setIdAccessLevel] = useState('');
  const [accessLevel, setAccessLevel] = useState('');
  const [responseUpdate, setResponseUpdate] = useState({});
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    getCollaborator();
    getRoles();
    if (idAccessLevel) nameAccessLevel();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    updateCollaborator();
  };

  const getRoles = async () => {
    const response = await AccessLevelService.loadAccessLevel();
    setRoles(response);
  };

  const nameAccessLevel = async (idAccessLevel) => {
    try {
      const response = await AccessLevelService.getAccessLevel(idAccessLevel);
      setAccessLevel(response[0].name);

    } catch (error) {
      console.log(error);
    }
  }

  const getCollaborator = async () => {
    const response = await CollaboratorService.loadCollaborator(idCollaborator);
    setName(response.name);
    setCpf(response.document);
    setEmail(response.email);
    setIdAccessLevel(response.idAccessLevel);
    nameAccessLevel(response.idAccessLevel);
  };

  const updateCollaborator = async () => {
    const params = { name: name, email: email, idAccessLevel: idAccessLevel, document: cpf };
    try {
      const response = await CollaboratorService.editCollaborator(idCollaborator, params);
      setResponseUpdate(response);
      setResultModal(true);
      setModalVisible(false);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <ResultModal title={responseUpdate.error || !responseUpdate ? ("Falha ao atualizar colaborador(a).") : ("Colaborador(a) atualizado(a) com sucesso!")}
        modalVisible={resultModal}
        setModalVisible={setResultModal} />
      <Modal isOpen={modalVisible} toggle={() => {
        setModalVisible(!modalVisible);
      }}>
        <ModalHeader isOpen={modalVisible} toggle={() => {
          setModalVisible(false)
        }}>Editar Colaborador(a)</ModalHeader>
        <div className="edit-collaborator-container">
          <form onSubmit={onSubmit}>
            <ModalBody>
              <div className="row edit-collaborator-input-container">
                <div className="col-md-6">
                  <label htmlFor="name">Nome</label>
                  <input type="text" value={name} className="edit-collaborator-input" onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                  <label htmlFor="document">CPF</label>
                  <InputMask
                    value={cpf} onChange={(e) => setCpf(e.target.value)}
                    id="document"
                    mask="999.999.999-99"
                    className="edit-collaborator-input"
                    maskChar=""
                    required />
                </div>
              </div>
              <div className="row edit-collaborator-input-container">
                <div className="col-md-6">
                  <label htmlFor="email">Email</label>
                  <input type="text" value={email} className="edit-collaborator-input" onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                  <label htmlFor="idAccessLevel">Nível de Acesso</label>
                  <select type="select" onChange={(e) => setIdAccessLevel(e.target.value)}>
                    <option value="">{accessLevel}</option>
                    {roles?.map((role, i) => (
                      <option key={i} value={role.idAccessLevel}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="add-product-modal-footer">
                <button type="submit" className="secondary" disabled={!idAccessLevel || !email || !cpf || !name}>
                  Salvar
          </button>
              </div>
            </ModalFooter>
          </form>
        </div>
      </Modal>
    </>
  );
}