import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../Contexts/AuthContext';
import logo from '../../../assets/images/logo-horizontal.png';
import './styles.css';

export default function LoginPage() {
  const { signIn } = useContext(AuthContext);
  const [document, setDocument] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    signIn(document, password);
  };
  return (
    <div className="container">
      <div className="login-header">
        <img src={logo} alt="logo" />
        <p>Cadastrar Estoque</p>
      </div>
      <div className="login-form">
        <h3>Portal do gestor</h3>
        <form onSubmit={onSubmit}>
          <label htmlFor="document">CPF:</label>
          <input onChange={(e) => setDocument(e.target.value)} id="document" />
          <label htmlFor="password">SENHA:</label>
          <input onChange={(e) => setPassword(e.target.value)} id="password" />

          <p>Não é cadastrado ainda? Clique aqui</p>
          <div className="login-submit">
            <span>esqueci minha senha</span>
            <button type="submit">Entrar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
