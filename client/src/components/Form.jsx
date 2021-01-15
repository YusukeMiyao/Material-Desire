import React from "react";
// import Icon from "../assets/images/Icon.png";
import styled from "styled-components";
import firebase from "../utils/firebase";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

import ImageIcon from "@material-ui/icons/Image";
import { CardActions } from "@material-ui/core";
import { array } from "yup";

const ModalBg = styled.div`
  position: fixed;
  background-color: #ffffff;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow-y: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;
const ModalContent = styled.div`
  width: 100%;
  max-width: 600px;
  height: auto;
  position: absolute;
  top: 0;
`;
const ModalItem = styled.form`
  margin: 20px 8px;
  width: calc(100% - 16px);
  position: relative;
`;
const ImageArea = styled.div`
  > p {
    font-size: 14px;
    color: #00000099;
  }
  img {
    width: 100%;
    height: 128px;
    object-fit: cover;
    // 画像の位置を把握するため
    border: solid 1px #0000000a;
    // 画像の位置を把握するため
  }
`;
const InputArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 16px;
  > label {
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 16px;
    ::before {
      content: "";
      border-top: solid 1px #0000001f;
      width: 100vw;
      margin: 0 -8px;
    }
    div {
      width: 100%;
      p {
        margin: 0;
        position: absolute;
        bottom: -8px;
      }
    }
    > div {
      position: relative;
      padding-bottom: 14px;
    }
    > p {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin: 10px 1em 10px 0;
      font-size: 14px;
      color: #00000099;
    }
    input {
      width: 100%;
      :focus {
        outline: none;
      }
    }
  }
`;
const ButtonArea = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
`;
const CancelButton = styled(Button)`
  border: solid 1px #0000001f;
  background-color: #fff;
  color: #96d4ce;
  width: 100%;
  display: flex;
  justify-content: center;
  :hover {
    background-color: #6200ee0a;
  }
  @media screen and (min-width: 768px) {
    justify-content: space-between;
  }
`;
const AddButton = styled(Button)`
  background-color: #03dac5;
  color: #ffffff;
  width: 100%;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
  :hover {
    background-color: #96d4ce;
  }
  @media screen and (min-width: 768px) {
    justify-content: space-between;
  }
`;
const ErrorMessage = styled.p`
  margin: 0;
  font-size: 14px;
  color: red;
`;
const CardWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  position: relative;
`;
const CardItem = styled(Card)`
  width: calc(100% / 3 - 5px);
  border-radius: 10px;
  height: auto;
  transition: all 0.3s;
  margin-bottom: 8px;
  text-align: center;
  :nth-of-type(3n-1) {
    margin: 0 4px 8px;
  }
`;
const DeleteButton = styled(Button)`
  text-align: center;
  // color: #284ff0de;
  font-size: 16px;
  margin: 10px;
`;

const ImgLabel = styled(InputLabel)`
  padding: 15px;
  max-width: 120px;
  height: 20px;
  text-align: center;
  display: block;
  background-color: #f1f1f1;
  color: #73a9ff;
`;

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        goodsName: "",
        url: "",
        price: "",
        img: [
          // {
          //   // // name: "icon",
          //   // // data: Icon,
          //   // name: "",
          //   // data: '',
          // },
        ],
        imgSub: [],
        place: "",
        other: "",
      },
      count: 0,
      priceError: false,
      submitError: false,
      urlError: false,
      imgLimited: false,
    };
  }

  render() {
    return (
      <ModalBg>
        <ModalContent>
          <ModalItem>
            <ImageArea>
              <p>欲しい物の画像</p>
              <CardWrap>
                {console.log(this.state.data.img)}
                {this.state.data.img.map((el, index) => {
                  return (
                    <CardItem>
                      <CardMedia
                        component="img"
                        key={index}
                        image={el.url}
                        title={el.name}
                      />
                      <DeleteButton
                        color="primary"
                        name="delete"
                        onClick={() => this.selectDelete(index)}
                      >
                        削除
                      </DeleteButton>
                    </CardItem>
                  );
                })}
                {this.state.imgLimited ? (
                  ""
                ) : (
                  <ImgLabel htmlFor="img-input">
                    <CardMedia>
                      <ImageIcon />
                      <input
                        id="img-input"
                        hidden
                        type="file"
                        name="img"
                        accept="image/*"
                        multiple
                        onChange={this.selectImages}
                        onClick={(e) => {
                          e.target.value = null;
                        }}
                      />
                    </CardMedia>
                  </ImgLabel>
                )}
              </CardWrap>
              {/* <button name="delete" onClick={this.selectImages}>
                画像リセット
              </button> */}
            </ImageArea>
            <InputArea>
              <label>
                <p>
                  欲しい物の名前<a>必須</a>
                </p>

                <TextField
                  variant="outlined"
                  size="small"
                  type="text"
                  name="goodsName"
                  placeholder="40文字まで"
                  value={this.state.data.goodsName}
                  onChange={this.handleChange}
                />
              </label>
              <label>
                <p>欲しい物の金額</p>
                {/* {this.state.data.price !== "" ? "¥" : null} */}
                {this.state.priceError ? (
                  <TextField
                    error
                    variant="outlined"
                    size="small"
                    type="tel"
                    name="price"
                    helperText="半角数字のみ入力して下さい"
                    value={this.state.data.price}
                    onChange={this.handleChange}
                    placeholder="半角数字のみ"
                    onBlur={this.resetErrors}
                  />
                ) : (
                  <TextField
                    variant="outlined"
                    size="small"
                    type="tel"
                    name="price"
                    value={this.state.data.price}
                    onChange={this.handleChange}
                    placeholder="半角数字のみ"
                    onBlur={this.resetErrors}
                  />
                )}
              </label>
              <label>
                <p>URL</p>
                {this.state.urlError ? (
                  <TextField
                    error
                    variant="outlined"
                    size="small"
                    type="url"
                    name="url"
                    helperText="URLが正しくありません"
                    placeholder="40文字まで"
                    value={this.state.data.url}
                    onChange={this.handleChange}
                    onBlur={this.checkUrlError}
                  />
                ) : (
                  <TextField
                    variant="outlined"
                    size="small"
                    type="url"
                    name="url"
                    placeholder="40文字まで"
                    value={this.state.data.url}
                    onChange={this.handleChange}
                    onBlur={this.checkUrlError}
                  />
                )}
              </label>
              <label>
                <p>場所</p>
                <TextField
                  variant="outlined"
                  size="small"
                  type="text"
                  name="place"
                  placeholder="40文字まで"
                  value={this.state.data.place}
                  onChange={this.handleChange}
                />
              </label>
              <label>
                <p>その他</p>
                <TextField
                  variant="outlined"
                  size="small"
                  type="text"
                  name="other"
                  multiline
                  placeholder="1000文字まで"
                  value={this.state.data.other}
                  onChange={this.handleChange}
                />
              </label>
              {this.state.submitError ? (
                <ErrorMessage>欲しい物の名前は必須です</ErrorMessage>
              ) : (
                ""
              )}
            </InputArea>
            <ButtonArea>
              <AddButton onClick={this.handleSubmit}>
                <AddIcon />
                登録
              </AddButton>
              <CancelButton onClick={this.clickCancel}>
                <ArrowBackIcon />
                キャンセル
              </CancelButton>
            </ButtonArea>
          </ModalItem>
        </ModalContent>
      </ModalBg>
    );
  }

  resetErrors = () => {
    this.setState({
      priceError: false,
      submitError: false,
    });
  };

  checkUrlError = () => {
    if (
      this.state.data.url.match(/^(http|https):\/\/[^ "]+$/) ||
      this.state.data.url <= 0
    ) {
      this.setState({ urlError: false });
      return;
    } else {
      this.setState({ urlError: true });
      return;
    }
  };

  handleChange = (e) => {
    // ネストされたオブジェクトのdataまでアクセスしておく
    let data = this.state.data;

    // eventが発火したname属性名ごとに値を処理
    switch (e.target.name) {
      case "goodsName":
        data.goodsName = e.target.value;
        if (data.goodsName.length > 1000) {
          return;
        }
        break;
      case "url":
        data.url = e.target.value;

        if (data.url.length >= 7) {
          if (this.state.data.url.match(/^(http|https):\/\/[^ "]+$/)) {
            this.checkUrlError();
          } else {
            this.setState({ urlError: true });
            return;
          }
        } else if (data.url.length <= 0) {
          this.resetErrors();
        }
        if (data.url.length > 1000) {
          return;
        }
        break;
      case "place":
        data.place = e.target.value;
        if (data.place.length > 1000) {
          return;
        }
        break;
      case "price":
        let price = e.target.value.replace(/,/g, "");
        if (price.match(/\.|\-/)) {
          return;
        }
        if (Number(price) || price === "") {
          price = Number(price).toLocaleString();
          if (price === "0") {
            price = "";
          }
          this.resetErrors();
          data.price = price;
        } else {
          this.setState({ priceError: true });
        }

        if (data.price.length > 1000) {
          return;
        }
        break;
      case "other":
        let other = e.target.value;
        if (data.price.length > 1000) {
          return;
        }
        data.other = other;
      // case "delete":
      //   e.preventDefault();
      //   data.img = [{ name: "icon", data: Icon }];
      //   e.target.value = null;
      //   break;
      default:
        break;
    }
    // 状態を更新
    this.setState({
      data: data,
    });
  };

  selectImages = async (e) => {
    const files = e.target.files;
    console.log(files);
    let ArrayFiles = Array.from(files);
    console.log(ArrayFiles);
    let ableNum = 5 - this.state.data.img.length;
    ArrayFiles.splice(ableNum);
    let newFiles = [...ArrayFiles];
    let prevImg = [...(this.state.data.img || [])];

    console.log(newFiles, prevImg);
    let count = this.state.count;
    count++;
    // var user = firebase.auth().currentUser;
    // const uid = user.uid;
    // firebase.database().ref("/users/" + uid);
    if (files.length > 0) {
      // 初回追加時に初期画像を削除
      // if (count === 1) {
      //   this.state.data.img.splice(0, 1);
      // }
      for (const file of newFiles) {
        console.log(file);
        prevImg.splice(0, 0, {
          name: file.name,
          url: URL.createObjectURL(file),
        });
      }
      // if (prevImg.length > 5) {
      //   prevImg.splice(5);
      // }
      // if (newFiles.length > 5) {
      //   newFiles.splice(5);
      // }
      if (prevImg.length > 4) {
        this.state.imgLimited = true;
      }
      this.state.data.imgSub = [...(this.state.data.imgSub || []), ...newFiles];
      console.log(this.state.data.imgSub);
      this.state.data.img = prevImg;
      console.log(this.state.data, prevImg);
    } else {
      return;
      // this.state.data.img = [
      //   // { name: "icon", data: Icon }
      // ];
      // this.state.data.imgSub = "";
    }
    this.setState({
      data: this.state.data,
      count: count,
      imgLimited: this.state.imgLimited,
    });
  };

  selectDelete = (index) => {
    this.state.data.img.splice(index, 1);
    let newFiles = Array.from(this.state.data.imgSub);
    newFiles.splice(index, 1);
    this.state.data.imgSub = newFiles;
    if (this.state.data.imgSub.length > 4) {
      this.state.imgLimited = true;
    } else {
      this.state.imgLimited = false;
    }
    this.setState({
      data: this.state.data,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const data = this.state.data;
    if (data.goodsName === "") {
      this.setState({ submitError: true });
      return;
    } else if (this.state.urlError) {
      return;
    } else {
      this.setState({ submitError: false });
      this.props.onSubmit(data);
      this.setState({
        data: {
          goodsName: "",
          url: "",
          place: "",
          price: "",
          img: [
            // { name: "icon", data: Icon }
          ],
          imgSub: "",
          imgLimited: false,
        },
        count: 0,
      });
    }
  };
  clickCancel = () => {
    const { onCancel } = this.props;
    onCancel();
  };
}

export default Form;
