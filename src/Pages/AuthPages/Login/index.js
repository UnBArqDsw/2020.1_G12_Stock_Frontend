/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/all';
import { AuthContext } from '../../../Contexts/AuthContext';
import './styles.css';
import ResultModal from '../../../Components/Modals/ResultModal';
import InputMask from 'react-input-mask';

export default function LoginPage() {
  const { signIn, checkAccessLevel } = useContext(AuthContext);
  const [document, setDocument] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [resultModalTitle, setResultModalTitle] = useState('');
  const [resultModalVisible, setResultModalVisible] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await signIn(document, password);
    setResultModalTitle(response?.message||response?.details);
    setResultModalVisible(true);
  };
  return (
    <div className="container">
      <div className="login-form">
        <h3>Portal do gestor</h3>
        <form onSubmit={onSubmit}>
          <label htmlFor="document">CPF:</label>
          <InputMask
            onChange={(e) => setDocument(e.target.value)}
            id="document"
            mask="999.999.999-99"
            maskChar=""
          />
          <label htmlFor="password">Senha:</label>
          <div className="password-input-container">
            <div className="password-icon-container">
              {passwordVisible ? (
                <AiFillEyeInvisible size={20} onClick={() => setPasswordVisible(false)} />
              ) : (
                <AiFillEye size={20} onClick={() => setPasswordVisible(true)} />
              )}
            </div>
            <input
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type={passwordVisible ? 'text' : 'password'}
            />
          </div>
          <p>
            Não é cadastrado ainda?{' '}
            <Link to="register/company" className="register-click">
              Clique aqui
            </Link>
          </p>
          <div className="login-submit">
            {!<><span>esqueci minha senha</span></>}
            <button type="submit">Entrar</button>
          </div>
        </form>
      </div>
      <ResultModal
        title={resultModalTitle}
        modalVisible={resultModalVisible}
        setModalVisible={setResultModalVisible}
        refresh={false}
      />
    </div>
  );
}
