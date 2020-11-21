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
            <Link to="/login" className="signUp">Cadastrar
            </Link>
          </div>
          <div className="signIn-page link">
            <Link to="/register/company" className="signUp">Portal do Gestor
            </Link>
          </div>
        </div>
        <div className="links container">
          <div className="link">
            <Link to="/register/company" className="signUp">Termos e Condições Gerais</Link>
          </div>
          <div className="link">
            <Link to="/" className="signUp">Política de Privacidade</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
