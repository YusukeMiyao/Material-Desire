import React from "react";
import styled from "styled-components";

const Wrap = styled.div`
  width: 100%;
  padding: 20px;
`;

const WantImage = styled.div`
  display: flex;
  overflow: auto;
  img {
    width: 100%;
    height: 160px;
    border: solid 1px black;
    /* margin-right: 20px; */
  }
`;

class Want extends React.Component {
  render() {
    const { goodsName, url, img, price, place } = this.props;

    return (
      <Wrap>
        <WantImage>
          <img src={img} alt="" height={100} width={100} />
          {/* <img src={img} alt="" height={100} width={100} /> */}
        </WantImage>
        <p>欲しいもの：{goodsName}</p>
        URL：
        <a target="_blank" rel="noopener noreferrer" href={url}>
          {url}
        </a>
        <p>場所：{place}</p>
        <p>
          値段：{price !== "" ? "¥" : null}
          {price}
        </p>
        <button onClick={this.ClickEdit}>編集</button>
        <button onClick={this.ClickDelete}>削除</button>
      </Wrap>
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
