import React from 'react';
import '../assets/css/App.css';
import Form from './Form.jsx';
import Want from './Want.jsx';
import EditWant from './EditWant.jsx';
import {DragDropContext,Draggable,Droppable} from 'react-beautiful-dnd';
import _ from 'lodash';
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
    const handleDragEnd = result => {
      // if(!destination) {
      //   return
      // }
    
      // if(destination.index === source.index && destination.droppableId === source.droppableId) {
      //   return
      // }
    
      // //Creating a copy of item before removing it from state
      // console.log(this.state[source])
      // console.log(source,destination)
      // //[]を消すとcopyされて全部同じになる
      // const itemCopy = {...this.state[source.droppableId].wants[source.index]}
    
      // this.setState(prev => {
      //   prev = {...prev}
      //   //Remove from previous items array
      //   prev[source.droppableId].wants.splice(source.index, 1)
    
    
      //   //Adding to new items array location
      //   prev[destination.droppableId].wants.splice(destination.index, 0, itemCopy)
      //   return prev
      // })
      if (!result.destination) {
        console.log('これ')
        return;}

      if(result.destination.index === result.source.index && result.destination.droppableId === result.source.droppableId) {
        console.log('こッチ')
        return
      }
      
      const items = Array.from(this.state.wants);
      // console.log(Array.from(this.state.wants))
      // console.log(this.state)
      // console.log(items)
      const [reorderedItem] = items.splice(result.source.index, 1);
      // console.log([reorderedItem])
      items.splice(result.destination.index, 0, reorderedItem);
      // console.log(items)
      this.setState({wants:items});
      console.log(this.state)
    }

    return (
      <div>
        <h1>欲しいものリスト</h1>
        <p>合計金額：¥{this.state.totalPrice.toLocaleString()}</p>
        <Form onSubmit={this.handleSubmit} />
        <DragDropContext onDragEnd= {handleDragEnd }>
          <Droppable droppableId={'a'}>
            {( provided,snapshot ) => {
              return(
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={'droppable-col'}
                >
                  {this.state.wants.map(({ id, goodsName, url, place, price, img, editing,  },index) => (
                    <Draggable key={id} index={index} draggableId={String(id)}>
                      {(provided, snapshot) => {
                        return(
                          <div
                          // className={`item ${snapshot.isDragging && "dragging"}`}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
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
                          </div>
                        )
                      }}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )
            }}
          </Droppable>
        </DragDropContext>
        <button onClick={this.allDelete}>全消去</button>
      </div>
    );
  }

  handleSubmit = async e => {
    let currentId = this.state.count
    currentId++
    await this.setState(prev => {
      return {
        ...prev,
        
          wants: [
            {
              id:currentId,
              goodsName: e.goodsName,
              url: e.url,
              place: e.place,
              price: e.price,
              img: e.img,
              editing: false,
            },
            ...prev.wants],
        
        count: currentId
      }
    })
    this.calculatePrice()
    let obj = JSON.stringify(this.state.wants);
    localStorage.setItem('Key', obj);
    localStorage.setItem('Count', currentId);
    // let currentId = this.state.count
    // currentId++
    // const newWant = {
    //   id: currentId,
    //   goodsName: e.goodsName,
    //   url: e.url,
    //   place: e.place,
    //   price: e.price,
    //   img: e.img,
    //   editing: false,
    // };
    // axios.post('/api/lists', {
    //   newWant
    // }) // オブジェクトをサーバーにPOST
    // .then(response => {
    //   console.log(response) // 後で行う動作確認のためのコンソール出力
    // })
    // .catch(err => {
    //   console.error(new Error(err))
    // })
    // const newWants = [...this.state.wants, newWant]
    // await this.setState({ wants: newWants, count: currentId })
    // this.calculatePrice()
    // let obj = JSON.stringify(newWants);
    // localStorage.setItem('Key', obj);
    // localStorage.setItem('Count', currentId);
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