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
      <div className="register-company-header">
        <img src={logo} alt="logo" />
        <div>Portal do Gestor</div>
      </div>
      <div className="register-company-form">
        <h1>Comece agora mesmo</h1>
        <p>Preencha os dados abaixo para realizar o cadastro da sua empresa.</p>
        <form onSubmit={onSubmit} >
          <FormBlock label1="Nome da Empresa" label2="CNPJ/CPF" typeInput1="text" typeInput2="text"/>
          <FormBlock label1="Email corporativo" label2="Telefone" typeInput1="text" typeInput2="text"/>
          <FormBlock label1="Ramo da Empresa" label2="Quantidade de Funcionários" typeInput1="text" typeInput2="text"/>
          <div className="register-company-submit">
            <span>Ao enviar o formulário, você concorda com nossos termos e condições, assim como nossas políticas de privacidade</span>
            <button type="submit">Cadastrar Empresa</button>
          </div>

        </form>
      </div>

    </div>

  );
}