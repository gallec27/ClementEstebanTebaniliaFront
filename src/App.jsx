import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Importa desde 'react-router-dom'
import LoginForm from "./components/LoginForm";
import ProductList from "./components/ProductList";
import useStore from "./store/store";
import ResetStyles from "./components/styles/Reset";
import { UserProvider } from "./components/UserContext";

function App() {
  const user = useStore((state) => state.user);

  return (
    <>
      <UserProvider>
        <ResetStyles />
        <Router>
          <Routes>
            <Route path="/" element={<LoginForm />} /> 
            <Route path="/productos" element={<ProductList user={user} />} />
            {/* <Route path="/productos" element={<ProductList />} /> */}
          </Routes>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
