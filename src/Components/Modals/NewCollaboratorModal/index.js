import React, { useState, useContext, useEffect } from 'react';
import './styles.css';
import { Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import { AuthContext } from '../../../Contexts/AuthContext';
import CollaboratorService from '../../../Services/CollaboratorService';
import ResultModal from '../ResultModal';
import InputMask from 'react-input-mask';

export default function NewCollaboratorModal(props) {
  const { user } = useContext(AuthContext);
  const { modalVisible, setModalVisible } = props;

  const [resultModal, setResultModal] = useState(false)
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
    const response = await CollaboratorService.loadAccessLevel();
    setRoles(response);
  };

  const createCollaborator = async () => {
    if (password && passwordConfirm && password === passwordConfirm) {
      try {
        const response = await CollaboratorService.createCollaborator(user.idCompany, name, cpf, email, idAccessLevel, password);
        setResponseCreate(response);
        setResultModal(true);
        setModalVisible(false);
        return response;
      } catch (error) {
      }
    }
    else {
      setResponseCreate({})
    }
  }

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
      <ResultModal title={responseCreate.error || !responseCreate ? ("Falha ao adicionar colaborador(a).") : ("Colaborador(a) adicionado com sucesso!")}
        modalVisible={resultModal}
        setModalVisible={setResultModal} />
      <Modal isOpen={modalVisible} toggle={() => {
        setModalVisible(!modalVisible);
      }}>
        <ModalHeader isOpen={modalVisible} toggle={() => {
          setModalVisible(false)
        }}>Cadastrar novo(a) Colaborador(a)</ModalHeader>
        <div className="new-product-container">
          <form onSubmit={onSubmit}>
            <ModalBody>

              <div className="new-product-input-container">
                <div>
                  <label htmlFor="name">Nome</label>
                  <input type="text" onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                  <label htmlFor="document">CPF</label>
                  <InputMask
                    onChange={(e) => setCpf(e.target.value)}
                    id="document"
                    mask="999.999.999-99"
                    maskChar=""
                    required />
                </div>
              </div>
              <div className="new-product-input-container">
                <div>
                  <label htmlFor="email">Email</label>
                  <input type="text" onChange={(e) => setEmail(e.target.value)} required />
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
              <div className="new-product-input-container">
                <div>
                  <label htmlFor="password">Senha</label>
                  <input type="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="passwordConfirm">Confirmar Senha</label>
                  <input type="password" onChange={function (e) {
                    setPasswordConfirm(e.target.value);
                    checkPassword(e.target.value);
                  }}
                    required />
                  <p className="password-text">{checkPasswordsText}</p>
                </div>
              </div>

            </ModalBody>
            <ModalFooter>
              <div className="add-product-modal-footer">
                <button type="submit" className="secondary" disabled={!password || !passwordConfirm || !idAccessLevel || !email || !cpf || !name}>
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