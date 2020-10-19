import React from "react";
import "../assets/css/App.css";
import Form from "./Form.jsx";
import Want from "./Want.jsx";
import EditWant from "./EditWant.jsx";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

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
    const handleDragEnd = async (result) => {
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
      const lists = Array.from(this.state.lists);
      //delete
      const [reoderedItem] = lists[result.source.droppableId].items.splice(
        result.source.index,
        1
      );
      //add
      lists[result.destination.droppableId].items.splice(
        result.destination.index,
        0,
        reoderedItem
      );
      await this.setState({ lists: lists });
      this.saveList();
      this.calculatePrice();
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
                                          listIndex={listIndex}
                                          itemIndex={itemIndex}
                                          onCancel={this.clickEdit}
                                          onSubmit={this.editListItem}
                                        />
                                      ) : (
                                        <Want
                                          id={id}
                                          goodsName={goodsName}
                                          url={url}
                                          place={place}
                                          price={price}
                                          img={img}
                                          listIndex={listIndex}
                                          itemIndex={itemIndex}
                                          onClickEdit={this.clickEdit}
                                          onDelete={this.clickDelete}
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
    localStorage.setItem("Count", currentId);
    this.calculatePrice();
    this.saveList();
  };

  editListItem = async (listIndex, itemIndex, data) => {
    const lists = Array.from(this.state.lists);
    const item = lists[listIndex].items[itemIndex];
    item.goodsName = data.goodsName;
    item.price = data.price;
    item.place = data.place;
    item.url = data.url;
    item.img = data.img;
    item.editing = false;
    await this.setState({ lists: lists });
    this.saveList();
    this.calculatePrice();
  };

  clickDelete = async (listIndex, itemIndex) => {
    const lists = Array.from(this.state.lists);
    const items = lists[listIndex].items;
    items.splice(itemIndex, 1);
    await this.setState({ lists: lists });
    this.saveList();
    this.calculatePrice();
  };

  allDelete = () => {
    this.setState({
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
      totalPrice: 0,
      count: 0,
    });
    localStorage.clear();
  };

  clickEdit = (value, listIndex, itemIndex) => {
    const lists = Array.from(this.state.lists);
    const item = lists[listIndex].items[itemIndex];
    item.editing = value;
    this.setState({ lists: lists });
  };

  calculatePrice = async () => {
    let total = 0;
    const lists = Array.from(this.state.lists);
    const todo = lists[0].items;
    todo.map(({ price }) => {
      price = price.replace(/,/g, "");
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
    const list = JSON.stringify(this.state.lists);
    localStorage.setItem("Lists", list);
    if (localStorage.getItem("Lists") === "[]") {
      localStorage.clear();
    }
  };
}

export default App;
