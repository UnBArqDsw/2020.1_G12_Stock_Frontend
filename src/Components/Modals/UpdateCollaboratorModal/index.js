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
  const [responseUpdate, setResponseUpdate] = useState({});
  const [roles, setRoles] = useState([]);
  const [collaborator, setCollaborator] = useState({});

  useEffect(() => {
    getCollaborator();
    getRoles()
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    updateCollaborator();
  };

  const getRoles = async () => {
    const response = await AccessLevelService.loadAccessLevel();
    setRoles(response);
  };

  const getCollaborator = async () => {
    const response = await CollaboratorService.loadCollaborator(idCollaborator);
    setCollaborator(response);
  };

  const updateCollaborator = async () => {

    const params = { name: name, email: email, idAccessLevel: idAccessLevel, document: cpf };
    try {
      const response = await CollaboratorService.updateCollaborator(user.idCompany, params);
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
        }}>Atualizar Colaborador(a)</ModalHeader>
        <div className="new-product-container">
          <form onSubmit={onSubmit}>
            <ModalBody>

              <div className="new-product-input-container">
                <div>
                  <label htmlFor="name">Nome</label>
                  <input type="text" value={collaborator.name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                  <label htmlFor="document">CPF</label>
                  <InputMask
                    placeholder={collaborator.document}
                    value={collaborator.document} onChange={(e) => setCpf(e.target.value)}
                    id="document"
                    mask="999.999.999-99"
                    maskChar=""
                    required />
                </div>
              </div>
              <div className="new-product-input-container">
                <div>
                  <label htmlFor="email">Email</label>
                  <input type="text" value={collaborator.email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                  <label htmlFor="idAccessLevel">Nível de Acesso</label>
                  <select type="select" onChange={(e) => setIdAccessLevel(e.target.value)}>
                    <option value=""></option>
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
                <button type="submit" className="secondary" disabled={ !idAccessLevel || !email || !cpf || !name}>
                  Atualizar
          </button>
              </div>
            </ModalFooter>
          </form>
        </div>
      </Modal>
    </>
  );
}