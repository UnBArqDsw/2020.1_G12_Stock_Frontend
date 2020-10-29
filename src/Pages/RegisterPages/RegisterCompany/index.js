import React, { useState, useContext } from 'react';
import logo from '../../../assets/images/logo-horizontal.png';
import {RegisterContext} from '../../../Contexts/RegisterContext';
import './styles.css';
import InputMask from 'react-input-mask';
import TextField from 'react';
export default function RegisterCompanyPage(){
  const {registerCompany} = useContext (RegisterContext);
  const [document, setDocument] = useState('');
  const [email, setEmail] = useState('');
  const [branch, setBranch] = useState('');
  const [company_name, setCompanyName] = useState('');
  const [telephone, setTelephone] = useState('');
  const [collaborator_quantity, setCollaboratorQuantity] = useState('');

  
  const onSubmit = (e) => {
    e.preventDefault();
    registerCompany(email, document, branch, company_name, telephone, collaborator_quantity);
  };
  return (
    <div className="container">
      <div className="register-company-header">
        <img src={logo} alt="logo" />
      </div>
      <form>
        <div className="register-company-form"> 
          <h1>Comece agora mesmo</h1>
        </div>
        <div className="email-company-name-container">
          <div>
            <TextField
              name="company_name"
              label="Nome Empresa"
            />
          </div>
          <div>
            <TextField
              name="email"
              label="Email"
            />
          </div>
        </div>
        
        <div className="collaborator-quantity-telephone-container">
          <TextField
              name="collaborator_quantity"
              label="Quantidade de Funcionários"
          />
          <TextField
              name="telephone"
              label="Telefone"
            />
        </div>
        
        <label htmlFor="document">CPF ou CNPJ:</label>
        <div>
          <InputMask
            onChange={(e) => setDocument(e.target.value)}
            id="document"
            //mask=""
            //maskChar=""
          />
        </div>
        <button type="submit">Cadastrar Empresa</button>
      </form>
      
        
    </div>
  );
}