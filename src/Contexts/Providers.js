import React from 'react';
import AuthContextProvider from './AuthContext';
import DeviceContextProvider from './DeviceContext';

export default function Provider({ children }) {
  return (
    <AuthContextProvider>
      <DeviceContextProvider>{children}</DeviceContextProvider>
    </AuthContextProvider>
  );
}
