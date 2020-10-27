import { useState, useEffect } from 'react';

const useLocalStorage = (key, defaultValue = null) => {
  const storageValue = localStorage.getItem(key);
  const initValue = storageValue ? JSON.parse(storageValue) : null;

  const [value, setValue] = useState(initValue);

  useEffect(() => {
    if (defaultValue) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      setValue(defaultValue);
    }
  }, []);

  const updatingValue = (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    return newValue;
  };

  const removingValue = () => {
    localStorage.setItem(key, '');
    return setValue(null);
  };

  return [value, updatingValue, removingValue];
};

export default useLocalStorage;
