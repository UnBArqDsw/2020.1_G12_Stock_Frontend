import React, { useState, useEffect } from 'react';
import { Card, CardBody } from 'reactstrap';
import { FaFilter } from 'react-icons/all';
import HistoryService from '../../Services/HistoryService'
import HistoryList from '../../Components/HistoryList'
import moment from 'moment';
import './styles.css'

export default function History() {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    loadHistoryData();
  }, []);

  const loadHistoryData = async () => {
    try {
      const response = await HistoryService.loadHistoryData(2);
      setHistoryData(response);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container">
      <div className="history-content">
        <h1>Histórico</h1>
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
      {historyData.length ? historyData.map((data) => (
        <>
        <p className="history-date">{moment(data.date).add(1, 'day').format('DD/MM/YYYY')}</p>
          <HistoryList data={data} />
        </>
      )) : <p>Você não possui dados</p>}
    </div>
  );
}
