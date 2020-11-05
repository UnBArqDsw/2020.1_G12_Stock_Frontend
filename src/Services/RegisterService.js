import api from './Api';

class RegisterService {
  async registerCompany(email, document, branch, companyName, telephone, collaboratorQuantity) {
    try {
      const response = await api.post('/company', {
        document: document.replace(/\D/g, ''),
        idBranch: branch,
        name: companyName,
        telephone,
        email,
        maxQtdCollaborator: collaboratorQuantity,
      });
      return response;
    } catch (error) {
      return { error: true, errorData: error };
    }
  }

  async registerOwner(name, cpf, email, cpfCnpj, password) {
    try {
      const response = await api.post('/collaborator', {
        name,
        document: cpf.replace(/\D/g, ''),
        email,
        companyDocument: cpfCnpj.replace(/\D/g, ''),
        password,
      });
      return response;
    } catch (error) {
      return { error: true, errorData: error };
    }
  }

  async getCompanyBranches() {
    try {
      const response = await api.get('/branch/');
      return response.data;
    } catch (error) {
      return { error: true, errorData: error };
    }
  }
}
export default new RegisterService();
