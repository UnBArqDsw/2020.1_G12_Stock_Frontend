import React, { useState, createContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useLocalStorage from '../Hooks/useLocalStorage';
import AuthService from '../Services/AuthService';

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [, setStorageToken] = useLocalStorage('@auth:token');
  const [storageUser, setStorageUser] = useLocalStorage('@auth:user');

  useEffect(() => {
    if (storageUser) {
      setUser(storageUser);
    }
    setLoading(false);
  }, []);

  const signIn = async (document, password) => {
    const response = await AuthService.signIn(document, password);
    if (!response.error) {
      setStorageToken(response.headers['x-auth-token']);
      setStorageUser(response.data);
      history.push('/');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, isUserSigned: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}
