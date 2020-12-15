import React from "react";
import styled from "styled-components";

const FooterWrap = styled.footer`
  width: 100%;
  height: 56px;
  background-color: #ebebeb;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Button = styled.button`
  color: #ffffff;
  border: solid 1px lightgray;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 8px;
`;
class Footer extends React.Component {
  render() {
    return (
      <FooterWrap>
        <Button>↑ページ上部へ戻る</Button>
      </FooterWrap>
    );
  }
}

export default Footer;
