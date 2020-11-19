import React from 'react';
import AuthContextProvider from './AuthContext';
import DeviceContextProvider from './DeviceContext';
import ProductContextProvider from './ProductsContext';

export default function Provider({ children }) {
  return (
    <AuthContextProvider>
      <ProductContextProvider>
        <DeviceContextProvider>{children}</DeviceContextProvider>
      </ProductContextProvider>
    </AuthContextProvider>
  );
}
