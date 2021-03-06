import React, { useState, createContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useLocalStorage from '../Hooks/useLocalStorage';
import AuthService from '../Services/AuthService';
import webSocketService from '../Services/websocket';
import AccessLevelService from '../Services/AccessLevelService';
export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [, setStorageToken, removeToken] = useLocalStorage('@auth:token');
  const [storageUser, setStorageUser, removeUser] = useLocalStorage('@auth:user');
  const [accessLevels, setAccessLevels] = useState([]);

   async function loadAccessLevels(){
    const response = await AccessLevelService.loadAccessLevel();
    setAccessLevels(response);
  }

  useEffect(() => {
    if (storageUser) {
      setUser(storageUser);
      setUpSocket(storageUser.idCompany);
      
    }
    setLoading(false);
    loadAccessLevels();
  }, []);

  const signIn = async (document, password) => {
    const response = await AuthService.signIn(document, password);
    if (!response.error) {
      setStorageToken(response.headers['x-auth-token']);
      setStorageUser(response.data);
      setUser(response.data);
      setUpSocket(response.data.idCompany);
      history.push('/');
    }else{
      return response.errorData;
    }
  };
  const signOut = () => {
    removeToken();
    removeUser();
    setUser(null);
    tearDownSocket();
    history.push('/home');
  };
  const checkAccessLevel = (roles) => {
    const role = accessLevels.find((access_level)=>access_level.idAccessLevel == user.idAccessLevel);
    return roles.find((r)=>r == role?.name)!=undefined;
  };
  const setUpSocket = (idCompany) => {
    webSocketService.connect(idCompany);
  };
  const tearDownSocket = () => {
    webSocketService.disconnect();
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, isUserSigned: !!user, checkAccessLevel }}>
      {children}
    </AuthContext.Provider>
  );
}
