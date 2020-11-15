import React, { useState, createContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useLocalStorage from '../Hooks/useLocalStorage';
import AuthService from '../Services/AuthService';
import webSocketService from '../Services/websocket';

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [, setStorageToken, removeToken] = useLocalStorage('@auth:token');
  const [storageUser, setStorageUser, removeUser] = useLocalStorage('@auth:user');

  useEffect(() => {
    if (storageUser) {
      setUser(storageUser);
      setUpSocket(storageUser.idCompany);
    }
    setLoading(false);
  }, []);

  const signIn = async (document, password) => {
    const response = await AuthService.signIn(document, password);
    if (!response.error) {
      setStorageToken(response.headers['x-auth-token']);
      setStorageUser(response.data);
      setUser(response.data);
      setUpSocket(response.data.idCompany);
      history.push('/');
    }
  };
  const signOut = () => {
    removeToken();
    removeUser();
    setUser(null);
    tearDownSocket();
    history.push('/home');
  };

  const setUpSocket = (idCompany) => {
    webSocketService.connect(idCompany);
  };
  const tearDownSocket = () => {
    webSocketService.disconnect();
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, isUserSigned: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}
