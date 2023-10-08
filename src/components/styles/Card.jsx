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
  border-radius: 8px;
  
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
  background-color: #9b4747;
  color: white;
  border: none;
  padding: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  max-width: 150px;
  margin: 4px;
  border-radius: 5px;

  &:hover {
    background-color: #9e5d5d;
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

const FloatingDescription = styled.div`
  position: absolute;
  background-color: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  display: none;
  z-index: 1;

  &.show {
    display: block;
  }
`;


// Estilo para el título del producto en detalle
const ProductDetailTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: bold;
  font-style: oblique;
  padding-top: 5px;
`;

// Estilo para el subtítulo del producto en detalle
const ProductDetailSubtitle = styled.h3`
  font-size: 1rem;
  font-weight: normal;
  font-style: oblique;
  padding-top: 5px;
`;

// Estilo para el subtítulo del producto en detalle
const ProductPrice = styled.h3`
  font-size: 1rem;
  font-weight: bold;
  padding-top: 5px;
  padding-bottom: 5px;
`;

// Estilo para el contenedor de botones
const ButtonContainer = styled.div`  
display: flex;
padding: 8px;
flex-direction: column;
margin-bottom: 20px;
align-items: center;
flex-wrap: wrap;

@media (min-width: 768px) {
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
`;

const ButtonContainerFilter = styled.div`  
display: flex;
padding: 8px;
flex-direction: column;
align-items: center;
flex-wrap: wrap;

@media (min-width: 768px) {
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
`;

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const PopupText = styled.p`
  color: red;
  font-weight: bold;  
  margin-bottom: 10px;  
`;

export {
  Card,
  ProductImage,
  CardContainer,
  Button,
  Title,
  SearchInput,
  FloatingDescription,
  ProductDetailTitle,
  ProductDetailSubtitle,
  ProductPrice,
  ButtonContainer,
  PopupContainer,
  PopupContent,
  PopupText,  
  ButtonContainerFilter
};
