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
import { NavBar, Logo, UserInfo, Body } from "./styles/Layout";

const LoginForm = () => {
  const setUser = useStore((state) => state.setUser);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("/api/user/login", {
        username,
        password,
      });

      if (response.status === 200) {
        // Autenticación exitosa, guarda el token en el cliente
        // y redirige al usuario a la página deseada.
        setUser(username);
        navigate("/productos");
      } else {
        setError("Nombre de usuario o contraseña incorrectos");
      }
    } catch (error) {
      // Error de autenticación
      setError("Error de autenticación. Inténtalo de nuevo.");
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
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
          {error && (
            <FormGroupError style={{ color: "red" }}>{error}</FormGroupError>
          )}
        </RegistrationForm>
      </Container>
    </Body>
  );
};

export default LoginForm;
