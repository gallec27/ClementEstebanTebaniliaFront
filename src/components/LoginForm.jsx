import React, { useState } from "react";
import useStore from "../store/store";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  LoginFormSt,
  FormGroupLogin,
  FormGroupTitle,
  FormGroupError,  
  FormButton,
  FormInput,
  FormLabelError,
  RegisterButton,
  FormGroupRegisterButton
  } from "./styles/Login";
import { NavBar, Logo, Body, Footer } from "./styles/Layout";

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
        console.log("Usuario que viene desde backend:",response.data.user)
        setUser(response.data.user);
        navigate(response.data.redirectTo);
      } else {        
        setError(response.data.message);
      }
    } catch (error) {
      if (error.response) {        
        if (error.response.status === 400 
          || error.response.status === 401 
          || error.response.status === 404) {
          
          setError(error.response.data.message);
        } else {          
          setError("Error en el servidor. Inténtalo de nuevo más tarde.");
        }
      } else {        
        setError("Error de red. Inténtalo de nuevo.");
      }
    }
  };

  const navigateToRegister = () => {
    navigate("/register"); 
  };

  return (
    <Body>
      <NavBar>
        <Logo src="/image/logo1.png" alt="logo_tebanilia" />
      </NavBar>
      <Container>
        <LoginFormSt>
          <FormGroupLogin>
            <FormGroupTitle>Iniciar Sesión</FormGroupTitle>
          </FormGroupLogin>
          <FormGroupLogin>
            <FormInput
              type="text"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroupLogin>
          <FormGroupLogin>
            <FormInput
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroupLogin>
          <FormGroupLogin>
            <FormButton onClick={handleLogin}>Iniciar Sesión</FormButton>
          </FormGroupLogin>
          <FormGroupRegisterButton>           
            <RegisterButton onClick={navigateToRegister}>Registrarse</RegisterButton>
          </FormGroupRegisterButton>
          {error && 
            <FormGroupError style={{ color: "red" }}>
              <FormLabelError>{error}</FormLabelError>              
            </FormGroupError>}
        </LoginFormSt>
      </Container>
      <Footer>
        <Logo src="/image/logo.png" alt="logo_tebanilia" />
      </Footer>
    </Body>
    
  );
};

export default LoginForm;
