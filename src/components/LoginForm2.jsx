import React, { useState } from 'react';
import useStore from '../store/store';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importa Axios

const LoginForm = () => {
  const setUser = useStore((state) => state.setUser);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/user/login', {
        username,
        password,
      });

      if (response.status === 200) {
        // Autenticación exitosa, guarda el token en el cliente
        // y redirige al usuario a la página deseada.
        setUser(username);
        navigate('/productos');
      } else {
        setError('Nombre de usuario o contraseña incorrectos');
      }
    } catch (error) {
      // Error de autenticación
      setError('Error de autenticación. Inténtalo de nuevo.');
    }
  };

  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Iniciar Sesión</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default LoginForm;
