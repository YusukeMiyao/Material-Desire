import React from "react";
import styled from "styled-components";

const WantWrap = styled.div`
  width: 100%;
  /* padding: 20px; */
`;

const WantImages = styled.div`
  display: flex;
  overflow: auto;
  img {
    width: calc(100% - 2px);
    height: 180px;
    object-fit: cover;
    // 画像の位置を把握するため
    /* border: solid 1px black; */
    // 画像の位置を把握するため
    :nth-child(n + 2) {
      margin-left: 20px;
    }
  }
`;
const WantTitle = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 20px;
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
const Main = styled.main``;
class Detail extends React.Component {
  render() {
    const { goodsName, url, img, price, place } = this.props;
    return (
      <Main>
        <WantWrap>
          <WantImages>
            {img.map((el, index) => {
              return (
                <img
                  key={index}
                  src={el.url}
                  alt={el.name}
                  height={518}
                  width={375}
                />
              );
            })}
          </WantImages>
          <WantTitle>
            <span>：{goodsName}</span>
            <p>{goodsName}</p>
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
            <p>
              {price !== "" ? "¥" : "¥ - "}
              {price}
            </p>
          </WantTitle>
          <ButtonArea>
            <DeleteButton onClick={this.ClickDelete}>Delete</DeleteButton>
            <EditButton onClick={this.ClickEdit}>Edit</EditButton>
          </ButtonArea>
        </WantWrap>
      </Main>
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

export default Detail;
