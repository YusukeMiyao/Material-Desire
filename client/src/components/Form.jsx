import React from "react";
import Icon from "../assets/images/Icon.png";
import styled from "styled-components";

const ModalBg = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;
const ModalContent = styled.div`
  background-color: #ffffff;
  width: 30%;
  height: 70%;
  min-height: 500px;
  border: solid 5px #000000;
  border-radius: 40px;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalItem = styled.div`
  margin: 20px auto;
  width: 70%;
  img {
    width: 100%;
    height: auto;
    max-height: 180px;
    object-fit: cover;
    // 画像の位置を把握するため
    border: solid 1px;
    // 画像の位置を把握するため
  }
`;
const InputArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
  label {
    width: 100%;
    display: flex;
    align-items: center;
    p {
      width: 8em;
      display: flex;
      justify-content: space-between;
      margin: 10px 1em 10px 0;
    }
    input {
      margin-left: 1em;
      border: none;
      border-bottom: solid 1px #000000;
      width: 100%;
      :focus {
        outline: none;
      }
    }
  }
`;
const ButtonArea = styled.div`
  text-align: right;
  height: 30px;
`;

const CommonButton = styled.button`
  min-width: 50px;
  width: auto;
  border: solid 1px #707070;
  cursor: pointer;
  font-weight: bold;
  padding: 5px;
  p {
    transition: all 0.3s;
    margin: 0;
  }
`;
const CancelButton = styled(CommonButton)`
  margin-right: 10px;
  color: #34d0a6;
  background-color: #ffffff;
  :hover p {
    margin: 5px;
    border-bottom: solid 1px #34d0a6;
  }
`;
const AddButton = styled(CommonButton)`
  background-color: #34d0a6;
  color: #ffffff;
  :hover p {
    margin: 5px 8px;
    border-bottom: solid 1px #ffffff;
  }
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
          {
            name: "icon",
            data: Icon,
          },
        ],
        place: "",
      },
      count: 0,
      priceError: false,
      submitError: false,
      urlError: false,
    };
  }

  render() {
    return (
      <ModalBg onClick={this.clickCancel}>
        <ModalContent onClick={this.stopPropagation}>
          <ModalItem>
            {this.state.data.img.map((el, index) => {
              return (
                <img
                  key={index}
                  src={el.data}
                  height={100}
                  width={100}
                  alt={el.name}
                />
              );
            })}
            <input
              type="file"
              name="img"
              accept="image/*"
              multiple
              onChange={this.selectImages}
              onClick={(e) => {
                e.target.value = null;
              }}
            />
            <button name="delete" onClick={this.selectImages}>
              画像リセット
            </button>
            <InputArea>
              <label>
                <p>
                  <span>タ</span>
                  <span>イ</span>
                  <span>ト</span>
                  <span>ル</span>
                </p>
                <span>:</span>
                <input
                  type="text"
                  name="goodsName"
                  value={this.state.data.goodsName}
                  onChange={this.handleChange}
                />
              </label>
              <label>
                <p>
                  <span>U</span>
                  <span>R</span>
                  <span>L</span>
                </p>
                <span>:</span>
                <input
                  type="url"
                  name="url"
                  value={this.state.data.url}
                  onChange={this.handleChange}
                  onBlur={this.checkUrlError}
                />
              </label>
              {this.state.urlError ? <p>URLが正しくありません</p> : ""}
              <label>
                <p>
                  <span>場</span>
                  <span>所</span>
                </p>
                <span>:</span>
                <input
                  type="text"
                  name="place"
                  value={this.state.data.place}
                  onChange={this.handleChange}
                />
              </label>
              <label>
                <p>
                  <span>値</span>
                  <span>段</span>
                </p>
                <span>:</span>
                {this.state.data.price !== "" ? "¥" : null}
                <input
                  type="tel"
                  name="price"
                  value={this.state.data.price}
                  onChange={this.handleChange}
                  placeholder="半角数字のみ"
                  onBlur={this.resetErrors}
                />
              </label>
              {this.state.priceError ? <p>半角数字のみ入力して下さい</p> : ""}
            </InputArea>
            <ButtonArea>
              <CancelButton onClick={this.clickCancel}>
                <p>Cancel</p>
              </CancelButton>
              <AddButton onClick={this.handleSubmit}>
                <p>ADD</p>
              </AddButton>
            </ButtonArea>
            {this.state.submitError ? (
              <p>欲しいもの、URL、画像のどれか一つは入力して下さい</p>
            ) : (
              ""
            )}
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
      case "delete":
        e.preventDefault();
        data.img = [{ name: "icon", data: Icon }];
        e.target.value = null;
        break;
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
    let count = this.state.count;
    count++;
    if (files.length > 0) {
      // 初回追加時に初期画像を削除
      if (count === 1) {
        this.state.data.img.splice(0, 1);
      }
      // createObjectURLで、fileを読み込む
      for (const file of files) {
        this.state.data.img.splice(1, 0, {
          name: file.name,
          data: URL.createObjectURL(file),
        });
      }
    } else {
      this.state.data.img = [{ name: "icon", data: Icon }];
    }
    this.setState({
      data: this.state.data,
      count: count,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const data = this.state.data;
    if (
      data.goodsName === "" &&
      data.url === "" &&
      data.img[0].name === "icon"
    ) {
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
          img: [{ name: "icon", data: Icon }],
        },
        count: 0,
      });
      // this.props.history.push({ pathname: "/home", state: { data: data } });
    }
  };
  clickCancel = () => {
    const { onCancel } = this.props;
    onCancel();
  };
  stopPropagation = (e) => {
    e.stopPropagation();
  };
}

export default Form;
