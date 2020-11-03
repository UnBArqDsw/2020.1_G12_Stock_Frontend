/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link } from 'react-router-dom';
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
            <Link to="/login">
              <span className="signUp">Cadastrar</span>
            </Link>
          </div>
          <div className="signIn-page link">
            <Link to="/login">
              <span className="signUp">Portal do Gestor</span>
            </Link>
          </div>
        </div>
        <div className="links container">
          <div className="link">
            <Link to href="/">
              <span className="signUp">Termos e Condições Gerais</span>
            </Link>
          </div>
          <div className="link">
            <Link to="/">
              <span className="signUp">Política de Privacidade</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
