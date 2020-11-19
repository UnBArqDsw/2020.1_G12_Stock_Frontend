import React, { useState, useEffect } from 'react';
import { Card, CardBody } from 'reactstrap';
import { FaFilter } from 'react-icons/all';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import HistoryService from '../../Services/HistoryService';
import HistoryList from '../../Components/HistoryList';
import './styles.css';

export default function History() {
  const [historyData, setHistoryData] = useState([]);
  const location = useLocation();
  const idCollaborator = location.state?.idCollaborator;
  console.log(idCollaborator);

  let countHistoryData = 0;

  useEffect(() => {
    loadHistoryData();
  }, []);

  const loadHistoryData = async () => {
    try {
      const response = await HistoryService.loadHistoryData(2);
      if (idCollaborator) {
        const responseByCollaborator = response.filter(
          (history) => idCollaborator === history.idCollaborator
        );
        setHistoryData(responseByCollaborator);
      } else {
        setHistoryData(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const compareHistoryDate = (counter) => {
    if (counter !== 0) {
      if (historyData[counter].date !== historyData[counter - 1].date) {
        return moment(historyData[counter].date).add(1, 'day').format('DD/MM/YYYY');
      }
    } else {
      return moment(historyData[counter].date).add(1, 'day').format('DD/MM/YYYY');
    }
  };

  return (
    <div className="container">
      <div className="history-content">
        <h1>Histórico de Vendas</h1>
        <div className="toolbar">
          <div className="history-input-container">
            <span>Filtrar por:</span>
            <div className="history-icon-container">
              <FaFilter />
            </div>
            <input id="history" />
          </div>
        </div>
      </div>
      <div className="history-list-container">
        <Card>
          <CardBody className="history-header">
            <div>
              <span>Produto</span>
            </div>
            <div>
              <span>Preço</span>
            </div>
            <div>
              <span>Quantidade</span>
            </div>
            <div>
              <span>Colaborador(a)</span>
            </div>
            <div>
              <span>Valor total</span>
            </div>
          </CardBody>
        </Card>
      </div>
      {historyData.length ? (
        historyData.map((data) => {
          return (
            <>
              <p className="history-date">{compareHistoryDate(countHistoryData)}</p>
              <script>{countHistoryData++}</script>
              <HistoryList data={data} />
            </>
          );
        })
      ) : (
        <p>Você não possui dados</p>
      )}
    </div>
  );
}
