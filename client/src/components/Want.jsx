import React from "react";
import styled from "styled-components";

const WantWrap = styled.div`
  width: 100%;
  padding: 20px;
`;

const WantImages = styled.div`
  display: flex;
  overflow: auto;
  img {
    width: calc(100% - 2px);
    height: 180px;
    object-fit: cover;
    // 画像の位置を把握するため
    border: solid 1px black;
    // 画像の位置を把握するため
    :nth-child(n + 2) {
      margin-left: 20px;
    }
  }
`;
const WantTitle = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  p {
    width: 4em;
    display: flex;
    justify-content: space-between;
    margin: 0;
  }
`;
const ButtonArea = styled.div`
  text-align: right;
`;
const DeleteButton = styled.button`
  margin-right: 10px;
`;
const EditButton = styled.button``;

class Want extends React.Component {
  render() {
    const { goodsName, url, img, price, place } = this.props;
    return (
      <WantWrap>
        <WantImages>
          {img.map((el, index) => {
            return (
              <img
                key={index}
                src={el.data}
                alt={el.name}
                height={100}
                width={100}
              />
            );
          })}
          {/* <img src={img} alt="" height={100} width={100} /> */}
        </WantImages>
        <WantTitle>
          <p>
            <span>タ</span>
            <span>イ</span>
            <span>ト</span>
            <span>ル</span>
          </p>
          <span>：{goodsName}</span>
        </WantTitle>
        <WantTitle>
          <p>
            <span>U</span>
            <span>R</span>
            <span>L</span>
          </p>
          <span>
            ：
            <a target="_blank" rel="noopener noreferrer" href={url}>
              {url}
            </a>
          </span>
        </WantTitle>
        <WantTitle>
          <p>
            <span>場</span>
            <span>所</span>
          </p>
          <span>：{place}</span>
        </WantTitle>
        <WantTitle>
          <p>
            <span>値</span>
            <span>段</span>
          </p>
          <span>
            ：{price !== "" ? "¥" : null}
            {price}
          </span>
        </WantTitle>
        <ButtonArea>
          <DeleteButton onClick={this.ClickDelete}>Delete</DeleteButton>
          <EditButton onClick={this.ClickEdit}>Edit</EditButton>
        </ButtonArea>
      </WantWrap>
    );
  }

  ClickEdit = () => {
    const { onClickEdit, editing, listIndex, itemIndex } = this.props;
    onClickEdit(listIndex, itemIndex, !editing);
  };

  ClickDelete = () => {
    const { onDelete, listIndex, itemIndex } = this.props;
    onDelete(listIndex, itemIndex);
  };
}

export default Want;
