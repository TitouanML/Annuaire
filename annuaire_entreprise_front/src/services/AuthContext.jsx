import { createContext, useState, useContext, useEffect } from "react";
import { getTokenFromCookies } from "../utils/administrators";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getTokenFromCookies());

  useEffect(() => {
    setIsLoggedIn(!!getTokenFromCookies());
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
