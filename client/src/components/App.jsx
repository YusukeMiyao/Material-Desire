import React from "react";
import "../assets/css/App.css";
import Form from "./Form.jsx";
import Want from "./Want.jsx";
import EditWant from "./EditWant.jsx";
import Title from "./Title.jsx";
import EditTitle from "./EditTitle.jsx";
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
              editing: false,
            },
            {
              title: "InProgress",
              items: [],
              editing: false,
            },
            {
              title: "Done",
              items: [],
              editing: false,
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
            {this.state.lists.map(({ title, items, editing }, listIndex) => (
              <div key={listIndex}>
                {editing ? (
                  <EditTitle
                    title={title}
                    listIndex={listIndex}
                    onCancel={this.clickEditTitle}
                    onSubmit={this.editTitle}
                  />
                ) : (
                  <Title
                    title={title}
                    editing={editing}
                    listIndex={listIndex}
                    onClickEditTitle={this.clickEditTitle}
                  />
                )}
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
            title: prev.lists[0].title,
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
            editing: false,
          },
          {
            title: prev.lists[1].title,
            items: [...prev.lists[1].items],
            editing: false,
          },
          {
            title: prev.lists[2].title,
            items: [...prev.lists[2].items],
            editing: false,
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

  allDelete = async () => {
    await this.setState((prev) => {
      return {
        ...prev,
        lists: [
          {
            title: prev.lists[0].title,
            items: [],
            editing: false,
          },
          {
            title: prev.lists[1].title,
            items: [],
            editing: false,
          },
          {
            title: prev.lists[2].title,
            items: [],
            editing: false,
          },
        ],
        totalPrice: 0,
        count: prev.count,
      };
    });
    localStorage.clear();
    this.saveList();
    localStorage.setItem("Count", this.state.count);
    localStorage.setItem("TotalPrice", this.state.totalPrice);
  };

  clickEdit = (listIndex, itemIndex, editing) => {
    const lists = Array.from(this.state.lists);
    const item = lists[listIndex].items[itemIndex];
    item.editing = editing;
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

  clickEditTitle = (listIndex, editing) => {
    const lists = Array.from(this.state.lists);
    lists[listIndex].editing = editing;
    this.setState({ lists: lists });
  };
  
  editTitle = async (listIndex, title) => {
    const lists = Array.from(this.state.lists);
    lists[listIndex].title = title;
    lists[listIndex].editing = false;
    await this.setState({ lists: lists });
    this.saveList();
    this.calculatePrice();
  };
}

export default App;
