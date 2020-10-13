import React from "react";
import Icon from "./Icon.png";

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        goodsName: "",
        url: "",
        price: "",
        img: Icon,
        place: "",
      },
      errorMessage: {
        priceError: false,
        submitError: false,
        urlError: false,
      },
    };
  }

  render() {
    return (
      <div>
        欲しいもの：
        <input
          type="text"
          name="goodsName"
          value={this.state.data.goodsName}
          onChange={this.handleChange}
        />
        URL：
        <input
          type="url"
          name="url"
          value={this.state.data.url}
          onChange={this.handleChange}
          onBlur={this.onBlurUrl}
        />
        {this.state.errorMessage.urlError ? <p>URLが正しくありません</p> : ""}
        場所：
        <input
          type="text"
          name="place"
          value={this.state.data.place}
          onChange={this.handleChange}
        />
        値段： {this.state.data.price !== "" ? "¥" : null}
        <input
          type="tel"
          name="price"
          value={this.state.data.price}
          onChange={this.handleChange}
          placeholder="半角数字のみ"
          onBlur={this.onBlurFunc}
        />
        {this.state.priceError ? <p>半角数字のみ入力して下さい</p> : ""}
        画像：
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
        <img src={this.state.data.img} height={100} width={100} alt="画像" />
        <button name="delete" onClick={this.handleChange}>
          画像リセット
        </button>
        <button onClick={this.handleSubmit}>追加</button>
        {this.state.submitError ? (
          <p>欲しいもの、URL、画像のどれか一つは入力して下さい</p>
        ) : (
          ""
        )}
      </div>
    );
  }

  onBlurFunc = () => {
    this.setState({
      priceError: false,
      submitError: false,
    });
  };
  onBlurUrl = () => {
    if (
      this.state.data.url.startsWith("https://") ||
      this.state.data.url.startsWith("http://") ||
      this.state.data.url <= 0
    ) {
      this.setState({
        errorMessage: {
          urlError: false,
        },
      });
      return;
    } else {
      this.setState({
        errorMessage: {
          urlError: true,
        },
      });
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
          if (
            data.url.startsWith("https://") ||
            data.url.startsWith("http://")
          ) {
            this.onBlurUrl();
          } else {
            this.setState({ errorMessage: { urlError: true } });
            return;
          }
        } else if (data.url.length <= 0) {
          this.onBlurFunc();
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
          this.onBlurFunc();
          data.price = price;
        } else {
          this.setState({ errorMessage: { priceError: true } });
        }
        break;
      case "img":
        let files = e.target.files;
        if (files.length > 0) {
          // ②createObjectURLで、files[0]を読み込む
          data.img = URL.createObjectURL(files[0]);
          break;
        } else {
          data.img = Icon;
        }
        break;
      case "delete":
        e.preventDefault();
        data.img = Icon;
        e.target.value = null;
        break;
    }
    // 状態を更新
    this.setState({
      data: data,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.errorMessage.urlError);
    const data = this.state.data;
    if (data.goodsName === "" && data.url === "" && data.img === Icon) {
      this.setState({ submitError: true });
      return;
    } else if (this.state.errorMessage.urlError) {
      return;
    } else {
      this.props.onSubmit(data);
      this.setState({
        data: { goodsName: "", url: "", place: "", price: "", img: Icon },
      });
    }
  };
}

export default Form;
