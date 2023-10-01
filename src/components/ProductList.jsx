import React, { useState, useEffect } from "react";
import {
  Card,
  ProductImage,
  CardContainer,
  Button,
  Title,
  SearchInput,
} from "./Card";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [category, setCategory] = useState("");
  const [sortByPrice, setSortByPrice] = useState(false);
  const [resetFilters, setResetFilters] = useState(false); // Nuevo estado
  const [categories, setCategories] = useState([]); // Estado para almacenar categorías

  useEffect(() => {
    Promise.all([
      fetch("/api/products/categories").then((res) => res.json()),
      fetch("/api/products/list").then((res) => res.json()),
    ]).then(([categoriesData, productsData]) => {
      setCategories(categoriesData);
      setProducts(productsData);
      setFilteredProducts(productsData);
    });
  }, []);

  const handleAddToCart = (product) => {
    // Implementa la lógica para agregar productos al carrito aquí
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setMinPrice("");
    setCategory("");
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
    const categoryObject = categories.find((cat) => cat.nombre_cat.toLowerCase() === categoryName.toLowerCase());
    if (categoryObject) {
      setCategory(categoryObject.id);
      filterProducts(searchTerm, minPrice, categoryObject.id, sortByPrice);
    } else {
      // Manejar el caso donde no se encuentra la categoría
      setCategory(""); // O establecer un valor predeterminado
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
      setCategory("");
      setSortByPrice(false);
      setResetFilters(false); // Restablecer la marca
    }

    // Filtrar por descripción
    if (search) {
      filtered = filtered.filter((product) =>
        product.nombre_cat.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filtrar por precio mínimo si es un número válido
    if (min !== "" && !isNaN(parseFloat(min))) {
      filtered = filtered.filter(
        (product) => product.precio >= parseFloat(min)
      );
    }

    // Filtrar por categoría   
    if (cat) {
      filtered = filtered.filter(
        (product) => product.id_cat === cat
      );
    }

    // Ordenar por precio si es necesario
    if (sortBy) {
      filtered.sort((a, b) => a.precio - b.precio);
    }

    setFilteredProducts(filtered);
  };

  return (
    <div>
      <Title>Lista de Productos</Title>
      <div>
        <SearchInput
          type="text" // Cambiado a "text"
          placeholder="Buscar por descripción"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <SearchInput
          type="text" // Cambiado a "text"
          placeholder="Precio mínimo"
          value={minPrice}
          onChange={handleMinPriceChange}
        />
        <select value={category} onChange={handleCategoryChange}>
          <option value="">Todas las categorías</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.nombre_cat}>
              {cat.nombre_cat}
            </option>
          ))}
        </select>
        <label>
          Ordenar por precio:
          <input
            type="checkbox"
            checked={sortByPrice}
            onChange={handleSortByPriceChange}
          />
        </label>
        <button onClick={handleResetFilters}>Restablecer Filtros</button>
      </div>
      <CardContainer>       
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Card key={product.id}>              
              <h2>{product.nombre}</h2>
              <ProductImage src={product.imagen} alt={product.nombre} />
              <p>{product.detalle}</p>
              <p>Precio: ${product.precio}</p>
              <Button onClick={() => handleAddToCart(product)}>Aceptar</Button>
            </Card>
          ))
        ) : (
          products.length > 0 ? (
            <p>Productos no disponibles</p>
          ) : (
            <p>Cargando...</p>
          )
        )}
      </CardContainer>
    </div>
  );
};

export default ProductList;
