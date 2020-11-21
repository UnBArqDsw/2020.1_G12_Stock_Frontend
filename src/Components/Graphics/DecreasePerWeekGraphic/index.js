import React, { useEffect, useState, useContext } from 'react';
import DecreaseService from '../../../Services/DecreaseService';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import './styles.css'
import { DeviceContext } from '../../../Contexts/DeviceContext';

const chartDimensionsDesktop = { width: 450, height: 300 };
const chartDimensionsMobile = { width: 300, height: 200 };

function DecreasePerWeekGraphic() {
  const { isMobile } = useContext(DeviceContext);
  const [data, setData] = useState();
  const [chartDimension, setChartDimension] = useState(chartDimensionsDesktop);

  useEffect(() => {
    getGraphData();
  }, []);

  useEffect(() => {
    if (isMobile) setChartDimension(chartDimensionsMobile);
    else setChartDimension(chartDimensionsDesktop);
}, [isMobile]);

  const getGraphData = async () => {
    const response = await DecreaseService.getDecreasePerWeek();
    if (!response.error) {
      setData(response);
    }
  };
  return (
    <div className="col-md-6">
      <div className="card-graphic-header">
        <div className="card-content">
          <h3>Saídas por semana</h3>
          <BarChart width={chartDimension.width} height={chartDimension.height} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="vendas" fill="#8884d8" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}

export default DecreasePerWeekGraphic;
