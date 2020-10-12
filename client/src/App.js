import React from 'react';

import './App.css';
import Form from './Form';
import Want from './Want';
import EditWant from './EditWant';
import axios from 'axios';
// import styled from 'styled-components';
// import '@atlaskit/css-reset';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = JSON.parse(localStorage.getItem('Key'), localStorage.getItem('TotalPrice'), localStorage.getItem('Count'))
      ? {
        wants: JSON.parse(localStorage.getItem('Key')),
        totalPrice: JSON.parse(localStorage.getItem('TotalPrice')),
        count: JSON.parse(localStorage.getItem('Count'))
      }
      : {
        wants: [],
        totalPrice: 0,
        count: 0,
      }
    }
  render() {
    return (
      <div>
        <h1>欲しいものリスト</h1>
        <p>合計金額：¥{this.state.totalPrice.toLocaleString()}</p>
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

  handleSubmit = async e => {
    let currentId = this.state.count
    currentId++
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
    await this.setState({ wants: newWants, count: currentId })
    this.calculatePrice()
    let obj = JSON.stringify(newWants);
    localStorage.setItem('Key', obj);
    localStorage.setItem('Count', currentId);
  };

  editList = async (id, e) => {
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
    await this.setState({ wants: newWant });
    localStorage.clear();
    let obj = JSON.stringify(newWant);
    localStorage.setItem('Key', obj);
    localStorage.setItem('Count', this.state.count);
    this.calculatePrice()
  };

  handleClickDelete = async id => {
    localStorage.clear();
    const newWant = this.state.wants.filter(want => want.id !==id)
    await this.setState({ wants: newWant, count: this.state.count })
    let obj = JSON.stringify(newWant);
    localStorage.setItem('Key', obj);
    localStorage.setItem('Count', this.state.count);
    if (localStorage.getItem('Key') === '[]') {
      localStorage.clear();
    }
    this.calculatePrice()
  };

  allDelete = () => {
    this.setState({wants:[],totalPrice:0, count:0})
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

  calculatePrice = async () => {
    let total = 0;
    this.state.wants.map(want => {
      let price = want.price.replace(/,/g, '')
      price = Number(price)
      total = total + price
      return total
    })
    await this.setState({
      totalPrice: total
    })
    localStorage.setItem('TotalPrice', total)
  }
}

export default App;