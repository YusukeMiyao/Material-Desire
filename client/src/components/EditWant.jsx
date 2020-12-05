import React from "react";
import Icon from "../assets/images/Icon.png";
import styled from "styled-components";

const EditWrap = styled.div`
  width: 100%;
  padding: 20px;
`;
const EditImages = styled.div`
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
const EditArea = styled.div`
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
`;
const CancelButton = styled.button`
  margin-right: 10px;
`;
const UpdateButton = styled.button``;
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
      <EditWrap>
        <EditArea>
          <EditImages>
            {this.state.data.img.map((el, index) => {
              return (
                <img
                  key={index}
                  src={el.data}
                  height={100}
                  width={100}
                  alt={el.name}
                  onClick={this.selectImages}
                />
              );
            })}
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
            <button onClick={this.deleteImages}>選択画像削除</button>
            <button name="delete" onClick={this.handleChange}>
              画像リセット
            </button>
          </EditImages>
          <label>
            <p>
              <span>タ</span>
              <span>イ</span>
              <span>ト</span>
              <span>ル</span>
            </p>
            <span>：</span>
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
            <span>：</span>
            <input
              type="url"
              name="url"
              value={this.state.data.url}
              onChange={this.handleChange}
              onBlur={this.checkUrlError}
            />
            {this.state.urlError ? <p>URLが正しくありません</p> : ""}
          </label>
          <label>
            <p>
              <span>場</span>
              <span>所</span>
            </p>
            <span>：</span>
            <input
              type="place"
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
            <span>：</span>
            {this.state.data.price !== "" ? "¥" : null}
            <input
              type="text"
              name="price"
              value={this.state.data.price}
              onChange={this.handleChange}
              placeholder="半角数字のみ"
              onBlur={this.resetErrors}
            />
            {this.state.priceError ? <p>半角数字のみ入力して下さい</p> : ""}
          </label>
        </EditArea>
        <ButtonArea>
          <CancelButton onClick={this.clickCancel}>Cancel</CancelButton>
          <UpdateButton onClick={this.handleSubmit} onBlur={this.resetErrors}>
            Update
          </UpdateButton>
        </ButtonArea>
        {this.state.submitError ? (
          <p>欲しいもの、URL、画像のどれか一つは入力して下さい</p>
        ) : (
          ""
        )}
      </EditWrap>
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
  handleSubmit = () => {
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
