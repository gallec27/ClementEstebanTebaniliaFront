import styled from "styled-components";

const ModalOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  position: relative;
  width: 80%;
  max-width: 600px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

// Estilos para la cabecera del modal
const ModalHeader = styled.div`
  text-align: left; 
  margin-bottom: 20px;
  border: 1px solid #ccc; 
  border-radius: 5px;
  padding: 8px; 
`;

const OrderNumber = styled.h2`
  font-size: 18px;
  margin: 0;
  text-align: right; 
`;

const OrderDate = styled.p`
  margin: 0;
  text-align: right; 
`;

// Estilos para el detalle de la orden
const OrderDetail = styled.ul`
  list-style: none;
  padding: 0;
`;

const DetailItem = styled.li`
  margin-bottom: 20px;
  border: 1px solid #ccc; 
  padding: 5px;
  border-radius: 5px; 
`;

const ProductName = styled.div`
  font-weight: bold;
`;

const Quantity = styled.div`
  font-weight: bold;
`;

const Price = styled.div`
  font-weight: bold;
`;

// Estilos para el pie del modal
const ModalFooter = styled.div`
  text-align: right;
  margin-top: 20px;
`;

const TotalAmount = styled.p`
  font-weight: bold;
  font-size: 20px;
`;



export { 
    ModalOverlay, 
    ModalContainer, 
    CloseButton, 
    ModalHeader,
    OrderNumber,
    OrderDate,
    OrderDetail,
    DetailItem,
    ProductName,
    Price,
    ModalFooter,
    TotalAmount,
    Quantity
 };
