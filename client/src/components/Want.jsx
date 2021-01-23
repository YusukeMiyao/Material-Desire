import React from "react";
import styled from "styled-components";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import TemporaryDrawer from "./TemporaryDrawer";

const WantWrap = styled.div`
  width: 100%;
  position: relative;
`;
const WantImages = styled.div`
  display: flex;
  overflow: auto;
  width: 100%;
  img {
    width: 100%;
    height: 120px;
    object-fit: contain;
    margin: auto;
    :nth-child(n + 2) {
      display: none;
    }
  }
  @media screen and (min-width: 768px) {
    img {
      width: calc(100% - 2px);
      height: 140px;
    }
  }
`;
const WantTitle = styled(Typography)`
  @media screen and (min-width: 768px) {
    font-size: 20px;
  }
`;
const Price = styled(Typography)`
  color: #00000099;
  font-size: 14px;
`;
const CardWrap = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 12px;
`;
const CardActionsEx = styled(CardActions)`
  position: absolute;
  bottom: 4px;
  right: 0;
  width: 24px;
  @media screen and (min-width: 768px) {
    bottom: 3px;
  }
`;
const CardContentEx = styled(CardContent)`
  padding: 12px;
`;
class Want extends React.Component {
  render() {
    const {
      id,
      goodsName,
      img,
      price,
      url,
      place,
      other,
      itemIndex,
      listIndex,
      onClickEdit,
      onDelete,
    } = this.props;

    return (
      <WantWrap>
        <WantImages>
          {img.map((el, index) => {
            return (
              <CardMedia
                component="img"
                key={index}
                image={el.url}
                title={el.name}
                alt={el.name}
              />
            );
          })}
        </WantImages>
        <CardContentEx>
          <WantTitle>{goodsName}</WantTitle>
          <Price>
            {price !== "" ? "¥" : "¥ - "}
            {price}
          </Price>
        </CardContentEx>
        <CardActionsEx>
          <TemporaryDrawer
            id={id}
            goodsName={goodsName}
            url={url}
            place={place}
            price={price}
            img={img}
            other={other}
            listIndex={listIndex}
            itemIndex={itemIndex}
            onClickEdit={onClickEdit}
            onDelete={onDelete}
          />
        </CardActionsEx>
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
