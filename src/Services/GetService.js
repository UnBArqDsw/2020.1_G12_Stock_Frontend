import api from './Api';

class GetService {
  async getProducts(filters = {}) {
    try {
      const response = await api.get(`/products?filterCategories=${filters.categories || ''}&orderPrice=${filters.orderPrice || ''}`);
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
