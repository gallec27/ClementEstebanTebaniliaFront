import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../store/store";
import axios from "axios";
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
} from "./styles/Card";

import {  
  FormButton  
} from "./styles/Login";

import { NavBar, Logo, UserInfo, Body, Footer } from "./styles/Layout";

const ProductList = ({ user }) => {
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [category, setCategory] = useState(0);
  const [sortByPrice, setSortByPrice] = useState(false);
  const [resetFilters, setResetFilters] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .all([
        axios.get("/api/products/categories"),
        axios.get("/api/products/list"),
      ])
      .then(
        axios.spread((categoriesResponse, productsResponse) => {
          setCategories(categoriesResponse.data);
          setProducts(productsResponse.data);
          setFilteredProducts(productsResponse.data);
        })
      )
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, []);

  const handleAddToCart = (product) => {
    // Implementa la lógica para agregar productos al carrito aquí
  };

  const handleDetails = (product) => {
    // Lógica para mostrar detalles del producto
  };

  const handleEdit = (product) => {
    // Lógica para editar el producto
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
      (cat) => cat.nombre_cat.toLowerCase() === categoryName.toLowerCase()
    );
    if (categoryObject) {
      setCategory(categoryObject.nombre);
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
      setResetFilters(false); // Restablecer la marca
    }

    // Filtrar por descripción
    if (search) {
      filtered = filtered.filter((product) =>
        product.nombre.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filtrar por precio mínimo si es un número válido
    if (min !== "" && !isNaN(parseFloat(min))) {
      filtered = filtered.filter(
        (product) => product.precio >= parseFloat(min)
      );
    }

    // Filtrar por categoría
    if (cat > 0) {
      filtered = filtered.filter((product) => product.id_cat === cat);
    }

    // Ordenar por precio si es necesario
    if (sortBy) {
      filtered.sort((a, b) => a.precio - b.precio);
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
        <Logo src="/image/logo1.png" alt="logo_tebanilia" />
        <UserInfo>
          {user ? (
            <>
              <span>{user.nombre}</span>
              <FormButton onClick={handleLogout}>Logout</FormButton>
            </>
          ) : null}
        </UserInfo>
      </NavBar>
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
            <option key={cat.id} value={cat.nombre_cat}>
              {cat.nombre_cat}
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
        <ResetButton onClick={handleResetFilters}>
          Restablecer Filtros
        </ResetButton>
      </FilterContainer>
      <CardContainer>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Card key={product.id}>
              <h2>{product.nombre}</h2>
              <ProductImage
                src={`/api/public/uploads/products/${product.imagen}`}
                alt={product.nombre}
              />
              <p>{product.detalle}</p>
              <p>Precio: ${product.precio}</p>
              {user.nivelAcceso !== "admin" ? (
                <Button onClick={() => handleDetails(product)}>Detalle</Button>
              ) : (
                <Button onClick={() => handleEdit(product)}>Modificar</Button>
              )}
            </Card>
          ))
        ) : products.length > 0 ? (
          <p>Productos no disponibles</p>
        ) : (
          <p>Cargando...</p>
        )}
      </CardContainer>
      <Footer>
        <Logo src="/image/logo.png" alt="logo_tebanilia" />
      </Footer>
    </Body>
  );
};

export default ProductList;
