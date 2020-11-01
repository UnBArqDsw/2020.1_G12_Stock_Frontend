/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import logo from '../../assets/images/logo-simples.svg';
import './styles.css';

export default function Footer() {

  return (
    <div className="container">
      <div className="login-header">
        <a href="/home">
          <img src={logo} className="logo" alt="logo" />
        </a>
        <span className="rights">© Copyright 2020 - Stock - Todos os direitos reservados.</span>
        <div className="links container">
          <div className="signUp-page link">
            <a href="/login">
              <span class="signUp">Cadastrar</span>
            </a>
          </div>
          <div className="signIn-page link">
            <a href="/login">
              <span class="signUp">Portal do Gestor</span>
            </a>
          </div>
        </div>
        <div className="links container">
          <div className="link">
            <a href="/">
              <span class="signUp">Termos e Condições Gerais</span>
            </a>
          </div>
          <div className="link">
            <a href="/">
              <span class="signUp">Política de Privacidade</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
