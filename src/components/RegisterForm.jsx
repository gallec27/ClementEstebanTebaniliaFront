import React, { useState } from "react";
import useStore from "../store/store";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  RegistrationForm,
  FormGroupRegister,
  FormGroupTitle,
  FormGroupError,
  FormButton,
  FormInput,
  FormLabelError,
  FormLabelInput,
} from "./styles/Login";
import { NavBar, Logo, Body, Footer } from "./styles/Layout";

const RegisterForm = () => {
  const setUser = useStore((state) => state.setUser);
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleEmailChange = (e) => {
    setEmail(e.target.value);

    if (error && emailPattern.test(e.target.value)) {
      setError("");
    }
  };

  const handleRegister = async () => {
    setError("");

    if (
      firstName.trim() === "" ||
      surname.trim() === "" ||
      birthDay.trim() === "" ||
      address.trim() === "" ||
      location.trim() === "" ||
      telephone.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    if (!emailPattern.test(email)) {
      setError("El correo electrónico no es válido.");
      return;
    }

    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await axios.post("/api/user/register", {
        firstName,
        surname,
        birthDay,
        address,
        location,
        telephone,
        email,
        password,
      });

      if (response.status === 200 && response.data.success) {
        setUser(response.data.user);
        navigate(response.data.redirectTo);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        if (
          error.response.status === 400 ||
          error.response.status === 401 ||
          error.response.status === 404
        ) {
          setError(error.response.data.message);
        } else {
          setError("Error en el servidor. Inténtalo de nuevo más tarde.");
        }
      } else {
        setError("Error de red. Inténtalo de nuevo.");
      }
    }
  };

  return (
    <Body>
      <NavBar>
        <Link to="/">
          <Logo
            src="/image/logo1.png"
            alt="logo_tebanilia"
            style={{ cursor: "pointer" }}
          />
        </Link>
      </NavBar>
      <Container>
        <RegistrationForm>
          <FormGroupRegister>
            <FormGroupTitle>Registro de usuario</FormGroupTitle>
          </FormGroupRegister>
          <FormGroupRegister>
            <FormLabelInput>Nombre:</FormLabelInput>
            <FormInput
              type="text"
              placeholder="Nombre"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FormGroupRegister>
          <FormGroupRegister>
            <FormLabelInput>Apellido:</FormLabelInput>
            <FormInput
              type="text"
              placeholder="Apellido"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </FormGroupRegister>
          <FormGroupRegister>
            <FormLabelInput>Fecha nacimiento:</FormLabelInput>
            <FormInput
              type="date"
              placeholder="Fecha nacimiento"
              value={birthDay}
              onChange={(e) => setBirthDay(e.target.value)}
            />
          </FormGroupRegister>
          <FormGroupRegister>
            <FormLabelInput>Dirección:</FormLabelInput>
            <FormInput
              type="text"
              placeholder="Dirección"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </FormGroupRegister>
          <FormGroupRegister>
            <FormLabelInput>Localidad:</FormLabelInput>
            <FormInput
              type="text"
              placeholder="Localidad"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </FormGroupRegister>
          <FormGroupRegister>
            <FormLabelInput>Teléfono:</FormLabelInput>
            <FormInput
              type="text"
              placeholder="Teléfono"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
            />
          </FormGroupRegister>
          <FormGroupRegister>
            <FormLabelInput>Email:</FormLabelInput>
            <FormInput
              type="text"
              placeholder="Correo electrónico"
              value={email}
              onChange={handleEmailChange}
            />
          </FormGroupRegister>
          <FormGroupRegister>
            <FormLabelInput>Contraseña:</FormLabelInput>
            <FormInput
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroupRegister>
          <FormGroupRegister>
            <FormLabelInput>Confirmar contraseña:</FormLabelInput>
            <FormInput
              type="password"
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormGroupRegister>
          <FormGroupRegister>
            <FormButton onClick={handleRegister}>Registrarse</FormButton>
          </FormGroupRegister>
          {error && (
            <FormGroupError style={{ color: "red" }}>
              <FormLabelError>{error}</FormLabelError>
            </FormGroupError>
          )}
        </RegistrationForm>
      </Container>
      <Footer>
        <Logo src="/image/logo.png" alt="logo_tebanilia" />
      </Footer>
    </Body>
  );
};

export default RegisterForm;
