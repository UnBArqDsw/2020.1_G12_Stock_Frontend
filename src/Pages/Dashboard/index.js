import React, { useContext } from 'react';
import OutflowGraphic from '../../Components/Graphics/OutflowGraphic';
import { AuthContext } from '../../Contexts/AuthContext';
import CategoryGraphic from '../../Components/Graphics/CategoryGraphic';
import "./styles.css";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="dashboard-content">
      <h1>Painel de Controle</h1>
      <div className="dashboard-card-header">
        <h3>Seja bem vindo ao Painel de Controle da Empresa {user.Company.name}!</h3>
        <h6>Aqui você pode visualizar informações pertinentes em relação ao seu estoque.</h6>
      </div>
      <div className="row">
        <CategoryGraphic />
        <CategoryGraphic />
      </div>
      <div className="row">
        <OutflowGraphic />
      </div>
    </div>
  );
}
