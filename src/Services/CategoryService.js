import api from '../Services/Api';
class CategoryService {
  async getCategories(idCompany) {
    try {
      const response = await api.get(`/categories/${idCompany}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  async createCategory(data) {
    try {
      const response = await api.post('/category', data);
      return response.data;
    } catch (error) {
      return { error: true, errorData: error };
    }
  }
}

export default new CategoryService();
