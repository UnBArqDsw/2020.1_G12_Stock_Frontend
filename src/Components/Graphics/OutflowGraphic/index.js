import React, { PureComponent, useEffect, useState } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import moment from 'moment';
import 'moment/locale/pt-br';
import HistoryService from '../../../Services/HistoryService'


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
        <LineChart
            width={500}
            height={300}
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
    );

}
