import React, { useState, useEffect } from "react";
import {
    ProductContainer,
    ProductImage,
    CardTitle,
    CardContainer,
    ButtonContainer,
    CartButton,
    ViewMoreButton,
    EditButton,
    ResponsiveCard,
} from "./styles/Card2"; // Importa los componentes necesarios

import {
  Body,
  Link,
  List,
  Header,
  HeaderLogo,
  HeaderTitle,
  NavBar,
  NavLinks,
  Main,
  Banner,
  ProductTitle,
  LogoImage,
  Footer,
  FooterLogo,
  FooterTitle,
  CopyrightText,
  DesktopStyles,
} from "./styles/Layout";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [category, setCategory] = useState("");
  const [sortByPrice, setSortByPrice] = useState(false);

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
    setFilteredProducts(products);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    filterProducts(event.target.value, minPrice, category, sortByPrice);
  };

  const handleMinPriceChange = (event) => {
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
      setCategory(categoryObject.id);
      filterProducts(searchTerm, minPrice, categoryObject.id, sortByPrice);
    } else {
      setCategory("");
    }
  };

  const handleSortByPriceChange = (event) => {
    setSortByPrice(event.target.checked);
    filterProducts(searchTerm, minPrice, category, event.target.checked);
  };

  const filterProducts = (search, min, cat, sortBy) => {
    let filtered = [...products];

    if (resetFilters) {
      setSearchTerm("");
      setMinPrice("");
      setCategory("");
      setSortByPrice(false);
      setResetFilters(false);
    }

    if (search) {
      filtered = filtered.filter((product) =>
        product.nombre.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (min !== "" && !isNaN(parseFloat(min))) {
      filtered = filtered.filter(
        (product) => product.precio >= parseFloat(min)
      );
    }

    if (cat) {
      filtered = filtered.filter((product) => product.id_cat === cat);
    }

    if (sortBy) {
      filtered.sort((a, b) => a.precio - b.precio);
    }

    setFilteredProducts(filtered);
  };

  return (
    <div>
      <Header>
        <HeaderLogo>
          <a href="/">
            <img
              src="/assets/logo_st.png"
              alt="logo_tebanilia"
              className="img__logo"
            />
          </a>
          <h1 className="header1__titulo">tebanilia</h1>
        </HeaderLogo>
        <NavBar>
          <ul className="navBar__links">
            {req.session.usuario ? (
              <>
                <li>Hola, {req.session.usuario.nombre}!</li>
                <li>
                  <a href="/user/logout">Cerrar sesión</a>
                </li>
              </>
            ) : null}
          </ul>
        </NavBar>
      </Header>
      <main className="main1">
        <div>
          <h2 className="productos__titulo">Listado de productos</h2>
        </div>
        <section className="container">
          {products.length > 0 ? (
            <ul>
              {products.map((product) => (
                <li key={product.id}>
                  <a href={`/products/action/${product.codigo}`}>
                    Código: {product.codigo} - Nombre: {product.nombre} -
                    Precio: {product.precio}
                  </a>
                </li>
              ))}
              <li>
                <div className="form-group__h4">
                  <a href="/admin/profile">
                    <h4>Regresar</h4>
                  </a>
                </div>
              </li>
            </ul>
          ) : (
            <p>No hay productos disponibles.</p>
          )}
        </section>
      </main>
      <Footer>
        <FooterLogo>
          <a href="/">
            <img
              src="/assets/logo_st.png"
              alt="logo_tebanilia"
              className="img__logo"
            />
          </a>
          <h3 className="footer__titulo">tebanilia</h3>
          <p className="footer__copyright">Copyrigth 2023</p>
        </FooterLogo>
      </Footer>
    </div>
  );
};

export default ProductList;
