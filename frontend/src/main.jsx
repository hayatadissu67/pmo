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
);