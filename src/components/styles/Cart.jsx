import styled from 'styled-components';

// Estilo para la imagen del producto con tamaño máximo
const ProductImageSize = styled.img`
  max-width: 65%;
`;

// Estilo para la imagen del producto con borde redondeado y sombra
const ProductImageBorder = styled.img`
  border-radius: 5%;
  box-shadow: var(--img-box-shadow);
`;

export { ProductImageSize, ProductImageBorder };
