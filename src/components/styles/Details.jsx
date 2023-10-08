import styled from 'styled-components';

// Estilo para el contenedor
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1rem;
`;

// Estilo para la imagen del producto en detalle
const ProductDetailImage = styled.img`
  max-width: 65%;
  border-radius: 5%;
  box-shadow: var(--img-box-shadow);
  margin: 1rem;
`;





// Estilo para el contenedor del detalle del producto
const ProductDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-basis: calc(50% - 20px);
  padding: 1rem;
  box-sizing: border-box;
`;

// Estilo para el contenedor de botones
const ButtonContainer = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5px;
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

export {
  Container,
  ProductDetailImage,  
  ProductDetailContainer,
  ButtonContainer,
  CartButton,
};
