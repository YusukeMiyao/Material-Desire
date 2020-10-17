import React from "react";
import "../assets/css/App.css";
import Form from "./Form.jsx";
import Want from "./Want.jsx";
import EditWant from "./EditWant.jsx";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import _ from "lodash";
import axios from "axios";
import styled from "styled-components";
// import '@atlaskit/css-reset';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = JSON.parse(
      localStorage.getItem("Lists"),
      localStorage.getItem("TotalPrice"),
      localStorage.getItem("Count")
    )
      ? {
          lists: JSON.parse(localStorage.getItem("Lists")),
          totalPrice: JSON.parse(localStorage.getItem("TotalPrice")),
          count: JSON.parse(localStorage.getItem("Count")),
        }
      : {
          lists: [
            {
              title: "Todo",
              items: [],
            },
            {
              title: "InProgress",
              items: [],
            },
            {
              title: "Done",
              items: [],
            },
          ],
          count: 0,
          totalPrice: 0,
        };
  }
  render() {
    const handleDragEnd = (result) => {
      if (!result.destination) {
        return;
      }

      if (
        result.destination.index === result.source.index &&
        result.destination.droppableId === result.source.droppableId
      ) {
        return;
      }
      // const itemCopy = {
      //   ...this.state.lists[result.source.droppableId].items[
      //     result.source.index
      //   ],
      // };
      // this.state.lists.map(({ title, items }, index) => {
      //   if (String(index) === result.destination.droppableId) {
      //     items.splice(result.destination.index, 0, itemCopy);
      //   }
      //   if (String(index) === result.source.droppableId) {
      //     items.splice(result.source.index, 1);
      //   }
      //   if (
      //     String(index) === result.source.droppableId &&
      //     String(index) === result.destination.droppableId
      //   ) {
      //     // console.log(items[result.source.index]);
      //     // console.log(items[result.destination.index]);
      //     // console.log(result.source.index);
      //     // console.log(result.destination.index);
      //   }

      //   const newItems = Array.from(this.state);
      //   const [reorderedItem] = newItems.splice(result.source.index, 1);
      //   newItems.splice(result.destination.index, 0, reorderedItem);

      //   this.setState(newItems);

      //   this.saveList();
      // });
      // const itemCopy = {
      //   ...this.state.lists[result.source.droppableId].items[
      //     result.source.index
      //   ],
      // };

        //配列を作る
        const prev =Array.from(this.state.lists)
        console.log(prev)
        console.log(prev.items)
        //delete
        const [reoderedItem] = prev[result.source.droppableId].items.splice(result.source.index,1);
        //add
        prev[result.destination.droppableId].items.splice(result.destination.index,0,reoderedItem);
        this.setState(prev)
        this.saveList();
    
        //Adding to new items array location
        // prev[result.destination.droppableId].items.splice(result.destination.index, 0, itemCopy)
        // this.setState({lists:prev})

    };

    const handleDragStart = (start, provided) => {
      // console.log(start);
    };
    const handleDragUpdate = (update, provided) => {
      // console.log(provided);
    };

    const List = styled.div`
      background-color: ${(props) =>
        props.isDraggingOver ? "lightblue" : "white"};
      transition: background-color 0.2s ease;
      border: 1px solid lightgray;
      width: 28%;
      padding: 0 20px;
      margin: 20px auto;
    `;
    const Item = styled.div`
      background-color: ${(props) =>
        props.isDragging ? "lightgreen" : "white"};
      border: 1px solid lightgray;
      width: 100%;
      margin: 20px auto;
    `;
    const Wrap = styled.div`
      display: flex;
    `;
    return (
      <div>
        <h1>欲しいものリスト</h1>
        {/* <p>合計金額：¥{this.state.totalPrice.toLocaleString()}</p> */}
        <Form onSubmit={this.handleSubmit} />
        <DragDropContext
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
          onDragUpdate={handleDragUpdate}
        >
          <Wrap>
            {console.log(this.state.lists)}
            {this.state.lists.map(({ title, items }, index) => (
              <div>
                <p>{title}</p>
              <Droppable droppableId={String(index)} key={index}>
                {(provided, snapshot) => {
                  return (
                    <List
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      isDraggingOver={snapshot.isDraggingOver}
                    >
                      
                      {items.map(
                        (
                          { id, goodsName, url, place, price, img, editing },
                          index
                        ) => {
                          return (
                            <Draggable
                              key={id}
                              index={index}
                              draggableId={String(id)}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <Item
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    isDragging={snapshot.isDragging}
                                  >
                                    {editing ? (
                                      <EditWant
                                        id={id}
                                        goodsName={goodsName}
                                        url={url}
                                        place={place}
                                        price={price}
                                        img={img}
                                        onCancel={
                                          this.handleChangeWantAttribute
                                        }
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
                                        onChange={
                                          this.handleChangeWantAttribute
                                        }
                                        onDelete={this.handleClickDelete}
                                        index={index}
                                      />
                                    )}
                                  </Item>
                                );
                              }}
                            </Draggable>
                          );
                        }
                      )}
                      {provided.placeholder}
                    </List>
                  );
                }}
              </Droppable>
              </div>
            ))}
          </Wrap>
        </DragDropContext>
        <button onClick={this.allDelete}>全消去</button>
      </div>
    );
  }
  handleSubmit = async (e) => {
    let currentId = this.state.count;
    currentId++;
    await this.setState((prev) => {
      return {
        ...prev,
        lists: [
          {
            title: "Todo",
            items: [
              {
                id: currentId,
                goodsName: e.goodsName,
                url: e.url,
                place: e.place,
                price: e.price,
                img: e.img,
                editing: false,
              },
              ...prev.lists[0].items,
            ],
          },
          {
            title: "InProgress",
            items: [...prev.lists[1].items],
          },
          {
            title: "Done",
            items: [...prev.lists[2].items],
          },
        ],
        count: currentId,
      };
    });
    // this.calculatePrice();
    localStorage.setItem("Count", currentId);
    this.saveList();
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
    // let want = JSON.stringify(newWants);
    // localStorage.setItem('Wants', want);
    // localStorage.setItem('Count', currentId);
  };

  editList = async (id, e) => {
    const newWant = this.state.wants.map((want) => {
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
      return want;
    });
    await this.setState({ wants: newWant });
    localStorage.clear();
    let want = JSON.stringify(newWant);
    localStorage.setItem("Wants", want);
    localStorage.setItem("Count", this.state.count);
    this.calculatePrice();
  };

  handleClickDelete = async (id) => {
    localStorage.clear();
    const newWant = this.state.wants.filter((want) => want.id !== id);
    await this.setState({ wants: newWant, count: this.state.count });
    let want = JSON.stringify(newWant);
    localStorage.setItem("Wants", want);
    localStorage.setItem("Count", this.state.count);
    if (localStorage.getItem("Wants") === "[]") {
      localStorage.clear();
    }
    this.calculatePrice();
  };

  allDelete = () => {
    this.setState({ wants: [], totalPrice: 0, count: 0 });
    localStorage.clear();
  };

  handleChangeWantAttribute = (id, key, value) => {
    const newWant = this.state.wants.map((want) => {
      if (want.id === id) {
        return {
          ...want,
          [key]: value,
        };
      }
      return want;
    });
    this.setState({ wants: newWant });
  };

  calculatePrice = async () => {
    let total = 0;
    this.state.wants.map((want) => {
      let price = want.price.replace(/,/g, "");
      price = Number(price);
      total = total + price;
      return total;
    });
    await this.setState({
      totalPrice: total,
    });
    localStorage.setItem("TotalPrice", total);
  };
  saveList = () => {
    let list = JSON.stringify(this.state.lists);
    localStorage.setItem("Lists", list);
  };
}

export default App;
