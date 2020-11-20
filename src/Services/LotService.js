import api from './Api';
class LotService{
  async getLots(idProduct) {
    try {
      const response = await api.get(`/lots/${idProduct}`);
      return response.data;
    } catch (error) {
      return { error: true, errorData: error };
    }
  }
}

export default new LotService();