import React, { useState, useContext } from 'react';
import logo from '../../../assets/images/logo-horizontal.png';
import RegisterService from '../../../Services/RegisterService';
import './styles.css';
import InputMask from 'react-input-mask';
import TextField from 'react';

export default function RegisterCompanyPage(){
  const [document, setDocument] = useState('');
  const [email, setEmail] = useState('');
  const [branch, setBranch] = useState('');
  const [company_name, setCompanyName] = useState('');
  const [telephone, setTelephone] = useState('');
  const [collaborator_quantity, setCollaboratorQuantity] = useState('');

  async function registerCompany(){
    try{
      await RegisterService.registerCompany(email, document, branch, company_name, telephone, collaborator_quantity);

    }catch(error){
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
        
      </div>
    </div>
  );
}