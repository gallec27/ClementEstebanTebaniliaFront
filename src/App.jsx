import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importa desde 'react-router-dom'
import LoginForm from './components/LoginForm';
import ProductList from './components/ProductList';
import useStore from './store/store';

function App() {
  const user = useStore((state) => state.user);

  return (
    <Router>
      <Routes> {/* Cambia Switch por Routes */}
        {/* <Route path="/" element={<LoginForm />} /> */}
        <Route path="/" element={<ProductList />} />
        {/* <Route path="/productos" element={<ProductList />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
