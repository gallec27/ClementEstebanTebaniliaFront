import React, { createContext, useContext, useState } from 'react';

// Creamos el contexto
const UserContext = createContext();

// Hook personalizado para acceder al contexto
export const useUserContext = () => useContext(UserContext);

// Proveedor del contexto
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("Esteban"); // Inicialmente no hay usuario logueado

  // Función para establecer el usuario logueado
  const login = (userData) => {
    setUser(userData);
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
