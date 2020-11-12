import api from './Api';

class GetService {
  async getProducts(idCompany) {
    try {
      const response = await api.get(`/products/${idCompany}`);
      return response.data;
    } catch (error) {
      return { error: true, errorData: error };
    }
  }

  async getLots(idProduct) {
    try {
      const response = await api.get(`/lots/${idProduct}`);
      return response.data;
    } catch (error) {
      return { error: true, errorData: error };
    }
  }

  async getCompanyBranches() {
    try {
      const response = await api.get('/branch/');
      return response.data;
    } catch (error) {
      return { error: true, errorData: error };
    }
  }
}
export default new GetService();
