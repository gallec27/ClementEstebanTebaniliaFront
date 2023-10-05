import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import ProductList from "./components/ProductList";
import useStore from "./store/store";
import ResetStyles from "./components/styles/Reset";
import RegisterForm from "./components/RegisterForm";

function App() {
  const user = useStore((state) => state.user);

  return (
    <>
      <ResetStyles />
      <Router>
        <Routes>
          {/* Ruta para la página de inicio de sesión */}
          <Route path="/" element={user ? <Navigate to="/products" /> : <LoginForm />} />

          {/* Ruta para la página de productos */}
          <Route
            path="/products"
            element={user ? <ProductList user={user} /> : <Navigate to="/" />}
          />

          <Route
            path="/register" element={<RegisterForm/>}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
