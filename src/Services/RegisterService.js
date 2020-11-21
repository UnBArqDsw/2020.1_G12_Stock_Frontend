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

  async registerProduct(name, price, unity, quantity, categories) {
    try {
      const response = await api.post('/product', {
        name,
        unitQtd: Number(quantity),
        unitMeasure: unity,
        salePrice: Number(price),
        categories,
      });
      return response;
    } catch (error) {
      console.log(error.response.data);
      return { error: true, erroData: error };
    }
  }

  async registerLot(product, entryDate, dueDate, productQty, description, purchasePrice) {
    try {
      const response = await api.post('/lot', {
        idProduct: product,
        entryDate,
        dueDate,
        productQty,
        description,
        purchasePrice,
      });
      return response;
    } catch (error) {
      return { error: true, erroData: error };
    }
  }
}
export default new RegisterService();
