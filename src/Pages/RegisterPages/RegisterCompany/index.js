import React, { useState, useContext, useEffect } from 'react';
import logo from '../../../assets/images/logo-horizontal.png';
import RegisterService from '../../../Services/RegisterService';
import './styles.css';
import { useHistory } from 'react-router-dom';
import InputMask from 'react-input-mask';

export default function RegisterCompanyPage() {
  const [document, setDocument] = useState('');
  const [email, setEmail] = useState('');
  const [branch, setBranch] = useState('');
  const [company_name, setCompanyName] = useState('');
  const [telephone, setTelephone] = useState('');
  const [collaborator_quantity, setCollaboratorQuantity] = useState('');
  const history = useHistory();

  async function registerCompany(email, document, branch, company_name, telephone, collaborator_quantity) {
    try {
      const {status} = await RegisterService.registerCompany(email, document, branch, company_name, telephone, collaborator_quantity);
      console.log(status);
      if (status == 200) {
        alert("Empresa cadastrada com sucesso!");
        history.push('/register/owner');
      }
    } catch (error) {
      console.log(error.response);
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(email, document, branch, company_name, telephone, collaborator_quantity);
    registerCompany(email, document, branch, company_name, telephone, collaborator_quantity);
  };
  return (
    <div className="container">
      <div className="register-company-header">
        <img src={logo} alt="logo" />
        <div><a className="link" href="/login">Portal do Gestor</a></div>
      </div>
      <div className="register-company-form">
        <h1>Comece agora mesmo</h1>
        <p>Preencha os dados abaixo para realizar o cadastro da sua empresa.</p>
        <form onSubmit={onSubmit} >
          <div className="info-block">
            <div className="input-area">
              <label htmlFor="document">Nome da Empresa:</label>
              <br />
              <input type="text" onChange={(e) => setCompanyName(e.target.value)} />
            </div>
            <div className="input-area">
              <label htmlFor="branch">Email Corporativo:</label>
              <br />
              <input type="text" onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <div className="info-block">
            <div className="input-area">
              <label htmlFor="document">CNPJ/CPF:</label>
              <br />
              <input type="text" onChange={(e) => setDocument(e.target.value)} />
            </div>
            <div className="input-area">
                <label htmlFor="document">Ramo do Negócio:</label>
                <br />
                <input type="text" onChange={(e) => setBranch(e.target.value)} />
            </div>
          </div>
          <div className="info-block">
            <div className="input-area">
              <label htmlFor="document">Telefone:</label>
              <br />
              <input type="text" onChange={(e) => setTelephone(e.target.value)} />
            </div>
            <div className="input-area">
              <label htmlFor="branch">Quantidade de Funcionários</label>
              <br />
              <input type="text" onChange={(e) => setCollaboratorQuantity(e.target.value)} />
            </div>
          </div>
          <div className="register-company-submit">
            <span>Ao enviar o formulário, você concorda com nossos termos e condições, assim como nossas políticas de privacidade</span>
            <button type="submit">Cadastrar Empresa</button>
          </div>

        </form>
      </div>

    </div>

  );
}