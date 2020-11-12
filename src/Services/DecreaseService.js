import api from './Api';

class DecreaseService{
  async decreaseProduct(idProduct, quantity){
    try{
      const response = await api.post('/product/decreases', {
        idProduct,
        quantity
      });
      return response;
    }catch(error){
      return { error: true, errorData: error.response };
    }
  }
  async decreaseLot(idLot, quantity){
    try{
      const response = await api.post('/lot/decreases', {
        idLot,
        quantity
      });
      return response;
    }catch(error){
      return { error: true, errorData: error.response };
    }
  }
}


export default new DecreaseService();