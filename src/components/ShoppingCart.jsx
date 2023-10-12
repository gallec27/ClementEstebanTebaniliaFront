import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useStore from "../store/store";
import axios from "axios";
import { ContainerProducts } from "./styles/Products";
import {
  FilterContainer,
  SearchInput,
  Select,
  CheckboxLabel,
  CheckboxInput,
  ResetButton,
} from "./styles/SearchFilter";

import {
  Card,
  ProductImage,
  CardContainer,
  Button,
  Title,
  ProductDetailSubtitle,
  ProductDetailTitle,
  ProductPrice,
  ButtonContainer,
  PopupContainer,
  PopupContent,
  PopupText,
  ButtonContainerFilter,
} from "./styles/Card";

import { FormButton } from "./styles/Login";

import { NavBar, Logo, UserInfo, Body, Footer } from "./styles/Layout";

const ShoppingCart = ({ user }) => {
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);
  const [order, setOrder] = useState(0);
  const [orderDetails, setOrderDetails] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [category, setCategory] = useState(0);
  const [sortByPrice, setSortByPrice] = useState(false);
  const [resetFilters, setResetFilters] = useState(false);
  const categories = useStore((state) => state.categories);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    try {
      axios
        .get(`/api/cart/getOrder?userId=${user.id}`)
        .then((response) => {
          if (response.status === 200) {
            console.log("ShoppingCart useEffect: ", response.data);
            setOrder(response.data.order);
            setOrderDetails(response.data.orderDetails);
            setProducts(response.data.orderProducts);
            setFilteredProducts(response.data.orderProducts);
          } else {
            setErrorMessage("No se encontró orden.");
            setShowPopup(true);
          }
        })
        .catch((error) => {
          console.log("ShoppingCart: ", error);
          setErrorMessage("Error al buscar órdenes.");
          setShowPopup(true);
        });
    } catch (error) {
      console.log("ShoppingCart: ", error);
      setErrorMessage("Error al buscar órdenes.");
      setShowPopup(true);
    }
  }, []);

  const handleDelete = async (product) => {
    try {
      const response = await axios.post("/api/cart/delete", {        
        orderId: order.id,
        orderDetailsId: orderDetails.find(
          (detail) => detail.product_id === product.id
        ).id,
        totalProduct: orderDetails.find(
          (detail) => detail.product_id === product.id
        ).price
      });

      if (response.status === 200) {
        setFilteredProducts((prevProducts) =>
          prevProducts.filter((p) => p.productCode !== product.productCode)
        );
      } else {
        setErrorMessage("Error al quitar el producto.");
        setShowPopup(true);
      }
    } catch (error) {
      setErrorMessage("Error al quitar el producto.");
      setShowPopup(true);
    }
  };

  const handleConfirm = async (product) => {
    try {
      const response = await axios.post("/api/products/delete", {
        codigo: product.productCode,
      });
      if (response.status === 200) {
        setFilteredProducts((prevProducts) =>
          prevProducts.filter((p) => p.productCode !== product.productCode)
        );
      } else {
        setErrorMessage("Error al eliminar el producto.");
        setShowPopup(true);
      }
    } catch (error) {
      setErrorMessage("Error al eliminar el producto.");
      setShowPopup(true);
    }
  };

  const handleDiscard = async (product) => {
    try {
      const response = await axios.post("/api/products/delete", {
        codigo: product.productCode,
      });
      if (response.status === 200) {
        setFilteredProducts((prevProducts) =>
          prevProducts.filter((p) => p.productCode !== product.productCode)
        );
      } else {
        setErrorMessage("Error al eliminar el producto.");
        setShowPopup(true);
      }
    } catch (error) {
      setErrorMessage("Error al eliminar el producto.");
      setShowPopup(true);
    }
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setMinPrice("");
    setCategory(0); // Restablecer a 0 para "Todas las categorías"
    setSortByPrice(false);
    // Restablecer los productos filtrados a la lista completa de productos
    setFilteredProducts(products);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    filterProducts(event.target.value, minPrice, category, sortByPrice);
  };

  const handleMinPriceChange = (event) => {
    // Validar que el valor sea un número válido
    const newValue = event.target.value;
    if (/^\d*\.?\d*$/.test(newValue) || newValue === "") {
      setMinPrice(newValue);
      filterProducts(searchTerm, newValue, category, sortByPrice);
    }
  };

  const handleCategoryChange = (event) => {
    const categoryName = event.target.value;
    const categoryObject = categories.find(
      (cat) => cat.categoryName.toLowerCase() === categoryName.toLowerCase()
    );

    if (categoryObject) {
      setCategory(categoryObject.categoryName);
      filterProducts(searchTerm, minPrice, categoryObject.id, sortByPrice);
    } else {
      setCategory("Todas las categorías");
      const idCat = 0;
      filterProducts(searchTerm, minPrice, idCat, sortByPrice);
    }
  };

  const handleSortByPriceChange = (event) => {
    setSortByPrice(event.target.checked);
    filterProducts(searchTerm, minPrice, category, event.target.checked);
  };

  const filterProducts = (search, min, cat, sortBy) => {
    let filtered = [...products];

    // Verificar si se deben restablecer los filtros
    if (resetFilters) {
      setSearchTerm("");
      setMinPrice("");
      setCategory(0);
      setSortByPrice(false);
      setResetFilters(false);
    }

    // Filtrar por descripción
    if (search) {
      filtered = filtered.filter((product) =>
        product.productName.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filtrar por precio mínimo si es un número válido
    if (min !== "" && !isNaN(parseFloat(min))) {
      filtered = filtered.filter(
        (product) => product.productPrice >= parseFloat(min)
      );
    }

    // Filtrar por categoría
    if (cat > 0) {
      filtered = filtered.filter((product) => product.category_id === cat);
    }

    // Ordenar por precio si es necesario
    if (sortBy) {
      filtered.sort((a, b) => a.productPrice - b.productPrice);
    }

    setFilteredProducts(filtered);
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
      <ContainerProducts>
        {showPopup && (
          <PopupContainer>
            <PopupContent>
              <PopupText>{errorMessage}</PopupText>
              <ResetButton onClick={() => setShowPopup(false)}>
                Cerrar
              </ResetButton>
            </PopupContent>
          </PopupContainer>
        )}
        <Title>Detalle compra</Title>
        <FilterContainer>
          <SearchInput
            type="text"
            placeholder="Buscar por descripción"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <SearchInput
            type="text"
            placeholder="Precio mínimo"
            value={minPrice}
            onChange={handleMinPriceChange}
          />
          <Select value={category} onChange={handleCategoryChange}>
            <option value="">Todas las categorías</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.categoryName}>
                {cat.categoryName}
              </option>
            ))}
          </Select>
          <CheckboxLabel>
            Ordenar por precio:
            <CheckboxInput
              type="checkbox"
              checked={sortByPrice}
              onChange={handleSortByPriceChange}
            />
          </CheckboxLabel>
          <ButtonContainerFilter>
            <Button onClick={handleResetFilters}>Restablecer Filtros</Button>
            <Button onClick={handleConfirm}>Confirmar compra</Button>
            <Button onClick={handleDiscard}>Descartar compra</Button>
          </ButtonContainerFilter>
        </FilterContainer>
        <CardContainer>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Card key={product.id}>
                <ProductDetailTitle>{product.productName}</ProductDetailTitle>
                <ProductImage
                  src={`/api/public/uploads/products/${product.productImage}`}
                  alt={product.productName}
                />
                <ProductPrice>Precio: ${product.productPrice}</ProductPrice>
                <ProductDetailSubtitle>
                  Cantidad:{" "}
                  {
                    orderDetails.find(
                      (detail) => detail.product_id === product.id
                    )?.quantity
                  }
                  <br />
                  Total:{" "}
                  {
                    orderDetails.find(
                      (detail) => detail.product_id === product.id
                    )?.price
                  }
                </ProductDetailSubtitle>

                <ButtonContainer>
                  <Button onClick={() => handleDelete(product)}>Quitar</Button>
                </ButtonContainer>
              </Card>
            ))
          ) : products.length > 0 ? (
            <p>Productos no disponibles</p>
          ) : (
            <p>Cargando...</p>
          )}
        </CardContainer>
      </ContainerProducts>
      <Footer>
        <Logo src="/image/logo.png" alt="logo_tebanilia" />
      </Footer>
    </Body>
  );
};

export default ShoppingCart;
