import api from '../Services/Api';
class CategoryService {
  async getCategories() {
    try {
      const response = await api.get(`/categories`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  async getCategoriesByProduct(idProduct) {
    try {
      const response = await api.get(`/belongs/${idProduct}`);
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

  async getCategoriesListByProduct() {
    try {
      const response = await api.get('belongs/productsByCategory');
      return response.data;
    } catch (error) {
      return { error: true, errorData: error };
    }
  }
}

export default new CategoryService();
