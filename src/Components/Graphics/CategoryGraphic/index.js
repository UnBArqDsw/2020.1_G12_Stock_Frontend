import React, { useEffect, useState, useContext } from 'react';
import { PieChart, Pie, Sector, Cell, Tooltip } from 'recharts';
import CategoryService from '../../../Services/CategoryService';
import './styles.css';
import { DeviceContext } from '../../../Contexts/DeviceContext';

const COLORS = ['#8FB1E3', '#95D0ED', '#8FE3B9', '#95EDDA', '#92D2D6'];
const chartDimensionsDesktop = { width: 300, height: 265 };
const chartDimensionsMobile = { width: 200, height: 200 };

export default function CategoryGraphic() {
  const { isMobile } = useContext(DeviceContext);
  const [productList, setProductList] = useState([]);
  const [data, setData] = useState([]);
  const [chartDimension, setChartDimension] = useState(chartDimensionsDesktop);

  useEffect(() => {
    if (isMobile) setChartDimension(chartDimensionsMobile);
    else setChartDimension(chartDimensionsDesktop);
}, [isMobile]);

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
      <div className="card-graphic-header">
        <div className="card-content">
          <h3>Relação de Produtos por Categoria</h3>
          <PieChart width={chartDimension.width} height={chartDimension.height}>
            <Pie
              data={data}
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
