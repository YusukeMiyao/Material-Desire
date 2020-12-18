import React from "react";
import styled from "styled-components";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import TemporaryDrawer from "./TemporaryDrawer";

const WantWrap = styled.div`
  width: 100%;
  /* padding: 20px; */
`;

const WantImages = styled.div`
  /* display: flex;
  overflow: auto;
  img {
    width: calc(100% - 2px);
    height: 180px;
    object-fit: cover; */
  // 画像の位置を把握するため
  /* border: solid 1px black; */
  // 画像の位置を把握するため
  /* :nth-child(n + 2) {
      margin-left: 20px;
    }
  } */
`;
const WantTitle = styled(Typography)``;
const Price = styled(Typography)`
  color: #00000099;
  font-size: 14px;
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
    const {
      id,
      goodsName,
      img,
      price,
      url,
      place,
      itemIndex,
      listIndex,
      onClickEdit,
      onDelete,
    } = this.props;
    return (
      <div>
        <CardActionArea>
          <WantImages>
            {img.map((el, index) => {
              return (
                <CardMedia
                  component="img"
                  key={index}
                  image={el.data}
                  title={el.name}
                />
              );
            })}
          </WantImages>
          <CardContent>
            <WantTitle>{goodsName}</WantTitle>
            <Price>
              {price !== "" ? "¥" : "¥ - "}
              {price}
            </Price>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <TemporaryDrawer
            id={id}
            goodsName={goodsName}
            url={url}
            place={place}
            price={price}
            img={img}
            listIndex={listIndex}
            itemIndex={itemIndex}
            onClickEdit={onClickEdit}
            onDelete={onDelete}
          />
        </CardActions>
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
