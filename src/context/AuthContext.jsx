import PropTypes from 'prop-types';
import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'));
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const decodeToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      setUser({
        id: decoded.sub,
        email: decoded.email,
        role: decoded.role,
        fullName: decoded.fullName,
        exp: decoded.exp,
        iat: decoded.iat
      });
      return decoded;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  useEffect(() => {
    if (token) {
      const decoded = decodeToken(token);
      console.log(decoded);
      if (decoded) {
        setIsAuthenticated(true);
        localStorage.setItem('token', token);
      } else {
        setIsAuthenticated(false);
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
      }
    } else {
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    } else {
      localStorage.removeItem('refreshToken');
    }
  }, [refreshToken]);

  const refreshAccessToken = async () => {
    try {
      const response = await fetch('http://localhost:8083/api/v1/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.token);
        setRefreshToken(data.refreshToken);
        return data.token;
      } else {
        throw new Error('Token refresh failed');
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      logout();
      throw error;
    }
  };

  const signin = async (credentials) => {
    try {
      const response = await fetch('http://localhost:8083/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      if (response.ok) {
        const data = await response.json();
        setToken(data.access_token);
        setRefreshToken(data.refresh_token);
        navigate('/');
      } else {
        throw new Error('Authentication failed');
      }
    } catch (error) {
      console.error('Signin error:', error);
      throw error;
    }
  };

  const signup = async (userData) => {
    try {
      const response = await fetch('http://localhost:8083/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (response.ok) {
        console.log(JSON.stringify(userData))
        const data = await response.json();
        setToken(data.token);
        setRefreshToken(data.refreshToken);
        navigate('/');
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setRefreshToken(null);
    setIsAuthenticated(false);
    navigate('/');
  };

  const value = useMemo(() => ({
    isAuthenticated,
    signin,
    signup,
    logout,
    token,
    refreshToken,
    refreshAccessToken,
    user
  }), [isAuthenticated, token, refreshToken, user]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;