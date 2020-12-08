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
import { Button } from "reactstrap";
import { array } from "yup";

class Home extends React.Component {
  constructor(props) {
    super(props);
    // this.imgSetState = this.imgSetState.bind(this);
    this.state = {
      lists: [
        // {
        //   title: "Todo",
        //   items: [],
        //   editing: false,
        // },
        // {
        //   title: "InProgress",
        //   items: [],
        //   editing: false,
        // },
        // {
        //   title: "Done",
        //   items: [],
        //   editing: false,
        // },
      ],
      count: 0,
      totalPrice: 0,
      formOpen: false,
    };
  }

  componentDidMount() {
    var user = firebase.auth().currentUser;

    if (user != null) {
      const uid = user.uid;
      firebase
        .database()
        .ref("/users/" + uid)
        .on("value", (snapshot) => {
          const prev = snapshot.val();
          if (prev !== null) {
            this.setState(() => {
              return {
                lists: [
                  {
                    title: prev.lists[0].title,
                    items: [...(prev.lists[0].items || [])],
                    editing: false,
                  },
                  {
                    title: prev.lists[1].title,
                    items: [...(prev.lists[1].items || [])],
                    editing: false,
                  },
                  {
                    title: prev.lists[2].title,
                    items: [...(prev.lists[2].items || [])],
                    editing: false,
                  },
                ],
                count: prev.count,
                totalPrice: prev.totalPrice,
                formOpen: false,
              };
            });
          } else {
            this.setState({
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
              // image: [],
            });
          }
        });
    }
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
      // this.saveList();
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
        <Button onClick={this.handleLogout}>ログアウト</Button>
        <Wrap>
          <div id="firebaseui-auth-container"></div>
          <FormOpenButton onClick={this.clickFormOpen}>ADD WISH</FormOpenButton>
          {this.state.formOpen ? (
            <Form onCancel={this.cancelAdd} onSubmit={this.imgUp} />
          ) : (
            ""
          )}
          {/* {console.log(this.state)} */}
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
    console.log(e, this.state.image);
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
                img: [
                  {
                    name: e.img[0].name,
                    data: prev.image,
                  },
                ],

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
    // this.saveList();
    this.calculatePrice();
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
        count: 0,
      };
    });
    // localStorage.clear();
    firebase.database().ref("TotalPrice/").set({
      totalPrice: this.state.totalPrice,
    });
    this.saveList();
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
    this.saveList();
  };

  saveList = async () => {
    const user = firebase.auth().currentUser;
    if (user !== null) {
      const uid = user.uid;
      firebase
        .database()
        .ref("/users/" + uid)
        .update({
          count: this.state.count,
          lists: this.state.lists,
          totalPrice: this.state.totalPrice,
        });
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

  handleLogout = () => {
    firebase.auth().signOut();
  };

  imgUp = async (e) => {
    var user = firebase.auth().currentUser;
    const uid = user.uid;
    firebase.database().ref("/users/" + uid);

    if (user != null) {
      const storageRef = firebase.storage().ref("/users/" + uid);

      let files = Object.entries(e.imgSub);
      console.log(e);
      console.log(files);

      files.map((FileList, index) => {
        console.log(FileList);
        storageRef
          .child("images/" + this.state.count + FileList.name)
          .put(FileList)
          .then((snapshot) => {
            snapshot.ref.getDownloadURL().then((downloadURL) => {
              this.setState({ image: downloadURL });
              // console.log(this.state);
            });
          });
      });

      setTimeout(() => {
        console.log(this.state);
        this.handleSubmit(e);
      }, 3000);
    }
  };
}
export default Home;
