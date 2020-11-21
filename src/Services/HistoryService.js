import api from './Api';

class HistoryService {
  async loadHistoryData(idDecreasesType) {
    try {
      const response = await api.get(`/decreases/${idDecreasesType}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return { error: true, errorData: error };
    }
  }

  async loadDaySales() {
    try {
      const response = await api.get(`/decreases/daySales`);
      return response.data;
    } catch (error) {
      console.log(error);
      return { error: true, errorData: error };
    }
  }
}

export default new HistoryService();
