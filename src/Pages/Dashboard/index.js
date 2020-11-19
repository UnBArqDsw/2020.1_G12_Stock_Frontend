import React from 'react';
import OutflowGraphic from '../../Components/Graphics/OutflowGraphic';
import './styles.css'

export default function Dashboard() {
  return (
    <div className="container">
      <div className="dashboard-content">
        <h1>Painel de Controle</h1>
        <div className="row">
          <div className="col-md-6">
          </div>
          <div className="col-md-6">
          </div>
        </div>
        <div className="row">
          <OutflowGraphic />
        </div>
      </div>
    </div>
  );
}
