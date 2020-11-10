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

  async createCollaborator(idCompany, name, document, email, idAccessLevel, password) {
    try {
      document = document.replace(/\D/g, '');
      idAccessLevel = JSON.parse(idAccessLevel);

      const response = await api.post(`/collaborator/`, { idCompany, name, document, email, idAccessLevel, password });
      return response.data;
    } catch (error) {
      console.log(error);
      return { error: true, errorData: error };
    }
  }
}
export default new CollaboratorService();
