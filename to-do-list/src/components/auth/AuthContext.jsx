import { createContext, useContext, useState, useEffect } from 'react';

// Crea el contexto de autenticación
const AuthContext = createContext();
/**
 * Hook para obtener el contexto de autenticación
 * @returns {object} - Contexto de autenticación
 */
export function useAuth() {
  return useContext(AuthContext);
}

/**
 * Proveedor de autenticación
 * @param {object} children - Componentes hijos
 * @returns {object} - Proveedor de autenticación
 */
export function AuthProvider({ children }) {
  // Inicializa desde localStorage
  const [token, setToken] = useState(localStorage.getItem('token') || null); // Estado para el token
  const [email, setEmail] = useState(localStorage.getItem('email') || ''); // Estado para el email
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

  /**
   * Función para iniciar sesión
   * @param {string} newToken - Token de autenticación
   * @param {string} userEmail - Email del usuario
   */
  const login = (newToken, userEmail) => {
    // Guarda en estado y localStorage
    localStorage.setItem('token', newToken);
    localStorage.setItem('email', userEmail);
    setToken(newToken);
    setEmail(userEmail);
    setIsAuthenticated(true);
  };

  /**
   * Función para cerrar sesión
   */
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setToken(null);
    setEmail('');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, email, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}