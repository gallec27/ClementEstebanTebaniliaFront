import styled from 'styled-components';

// Estilo para el contenedor principal
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
`;

// Estilo para el formulario de registro
const RegistrationForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: var(--login-background-color);
  padding: 10px;
  max-width: 500px;
  width: 100%;
  height: auto;
  margin-top: 50px;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
`;

// Estilo para el grupo de formularios
const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-content: space-between;
  margin: 10px;
  min-width: 200px;
`;

// Estilo para el título del grupo de formularios
const FormGroupTitle = styled.h4`
  display: flex;
  justify-content: center;
`;

// Estilo para el mensaje de error del grupo de formularios
const FormGroupError = styled.div`
  display: flex;
  padding: 10px;
  justify-content: center;
`;

// Estilo para las etiquetas de los campos de formulario
const FormLabel = styled.label`
  font-family: Aleo;
  margin-bottom: 5px;
  font-weight: bold;
`;

// Estilo para los botones
const FormButton = styled.button`
  padding: 10px 20px;
  background-color: #9b4747;
  font-weight: bold;
  color: white;
  cursor: pointer;
  border: none;
  border-radius: 5px;

  &:hover {
    background-color: #9e5d5d;
  }
`;

// Estilo para los campos de entrada de texto
const FormInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
`;

// Estilo para el texto en mayúsculas
const UppercaseText = styled.span`
  text-transform: capitalize;
`;

export {
  Container,
  RegistrationForm,
  FormGroup,
  FormGroupTitle,
  FormGroupError,
  FormLabel,
  FormButton,
  FormInput,
  UppercaseText,
};
