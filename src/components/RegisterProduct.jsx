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
  FormTextarea,
} from "./styles/Login";
import { NavBar, Logo, Body, Footer, UserInfo } from "./styles/Layout";

import { Select } from "./styles/SearchFilter";

const RegisterProduct = ({ user }) => {
  const setUser = useStore((state) => state.setUser);
  const categories = useStore((state) => state.categories);
  const [productCode, setProductCode] = useState("");
  const [productName, setProductName] = useState("");
  const [productDetail, setProductDetail] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError("");

    if (
      productCode.trim() === "" ||
      productName.trim() === "" ||
      productDetail.trim() === "" ||
      productPrice.trim() === "" ||
      productImage.trim() === "" ||
      productCategory.trim() === "" ||
      productDescription.trim() === ""
    ) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    // Validar que "Precio" sea un valor numérico o de moneda
    if (isNaN(parseFloat(productPrice)) || !isFinite(productPrice)) {
      setError("El campo 'Precio' debe ser un valor numérico válido.");
      return;
    }

    try {
      const response = await axios.post("/api/products/create", {
        productCode,
        productName,
        productDetail,
        productPrice,
        productDescription,
        productImage,
        productCategory,
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

  const handleCategoryChange = (event) => {
    const categoryName = event.target.value;
    const categoryObject = categories.find(
      (cat) => cat.categoryName.toLowerCase() === categoryName.toLowerCase()
    );

    if (categoryObject) {
      setProductCategory(categoryObject);      
    }
  };

  const handleLogout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <Body>
      <NavBar>
        <Link to="/" >
          <Logo
            src="/image/logo1.png"
            alt="logo_tebanilia"
            style={{ cursor: "pointer" }}
          />
        </Link>
        <UserInfo>
          {user ? (
            <>
              <span>{user.firstName}</span>
              <FormButton onClick={handleLogout}>Logout</FormButton>
            </>
          ) : null}
        </UserInfo>
      </NavBar>
      <Container>
        <RegistrationForm>
          <FormGroupRegister>
            <FormGroupTitle>Registro de productos</FormGroupTitle>
          </FormGroupRegister>
          <FormGroupRegister>
            <FormLabelInput>Código:</FormLabelInput>
            <FormInput
              type="text"
              value={productCode}
              onChange={(e) => setProductCode(e.target.value)}
            />
          </FormGroupRegister>
          <FormGroupRegister>
            <FormLabelInput>Nombre:</FormLabelInput>
            <FormInput
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </FormGroupRegister>
          <FormGroupRegister>
            <FormLabelInput>Detalle:</FormLabelInput>
            <FormInput
              type="text"
              value={productDetail}
              onChange={(e) => setProductDetail(e.target.value)}
            />
          </FormGroupRegister>
          <FormGroupRegister>
            <FormLabelInput>Precio:</FormLabelInput>
            <FormInput
              type="text"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
            />
          </FormGroupRegister>
          <FormGroupRegister>
            <FormLabelInput>Descripción:</FormLabelInput>
            <FormTextarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
            />
          </FormGroupRegister>
          <FormGroupRegister>
            <FormLabelInput>Imagen:</FormLabelInput>
            <FormInput
              type="file"
              value={productImage}
              onChange={(e) => setProductImage(e.target.value)}
            />
          </FormGroupRegister>
          <FormGroupRegister>
            <FormLabelInput>Categoría:</FormLabelInput>
            <Select value={productCategory.categoryName} onChange={handleCategoryChange}>
              <option value="">Seleccione categoría</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.categoryName}>
                  {cat.categoryName}
                </option>
              ))}
            </Select>
            {/* <FormInput
              type="text"
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
            /> */}
          </FormGroupRegister>
          <FormGroupRegister>
            <FormButton onClick={handleRegister}>Guardar</FormButton>
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

export default RegisterProduct;
