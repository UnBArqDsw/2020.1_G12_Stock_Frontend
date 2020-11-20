import api from './Api';

class CompanyService {
  async getCompanyBranches() {
    try {
      const response = await api.get('/branch', {});
      return response.data;
    } catch (error) {
      return { error: true, errorData: error };
    }
  }
}
export default new CompanyService();