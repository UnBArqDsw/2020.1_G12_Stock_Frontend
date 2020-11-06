import api from './Api';
class GetService{
  async getProducts(){
    try{
      let response = await api.get('/products');
      response.data.map(async(product)=>{
        let lots = await this.getLots(product.idProduct);
        product.lots = lots.length;
        return product;
      });
      return response.data;
    }catch(error){
      return { error: true, errorData: error };
    }
  }
  async getLots(idProduct){
    try{
      const response = await api.get('/lots/'+idProduct);
      return response.data;
    }catch(error){
      return { error: true, errorData: error };
    }
  }
}
export default new GetService();