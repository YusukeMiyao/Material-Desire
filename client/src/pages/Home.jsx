import React from "react";
// import "../assets/css/App.css";
import Form from "../components/Form.jsx";
import Want from "../components/Want.jsx";
import EditWant from "./EditWant.jsx";
import Title from "../components/Title.jsx";
import EditTitle from "../components/EditTitle.jsx";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import firebase, { uiConfigSecond } from "../utils/firebase";
import FirebaseUIAuth from "react-firebaseui/StyledFirebaseAuth";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import Card from "@material-ui/core/Card";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
// import defaultImg from "../assets/images/defaultImg.svg";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      count: 0,
      totalPrice: 0,
      formOpen: false,
      isAnonymous: false,
    };
  }

  componentDidMount() {
    const user = firebase.auth().currentUser;

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
                  title: "欲しい度☆☆☆☆☆",
                  items: [],
                  editing: false,
                },
                {
                  title: "欲しい度☆☆☆",
                  items: [],
                  editing: false,
                },
                {
                  title: "欲しい度☆",
                  items: [],
                  editing: false,
                },
              ],
              count: 0,
              totalPrice: 0,
              formOpen: false,
              image: [],
              isAnonymous: false,
              userName: userName,
            });
          }
        });
    } else {
      this.setState({
        lists: [
          {
            title: "欲しい度☆☆☆☆☆",
            items: [],
            editing: false,
          },
          {
            title: "欲しい度☆☆☆",
            items: [],
            editing: false,
          },
          {
            title: "欲しい度☆",
            items: [],
            editing: false,
          },
        ],
        count: 0,
        totalPrice: 0,
        formOpen: false,
        userName: "ゲスト",
        isAnonymous: true,
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
          return false;
        }
        return true;
      }
      render() {
        const {
          id,
          goodsName,
          url,
          place,
          price,
          other,
          listIndex,
          itemIndex,
          editing,
          onClickEdit,
          onDelete,
          editImgUp,
          onCancel,
        } = this.props;
        let { img } = this.props;
        {
          if (img === undefined || img === []) {
            img = [{ name: "defaultImg", url: defaultImg }];
          }
        }
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
                      other={other}
                      listIndex={listIndex}
                      itemIndex={itemIndex}
                      onCancel={onCancel}
                      onSubmit={editImgUp}
                    />
                  ) : (
                    <Want
                      id={id}
                      goodsName={goodsName}
                      url={url}
                      place={place}
                      price={price}
                      img={img}
                      other={other}
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

    const Main = styled.main`
      width: calc(100% - 40px);
      max-width: 768px;
      margin: 10px auto;
      padding: 10px;
      border-radius: 10px;
      background-color: #ffffff;
      @media screen and (max-width: 767px) {
        width: calc(100% - 20px);
        border-radius: 0;
      }
    `;
    const Wrap = styled.div`
      width: 100%;
      margin: 16px auto;
    `;
    const List = styled.div`
      background-color: ${(props) =>
        props.isDraggingOver ? "lightblue" : "#fff"};
      transition: background-color 0.2s ease;
      border-bottom: 1px solid grey;
      width: 100%;
      height: auto;
      /* min-height: 120px; */
      margin: 0 auto 20px;
      padding: 5px 0 20px;
      display: flex;
      flex-wrap: wrap;
    `;
    const Item = styled(Card)`
      background-color: ${(props) =>
        props.isDragging ? "lightgreen" : "white"};
      width: calc(100% / 3 - 5px);
      height: 190px;
      display: flex;
      border-radius: 10px;
      overflow: hidden;
      transition: all 0.3s;
      margin-bottom: 4px;
      :nth-of-type(3n-1) {
        margin: 0 7px 4px;
      }
      @media screen and (min-width: 768px) {
        width: calc(100% / 5 - 7px);
        height: 215px;
        margin-right: 9px;
        margin-bottom: 8px;
        :nth-of-type(3n-1) {
          margin-right: 8px;
          margin-left: 0;
        }
        :nth-of-type(5n) {
          margin-right: 0;
        }
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
      margin: 0;
    `;
    const FormOpenButton = styled(Fab)`
      position: fixed;
      bottom: 16px;
      right: 16px;
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
      @media screen and (min-width: 788px) {
        margin-left: 716px;
        right: auto;
        left: auto;
      }
    `;
    const AllDeleteButton = styled(Button)`
      color: #f44336;
      border: solid 1px #0000001f;
      padding: 4px 16px 4px 10px;
      svg {
        width: 20px;
        padding-right: 6px;
      }
    `;
    const Block = styled.div`
      display: flex;
      justify-content: space-between;
      align-items: center;
    `;
    const SignUpWrap = styled.div`
      width: calc(100% + 20px);
      background: #f2e7fe;
      padding: 20px 0;
      margin: 5px -10px;
    `;
    const SignUpContent = styled.div`
      width: 340px;
      margin: auto;
      text-align: center;
      padding: 20px 0;
      background: #ffffff;
      border: solid 1px #e0e0e0;
      border-radius: 4px;
    `;

    return (
      <Main>
        <div>{this.state.userName}さん</div>
        {this.state.isAnonymous ? (
          <div>ゲストアカウントではデータは残りません。</div>
        ) : (
          ""
        )}
        <Wrap>
          <FormOpenButton onClick={this.clickFormOpen}>
            <AddIcon />
          </FormOpenButton>
          <Block>
            <TotalPrice>
              総額 ¥{this.state.totalPrice.toLocaleString()}
            </TotalPrice>
            <AllDeleteButton onClick={this.allDelete}>
              <DeleteIcon />
              全削除
            </AllDeleteButton>
          </Block>
          {this.state.formOpen ? (
            <Form onCancel={this.cancelAdd} onSubmit={this.imgUp} />
          ) : (
            ""
          )}
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
                                other,
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
                                  other={other}
                                  itemIndex={itemIndex}
                                  listIndex={listIndex}
                                  onClickEdit={this.clickEdit}
                                  onDelete={this.clickDelete}
                                  editImgUp={this.editImgUp}
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
        {this.state.isAnonymous ? (
          <SignUpWrap>
            <SignUpContent>
              データを残すには新規登録する必要があります
              <FirebaseUIAuth
                uiConfig={uiConfigSecond}
                firebaseAuth={firebase.auth()}
              />
            </SignUpContent>
          </SignUpWrap>
        ) : (
          ""
        )}
      </Main>
    );
  }
  handleSubmit = async (e, imgArray) => {
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
                  img: imgArray,
                  other: e.other,
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

      this.calculatePrice();
      this.setState({ formOpen: false });
    } else {
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
                  img: imgArray,
                  other: e.other,
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

  editListItem = async (listIndex, itemIndex, data, imgArray) => {
    if (imgArray === [] || this.state.isAnonymous) {
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
    } else {
      const lists = Array.from(this.state.lists);
      const item = lists[listIndex].items[itemIndex];

      const imgSubLength = data.imgSub.length;
      const imgArrayLength = imgArray.length;
      const newLength = imgSubLength - imgArrayLength;
      data.img.splice(newLength, imgArrayLength);
      Array.prototype.push.apply(data.img, imgArray);
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
    }
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

  imgUp = async (e) => {
    let fileName = [];
    let imgArray = [];
    if (this.state.isAnonymous && e.imgSub.length === 0) {
      imgArray = [{ name: "defaultImg", url: defaultImg }];
      this.handleSubmit(e, imgArray);
      return;
    } else if (this.state.isAnonymous) {
      imgArray = e.img;

      this.handleSubmit(e, imgArray);
      return;
    } else if (e.imgSub === []) {
      this.handleSubmit(e, imgArray);
      return;
    } else {
      var user = firebase.auth().currentUser;
      const uid = user.uid;
      firebase.database().ref("/users/" + uid);

      if (user != null) {
        const storageRef = firebase.storage().ref("/users/" + uid);

        let files = Array.from(e.imgSub);

        await Promise.all(
          files.map(async (File) => {
            await storageRef
              .child("images/" + this.state.count + File.name)
              .put(File);
            let ext = File.name.split(".").pop();
            if (ext === "svg") {
              let svgImg = File.name;
              fileName = [...fileName, svgImg];
            } else {
              let imgName = File.name.replace(`.${ext}`, "");
              let newImgName = `${imgName}_200x200.${ext}`;
              fileName = [...fileName, newImgName];
            }
          })
        );

        setTimeout(async () => {
          await Promise.all(
            fileName.map(async (el) => {
              await storageRef
                .child("images/" + this.state.count + el)
                .getDownloadURL()
                .then((downloadURL) => {
                  let image = { name: el, url: downloadURL };
                  imgArray = [...(imgArray || []), image];
                })
                .catch((error) => {});
            })
          );
          await this.handleSubmit(e, imgArray);
        }, 3000);
      }
    }
  };

  editImgUp = async (e, listIndex, itemIndex) => {
    let fileName = [];
    let imgArray = [];
    if (this.state.isAnonymous && e.img.length === 0) {
      e.img = [{ name: "defaultImg", url: defaultImg }];
      this.editListItem(listIndex, itemIndex, e, imgArray);
      return;
    } else if (this.state.isAnonymous) {
      this.editListItem(listIndex, itemIndex, e, imgArray);
      return;
    } else if (e.imgSub === []) {
      this.editListItem(listIndex, itemIndex, e, imgArray);
      return;
    } else {
      var user = firebase.auth().currentUser;
      const uid = user.uid;
      firebase.database().ref("/users/" + uid);

      if (user != null) {
        const storageRef = firebase.storage().ref("/users/" + uid);

        let files = Array.from(e.imgSub);
        await Promise.all(
          files.map(async (File) => {
            await storageRef
              .child("images/" + this.state.count + File.name)
              .put(File);
            let ext = File.name.split(".").pop();
            if (ext === "svg") {
              let svgImg = File.name;
              fileName = [...fileName, svgImg];
            } else {
              let imgName = File.name.replace(`.${ext}`, "");
              let newImgName = `${imgName}_200x200.${ext}`;
              fileName = [...fileName, newImgName];
            }
          })
        );

        setTimeout(async () => {
          await Promise.all(
            fileName.map(async (el) => {
              await storageRef
                .child("images/" + this.state.count + el)
                .getDownloadURL()
                .then((downloadURL) => {
                  let image = { name: el, url: downloadURL };
                  imgArray = [...(imgArray || []), image];
                })
                .catch((error) => {});
            })
          );
          await this.editListItem(listIndex, itemIndex, e, imgArray);
        }, 3000);
      }
    }
  };
}
export default Home;
