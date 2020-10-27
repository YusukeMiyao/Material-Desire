import React from "react";
import styled from "styled-components";

const HeaderWrap = styled.header`
  display: flex;
  position: relative;
  width: 100%;
  background-color: black;
  justify-content: center;
  position: sticky;
  top: 0;
  z-index: 10;
  :hover span {
    transform: translate(855%, 0);
  }
`;
const HoverItem = styled.span`
  width: 150px;
  height: 86px;
  transition: all 1s;
  position: absolute;
  left: 0;
  top: 0;
  clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);
  background: linear-gradient(
    113deg,
    #707070 0%,
    #707070 50%,
    #34d0a6 50%,
    #34d0a6 100%
  );
`;
const TitleWrap = styled.div`
  text-align: center;
  font-family: "Baskerville";
`;
const EngTitle = styled.h1`
  color: #ffffff;
  font-size: 24px;
  font-weight: normal;
  margin: 12px auto 6px;
  padding: 0 6px;
  border: solid 2px #ffffff;
  border-right: none;
  border-left: none;
  span {
    color: #34d0a6;
    -webkit-text-stroke: 1px #fff;
  }
`;

const SubTitle = styled.p`
  color: #ffffff;
  margin: 0 auto 12px;
`;

class Header extends React.Component {
  render() {
    return (
      <HeaderWrap>
        <HoverItem />
        <TitleWrap>
          <EngTitle>
            Material <span>D</span>esire
          </EngTitle>
          <SubTitle>ー悩むを楽しむー</SubTitle>
        </TitleWrap>
      </HeaderWrap>
    );
  }
}

export default Header;
