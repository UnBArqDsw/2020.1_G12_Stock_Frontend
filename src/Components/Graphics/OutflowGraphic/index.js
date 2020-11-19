import React, { useEffect, useState } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import 'moment/locale/pt-br';
import HistoryService from '../../../Services/HistoryService'
import './styles.css'


export default function OutflowGraphic() {

    const [salesData, setSalesData] = useState([]);

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
            <div className="card-header">
                <div className="card-content">
                    <h3>Fluxo de Saída</h3>
                    <LineChart
                        width={1000}
                        height={250}
                        data={salesData}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
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
