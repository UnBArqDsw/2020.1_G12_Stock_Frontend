import api from './Api';

class ProductService {
  async getProducts(filters = {}) {
    try {
      const response = await api.get(
        `/products?filterCategories=${filters.categories || ''}&orderPrice=${
          filters.orderPrice || ''
        }`
      );
      return response.data;
    } catch (error) {
      return { error: true, errorData: error };
    }
  }
}
export default new ProductService();
