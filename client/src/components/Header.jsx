import React from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import firebase from "../utils/firebase";

const HeaderWrap = styled.header`
  font-family: "Roboto";
  display: flex;
  align-items: center;
  width: calc(100% - 16px);
  background-color: white;
  margin: 8px;
  box-shadow: 2px 2px 10px grey;
  position: sticky;
  top: 8px;
  z-index: 1;
  :hover > span {
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

const SignInButton = styled(Button)`
  color: #fff;
  font-size: 14px;
  padding: 4px 16px;
  background-color: #03dac5;
  position: absolute;
  right: 8px;
  transition: 0.2s;
  :hover {
    background-color: #96d4ce;
  }
`;

const LogoutButton = styled(SignInButton)`
  color: #000000;
  background-color: #ffffff;
  border: solid 1px #0000001f;
  :hover {
    background-color: #e6e6e6;
  }
`;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
    };
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          signedIn: true,
        });
      } else {
        this.setState({
          signedIn: false,
        });
      }
    });
  }
  handleLogout = () => {
    firebase.auth().signOut();
  };
  render() {
    return (
      <HeaderWrap>
        <HoverItem />
        <TitleWrap>
          <EngTitle>Material Desire</EngTitle>
        </TitleWrap>
        {this.state.signedIn === false ? (
          <SignInButton onClick={this.scrollToTop}>
            新規登録/ログイン
          </SignInButton>
        ) : (
          <LogoutButton onClick={this.handleLogout}>ログアウト</LogoutButton>
        )}
      </HeaderWrap>
    );
  }
  scrollToTop() {
    const elm = document.documentElement;
    // scrollHeight ページの高さ clientHeight ブラウザの高さ
    const bottom = elm.scrollHeight - elm.clientHeight;
    // ログイン・新規登録がある最下部へ移動
    window.scrollTo({
      top: bottom,
      behavior: "smooth",
    });
  }
}

export default Header;
