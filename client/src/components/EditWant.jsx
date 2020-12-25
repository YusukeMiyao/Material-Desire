import React from "react";
import Icon from "../assets/images/Icon.png";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";

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
        margin: 8px 0 0 0;
      }
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
  text-align: right;
  margin-bottom: 20px;
`;
const CancelButton = styled(Fab)`
  position: fixed;
  bottom: 8px;
  border: solid 1px #0000001f;
  color: #03dac5;
  font-weight: bold;
  background-color: #fff;
  transform: 0.2s;
  :hover {
    background-color: #03dac5;
    border: #03dac5;
    svg {
      color: #fff;
    }
  }
`;
const AddButton = styled(Button)`
  background-color: #03dac5;
  color: #ffffff;
  :hover {
    background-color: #96d4ce;
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
`;
const CardItem = styled(Card)`
  width: calc(100% / 3 - 5px);
  border-radius: 10px;
  height: auto;
  transition: all 0.3s;
  margin-bottom: 8px;
  :nth-of-type(3n-1) {
    margin: 0 4px 8px;
  }
`;
const DeleteButton = styled.p`
  text-align: center;
  color: #284ff0de;
  font-size: 16px;
  margin: 10px;
`;

class EditWant extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        goodsName: props.goodsName,
        url: props.url,
        place: props.place,
        price: props.price,
        img: props.img,
      },
      priceError: false,
      submitError: false,
      urlError: false,
      selectedImages: [],
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
                {this.state.data.img.map((el, index) => {
                  return (
                    <CardItem>
                      <CardMedia
                        component="img"
                        key={index}
                        image={el.data}
                        title={el.name}
                      />
                      <DeleteButton>削除</DeleteButton>
                    </CardItem>
                  );
                })}
              </CardWrap>
              <input
                type="file"
                name="img"
                accept="image/*"
                multiple
                onChange={this.handleChange}
                onClick={(e) => {
                  e.target.value = null;
                }}
              />
              {/* <button onClick={this.deleteImages}>選択画像削除</button>
              <button name="delete" onClick={this.handleChange}>
                画像リセット
              </button> */}
            </ImageArea>
            <InputArea>
              <label>
                <p>欲しい物の名前</p>
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
                  value={this.state.data.place}
                  onChange={this.handleChange}
                />
              </label>
              {this.state.submitError ? (
                <ErrorMessage>
                  欲しいもの、URL、画像のどれか一つは入力して下さい
                </ErrorMessage>
              ) : (
                ""
              )}
            </InputArea>
            <ButtonArea>
              <AddButton onClick={this.handleSubmit} onBlur={this.resetErrors}>
                <AddIcon />
                登録
              </AddButton>
            </ButtonArea>
            <CancelButton size="small" onClick={this.clickCancel}>
              <ArrowBackIcon />
            </CancelButton>
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
        break;
      case "place":
        data.place = e.target.value;
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
        break;
      case "img":
        let files = e.target.files;
        if (files.length > 0) {
          if (this.state.data.img[0].name === "icon") {
            this.state.data.img.splice(0, 1);
          }
          for (const file of files) {
            this.state.data.img.splice(1, 0, {
              name: file.name,
              data: URL.createObjectURL(file),
            });
          }
          break;
        } else {
          data.img = [{ name: "", data: "" }];
        }
        break;
      case "delete":
        data.img = [{ name: "", data: "" }];
        break;
      default:
        break;
    }
    // 状態を更新
    this.setState({
      data: data,
    });
  };

  clickCancel = () => {
    const { onCancel, listIndex, itemIndex } = this.props;
    onCancel(listIndex, itemIndex, false);
  };

  selectImages = (e) => {
    // TODO
    console.log(e);
  };

  deleteImages = (e) => {
    // TODO
    console.log(e);
  };

  resetImages = () => {
    this.state.data.img = [{ name: "icon", data: Icon }];
    this.setState({ data: this.state.data });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { listIndex, itemIndex, onSubmit } = this.props;
    if (
      this.state.data.goodsName === "" &&
      this.state.data.url === "" &&
      this.state.data.img[0].name === "icon"
    ) {
      this.setState({ submitError: true });
      return;
    } else if (this.state.urlError) {
      return;
    } else {
      onSubmit(listIndex, itemIndex, this.state.data);
    }
  };
}

export default EditWant;
