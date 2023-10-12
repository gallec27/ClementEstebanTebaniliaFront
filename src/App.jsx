import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import ProductList from "./components/ProductList";
import useStore from "./store/store";
import ResetStyles from "./components/styles/Reset";
import RegisterForm from "./components/RegisterForm";
import RegisterProduct from "./components/RegisterProduct";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  const user = useStore((state) => state.user);

  return (
    <>
      <ResetStyles />
      <Router>
        <Routes>
          {/* Ruta para la página de inicio de sesión */}
          <Route
            path="/"
            element={user ? <Navigate to="/products" /> : <LoginForm />}
          />

          {/* Ruta para la página de productos */}
          <Route
            path="/products"
            element={user ? <ProductList user={user} /> : <Navigate to="/" />}
          />
          
          {/* Ruta para la página de registro de productos */}
          <Route
            path="/products/register"
            element={user ? <RegisterProduct user={user} /> : <Navigate to="/" />}
          />

          {/* Ruta para la página del carrito */}
          <Route
            path="/cart/shoppingCart"
            element={user ? <ShoppingCart user={user} /> : <Navigate to="/" />}
          />
          
          {/* Ruta para la página de registro de usuarios */}
          <Route path="/users/register" element={<RegisterForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
