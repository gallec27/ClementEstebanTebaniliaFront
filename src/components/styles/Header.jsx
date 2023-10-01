import React from 'react';
import styled from 'styled-components';
import logo from './assets/logo_st.png';

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--header-footer-color);
  height: auto;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
`;

const Logo = styled.img`
  width: 3rem;
`;

const Title = styled.h1`
  font-family: "selima";
  font-size: 2.5rem;
  color: var(--tebanilia-text-color);
  padding: 0;
`;

const NavBar = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
`;

const NavLinks = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  font-size: 1rem;
  font-weight: bold;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <LogoContainer>
        <a href="/">
          <Logo src={logo} alt="logo_tebanilia" />
        </a>
        <Title>tebanilia</Title>
      </LogoContainer>
      <NavBar>
        <NavLinks>
          <li><a href="/">Inicio</a></li>
        </NavLinks>
      </NavBar>
    </HeaderContainer>
  );
};

export default Header;
