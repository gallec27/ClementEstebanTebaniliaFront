import styled from "styled-components";

// Define las fuentes
const GlobalStyle = styled.div`
  font-family: "Aleo", sans-serif;
  --header-footer-color: #bc4b51;
  --main-background-color: #5b8e7d;
  --banner-background-color: #8cb369;
  --login-background-color: #ffb9b991;
  --tebanilia-text-color: #d1ffcce3;
  --btn-cart-color: #f4a259;
  --btn-detalle-color: #f4e285;
  --btn-editar-color: #9b4747;
  --img-box-shadow: inset 0 -3em 3em rgba(0, 0, 0, 0.1),
    0 0 0 2px rgb(255, 255, 255), 0.3em 0.3em 1em rgba(0, 0, 0, 0.3);
`;

// Define el estilo del body
const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 290px;
  min-height: 100vh;
  background-color: #5b8e7d;
`;

// Define el estilo del enlace visitado
const Link = styled.a`
  color: black;
`;

// Define el estilo para la lista
const List = styled.li`
  list-style: none;
`;

// Define el estilo del header
const Header = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--header-footer-color);
  height: auto;
`;

// Define el estilo del logo en el header
const HeaderLogo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
`;

// Define el estilo del título en el header
const HeaderTitle = styled.h1`
  font-family: "selima";
  font-size: 2.5rem;
  color: var(--tebanilia-text-color);
  padding: 0;
`;

// Define el estilo de la barra de navegación
const NavBar = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  flex-wrap: wrap;
  background-color: #bc4b51;
`;

// Define el estilo de los enlaces en la barra de navegación
const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  font-size: 1rem;
  font-weight: bold;
`;

// Define el estilo del main
const Main = styled.main`
  background-color: var(--main-background-color);
`;

// Define el estilo del banner
const Banner = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: var(--banner-background-color);
  height: 120px;
  padding-top: 3px;
  padding-bottom: 3px;
`;

// Define el estilo del título de productos
const ProductTitle = styled.h2`
  display: flex;
  justify-content: center;
  padding: 1rem;
`;

// Define el estilo de la imagen de logo
const LogoImage = styled.img`
  width: 3rem;
`;

// Define el estilo del footer
const Footer = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  flex-wrap: wrap;
  background-color: #bc4b51;
`;

// Define el estilo del logo en el footer
const FooterLogo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
`;

// Define el estilo del título en el footer
const FooterTitle = styled.h2`
  font-family: "selima";
  font-size: 1.5rem;
  color: var(--tebanilia-text-color);
  padding: 0;
`;

// Define el estilo del texto de copyright en el footer
const CopyrightText = styled.p`
  font-size: 0.6rem;
`;

// Media query para estilos de escritorio
const DesktopStyles = styled.div`
  @media (min-width: 600px) {
    .header1 {
      flex-direction: row;
    }

    .header1__titulo {
      padding: 1rem;
    }

    .header__logo {
      flex-direction: row;
    }

    .navbar {
      flex-direction: row;
      justify-content: space-between;
    }

    .navBar__links {
      flex-direction: row;
      gap: 2rem;
      align-items: center;
      font-size: 1.2rem;
      font-weight: bold;
    }

    .footer1 {
      flex-direction: row;
    }

    .footer__logo {
      flex-direction: row;
    }

    .footer__copyright {
      font-size: 0.8rem;
      padding-left: 1rem;
    }
  }
`;

// Styled-component para NavBar
const NavBar2 = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f0f0f0; // Color de fondo del NavBar
  padding: 10px;
`;

// Styled-component para Logo
const Logo = styled.img`
  max-width: 200px; // Ajusta el tamaño del logo según tu diseño
  height: auto;
`;

// Styled-component para UserInfo
const UserInfo = styled.div`
  display: flex;
  align-items: center;

  span {
    margin-right: 10px; // Espacio entre el nombre del usuario y el logo
    font-weight: bold; // Puedes ajustar el estilo del nombre del usuario aquí
  }
`;

export {
  GlobalStyle,
  Body,
  Link,
  List,
  Header,
  HeaderLogo,
  HeaderTitle,
  NavBar,
  NavLinks,
  Main,
  Banner,
  ProductTitle,
  LogoImage,
  Footer,
  FooterLogo,
  FooterTitle,
  CopyrightText,
  DesktopStyles,
  NavBar2,
  Logo,
  UserInfo,
};
