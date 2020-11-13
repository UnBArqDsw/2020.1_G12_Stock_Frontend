import React, { useState, useContext, useEffect } from 'react';
import './styles.css';
import { Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import InputMask from 'react-input-mask';
import { AuthContext } from '../../../Contexts/AuthContext';
import CollaboratorService from '../../../Services/CollaboratorService';
import AccessLevelService from '../../../Services/AccessLevelService';
import ResultModal from '../ResultModal';

export default function NewCollaboratorModal(props) {
  const { user } = useContext(AuthContext);
  const { modalVisible, setModalVisible, loadCollaborators } = props;

  const [resultModal, setResultModal] = useState(false);
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [idAccessLevel, setIdAccessLevel] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [checkPasswordsText, setCheckPasswordsText] = useState('');
  const [responseCreate, setResponseCreate] = useState({});
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    getRoles();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    createCollaborator();
  };

  const getRoles = async () => {
    const response = await AccessLevelService.loadAccessLevel();
    setRoles(response);
  };

  const createCollaborator = async () => {
    if (password && passwordConfirm && password === passwordConfirm) {
      const response = await CollaboratorService.createCollaborator(
        user.idCompany,
        name,
        cpf,
        email,
        idAccessLevel,
        password
      );
      loadCollaborators();
      setResponseCreate(response);
      setResultModal(true);
      setModalVisible(false);
      return response;
    }
    setResponseCreate({});
  };

  const checkPassword = (pass_confirm) => {
    if (
      pass_confirm !== password &&
      password !== undefined &&
      pass_confirm !== undefined &&
      pass_confirm !== ''
    ) {
      setCheckPasswordsText('As senhas não correspondem.');
    } else {
      setCheckPasswordsText('');
    }
  };

  return (
    <>
      <ResultModal
        title={
          responseCreate.error || !responseCreate
            ? 'Falha ao adicionar colaborador(a).'
            : 'Colaborador(a) adicionado com sucesso!'
        }
        modalVisible={resultModal}
        setModalVisible={setResultModal}
        refresh={false}
      />
      <Modal
        isOpen={modalVisible}
        toggle={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <ModalHeader
          isOpen={modalVisible}
          toggle={() => {
            setModalVisible(false);
          }}
        >
          Cadastrar novo(a) Colaborador(a)
        </ModalHeader>
        <div className="new-collaborator-container">
          <form onSubmit={onSubmit}>
            <ModalBody>
              <div className="row new-collaborator-input-container">
                <div className="col-md-6">
                  <label htmlFor="name">Nome</label>
                  <input
                    type="text"
                    className="new-collaborator-input"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="document">CPF</label>
                  <InputMask
                    onChange={(e) => setCpf(e.target.value)}
                    className="new-collaborator-input"
                    id="document"
                    mask="999.999.999-99"
                    maskChar=""
                    required
                  />
                </div>
              </div>
              <div className="row new-collaborator-input-container">
                <div className="col-md-6">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="new-collaborator-input"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="idAccessLevel">Nível de Acesso</label>
                  <select type="select" onChange={(e) => setIdAccessLevel(e.target.value)}>
                    <option value="" />
                    {roles?.map((role, i) => (
                      <option key={i} value={role.idAccessLevel}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="row new-collaborator-input-container">
                <div className="col-md-6">
                  <label htmlFor="password">Senha</label>
                  <input
                    type="password"
                    className="new-collaborator-input"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="passwordConfirm">Confirmar Senha</label>
                  <input
                    type="password"
                    className="new-collaborator-input"
                    onChange={function (e) {
                      setPasswordConfirm(e.target.value);
                      checkPassword(e.target.value);
                    }}
                    required
                  />
                  <p className="password-text">{checkPasswordsText}</p>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <div className="add-product-modal-footer">
                <button
                  type="submit"
                  className="secondary"
                  disabled={
                    !password || !passwordConfirm || !idAccessLevel || !email || !cpf || !name
                  }
                >
                  Adicionar
                </button>
              </div>
            </ModalFooter>
          </form>
        </div>
      </Modal>
    </>
  );
}
