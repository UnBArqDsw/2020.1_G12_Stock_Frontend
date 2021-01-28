import api from './Api';

class DecreaseService {
  async decreaseProduct(idProduct, quantity) {
    try {
      const response = await api.post('/product/decreases', {
        idProduct,
        quantity,
      });
      return response;
    } catch (error) {
      return { error: true, errorData: error.response.data };
    }
  }

  async decreaseLot(idLot, quantity) {
    try {
      const response = await api.post('/lot/decreases', {
        idLot,
        quantity,
      });
      return response;
    } catch (error) {
      return { error: true, errorData: error.response.data };
    }
  }

  async getDecreasePerWeek() {
    try {
      const response = await api.get('/decreases/weekSales?idDecreasesType=2');
      return response.data;
    } catch (error) {
      return { error: true, errorData: error.response };
    }
  }
}

export default new DecreaseService();
