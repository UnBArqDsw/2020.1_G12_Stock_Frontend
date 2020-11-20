import React, { useEffect, useState, useContext } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import 'moment/locale/pt-br';
import HistoryService from '../../../Services/HistoryService'
import './styles.css'
import { DeviceContext } from '../../../Contexts/DeviceContext';

const chartDimensionsDesktop = { width: 1020, height: 250 };
const chartDimensionsMobile = { width: 300, height: 250 };

export default function OutflowGraphic() {
    const { isMobile } = useContext(DeviceContext);
    const [salesData, setSalesData] = useState([]);
    const [chartDimension, setChartDimension] = useState(chartDimensionsDesktop);

    useEffect(() => {
        if (isMobile) setChartDimension(chartDimensionsMobile);
        else setChartDimension(chartDimensionsDesktop);
    }, [isMobile]);

    useEffect(() => {
        loadDaySales();
    }, []);


    const loadDaySales = async () => {
        try {
            const response = await HistoryService.loadDaySales();
            setSalesData(response);

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container">
            <div className="outflow-card-header">
                <div className="card-content">
                    <h3>Fluxo de Saída</h3>
                    <LineChart
                        width={chartDimension.width}
                        height={chartDimension.height}
                        data={salesData}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="Vendas" stroke="#72ACB0" />
                    </LineChart>
                </div>
            </div>
        </div>
    );
}
