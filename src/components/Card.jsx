import styled from 'styled-components';

const Card = styled.div`
  border: 1px solid #ccc;
  padding: 16px;
  margin: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: ${(props) => (props.inCart ? '#FFC0CB' : 'white')};
  display: flex; 
  flex-direction: column; 
  justify-content: center; 
  text-align: center; 
`;

const ProductImage = styled.img`
  max-width: 300px;
  max-height: 300px;
  margin: 0 auto; 
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); 
  gap: 16px; 
`;

const Button = styled.button`
  background-color: #007bff; /* Color de fondo del botón */
  color: white; /* Color del texto del botón */
  border: none; /* Quita el borde del botón */
  padding: 10px 20px; /* Espaciado interno */
  cursor: pointer; /* Cambia el cursor al pasar sobre el botón */
  transition: background-color 0.3s ease; /* Animación de cambio de color */
  max-width: 150px; /* Ancho máximo del botón */
  margin: 0 auto; /* Centra horizontalmente el botón */
  border-radius: 10px; /* Borde redondeado */

  &:hover {
    background-color: #0056b3; /* Color de fondo del botón al pasar el mouse */
  }
`;

const Title = styled.h1`
  font-size: 24px; /* Tamaño de fuente */
  text-align: center; /* Centra el texto horizontalmente */
  color: #333; /* Color del texto */
  margin: 20px 0; /* Espacio externo superior e inferior */
`;

const SearchInput = styled.input`
  padding: 8px; /* Añade el padding que desees */
  border: 1px solid #ccc; /* Establece un borde */
  border-radius: 4px; /* Agrega esquinas redondeadas */
  width: 200px; /* Establece el ancho que desees */
`;

export { Card, ProductImage, CardContainer, Button, Title, SearchInput };



