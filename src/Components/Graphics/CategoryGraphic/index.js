import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Sector, Cell } from 'recharts';
import CategoryService from '../../../Services/CategoryService';


const COLORS = ['#58c791', '#4dbcc4', '#c21123', '#b8a52c'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function CategoryGraphic() {
  const [productList, setProductList] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    getProductsByCategory();
  }, []);

  useEffect(() => {
    if (productList) getData();
  }, [productList]);

  const getProductsByCategory = async () => {
    const response = await CategoryService.getCategoriesListByProduct()
    setProductList(response);
  }

  const getData = () => {
    let data = [];
    for (let i = 0; i < (productList.length > 4 ? 4 : productList.length); i++) {
      data.push(productList[i]);
    }
    setData(data);
  }

  console.log(productList[0])

  return (
    <PieChart width={800} height={400}>
      <Pie
        data={data}
        cx={300}
        cy={200}
        labelLine={false}
        label={renderCustomizedLabel}
        outerRadius={80}
        fill="#8884d8"
      >
        {
          data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} />)
        }
      </Pie>
    </PieChart>
  );

}
