import React, { createContext, useEffect, useState } from 'react';

export const DeviceContext = createContext();

export default function DeviceContextProvider({ children }) {
  const [windowWidth, setWindowWidth] = useState();

  useEffect(() => {
    window.addEventListener('resize', () => setWindowWidth(window.innerWidth));
    return () => window.addEventListener('resize', () => setWindowWidth(window.innerWidth));
  }, []);

  return (
    <DeviceContext.Provider value={{ isMobile: windowWidth <= 768, isDesktop: windowWidth > 768 }}>
      {children}
    </DeviceContext.Provider>
  );
}
