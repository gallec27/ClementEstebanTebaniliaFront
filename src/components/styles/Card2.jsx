import styled from 'styled-components';

// Estilo para el contenedor de productos
const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding-left: 5px;
  padding-right: 5px;
  padding-bottom: 30px;
`;

// Estilo para la imagen del producto
const ProductImage = styled.img`
  max-width: 65%;
  border-radius: 5%;
  box-shadow: var(--img-box-shadow);
`;

// Estilo para el título del card
const CardTitle = styled.h3`
  font-size: 1rem;
  font-weight: bold;
  font-style: oblique;
  padding-top: 5px;
`;

// Estilo para el contenedor del card
const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-basis: calc(25% - 20px);
  padding-bottom: 20px;
  box-sizing: border-box;
`;



// Estilo para el botón de agregar al carrito
const CartButton = styled.button`
  background-color: var(--btn-cart-color);
  border-radius: 7px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 0px;
  padding-bottom: 0px;
`;

// Estilo para el botón de ver más
const ViewMoreButton = styled.button`
  background-color: var(--btn-detalle-color);
  border-radius: 7px;
  padding: 8px;
  font-size: 14px;
  font-weight: bold;
  width: 100px;
`;

// Estilo para el botón de editar
const EditButton = styled.button`
  background-color: var(--btn-editar-color);
  border-radius: 7px;
  padding: 8px;
  font-size: 14px;
  font-weight: bold;
  width: 90px;
`;

// Media queries para estilos responsivos
const ResponsiveCard = styled.div`
  @media screen and (max-width: 768px) {
    ${CardContainer} {
      flex-basis: calc(50% - 20px);
    }
  }

  @media screen and (max-width: 480px) {
    ${CardContainer} {
      flex-basis: 100%;
    }
  }
`;

export {
  ProductContainer,
  ProductImage,
  CardTitle,
  CardContainer,
  ButtonContainer,
  CartButton,
  ViewMoreButton,
  EditButton,
  ResponsiveCard,
};
