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
      return response;
    } catch (error) {
      return { error: true, errorData: error };
    }
  }

  async registerOwner(name, cpf, email, cpfCnpj, password) {
    try {
      console.log(name, cpf, email, cpfCnpj, password);
      const response = await api.post('/collaborator', {
        name: name,
        document: cpf,
        email: email,
        companyDocument: cpfCnpj,
        password: password
      });
      return response;
    } catch (error) {
      return { error: true, errorData: error };
    }
  }
}
export default new RegisterService();
