import React from "react";
import styled from "styled-components";

const HeaderWrap = styled.header`
  font-family: "Roboto";
  display: flex;
  align-items: center;
  width: calc(100% - 16px);
  background-color: white;
  margin: 8px;
  box-shadow: 2px 2px 10px gray;
  position: sticky;
  top: 8px;
  z-index: 1;
  :hover span {
    transform: translateX(calc(100vw - 86px));
  }
`;
const HoverItem = styled.span`
  width: 70px;
  height: 56px;
  clip-path: polygon(20% 0%, 100% 0%, 80% 100%, 0% 100%);
  background: linear-gradient(
    104deg,
    #f2e7fe 0%,
    #f2e7fe 50%,
    #6100ed 50%,
    #6100ed 100%
  );
  transition: all 1s;
`;
const TitleWrap = styled.div`
  position: absolute;
  left: 16px;
`;
const EngTitle = styled.h1`
  color: #000000;
  font-size: 18px;
  text-shadow: 1px 1px 0 #fff, -1px -1px 0 #fff, -1px 1px 0 #fff,
    1px -1px 0 #fff, 0px 1px 0 #fff, 0 -1px 0 #fff, -1px 0 0 #fff, 1px 0 0 #fff;
`;

const SignInButton = styled.button`
  color: #6200ee;
  font-size: 14px;
  padding: 4px 16px;
  border: solid 1px lightgray;
  border-radius: 4px;
  background-color: #fff;
  position: absolute;
  right: 8px;
`;

const LogoutButton = styled(SignInButton)`
  color: #000000;
`;
class Header extends React.Component {
  render() {
    return (
      <HeaderWrap>
        <HoverItem />
        <TitleWrap>
          <EngTitle>Material Desire</EngTitle>
        </TitleWrap>
        <SignInButton>新規登録/ログイン</SignInButton>
        {/* <LogoutButton>ログアウト</LogoutButton> */}
      </HeaderWrap>
    );
  }
}

export default Header;
