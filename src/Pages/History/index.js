import React, { useState, useEffect } from 'react';
import { FaFilter } from 'react-icons/all';
import HistoryService from '../../Services/HistoryService'
import HistoryList from '../../Components/HistoryList'
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
      {historyData.length ? <HistoryList historyData={historyData} /> : <p>Você não possui dados</p>}
    </div>
  );
}
