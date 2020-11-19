import React, { PureComponent } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import moment from 'moment';
import 'moment/locale/pt-br';
// import HistoryService from '../../Services/HistoryService'

const month = moment().format('MMM');
var data = [];
// const [salesData, setSalesData] = useState([]);


// const loadDaySales = async () => {
//     try {
//         const response = await HistoryService.loadDaySales();
//         setSalesData(response);

//     } catch (error) {
//         console.log(error);
//     }
// }

for (var i = 0; i < moment().endOf('month').format('DD'); i++) {
    data[i] = {};
    // loadDaySales(`${moment().format(YYYY)}-${moment().format(MM)}-${i}T00:00:00.000Z`)
    data[i].name = i + 1 + ' ' + month;
    data[i].Vendas = 200;
    data[i].amt = 300;
}

export default class OutflowGraphic extends PureComponent {
    static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

    render() {
        return (
            <LineChart
                width={500}
                height={300}
                data={data}
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
}
