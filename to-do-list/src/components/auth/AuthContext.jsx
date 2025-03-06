import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // Inicializa desde localStorage
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(!!token); // Determina si está autenticado basado en la existencia del token

  useEffect(() => {
    // Verifica si hay token y email en localStorage al cargar
    const storedToken = localStorage.getItem('token');
    const storedEmail = localStorage.getItem('email');
    
    if (storedToken && storedEmail) {
      setToken(storedToken);
      setEmail(storedEmail);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (newToken, userEmail) => {
    // Guarda en estado y localStorage
    localStorage.setItem('token', newToken);
    localStorage.setItem('email', userEmail);
    setToken(newToken);
    setEmail(userEmail);
    setIsAuthenticated(true);
    
    console.log('Login successful. Email:', userEmail); // Depuración
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setToken(null);
    setEmail('');
    setIsAuthenticated(false);
  };

  // Para depuración
  useEffect(() => {
    console.log('Current auth state:', { isAuthenticated, token, email });
  }, [isAuthenticated, token, email]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, email, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}