import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import GetService from '../Services/GetService';
import WebSocketService from '../Services/websocket';

export const ProductsContext = createContext();

export default function ProductContextProvider({ children }) {
  const { isUserSigned } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (isUserSigned) {
      getProducts();
    }
  }, [isUserSigned]);

  useEffect(() => {
    if (isUserSigned) {
      listenForNewProducts();
      listenForProductUpdate();
    }
  }, [products, isUserSigned]);

  const listenForNewProducts = () => {
    WebSocketService.subscribeToNewProducts((product) => {
      setProducts([...products, product]);
    });
  };

  const listenForProductUpdate = () => {
    WebSocketService.subscribeToUpdateProduct((product) => {
      const newProductList = products.map((productFromState) => {
        if (productFromState.idProduct === product.idProduct) {
          productFromState = product;
        }

        return productFromState;
      });
      setProducts(newProductList);
    });
  };

  const getProducts = async (filters) => {
    const response = await GetService.getProducts(filters);
    setProducts(response);
  };

  return (
    <ProductsContext.Provider value={{ products, getProducts }}>
      {children}
    </ProductsContext.Provider>
  );
}
