import React from "react";
import Icon from "../assets/images/Icon.png";

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
          onBlur={this.checkUrlError}
        />
        {this.state.urlError ? <p>URLが正しくありません</p> : ""}
        場所：
        <input
          type="place"
          name="place"
          value={this.state.data.place}
          onChange={this.handleChange}
        />
        値段：{this.state.data.price !== "" ? "¥" : null}
        <input
          type="text"
          name="price"
          value={this.state.data.price}
          onChange={this.handleChange}
          placeholder="半角数字のみ"
          onBlur={this.resetErrors}
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
        <button onClick={this.deleteImages}>選択画像削除</button>
        <button name="delete" onClick={this.handleChange}>
          画像リセット
        </button>
        <button onClick={this.clickCancel}>キャンセル</button>
        <button onClick={this.handleSubmit} onBlur={this.resetErrors}>
          更新
        </button>
        {this.state.submitError ? (
          <p>欲しいもの、URL、画像のどれか一つは入力して下さい</p>
        ) : (
          ""
        )}
      </div>
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
          if (this.state.data.img[0] === Icon) {
            this.state.data.img.splice(0, 1);
          }
          for (const file of files) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
              const data = reader.result;
              this.state.data.img.splice(1, 0, {
                name: file.name,
                data: data,
              });
            };
          }
          break;
        } else {
          data.img = { name: "", data: "" };
        }
        break;
      case "delete":
        data.img = { name: "", data: "" };
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
    const src = e.target.src;
    const data = this.state.data;
    const img = data.img;
    const selectedImages = this.state.selectedImages;
    img.map((el, index) => {
      if (el === src) {
        selectedImages.push(index);
      }
    });
  };
  deleteImages = () => {
    const selectedImages = this.state.selectedImages;
    selectedImages.map((el) => {
      this.state.data.img.splice(el, 1);
    });
    this.setState({ data: this.state.data });
  };
  
  handleSubmit = () => {
    const { listIndex, itemIndex } = this.props;
    if (
      this.state.data.goodsName === "" &&
      this.state.data.url === "" &&
      this.state.data.img[0] === Icon
    ) {
      this.setState({ submitError: true });
      return;
    } else if (this.state.urlError) {
      return;
    } else {
      this.props.onSubmit(listIndex, itemIndex, this.state.data);
    }
  };
}

export default EditWant;
