import api from './Api';

class AccessLevelService {
  async loadAccessLevel() {
    try {
      const response = await api.get('/accessLevel/list');
      return response.data;
    } catch (error) {
      console.log(error);
      return { error: true, errorData: error };
    }
  }

  async getAccessLevel(idAccessLevel) {
    try {
      const response = await api.get(`/accessLevel/show/${idAccessLevel}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return { error: true, errorData: error };
    }
  }
}
export default new AccessLevelService();
