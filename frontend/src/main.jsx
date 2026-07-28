<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { RiskProvider } from './context/RiskContext';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <RiskProvider>
        <App />
      </RiskProvider>
    </BrowserRouter>
  </React.StrictMode>
=======
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./context/UserContext";
import { AppProvider } from "./context/AppContext";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider>
      <AuthProvider>
        <BrowserRouter>
        <UserProvider>
          <App />
          </UserProvider>
        </BrowserRouter>
      </AuthProvider>
    </AppProvider>
  </StrictMode>
>>>>>>> a051e8e31dea1f3ec8cd65e2484a1adcf4568961
);