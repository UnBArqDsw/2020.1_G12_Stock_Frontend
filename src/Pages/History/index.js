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
  const collaboratorName = location.state?.collaboratorName;

  const [search, setSearch] = useState(collaboratorName);
  const [historyFiltered, setHistoryFiltered] = useState([]);

  useEffect(() => {
    if (historyData.length) {
      const productsFilteredBySearch = historyData?.filter((history) =>
        history.collaborator.name.includes(search)
      );
      setHistoryFiltered(productsFilteredBySearch);
    }
  }, [search, historyData]);

  let countHistoryData = 0;

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
  };

  const compareHistoryDate = (counter, data) => {
    if (counter !== 0) {
      if (data[counter].date !== data[counter - 1].date) {
        return moment(data[counter].date).add(1, 'day').format('DD/MM/YYYY');
      }
    } else {
      return moment(data[counter].date).add(1, 'day').format('DD/MM/YYYY');
    }
  };

  const renderHistory = () => {
    if (search) {
      return historyFiltered?.map((data) => (
        <>
          <p className="history-date">{compareHistoryDate(countHistoryData, historyFiltered)}</p>
          <script>{countHistoryData++}</script>
          <HistoryList data={data} />
        </>
      ));
    }
    return historyData?.map((data) => (
      <>
        <p className="history-date">{compareHistoryDate(countHistoryData, historyData)}</p>
        <script>{countHistoryData++}</script>
        <HistoryList data={data} />
      </>
    ));
  };

  return (
    <div className="container">
      <div className="history-content">
        <h1>Histórico de Vendas</h1>
        <div className="toolbar">
          <div className="history-input-container">
            <span>Nome do colaborador:</span>
            <div className="history-icon-container">
              <FaFilter />
            </div>
            <input id="history" onChange={(e) => setSearch(e.target.value)} defaultValue={search} />
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
      {renderHistory()}
    </div>
  );
}
