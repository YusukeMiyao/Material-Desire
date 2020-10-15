import React from 'react';
import '../assets/css/App.css';
import Form from './Form.jsx';
import Want from './Want.jsx';
import EditWant from './EditWant.jsx';
import {DragDropContext,Draggable,Droppable} from 'react-beautiful-dnd';
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
    // const handleDragEnd = ({destination, source}) => {
    //   if(!destination) {
    //     return
    //   }
    
    //   if(destination.index === source.index && destination.droppableId === source.droppableId) {
    //     return
    //   }
    
    //   //Creating a copy of item before removing it from state
    //   const itemCopy = {...this.state[source.droppableId].newWant[source.index]}
    
    //   this.setState(prev => {
    //     prev = {...prev}
    //     //Remove from previous items array
    //     prev[source.droppableId].newWant.splice(source.index, 1)
    
    
    //     //Adding to new items array location
    //     prev[destination.droppableId].newWant.splice(destination.index, 0, itemCopy)
    //     return prev
    //   })
    // }

    return (
      <div>
        <h1>欲しいものリスト</h1>
        <p>合計金額：¥{this.state.totalPrice.toLocaleString()}</p>
        <Form onSubmit={this.handleSubmit} />
        <DragDropContext onDragEnd= {this.handleDragEnd }>
        <Droppable droppableId={'a'}>
          { (provided,snapshot) => {
              return(
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={'droppable-col'}
                >
        {this.state.wants.map(({ id, goodsName, url, place, price, img, editing, index }) => (
          <Draggable key={id} index={index} draggableId={}>
            {(provided, snapshot) => {
              return(
          <li key={id} 
          className={`item ${snapshot.isDragging && "dragging"}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}>
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
              )
            }}
          </Draggable>
        ))}
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