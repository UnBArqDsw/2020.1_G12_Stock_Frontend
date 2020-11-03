import stock from '../../assets/images/stock.png';
import sale from '../../assets/images/sale.jpg';
import analysis from '../../assets/images/analysis.jpg';
import accesslevel from '../../assets/images/accesslevel.jpg';

const LOCALES = {
  id: 'occupation',
  options: [
    {
      id: 'Stock',
      image: stock,
      name: 'Controle de Estoque',
      title: 'Facilidade de Controle',
      text:
        'Através do Stock, é possível fazer seu controle de estoque de forma simples e fácil. Com design intuitivo, criar, atualizar e remover produtos fica muito mais simples. Além disso, é possível listar produtos por categorias, apresentando de forma clara a lista dos produtos separados pelas categorias que desejar.',
    },
    {
      id: 'Sales',
      image: sale,
      name: 'Controle de Vendas',
      title: 'Controle de Vendas',
      text:
        'Além do controle de estoque, o Stock ajuda a controlar suas vendas através do registro de vendas por funcionários e produtos, dados de vendas por categorias, colaboradores, produtos e data. É possível importar planilhas com dados, além de exportar seus dados em formato de planilha sempre que quiser. ',
    },
    {
      id: 'Analysis',
      image: analysis,
      name: 'Análises',
      title: 'Análises',
      text:
        'Através de gráficos, a análise do seu negócio se torna muito mais prática e intuitiva. Com o painel de controle é possível ver dados de fluxo de saída do seu negócio, relação de vendas por período de tempo e produtos. Agora ficou muito mais simples saber em que produtos e período apostar suas vendas.',
    },
    {
      id: 'AccessLevel',
      image: accesslevel,
      name: 'Nível de Acesso',
      title: 'Nível de Acesso',
      text:
        'Adicione diversos colaboradores ao seu controle, para o auxílio nas vendas, limitando seus níveis de acesso e dados que os colaboradores podem visualizar. É possível, ainda, administrar os dados de vendas de seus colaboradores. Tenha o controle do seu negócio em sua mão.',
    },
  ],
};

export default LOCALES;
