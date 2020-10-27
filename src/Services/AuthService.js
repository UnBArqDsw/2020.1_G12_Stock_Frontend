import api from './Api';

class AuthService {
  async signIn(document, password) {
    try {
      const response = await api.post('/collaborator/auth', {
        document: document.replace(/\D/g, ''),
        password,
      });
      return response;
    } catch (error) {
      console.log(error);
      return { error: true, errorData: error };
    }
  }
}
export default new AuthService();
