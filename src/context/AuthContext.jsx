import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [useMockEmail, setUseMockEmail] = useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
    const storedUseMockEmail = localStorage.getItem('useMockEmail');
    if (storedUseMockEmail === 'true') {
      setUseMockEmail(true);
    }
  }, []);

  const login = (email, password) => {
    if (email === 'prince@xyruscode.com.ng' && password === '12345678') {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  const toggleEmailService = () => {
    setUseMockEmail(prev => {
      const newValue = !prev;
      localStorage.setItem('useMockEmail', newValue.toString());
      return newValue;
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, useMockEmail, toggleEmailService }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;