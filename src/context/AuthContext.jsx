import PropTypes from 'prop-types';
import { createContext, useContext, useState, useMemo } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthClick = () => {
    console.log('handleAuthClick');
    setIsAuthenticated((prev) => !prev);
  };

  const value = useMemo(() => ({ isAuthenticated, handleAuthClick }), [isAuthenticated]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

PropTypes.AuthProvider = {
    children: PropTypes.node.isRequired,
};