import styled from "styled-components";

// Estilo para el contenedor principal
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  max-height: 80vh;
  overflow-y: auto;
 `;

// Estilo para el formulario de registro
const RegistrationForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #ffb9b991;
  padding: 10px;
  max-width: 500px;
  width: 100%;
  height: auto;
  margin: 10px;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); 
  min-height: 800px;
`;

// Estilo para el formulario de registro
const LoginFormSt = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #ffb9b991;
  padding: 10px;
  max-width: 500px;
  width: 100%;
  height: auto;
  margin: 10px;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  min-height: 345px;
`;

// Estilo para el grupo de formularios
const FormGroupLogin = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-content: space-between;
  margin: 5px;
  min-width: 200px;
`;

// Estilo para el grupo de formularios
const FormGroupRegister = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-content: space-between;
  min-width: 200px;
`;

// Estilo para el título del grupo de formularios
const FormGroupTitle = styled.h3`
  display: flex;
  justify-content: center;
`;

// Estilo para el mensaje de error del grupo de formularios
const FormGroupError = styled.div`
  display: flex;  
  justify-content: center;
`;

// Estilo para la etiqueta de error
const FormLabelError = styled.label`
  display: flex;
  justify-content: center;
  font-family: Aleo;  
  font-weight: bold;
`;

// Estilo para la etiqueta de error
const FormLabelInput = styled.label`
  display: flex;
  justify-content: center;
  font-family: Aleo;  
  font-weight: bold;
  justify-content: flex-start;
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

const RegisterButton = styled.button`
  padding: 10px 20px;
  background-color: transparent; 
  font-weight: bold;
  color: #4b4b4b; 
  cursor: pointer;
  border: none;
  border-radius: 5px;
  max-width: 100px;
  display: flex;
  align-items: center; 
  justify-content: center; 

  &:hover {
    background-color: transparent;
    color: white; 
  }
`;

// Estilo para los campos de entrada de texto
const FormInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
`;

// Estilo para el grupo de formularios
const FormGroupRegisterButton = styled.div`
  padding: 0.5rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  align-content: space-between;
  margin: 5px;
  min-width: 200px;
`;

// Estilo para el texto en mayúsculas
const UppercaseText = styled.span`
  text-transform: capitalize;
`;

export {
  Container,
  RegistrationForm,
  LoginFormSt,
  FormGroupTitle,
  FormGroupError,
  FormLabelError,
  FormLabelInput,
  FormButton,
  FormInput,
  UppercaseText,
  FormGroupLogin,
  FormGroupRegister,
  RegisterButton,
  FormGroupRegisterButton
};
