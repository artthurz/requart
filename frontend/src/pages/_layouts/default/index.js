import React from "react";
import PropTypes from "prop-types";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { Wrapper, ChildrenWrapper } from "./styles";

export default function DefaultLayout({ children }) {
  return (
    <Wrapper>
      <Header />
      <ChildrenWrapper>{children}</ChildrenWrapper>
      <Footer />
    </Wrapper>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
