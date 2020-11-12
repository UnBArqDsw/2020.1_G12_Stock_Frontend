import api from '../Services/Api';
class CollaboratorService {
  async getCollaborator(idCollaborator) {
    try {
      const response = await api.get('/collaborator/'+idCollaborator);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
  async getCollaborators(){
    try {
      const response = await api.get('/min/collaborators');
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new CollaboratorService();