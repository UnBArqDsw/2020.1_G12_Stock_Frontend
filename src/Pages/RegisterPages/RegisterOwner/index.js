import React, { useState, useContext } from 'react';
import logo from '../../../assets/images/logo-horizontal.png';
import RegisterService from '../../../Services/RegisterService';
import FormBlock from '../../../Components/FormBlock'
import './styles.css';
import InputMask from 'react-input-mask';
import TextField from 'react';

export default function RegisterCompanyPage() {
  const [document, setDocument] = useState('');
  const [email, setEmail] = useState('');
  const [branch, setBranch] = useState('');
  const [company_name, setCompanyName] = useState('');
  const [telephone, setTelephone] = useState('');
  const [collaborator_quantity, setCollaboratorQuantity] = useState('');

  async function registerCompany() {
    try {
      await RegisterService.registerCompany(email, document, branch, company_name, telephone, collaborator_quantity);

    } catch (error) {
      console.log(error.response);
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    registerCompany(email, document, branch, company_name, telephone, collaborator_quantity);
  };



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
          <FormBlock label1="Nome" label2="CPF" typeInput1="text" typeInput2="text"/>
          <FormBlock label1="Email" label2="CNPJ/CPF da Empresa" typeInput1="text" typeInput2="text"/>
          <FormBlock label1="Senha" label2="Confirmar Senha" typeInput1="password" typeInput2="password"/>
          <div className="register-owner-submit">
            <span>Ao enviar o formulário, você concorda com nossos termos e condições, assim como nossas políticas de privacidade</span>
            <button type="submit">Cadastrar-se</button>
          </div>

        </form>
      </div>

    </div>

  );
}