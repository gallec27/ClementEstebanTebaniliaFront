import React, { useState } from "react";
import useStore from "../store/store";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  RegistrationForm,
  FormGroup,
  FormGroupTitle,
  FormGroupError,
  FormLabel,
  FormButton,
  FormInput,
  UppercaseText,
} from "./styles/Login";
import { NavBar, Logo, UserInfo, Body, Footer, FooterLogo } from "./styles/Layout";

const LoginForm = () => {
  const setUser = useStore((state) => state.setUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Verificar campos vacíos
    if (email.trim() === "" || password.trim() === "") {
      setError("Por favor, complete todos los campos.");
      return;
    }

    // Verificar formato de correo electrónico
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      setError("El correo electrónico no es válido.");
      return;
    }

    try {
      const response = await axios.post("/api/user/login", {
        email,
        password,
      });
  
      if (response.status === 200 && response.data.success) {
        // Autenticación exitosa, redirige al usuario a la página deseada
        navigate(response.data.redirectTo);
      } else {
        // Error en el backend, muestra el mensaje de error recibido
        setError(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        // Error de respuesta HTTP
        if (error.response.status === 400 
          || error.response.status === 401 
          || error.response.status === 404) {
          
          setError(error.response.data.message);
        } else {
          // Otros errores de respuesta HTTP
          setError("Error en el servidor. Inténtalo de nuevo más tarde.");
        }
      } else {
        // Error de red o en el cliente
        setError("Error de red. Inténtalo de nuevo.");
      }
    }
  };
  

  return (
    <Body>
      <NavBar>
        <Logo src="/image/logo1.png" alt="logo_tebanilia" />
      </NavBar>
      <Container>
        <RegistrationForm>
          <FormGroup>
            <FormGroupTitle>Iniciar Sesión</FormGroupTitle>
          </FormGroup>
          <FormGroup>
            <FormInput
              type="text"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <FormInput
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <FormButton onClick={handleLogin}>Iniciar Sesión</FormButton>
          </FormGroup>
          {error && <FormGroupError style={{ color: "red" }}>{error}</FormGroupError>}
        </RegistrationForm>
      </Container>
      <Footer>
        <Logo src="/image/logo.png" alt="logo_tebanilia" />
      </Footer>
    </Body>
    
  );
};

export default LoginForm;
