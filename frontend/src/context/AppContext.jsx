import React, { createContext, useContext, useState } from "react";

import AuthService from "../service/AuthService";


import {AuthService }  from "../service/AuthService"

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (credentials) => {
    const data = await AuthService.login(credentials);
    setUser(data.user);
  };

  const register = async (userData) => {
    const data = await AuthService.register(userData);
    setUser(data.user);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AppContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};