import React from "react";
import styled from "styled-components";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";

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
  font-size: 14px;
  outline: none;
  cursor: pointer;
  align-items: center;
  display: flex;
`;
class Footer extends React.Component {
  render() {
    return (
      <FooterWrap>
        <Button onClick={this.scrollToTop}>
          <ArrowUpwardIcon fontSize="small" /> ページ上部へ戻る
        </Button>
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
