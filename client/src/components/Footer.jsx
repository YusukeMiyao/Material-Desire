import React from "react";
import styled from "styled-components";

const FooterWrap = styled.footer`
  width: 100%;
  height: 56px;
  background-color: #666666;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Button = styled.button`
  color: #ffffff;
  background-color: #666666;
  border: solid 1px #000000;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 8px;
  outline: none;
  cursor: pointer;
`;
class Footer extends React.Component {
  render() {
    return (
      <FooterWrap>
        <Button onClick={this.scrollToTop}>↑ ページ上部へ戻る</Button>
      </FooterWrap>
    );
  }
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
}

export default Footer;
