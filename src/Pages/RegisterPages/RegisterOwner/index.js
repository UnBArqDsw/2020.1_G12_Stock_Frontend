import React, { useState} from 'react';
import logo from '../../../assets/images/logo-horizontal.png';
import RegisterService from '../../../Services/RegisterService';
import './styles.css';

export default function RegisterOwnerPage() {
  const [cpf, setCpf] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirm, setPasswordConfirm] = useState('');
  const [checkPassowordsText, setCheckPasswordsText] = useState('');

  async function registerOwner(name, cpf, email, cpfCnpj, password, password_confirm) {
    console.log(password_confirm, password);
    if (password_confirm === password && password !== undefined && password_confirm !== undefined && password_confirm !== '') {
      try {
        const {status} = await RegisterService.registerOwner(name, cpf, email, cpfCnpj, password);
        console.log(status);
      } catch (error) {
        console.log(error.response);
      }
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(name, cpf, email, cpfCnpj, password, password_confirm);
    registerOwner(name, cpf, email, cpfCnpj, password, password_confirm);
  };

  const checkPassword = (pass_confirm) => {
    if (pass_confirm !== password && password !== undefined && pass_confirm !== undefined && pass_confirm !== '') {
      setCheckPasswordsText('As senhas não correspondem.');
    } else {
      setCheckPasswordsText('');
    }
  }

  return (
    <div className="container">
      <div className="register-owner-header">
        <img src={logo} alt="logo" />
        <div>Portal do Gestor</div>
      </div>
      <div className="register-owner-form">
        <h1>Faça seu cadastro de Gestor</h1>
        <p>Preencha os dados abaixo para realizar seu cadastro.</p>
        <form onSubmit={onSubmit} >
          <div className="info-block">
            <div className="input-area">
              <label htmlFor="name" >Nome:</label>
              <br />
              <input type="text" onChange={(e) => setName(e.target.value)} required/>
            </div>
            <div className="input-area">
              <label htmlFor="cpf" >CPF:</label>
              <br />
              <input type="text" onChange={(e) => setCpf(e.target.value)} required/>
            </div>
          </div>
          <div className="info-block">
            <div className="input-area">
              <label htmlFor="email" >Email:</label>
              <br />
              <input type="text" onChange={(e) => setEmail(e.target.value)} required/>
            </div>
            <div className="input-area">
              <label htmlFor="cpfCnpj" >CNPJ/CPF da Empresa:</label>
              <br />
              <input type="text" onChange={(e) => setCpfCnpj(e.target.value)} required/>
            </div>
          </div>
          <div className="info-block">
            <div className="input-area">
              <label htmlFor="password">Senha:</label>
              <br />
              <input type="password" onChange={(e) => setPassword(e.target.value)} required/>
            </div>
            <div className="input-area">
              <label htmlFor="password_confirm" >Confirmação de Senha:</label>
              <br />
              <input type="password" onChange={function(e){setPasswordConfirm(e.target.value);checkPassword(e.target.value);}} required/>
              <p className="password-text">{checkPassowordsText}</p>
            </div>
          </div>
          
          <div className="register-owner-submit">
            <span>Ao enviar o formulário, você concorda com nossos termos e condições, assim como nossas políticas de privacidade</span>
            <button type="submit">Cadastrar-se</button>
          </div>

        </form>
      </div>

    </div>

  );
}