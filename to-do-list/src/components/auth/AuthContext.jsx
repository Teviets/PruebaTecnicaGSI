import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null); // Almacena el token
  const [email, setEmail] = useState(localStorage.getItem('email') || '');

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    }
  }, [token]);

  const login = (token) => {
    localStorage.setItem('email', email);
    localStorage.setItem('token', token); // Almacena el token
    setToken(token); // Almacena el token
    setEmail(email);
    setIsAuthenticated(true); // Marca al usuario como autenticado
  };

  const logout = () => {
    setToken(null); // Elimina el token
    setEmail('');
    localStorage.removeItem('email');
    localStorage.removeItem('token'); // Elimina el token
    setIsAuthenticated(false); // Marca al usuario como no autenticado
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}