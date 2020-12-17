import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import Drawer from "@material-ui/core/Drawer";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import styled from "styled-components";

const WantTitle = styled(Typography)``;
const Price = styled(Typography)`
  color: #00000099;
  font-size: 14px;
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

const WantList = styled.div`
  display: flex;
`;

const ButtonArea = styled.div`
  text-align: right;
`;
const DeleteButton = styled.button`
  margin-right: 10px;
`;
const EditButton = styled.button``;

const useStyles = makeStyles({
  list: {
    width: 250,
    overflow: "auto",
  },
  fullList: {
    width: "auto",
    overflow: "auto",
  },
});

export default function TemporaryDrawer(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    bottom: false,
  });
  const { goodsName, url, img, price, place } = props;

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
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

      <WantTitle>{goodsName}</WantTitle>
      <WantList>
        <tr>
          <th>値段</th>
          <td>
            <Price>
              {price !== "" ? "¥" : "¥ - "}
              {price}
            </Price>
          </td>
        </tr>
        <tr>
          <WantTitle>
            <th>URL</th>
            <td>
              {url === "" ? "-" : ""}
              <a target="_blank" rel="noopener noreferrer" href={url}>
                {url}
              </a>
            </td>
          </WantTitle>
        </tr>
        <tr>
          <WantTitle>
            <th>場所</th>
            <td>
              {place === "" ? "-" : ""}
              {place}
            </td>
          </WantTitle>
        </tr>
      </WantList>
      {/* <DeleteButton onClick={this.ClickDelete}>Delete</DeleteButton> */}
      {/* <EditButton onClick={this.ClickEdit}>Edit</EditButton> */}
    </div>
  );

  return (
    <div>
      {["bottom"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
