import React from "react";
// import styled from 'styled-components';

// const Container = styled.div`
//   display:flex;
// `

class Want extends React.Component {
  render() {
    const { goodsName, url, img, price, place } = this.props;

    return (
      <div>
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
        <button onClick={this.ClickEdit}>編集</button>
        <button onClick={this.ClickDelete}>削除</button>
      </div>
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
