import React, { useEffect, useState } from 'react';
import DecreaseService from '../../../Services/DecreaseService';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';

function DecreasePerWeekGraphic() {
  const [data, setData] = useState();

  useEffect(() => {
    getGraphData();
  }, []);

  const getGraphData = async () => {
    const response = await DecreaseService.getDecreasePerWeek();
    if (!response.error) {
      setData(response);
    }
  };
  return (
    <div className="card-graphic-header">
      <div className="card-content">
        <h3>Saídas por semana</h3>

        <BarChart width={450} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="vendas" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
}

export default DecreasePerWeekGraphic;
