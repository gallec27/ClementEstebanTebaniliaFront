import styled from "styled-components";

const FilterContainer = styled.div`
  display: flex;
  padding: 8px;
  flex-direction: column;
  margin-bottom: 20px;
  min-width: 360px;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
`;

const SearchInput = styled.input`
  padding: 8px;
  margin: 5px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  width: 70%;

  @media (min-width: 768px) {
    margin: 5px;
    width: auto;
    max-width: 200px; /* Ancho máximo para los campos de entrada */
  }
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  width: 70%;

  @media (min-width: 768px) {
    margin: 5px;
    width: auto;
    max-width: 200px; /* Ancho máximo para los campos de selección */
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  padding: 8px;
  align-items: center;
  margin-top: 10px;

  @media (min-width: 768px) {
    margin-top: 0;
  }
`;

const CheckboxInput = styled.input`
  margin-right: 5px;
`;

const ResetButton = styled.button`
  padding: 8px;
  background-color: #9b4747;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  width: 50%;

  @media (min-width: 768px) {
    margin-top: 0;
    width: auto;
    max-width: 200px;
  }
`;

export {
  FilterContainer,
  SearchInput,
  Select,
  CheckboxLabel,
  CheckboxInput,
  ResetButton
};
