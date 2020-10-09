import React from 'react';

import './App.css';
import Form from './Form';
import Want from './Want';
import EditWant from './EditWant';
// import styled from 'styled-components';
// import '@atlaskit/css-reset';


let currentId = 0;

class App extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        wants: [],
      };
    }
  render() {
    return(
      <div>
        <h1>欲しいものリスト</h1>
          <Form onSubmit={this.handleSubmit}/>
            {this.state.wants.map(({ id, goodsName, url, price, img, editing,index}) => (
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
                ): (
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
      goodsName:e.goodsName,
      url:e.url,
      price:e.price,
      img:e.img,
      editing: false,
    };
    const  newWants = [...this.state.wants, newWant]
    this.setState({ wants: newWants })
    currentId++;
  };

  handleUpdateWantText = (id, e ) => {
    const newWant = this.state.wants.map(want => {
      if (want.id === id) {
      return {
        ...want,
        goodsName:e.goodsName,
        url:e.url,
        img:e.img,
        editing:false,
      };
    }

    return want
    });

    this.setState({wants:newWant});
  };

  handleClickDelete = id => {
    const newWant = this.state.wants.filter(want => want.id !==id)
    this.setState({ wants:newWant })
  };

  handleChangeWantAttribute = (id, key, value) => {
    const newWant = this.state.wants.map(want => {
      if (want.id===id) {
        return {
          ...want,
          [key] : value,
        };
      }
      return want;
    })
    this.setState({ wants:newWant })
  };
}

export default App;