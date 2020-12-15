import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
  font-family: "Roboto";
  text-align: center;
  margin-bottom: 48px;
`;
const Content = styled.div`
  width: auto;
  margin: auto;
  margin-bottom: 48px;
`;
const Message = styled.p`
  font-size: 48px;
  color: #6200ee;
  line-height: 1.4;
  display: inline-block;
  text-align: left;
`;

const Image = styled.img`
  width: 100%;
  max-width: 375px;
  height: 315px;
`;

class Fv extends React.Component {
  render() {
    return (
      <Wrap>
        <Content>
          <Message>
            Make <br />
            The <br />
            Best <br />
            Choice
          </Message>
        </Content>
        <Image />
      </Wrap>
    );
  }
}

export default Fv;
