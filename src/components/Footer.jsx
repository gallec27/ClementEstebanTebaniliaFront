import React from 'react';
import styled from 'styled-components';
import logo from './assets/logo_st.png';

const FooterContainer = styled.footer`
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

const Title = styled.h3`
  font-family: "selima";
  font-size: 1.5rem;
  color: var(--tebanilia-text-color);
  padding: 0;
`;

const Copyright = styled.p`
  font-size: 0.6rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <LogoContainer>
        <a href="/">
          <Logo src={logo} alt="logo_tebanilia" />
        </a>
        <Title>tebanilia</Title>
      </LogoContainer>
      <Copyright>Copyrigth 2023</Copyright>
    </FooterContainer>
  );
};

export default Footer;
