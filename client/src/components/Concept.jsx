import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
  background: linear-gradient(#ffffff, #c0c0c0);
  font-family: "Baskerville";
  padding: 24px 90px;
`;
const Content = styled.div`
  border: solid 1px #707070;
`;
const Message = styled.p`
  margin: 10px 30px;
  font-weight: bold;
`;

class Concept extends React.Component {
  render() {
    return (
      <Wrap>
        <Content>
          <Message>
            Material
            Desireはあなたの物欲に優先順位をつけるアプリです。本当にそれは欲しいものなのかを、他の欲しいものと比べてみてください。
          </Message>
          <Message>
            あなたが追加した欲しいものは掴んで移動することができます。
          </Message>
          <Message>
            どれが今欲しいものなのか悩みましょう。理想の自分を想像して。その時間が一番楽しいはずです。
          </Message>
        </Content>
      </Wrap>
    );
  }
}

export default Concept;
