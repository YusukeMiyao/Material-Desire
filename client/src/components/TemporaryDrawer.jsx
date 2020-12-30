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
import styled from "styled-components";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { useTheme } from "@material-ui/core/styles";

// import "swiper/swiper-bundle.css";
import "swiper/swiper-bundle.min.css";
// import "swiper/components/navigation/navigation.min.css";
// import "swiper/components/pagination/pagination.min.css";
// import "swiper/components/scrollbar/scrollbar.min.css";
// import "swiper/components/zoom/zoom.min.css";
import { number } from "yup";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const WantTitle = styled(Typography)`
  font-size: 24px;
  text-align: center;
  line-height: 1.4;
  display: block;
  font-weight: Medium;
`;
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
  transform: translate(-90.4167px, -108.5px) scale(1.48222, 1.48222);
  transform-origin: 0px 0px;
`;

const WantList = styled.div`
  display: flex;
`;

const ButtonArea = styled.div`
  text-align: right;
  margin: 16px;
`;

const ItemTable = styled.table`
  display: table;
  width: 100%;
  max-width: 360px;
  margin: 8px auto 0;
  border-collapse: collapse;
  border: 1px solid #f5f5f5;
  border-collapse: separate;
  box-sizing: border-box;
  text-indent: initial;
  border-spacing: 2px;
`;

const ItemTableTbody = styled.tbody`
  display: table-row-group;
  vertical-align: middle;
`;

const ItemTableTr = styled.tr`
  display: table-row;
  vertical-align: inherit;
  border-color: inherit;
`;

const ItemTableTh = styled.th`
  width: 39%;
  text-align: left;
  font-weight: 400;
  background: #fafafa;
  border-collapse: collapse;
  border: 1px solid #f5f5f5;
  padding: 16px 8px;
  display: table-cell;
  vertical-align: inherit;
`;

const ItemTableTd = styled.td`
  width: 61%;
  background: #fff;
  border-collapse: collapse;
  border: 1px solid #f5f5f5;
  padding: 16px 8px;
  display: table-cell;
  vertical-align: inherit;
`;

const EditButton = styled(Button)`
  color: #fff;
  font-size: 14px;
  padding: 4px 16px;
  background-color: #03dac5;
  transition: 0.2s;
  :hover {
    background-color: #96d4ce;
  }
`;

const DeleteButton = styled(Button)`
  color: #03dac5;
  font-size: 14px;
  padding: 4px 16px;
  background-color: #fff;
  transition: 0.2s;
  :hover {
    background-color: #96d4ce;
  }
`;

// const CardFullImg = styled(CardMedia)`
//   height: auto;
//   width: 100%;
// `;

// const CardImg = styled(CardMedia)`
//   transform: translate${(props) => (props.isSlided ? '(-90.4167px, -108.5px)scale(1.48222, 1.48222':)};
//   transform-origin: 0px 0px;
//   hight: ${(props) => (props.set ? "" : "")};
// `;

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
  const [open, setOpen] = React.useState(false);
  // const theme = useTheme();

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

  const ClickEdit = () => {
    const { onClickEdit, editing, listIndex, itemIndex } = props;
    onClickEdit(listIndex, itemIndex, !editing);
  };

  const ClickDelete = () => {
    const { onDelete, listIndex, itemIndex } = props;
    onDelete(listIndex, itemIndex);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Button onClick={toggleDrawer(anchor, false)}>閉じる</Button>

      <Dialog fullScreen open={open} onClose={handleClose}>
        <Button onClick={handleClose}>閉じる</Button>
        {img.map((el, index) => {
          return (
            <Swiper
              spaceBetween={50}
              slidesPerView="auto"
              navigation
              pagination={{
                clickable: true,
                type: "fraction",

                // formatFractionTotal
                // formatFractionCurrent?: (number: number) => number;
              }}
              scrollbar={{ draggable: true }}
              // onSwiper={(swiper) => console.log(swiper)}
              // onSlideChange={() => console.log("slide change")}
              loop={img.length === 1 ? false : true}
              loopedSlides={img.length}
            >
              <SwiperSlide zoom={true}>
                <CardMedia
                  component="img"
                  key={index}
                  image={el[0].url}
                  title={el[0].name}
                  alt={el[0].name}
                />
              </SwiperSlide>
            </Swiper>
          );
        })}
      </Dialog>
      <Swiper
        spaceBetween={50}
        slidesPerView="auto"
        navigation
        pagination={{
          clickable: true,
          type: "fraction",
        }}
        scrollbar={{ draggable: true }}
        loop={img.length === 1 ? false : true}
        loopedSlides={img.length}
      >
        {/* <WantImages> */}
        {img.map((el, index) => {
          return (
            <SwiperSlide>
              <CardActionArea onClick={handleClickOpen}>
                <CardMedia
                  component="img"
                  key={index}
                  image={el[0].url}
                  title={el[0].name}
                  alt={el[0].name}
                />
              </CardActionArea>
            </SwiperSlide>
          );
        })}
        {/* </WantImages> */}
      </Swiper>
      <WantTitle>{goodsName}</WantTitle>
      <WantList>
        <ItemTable>
          <ItemTableTbody>
            <ItemTableTr>
              <ItemTableTh>値段</ItemTableTh>
              <ItemTableTd>
                {price !== "" ? "¥" : "¥ - "}
                {price}
              </ItemTableTd>
            </ItemTableTr>
            <ItemTableTr>
              <ItemTableTh>URL</ItemTableTh>
              <ItemTableTd>
                {url === "" ? "-" : ""}
                <a target="_blank" rel="noopener noreferrer" href={url}>
                  {url}
                </a>
              </ItemTableTd>
            </ItemTableTr>
            <ItemTableTr>
              <ItemTableTh>場所</ItemTableTh>
              <ItemTableTd>
                {place === "" ? "-" : ""}
                {place}
              </ItemTableTd>
            </ItemTableTr>
          </ItemTableTbody>
        </ItemTable>
      </WantList>
      <ButtonArea>
        <DeleteButton startIcon={<DeleteIcon />} onClick={ClickDelete}>
          Delete
        </DeleteButton>
        <EditButton startIcon={<EditIcon />} onClick={ClickEdit}>
          Edit
        </EditButton>
      </ButtonArea>
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
