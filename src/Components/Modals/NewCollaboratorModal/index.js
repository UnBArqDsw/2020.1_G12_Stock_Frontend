import React, { useState, useContext } from 'react';
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
  const [response, setResponse] = useState({});

  const onSubmit = (e) => {
    e.preventDefault();
    createCollaborator();
  };

  const createCollaborator = async () => {
    if (password && passwordConfirm && password === passwordConfirm) {
      try {
        const response = await CollaboratorService.createCollaborator(user.idCompany, name, cpf, email, idAccessLevel, password);
        setResponse(response)
        console.log(response);
        return response;

      } catch (error) {
        console.log(error);
      }
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
    <Modal isOpen={modalVisible} toggle={() => {
      setModalVisible(!modalVisible);
    }}>
      <ModalHeader isOpen={modalVisible} toggle={() => {
        setModalVisible(false)
      }}>Cadastrar novo(a) Colaborador(a)</ModalHeader>
      <ResultModal title={response.error ? ("Falha ao adicionar colaborador(a).") : ("Colaborador(a) adicionado com sucesso!")}
        modalVisible={resultModal}
        setModalVisible={setResultModal} />
      <form onSubmit={onSubmit}>
        <ModalBody>

          <div className="new-product-input-container">
            <div>
              <label htmlFor="name">Nome</label>
              <input type="text" onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label htmlFor="document">CPF</label>
              <InputMask
                onChange={(e) => setCpf(e.target.value)}
                id="document"
                mask="999.999.999-99"
                maskChar=""
              />
            </div>
          </div>
          <div className="new-product-input-container">
            <div>
              <label htmlFor="email">Email</label>
              <input type="text" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label htmlFor="idAccessLevel">Nível de Acesso</label>
              <select type="select" onChange={(e) => setIdAccessLevel(e.target.value)}>
                <option value=""></option>
                <option value="3">Vendedor(a)</option>
                <option value="2">Administrador(a)</option>
                <option value="1">Dono(a)</option>
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
            <button type="submit" className="secondary" onClick={() => setResultModal(true)}>
              Adicionar
          </button>
          </div>
        </ModalFooter>
      </form>
    </Modal>
  );
}