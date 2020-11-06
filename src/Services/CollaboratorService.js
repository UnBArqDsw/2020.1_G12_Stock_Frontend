import api from './Api';

class CollaboratorService {
  async loadCollaborator(idCompany) {
    try {
      const response = await api.get(`/collaborators/${idCompany}`);
      return response.data;
    } catch (error) {
      console.log(error);
      return { error: true, errorData: error };
    }
  }

  async changeStatusCollaborator(idCollaborator, status) {
    try {
      const response = await api.put(`collaborator/update/collaborator/${idCollaborator}`, {
        activate: status
      });
      return response.data;

    } catch (error) {
      console.log(error);
      return { error: true, errorData: error };
    }

  }
}
export default new CollaboratorService();
