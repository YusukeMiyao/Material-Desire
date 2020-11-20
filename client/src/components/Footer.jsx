import React from "react";
import styled from "styled-components";

const FooterWrap = styled.footer`
  width: 100%;
  height: 90px;
  background-color: #000000;
`;

class Footer extends React.Component {
  render() {
    return <FooterWrap></FooterWrap>;
  }
}

export default Footer;
