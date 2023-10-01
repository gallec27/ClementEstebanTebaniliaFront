import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const MainContainer = styled.main`
  background-color: var(--main-background-color);
`;

const FormContainer = styled.section`
  background-color: var(--login-background-color);
`;

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/user/login', {
        username,
        password,
      });

      if (response.status === 200) {
        // Autenticación exitosa
        // Realizar acciones necesarias
      } else {
        setError('Nombre de usuario o contraseña incorrectos');
      }
    } catch (error) {
      setError('Error de autenticación. Inténtalo de nuevo.');
    }
  };

  return (
    <MainContainer>
      <FormContainer>
        <form method="post" action="/user/login" className="registro">
          {/* Contenido del formulario */}
        </form>
      </FormContainer>
    </MainContainer>
  );
};

export default LoginForm;
