import React from "react";
import "../assets/css/App.css";
import Form from "./Form.jsx";
import Want from "./Want.jsx";
import EditWant from "./EditWant.jsx";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import _, { intersectionWith } from "lodash";
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

      //配列を作る
      const prev = Array.from(this.state.lists);
      // console.log(prev);
      // console.log(result);
      // console.log(result.source);
      //delete
      const [reoderedItem] = prev[result.source.droppableId].items.splice(
        result.source.index,
        1
      );
      //add
      prev[result.destination.droppableId].items.splice(
        result.destination.index,
        0,
        reoderedItem
      );
      this.setState(prev);
      this.saveList();
      this.calculatePrice();

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
        <p>合計金額：¥{this.state.totalPrice.toLocaleString()}</p>
        <Form onSubmit={this.handleSubmit} />
        <DragDropContext
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
          onDragUpdate={handleDragUpdate}
        >
          <Wrap>
            {this.state.lists.map(({ title, items }, listIndex) => (
              <div key={listIndex}>
                <p>{title}</p>
                <Droppable droppableId={String(listIndex)} key={listIndex}>
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
                            itemIndex
                          ) => {
                            return (
                              <Draggable
                                key={id}
                                index={itemIndex}
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
                                          itemIndex={itemIndex}
                                          listIndex={listIndex}
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
    this.calculatePrice();
    localStorage.setItem("Count", currentId);
    this.saveList();
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

  handleClickDelete = async (listIndex, itemIndex) => {
    const prev = Array.from(this.state.lists);
    prev[listIndex].items.splice(itemIndex, 1);
    await this.setState({
      lists: prev,
    });
    this.saveList();
    this.calculatePrice();
  };

  allDelete = () => {
    this.setState({ lists: [], totalPrice: 0, count: 0 });
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

    // allVer
    // const lists = Array.from(this.state.lists);
    // lists.map(({ items }) => {
    //   items.map(({ price }) => {
    //     price = price.replace(/,/g, "");
    //     price = Number(price);
    //     total = total + price;
    //   });
    // });
    // allVer

    // todoVer
    const lists = Array.from(this.state.lists);
    lists[0].items.map(({ price }) => {
      price = price.replace(/,/g, "");
      price = Number(price);
      total = total + price;
    });
    // todoVer

    await this.setState({
      totalPrice: total,
    });
    localStorage.setItem("TotalPrice", total);
  };

  saveList = () => {
    let list = JSON.stringify(this.state.lists);
    localStorage.setItem("Lists", list);
    if (localStorage.getItem("Lists") === "[]") {
      localStorage.clear();
    }
  };
}

export default App;
