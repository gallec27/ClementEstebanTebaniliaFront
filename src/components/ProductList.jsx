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

const ProductList = ({ user }) => {
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [category, setCategory] = useState(0);
  const [sortByPrice, setSortByPrice] = useState(false);
  const [resetFilters, setResetFilters] = useState(false);
  const categories = useStore((state) => state.categories);
  const productToEdit = useStore((state) => state.productToEdit);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    axios
      .all([
        axios.get("/api/products/categories"),
        axios.get("/api/products/list"),
      ])
      .then(
        axios.spread((categoriesResponse, productsResponse) => {
          useStore.setState({ categories: categoriesResponse.data });
          setProducts(productsResponse.data);
          setFilteredProducts(productsResponse.data);
          useStore.getState().clearProductToEdit();
        })
      )
      .catch((error) => {
        navigate("/");
      });
  }, []);

  const handleAddToCart = async (product) => {
    try {
      const response = await axios.post("/api/cart/addToCart", {
        productCode: product.productCode,
        clientEmail: user.email,
      });
      if (response.status === 200) {
        setErrorMessage("Producto agregado al carrito.");
        setShowPopup(true);
      } else {
        setErrorMessage("Error al agregar el producto.");
        setShowPopup(true);
      }
    } catch (error) {
      setErrorMessage("Error al agregar el producto.");
      setShowPopup(true);
    }
  };

  const handleCart = (product) => {
    navigate("/cart/shoppingCart");
  };

  const toggleDescription = (productDescription) => {
    setErrorMessage(productDescription);
    setShowPopup(true);
  };

  const handleEdit = async (product) => {
    try {
      const productCode = product.productCode;

      const response = await axios.get(
        `/api/products/edit?code=${productCode}`
      );

      if (response.status === 200) {
        useStore.setState({ productToEdit: response.data.productToEdit });
        navigate("/products/register");
      } else {
        setErrorMessage("No se encontró el producto.");
        setShowPopup(true);
      }
    } catch (error) {
      setErrorMessage("Error al editar el producto.");
      setShowPopup(true);
    }
  };

  const navigateToRegister = () => {
    navigate("/products/register");
  };

  const handleDelete = async (product) => {
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
        <Link to="/" onClick={handleLogout}>
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
        <Title>Lista de Productos</Title>
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
          {user.role !== "admin" ? (
            <ButtonContainerFilter>
              <Button onClick={handleResetFilters}>Restablecer Filtros</Button>
              <Button onClick={handleCart}>Ver compra</Button>
            </ButtonContainerFilter>
          ) : (
            <ButtonContainerFilter>
              <Button onClick={handleResetFilters}>Restablecer Filtros</Button>
              <Button onClick={navigateToRegister}>Agregar producto</Button>
            </ButtonContainerFilter>
          )}
        </FilterContainer>
        <CardContainer>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Card key={product.id}>
                <ProductDetailTitle>{product.productName}</ProductDetailTitle>
                <ProductImage
                  onClick={() => toggleDescription(product.productDescription)}
                  src={`/api/public/uploads/products/${product.productImage}`}
                  alt={product.productName}
                />
                <ProductDetailSubtitle>
                  {product.productDetail}
                </ProductDetailSubtitle>
                <ProductPrice>Precio: ${product.productPrice}</ProductPrice>
                {user.role !== "admin" ? (
                  <ButtonContainer>
                    <Button onClick={() => handleAddToCart(product)}>
                      Comprar
                    </Button>
                  </ButtonContainer>
                ) : (
                  <ButtonContainer>
                    <Button onClick={() => handleEdit(product)}>
                      Modificar
                    </Button>
                    <Button onClick={() => handleDelete(product)}>
                      Eliminar
                    </Button>
                  </ButtonContainer>
                )}
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

export default ProductList;
