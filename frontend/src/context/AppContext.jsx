import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();


export const AppProvider = ({ children }) => {
  
  const [state, setState] = useState({
    user: null,
    isAuthenticated: false,
  });

  const login = (userData) => {
    setState({ ...state, user: userData, isAuthenticated: true });
  };

  const logout = () => {
    setState({ ...state, user: null, isAuthenticated: false });
  };

  return (
    <AppContext.Provider value={{ state, login, logout }}>
      {children}
    </AppContext.Provider>
  );
};


export const useAppContext = () => {
  return useContext(AppContext);
};

