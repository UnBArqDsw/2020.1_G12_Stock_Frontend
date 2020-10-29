import api from './Api';

class RegisterService {
  async registerCompany(email, document, branch, company_name, telephone, collaborator_quantity) {
    try {
      const response = await api.post('/company', {
        document: document.replace(/\D/g, ''),
        idBranch: branch,
        name: company_name,
        telephone: telephone,
        email: email,
        maxQtdCollaborator: collaborator_quantity
      });
      console.log(response);
    } catch (error) {
      console.log(error);
      return { error: true, errorData: error };
    }
  }
}
export default new RegisterService();
