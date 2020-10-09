import React from 'react';

import './App.css';
import Form from './Form';
import Want from './Want';
import EditWant from './EditWant';
import axios from 'axios';
// import styled from 'styled-components';
// import '@atlaskit/css-reset';


let currentId = 0;

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = JSON.parse(localStorage.getItem('Key'))
      ? {wants:JSON.parse(localStorage.getItem('Key'))}
      : {
        wants: [],
        totalPrice: 0,
      }
    }
  render() {
    return (
      <div>
        <h1>欲しいものリスト</h1>
        <p>合計金額：{this.state.totalPrice}</p>
        <Form onSubmit={this.handleSubmit} />
        {this.state.wants.map(({ id, goodsName, url, price, img, editing, index }) => (
          <li key={id}>
            {editing ? (
              <EditWant
                id={id}
                goodsName={goodsName}
                url={url}
                price={price}
                img={img}
                onCancel={this.handleChangeWantAttribute}
                onSubmit={this.handleUpdateWantText}
              />
            ) : (
                <Want
                  key={id}
                  id={id}
                  goodsName={goodsName}
                  url={url}
                  price={price}
                  img={img}
                  onChange={this.handleChangeWantAttribute}
                  onDelete={this.handleClickDelete}
                  index={index}
                />
              )}
          </li>
        ))}
      </div>
    );
  }

  handleSubmit = e => {
    const newWant = {
      id: currentId,
      goodsName: e.goodsName,
      url: e.url,
      price: e.price,
      img: e.img,
      editing: false,
    };
    // axios.post('/api/lists', {
    //   newWant
    // }) // オブジェクトをサーバーにPOST
    // .then(response => {
    //   console.log(response) // 後で行う動作確認のためのコンソール出力
    // })
    // .catch(err => {
    //   console.error(new Error(err))
    // })
    const newWants = [...this.state.wants, newWant]
    this.setState({ wants: newWants })
    this.calculatePrice(Number(e.price))
    let obj = JSON.stringify(newWants);
    localStorage.setItem('Key', obj);
    currentId++;
  };

  handleUpdateWantText = (id, e) => {
    const newWant = this.state.wants.map(want => {
      if (want.id === id) {
        return {
          ...want,
          goodsName: e.goodsName,
          url: e.url,
          img: e.img,
          editing: false,
        };
      }

      return want
    });

    this.setState({ wants: newWant });
  };

  handleClickDelete = id => {
    const newWant = this.state.wants.filter(want => want.id !== id)
    this.setState({ wants: newWant })
  };

  handleChangeWantAttribute = (id, key, value) => {
    const newWant = this.state.wants.map(want => {
      if (want.id === id) {
        return {
          ...want,
          [key]: value,
        };
      }
      return want;
    })
    this.setState({ wants: newWant })
  };

  calculatePrice = (price) => {
    price = this.state.totalPrice + price
    this.setState({ totalPrice: price })
  }
}

export default App;