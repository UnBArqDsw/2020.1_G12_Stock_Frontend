import api from './Api';
class ProductService{
  async getProducts() {
    try {
      const response = await api.get('/products');
      return response.data;
    } catch (error) {
      return { error: true, errorData: error };
    }
  }
}
export default new ProductService();