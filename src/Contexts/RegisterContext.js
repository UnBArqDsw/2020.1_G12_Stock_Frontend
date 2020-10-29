import React, { useState, createContext, useEffect } from 'react';
import RegisterService from '../Services/RegisterService';

export const RegisterContext = createContext();

export default function RegisterContextProvider({ children }) {

  const registerCompany = async (email, document, branch, company_name, telephone, collaborator_quantity) => {
    const response = await RegisterService.registerCompany(email, document, branch, company_name, telephone, collaborator_quantity);
    return response;
    /*if (!response.error) {
      setStorageToken(response.headers['x-auth-token']);
      setStorageUser(response.data);
      setUser(response.data);
      history.push('/');
    }*/
  };

  return (
    <RegisterContext.Provider value={{registerCompany}}>
      {children}
    </RegisterContext.Provider>
  );
}
