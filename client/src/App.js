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
      this.state = JSON.parse(localStorage.getItem('Key'), localStorage.getItem('TotalPrice'))
      ? {
        wants: JSON.parse(localStorage.getItem('Key')),
        totalPrice: JSON.parse(localStorage.getItem('TotalPrice'))
      }
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
        {this.state.wants.map(({ id, goodsName, url, place, price, img, editing, index }) => (
          <li key={id}>
            {editing ? (
              <EditWant
                id={id}
                goodsName={goodsName}
                url={url}
                place={place}
                price={price}
                img={img}
                onCancel={this.handleChangeWantAttribute}
                onSubmit={this.editList}
              />
            ) : (
                <Want
                  key={id}
                  id={id}
                  goodsName={goodsName}
                  url={url}
                  place={place}
                  price={price}
                  img={img}
                  onChange={this.handleChangeWantAttribute}
                  onDelete={this.handleClickDelete}
                  index={index}
                />
              )}
          </li>
        ))}
        <button onClick={this.allDelete}>全消去</button>
      </div>
    );
  }

  handleSubmit = e => {
    const newWant = {
      id: currentId,
      goodsName: e.goodsName,
      url: e.url,
      place: e.place,
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
    this.plusPrice(Number(e.price))
    let obj = JSON.stringify(newWants);
    localStorage.setItem('Key', obj);
    currentId++;
  };

  editList = (id, e) => {
    const newWant = this.state.wants.map(want => {
      if (want.id === id) {
        return {
          ...want,
          goodsName: e.goodsName,
          price: e.price,
          place: e.place,
          url: e.url,
          img: e.img,
          editing: false,
        };
      }
      return want
    });
    this.setState({ wants: newWant });
    localStorage.clear();
      let obj = JSON.stringify(newWant);
      localStorage.setItem('Key', obj);

      let zero = 0;
      this.state.wants.map(want => (
          zero + want.price 
      ))
    
      this.setState({ totalPrice: zero })
      localStorage.setItem('TotalPrice', zero)
  
  };

  handleClickDelete = id => {
    const delItem = this.state.wants.filter(want => want.id === id)
    this.minusPrice(delItem[0].price)
    localStorage.clear();
    const newWant = this.state.wants.filter(want => want.id !==id)
    this.setState({ wants:newWant })
    let obj = JSON.stringify(newWant);
    localStorage.setItem('Key', obj);

    if (localStorage.getItem('Key') === '[]') {
      localStorage.clear();
    }
  };

  allDelete = () => {
    this.setState({wants:[],totalPrice:0})
    localStorage.clear();
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

  plusPrice = (price) => {
    price = this.state.totalPrice + price
    this.setState({ totalPrice: price })
    localStorage.setItem('TotalPrice', price)
  }
  minusPrice = (price) => {
    price = this.state.totalPrice - price
    this.setState({
      totalPrice: price
    })
    localStorage.setItem('TotalPrice', price)
  }
}

export default App;