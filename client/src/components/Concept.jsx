import React from "react";
import styled from "styled-components";
import OnlineShopping from "../assets/images/online_shopping.svg";

const Wrap = styled.div``;
const Content = styled.div`
  margin-bottom: 32px;
  text-align: center;
  box-shadow: 0px 5px 5px -5px grey;
`;
const Message = styled.p`
  font-weight: bold;
  font-size: 20px;
`;
const Desc = styled.p`
  font-size: 16px;
  padding-bottom: 40px;
`;
const Image = styled.img`
  width: 100%;
  max-width: 375px;
  height: 480px;
  margin-bottom: 32px;
`;

class Concept extends React.Component {
  render() {
    return (
      <Wrap>
        <Content>
          <Message>
            欲しいものがありすぎて <br />
            困ってませんか？
          </Message>
          <Desc>
            Material Desireは欲しい物リストです。
            <br /> あなたの物欲に <br />
            優先順位がつくでしょう。 <br />
            本当にそれは欲しいものなのかを、
            <br />
            他の欲しいものと比べてみてください。
          </Desc>
        </Content>
        <Content>
          <Desc>
            あなたが追加した欲しいものは
            <br />
            ドラッグ&ドロップで移動することができます。
            <br />
            どれが今欲しいものなのかを悩みましょう。 <br />
            理想の自分を想像して。
            <br />
            その時間が一番楽しいはずです。
          </Desc>
          <Image src={OnlineShopping} />
        </Content>
      </Wrap>
    );
  }
}

export default Concept;
