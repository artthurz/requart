import React from 'react';
import PropTypes from 'prop-types';
import logo from "../../../assets/images/logo.svg";

import { Wrapper, Content, Image, Footer } from './styles';

export default function AuthLayout({ children }) {
  return (
    <Wrapper>
      <Image src={logo} alt="Requart" />
      <Content>{children}</Content>
      <Footer>Versão 1.0 - 28 de Março de 2021</Footer>
    </Wrapper>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
