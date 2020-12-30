import React from "react";
import "../assets/css/App.css";
import Header from "./Header.jsx";
import Concept from "./Concept.jsx";
import Form from "./Form.jsx";
import Want from "./Want.jsx";
import EditWant from "./EditWant.jsx";
import Title from "./Title.jsx";
import EditTitle from "./EditTitle.jsx";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { PureComponent } from "react";
import firebase, { uiConfigSecand } from "../utils/firebase";
import FirebaseUIAuth from "react-firebaseui/StyledFirebaseAuth";
import { Button } from "reactstrap";
import { array } from "yup";
import Fab from "@material-ui/core/Fab";
import Card from "@material-ui/core/Card";
import AddIcon from "@material-ui/icons/Add";

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
      isAnonymous: false,
    };
  }

  componentDidMount() {
    const user = firebase.auth().currentUser;
    console.log(user.uid);
    console.log(user.isAnonymous);
    if (user.isAnonymous === false) {
      let userName = user.displayName;
      let uid = user.uid;
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
                isAnonymous: false,
                userName: userName,
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
              image: [
                // {
                //   url: [],
                //   name: [],
                // },
              ],
              isAnonymous: false,
              userName: userName,
            });
          }
        });
    } else {
    }
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
      isAnonymous: true,
      userName: "ゲスト",
    });
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
      width: calc(100% - 16px);
      max-width: 1200px;
      margin: 20px auto;
      padding: 0 8px;
    `;
    const List = styled.div`
      background-color: ${(props) =>
        props.isDraggingOver ? "lightblue" : "#fff"};
      transition: background-color 0.2s ease;
      border-bottom: 1px solid gray;
      width: 100%;
      height: auto;
      /* min-height: 120px; */
      margin: 0 auto 20px;
      padding: 20px 0;
      display: flex;
      flex-wrap: wrap;
    `;
    const Item = styled(Card)`
      background-color: ${(props) =>
        props.isDragging ? "lightgreen" : "white"};
      width: calc(100% / 3 - 5px);
      display: flex;
      border-radius: 10px;
      height: 100%;
      overflow: hidden;
      transition: all 0.3s;
      :nth-of-type(3n-1) {
        margin: 0 4px;
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
      color: black;
    `;
    const TotalPrice = styled.p`
      width: fit-content;
      color: #1d1d1ddd;
      font-weight: bold;
      margin-bottom: 0;
    `;
    const FormOpenButton = styled(Fab)`
      position: fixed;
      bottom: 8px;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      background-color: #03dac5;
      color: white;
      z-index: 2;
      transition: 0.2s;
      :hover {
        background-color: #96d4ce;
      }
    `;

    return (
      <Main>
        <div>{this.state.userName}さん</div>
        {this.state.isAnonymous ? (
          <div>ゲストアカウントではデータは残りません。</div>
        ) : (
          ""
        )}
        <Button onClick={this.handleLogout}>ログアウト</Button>
        <FormOpenButton variant="extended" onClick={this.clickFormOpen}>
          <AddIcon /> ADD WISH
        </FormOpenButton>
        <Wrap>
          <TotalPrice>
            総額 ¥{this.state.totalPrice.toLocaleString()}
          </TotalPrice>
          {this.state.formOpen ? (
            <Form onCancel={this.cancelAdd} onSubmit={this.imgUp} />
          ) : (
            ""
          )}
          {/* {console.log(this.state)a} */}
          <DragDropContext
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
            onDragUpdate={handleDragUpdate}
          >
            {this.state.lists.map(({ title, items, editing }, listIndex) => {
              return (
                <Section key={listIndex}>
                  <Content>
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
        {this.state.isAnonymous ? (
          <div>
            データを残すには新規登録してください
            <FirebaseUIAuth
              uiConfig={uiConfigSecand}
              firebaseAuth={firebase.auth()}
            />
          </div>
        ) : (
          ""
        )}
      </Main>
    );
  }
  handleSubmit = async (e) => {
    let currentId = this.state.count;
    currentId++;
    if (this.state.isAnonymous) {
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
                      name: e.img.name,
                      data: e.img.data,
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
          image: [],
        };
      });
      // this.saveList();
      this.calculatePrice();
      this.setState({ formOpen: false });
    } else {
      console.log(this.state.image, e);
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
                  img: this.state.image,
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
          image: [],
        };
      });
      this.saveList();
      this.calculatePrice();
      this.setState({ formOpen: false });
    }
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
    if (this.state.isAnonymous) {
      return;
    } else this.saveList();
    this.calculatePrice();
  };

  clickDelete = async (listIndex, itemIndex) => {
    const lists = Array.from(this.state.lists);
    const items = lists[listIndex].items;
    items.splice(itemIndex, 1);
    await this.setState({ lists: lists });
    if (this.state.isAnonymous) {
      return;
    } else this.saveList();
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

    // firebase.database().ref("TotalPrice/").set({
    //   totalPrice: this.state.totalPrice,
    // });
    if (this.state.isAnonymous) {
      return;
    } else this.saveList();
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
    if (this.state.isAnonymous) {
      return;
    } else this.saveList();
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
    if (this.state.isAnonymous) {
      return;
    } else this.saveList();
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
    if (this.state.isAnonymous) {
      this.handleSubmit(e);
    } else {
      var user = firebase.auth().currentUser;
      const uid = user.uid;
      firebase.database().ref("/users/" + uid);

      if (user != null) {
        const storageRef = firebase.storage().ref("/users/" + uid);

        let files = Array.from(e.imgSub);
        files.map((File, index) => {
          console.log(File);
          storageRef
            .child("images/" + this.state.count + File.name)
            .put(File)
            .then((snapshot) => {
              snapshot.ref.getDownloadURL().then((downloadURL) => {
                let image = [{ name: File.name, url: downloadURL }];
                this.state.image = [...(this.state.image || []), image];
              });
            });
        });
        setTimeout(() => {
          console.log(this.state);
          this.handleSubmit(e);
        }, 3000);
        // Promise.all(FilesMap).then(() => {
        //   this.handleSubmit(e)
        //   console.log('promiseall')
        // })
      }
    }
  };
}
export default Home;
