/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import logo from '../../assets/images/logo-horizontal.png';
import './styles.css';

export default function AuthNavBar() {

  return (
      <div className="container">
        <div className="login-header">
          <a href="/home">
            <img src={logo} alt="logo" />
          </a>
          <p class="signUp">Cadastrar Estoque</p>
          <div className="singIn-page">
            <a href="/login">
              <button class="signIn-button" type="button">Portal do Gestor</button>
            </a>
          </div>
        </div>
    </div>
  );
}
