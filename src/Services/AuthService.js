import api from './Api';

class AuthService {
  async signIn(document, password) {
    try {
      const response = await api.post('/collaborator/auth', {
        document: document.replace(/\D/g, ''),
        password: password,
      });
      return response;
    } catch (error) {
      return { error: true, errorData: error?.response?.data || error };
    }
  }
}
export default new AuthService();
