import React from 'react';
import AuthContextProvider from './AuthContext';

export default function Provider({ children }) {
  return <AuthContextProvider>{children}</AuthContextProvider>;
}
