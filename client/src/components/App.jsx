import React from "react";
import "../assets/css/App.css";
import Header from "./Header.jsx";
import Concept from "./Concept.jsx";
import Form from "./Form.jsx";
import Want from "./Want.jsx";
import EditWant from "./EditWant.jsx";
import Title from "./Title.jsx";
import EditTitle from "./EditTitle.jsx";
import Footer from "./Footer.jsx";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { PureComponent } from "react";
import firebase from "../utils/firebase";

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
          formOpen: false,
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
          formOpen: false,
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

    class InnerList extends React.Component {
      shouldComponentUpdate(nextProps) {
        if (
          nextProps.itemIndex === this.props.itemIndex &&
          nextProps.listIndex === this.listIndex
        ) {
          console.log("これ");
          return false;
        }
        console.log("やほ");
        return true;
      }
      render() {
        const {
          id,
          goodsName,
          url,
          place,
          price,
          img,
          listIndex,
          itemIndex,
          editing,
          onClickEdit,
          onDelete,
          onSubmit,
          onCancel,
        } = this.props;
        return (
          <Draggable key={id} index={itemIndex} draggableId={String(id)}>
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
                      onCancel={onCancel}
                      onSubmit={onSubmit}
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
                      onClickEdit={onClickEdit}
                      onDelete={onDelete}
                    />
                  )}
                  {provided.placeholder}
                </Item>
              );
            }}
          </Draggable>
        );
      }
    }

    const Main = styled.main``;
    const Wrap = styled.div`
      width: 70%;
      max-width: 1200px;
      margin: 90px auto;
    `;
    const List = styled.div`
      background-color: ${(props) =>
        props.isDraggingOver ? "lightblue" : "#F0F0F0"};
      transition: background-color 0.2s ease;
      border: 1px solid lightgray;
      width: 100%;
      height: auto;
      min-height: 120px;
      margin: 0 auto 20px;
      padding: 20px 2% 0;
      display: flex;
      flex-wrap: wrap;
    `;
    const Item = styled.div`
      background-color: ${(props) =>
        props.isDragging ? "lightgreen" : "white"};
      width: 31%;
      display: flex;
      border: solid 1px #707070;
      border-radius: 30px;
      margin-bottom: 20px;
      box-shadow: 0 0 30px 0 #b9b9b9;
      height: 50%;
      overflow: hidden;
      transition: all 0.3s;
      :hover {
        height: 95%;
      }
      :nth-of-type(3n-1) {
        margin: 0 3% 20px;
      }
    `;
    const Section = styled.div`
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      max-width: 1200px;
      margin: auto;
      font-family: "Hiragino Kaku Gothic ProN";
    `;
    const Content = styled.div`
      width: 100%;
      background: black;
      color: white;
      padding: 0 3em;
    `;
    const TotalPrice = styled.p`
      width: fit-content;
      border-bottom: solid 2px #707070;
    `;
    const FormOpenButton = styled.button`
      padding: 10px 50px 10px 40px;
      background-color: #ffffff;
      border: solid 1px;
      border-radius: 5px;
      position: relative;
      margin-bottom: 24px;
      transition: all 0.3s;
      cursor: pointer;
      ::after {
        content: "+";
        position: absolute;
        right: 10px;
      }
      :hover {
        background-color: #000000;
        color: #ffffff;
      }
      :focus {
        outline: none;
      }
    `;

    return (
      <Main>
        <Header />
        <Concept />
        <Wrap>
          <div id="firebaseui-auth-container"></div>
          <FormOpenButton onClick={this.clickFormOpen}>ADD WISH</FormOpenButton>
          {this.state.formOpen ? (
            <Form onCancel={this.cancelAdd} onSubmit={this.handleSubmit} />
          ) : (
            ""
          )}
          {/* <Form onCancel={this.cancelAdd} onSubmit={this.handleSubmit} /> */}
          <DragDropContext
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
            onDragUpdate={handleDragUpdate}
          >
            {this.state.lists.map(({ title, items, editing }, listIndex) => {
              return (
                <Section key={listIndex}>
                  <Content>
                    {listIndex === 0 ? (
                      <TotalPrice>
                        総額 ¥{this.state.totalPrice.toLocaleString()}
                      </TotalPrice>
                    ) : (
                      ""
                    )}
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
                  </Content>
                  <Droppable
                    droppableId={String(listIndex)}
                    key={listIndex}
                    direction="horizontal"
                  >
                    {(provided, snapshot) => {
                      return (
                        <List
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          isDraggingOver={snapshot.isDraggingOver}
                        >
                          {items.map(
                            (
                              {
                                id,
                                goodsName,
                                url,
                                place,
                                price,
                                img,
                                editing,
                              },
                              itemIndex
                            ) => {
                              return (
                                <InnerList
                                  key={itemIndex}
                                  id={id}
                                  goodsName={goodsName}
                                  url={url}
                                  place={place}
                                  price={price}
                                  img={img}
                                  editing={editing}
                                  itemIndex={itemIndex}
                                  listIndex={listIndex}
                                  onClickEdit={this.clickEdit}
                                  onDelete={this.clickDelete}
                                  onSubmit={this.editListItem}
                                  onCancel={this.clickEdit}
                                />
                              );
                            }
                          )}
                          {provided.placeholder}
                        </List>
                      );
                    }}
                  </Droppable>
                </Section>
              );
            })}
          </DragDropContext>
        </Wrap>
        <button onClick={this.allDelete}>全消去</button>
        <Footer />
      </Main>
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
    this.setState({ formOpen: false });
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

  clickFormOpen = () => {
    this.setState({ formOpen: true });
  };
  cancelAdd = () => {
    this.setState({ formOpen: false });
  };
}

export default App;
