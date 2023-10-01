import styled from "styled-components";

const Card = styled.div`
  border: 1px solid #ccc;
  padding: 16px;
  margin: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: ${(props) => (props.inCart ? "#FFC0CB" : "white")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  @media (max-width: 768px) {
    /* Estilos para pantallas más pequeñas */
    padding: 8px;
    margin: 8px;
  }

  @media (max-width: 480px) {
    /* Estilos para pantallas aún más pequeñas */
    padding: 4px;
    margin: 4px;
  }
`;

const ProductImage = styled.img`
  max-width: 100%
  max-height: 100%;
  width: auto;
  height: auto;
  margin: 0 auto;
  
  @media (min-width: 769px) {
    max-width: 300px;
    max-height: 300px;
  }

  @media (max-width: 768px) {
    max-width: 250px;
    max-height: 250px;
  }

  @media (max-width: 480px) {
    max-width: 200px;
    max-height: 200px;
  }
`;

const CardContainer = styled.div`
  display: flex;
  padding: 8px;
  flex-direction: column;
  margin-bottom: 20px;
  min-width: 360px;
  align-items: center;
  flex-wrap: wrap;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  max-width: 150px;
  margin: 0 auto;
  border-radius: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  text-align: center;
  color: #333;
  margin: 20px 0;
`;

const SearchInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
`;

export { Card, ProductImage, CardContainer, Button, Title, SearchInput };
