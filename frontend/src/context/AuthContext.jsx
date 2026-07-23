import { createContext, useContext, useState, useEffect } from "react";

// Create the authentication context
const AuthContext = createContext();

// Provider Component
export function AuthProvider({ children }) {
  // Stores the currently logged-in user
  const [user, setUser] = useState(null);

  // Tracks whether a user is logged in
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Restore session after refresh
  useEffect(() => {

    const savedUser = localStorage.getItem("user");


    if (savedUser) {

      const parsedUser = JSON.parse(savedUser);

      setUser(parsedUser);

      setIsAuthenticated(true);

    }

  }, []);


  /**
   * Login Function
   * Receives user information after successful authentication.
   */
  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);

    // Temporary localStorage (until backend is implemented)
    localStorage.setItem("user", JSON.stringify(userData));
  };

  /**
   * Logout Function
   * Clears user information and authentication state.
   */
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);

    // Remove stored login information
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom Hook
export function useAuth() {
  return useContext(AuthContext);
}