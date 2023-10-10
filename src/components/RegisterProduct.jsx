import React, { useState, useEffect } from "react";
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
  const productToEdit = useStore((state) => state.productToEdit)
  const [isEditing, setIsEditing] = useState(false); 
  const [productCode, setProductCode] = useState("");
  const [productName, setProductName] = useState("");
  const [productDetail, setProductDetail] = useState("");
  const [productPrice, setProductPrice] = useState("");  
  const [productCategory, setProductCategory] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (productToEdit) {
      setIsEditing(true);
      
      setProductCode(productToEdit.productCode);
      setProductName(productToEdit.productName);
      setProductDetail(productToEdit.productDetail);
      setProductPrice(productToEdit.productPrice);
      setProductDescription(productToEdit.productDescription);
      
      const categoryObject = categories.find(
        (cat) => cat.id === productToEdit.category_id
      );
      if (categoryObject) {
        setProductCategory(categoryObject);
      }
      // No es necesario configurar selectedImage, ya que no puedes preestablecer un campo de archivo
    }
  }, []);

  const handleRegister = async () => {
    setError("");

    if (
      productCode.trim() === "" ||
      productName.trim() === "" ||
      productDetail.trim() === "" ||
      productPrice.trim() === "" ||      
      productCategory.categoryName.trim() === "Seleccione categoría" ||
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

    if (!selectedImage) {
      setError("Por favor, seleccione una imagen.");
      return;
    }

    const formData = new FormData();
    formData.append("productCode", productCode);
    formData.append("productName", productName);
    formData.append("productDetail", productDetail);
    formData.append("productPrice", productPrice);
    formData.append("productDescription", productDescription);
    formData.append("category_id", productCategory.id);
    if (selectedImage) {
      formData.append("imagen", selectedImage);
    }

    try {
      const response = await axios.post("/api/products/edit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200 && response.data.success) {
        useStore.getState().clearProductToEdit();
        
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
        <Link to="/">
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
            <FormGroupTitle>
              {isEditing ? "Editar Producto" : "Registro de productos"}
            </FormGroupTitle>
          </FormGroupRegister>
          <FormGroupRegister>
            <FormLabelInput>Código:</FormLabelInput>
            <FormInput
              type="text"
              value={productCode}
              onChange={(e) => setProductCode(e.target.value)}
              readOnly={isEditing}
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
              onChange={(e) => {
                if (e.target.files.length > 0) {
                  setSelectedImage(e.target.files[0]);
                } else {
                  setSelectedImage(null);
                }
              }}
            />
          </FormGroupRegister>
          <FormGroupRegister>
            <FormLabelInput>Categoría:</FormLabelInput>
            <Select
              value={productCategory.categoryName}
              onChange={handleCategoryChange}
            >
              <option value="">Seleccione categoría</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.categoryName}>
                  {cat.categoryName}
                </option>
              ))}
            </Select>
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
