import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Sector, Cell, Tooltip } from 'recharts';
import CategoryService from '../../../Services/CategoryService';
import './styles.css';

const COLORS = ['#8FB1E3', '#95D0ED', '#8FE3B9', '#95EDDA', '#92D2D6'];

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
    for (let i = 0; i < (productList.length > 5 ? 5 : productList.length); i++) {
      data.push(productList[i]);
    }
    setData(data);
  }

  return (
    <div className="col-md-6">
      <div className="card-header">
        <div className="card-content">
          <h3>Relação de Produtos por Categoria</h3>
          <PieChart width={600} height={600}>
            <Pie
              data={data}
              cx={300}
              cy={300}
              labelLine={false}
              outerRadius={80}
            >
              {
                data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]} />)
              }
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );

}
