import React, { useState, useContext, useEffect } from 'react';
import logo from '../../../assets/images/logo-horizontal.png';
import RegisterService from '../../../Services/RegisterService';
import './styles.css';
import { useHistory } from 'react-router-dom';
import InputMask from 'react-input-mask';

const MASK_CPF = '999.999.999-999';
const CPF_CHAR_LENGTH = 14;
const MASK_CNPJ = '99.999.999/9999-99';

export default function RegisterCompanyPage() {
  const [document, setDocument] = useState('');
  const [email, setEmail] = useState('');
  const [branch, setBranch] = useState('');
  const [conpanyName, setCompanyName] = useState('');
  const [telephone, setTelephone] = useState('');
  const [collaboratorQuantity, setCollaboratorQuantity] = useState('');
  const [branches, setBranches] = useState([]);
  const history = useHistory();
  const [cpfCnpjMask, setCpfCnpjMask] = useState(MASK_CPF);

  console.log(branches);

  useEffect(() => {
    if (document.length > CPF_CHAR_LENGTH) {
      setCpfCnpjMask(MASK_CNPJ);
    } else {
      setCpfCnpjMask(MASK_CPF);
    }
  }, [document]);

  async function registerCompany() {
    try {
      const { status } = await RegisterService.registerCompany(
        email,
        document,
        branch,
        conpanyName,
        telephone,
        collaboratorQuantity
      );
      if (status === 200) {
        alert('Empresa cadastrada com sucesso!');
        history.push('/register/owner');
      }
    } catch (error) {
      console.log(error.response);
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    registerCompany();
  };

  useEffect(() => {
    getBranches();
  }, []);

  const getBranches = async () => {
    const response = await RegisterService.getCompanyBranches();
    setBranches(response);
  };

  return (
    <div className="container">
      <div className="register-company-header">
        <img src={logo} alt="logo" />
        <div>
          <a className="link" href="/login">
            Portal do Gestor
          </a>
        </div>
      </div>
      <div className="register-company-form">
        <h2>Comece agora mesmo</h2>
        <p>Preencha os dados abaixo para realizar o cadastro da sua empresa.</p>
        <form onSubmit={onSubmit}>
          <div className="info-block">
            <div className="input-area">
              <label htmlFor="document">Nome da Empresa:</label>
              <br />
              <input type="text" onChange={(e) => setCompanyName(e.target.value)} />
            </div>
            <div className="input-area">
              <label htmlFor="branch">Email Corporativo:</label>
              <br />
              <input type="text" id="" onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <div className="info-block">
            <div className="input-area">
              <label htmlFor="document">CNPJ/CPF:</label>
              <br />
              <InputMask
                type="text"
                mask={cpfCnpjMask}
                maskChar=""
                onChange={(e) => setDocument(e.target.value)}
                required
              />
            </div>
            <div className="input-area">
              <label htmlFor="document">Ramo do Negócio:</label>
              <br />
              <select type="select" onChange={(e) => setBranch(e.target.value)}>
                <option value=""></option>
                {branches?.map((branch, i) => (
                  <option key={i} value={branch.idBranch}>
                    {branch.name}
                  </option>
                ))}
              </select>
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
            <span>
              Ao enviar o formulário, você concorda com nossos termos e condições, assim como nossas
              políticas de privacidade
            </span>
            <button type="submit">Cadastrar Empresa</button>
          </div>
        </form>
      </div>
    </div>
  );
}
