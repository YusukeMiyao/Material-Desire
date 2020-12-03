import React from "react";
import Home from "./Home";

class stateHolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = [];
    //     this.state =firebase
    //   .database()
    //   .ref("Lists/")
    //   .once("value", (snapshot) => {
    //     getDb = { this.getDb } {
    //       let data = snapshot.val();
    //       getDb(data)
    //     }
    //   });

    //  getDb = (data) => {
    //       if (data !== null) {
    //         console.log(data);
    //          this.setState((data) => {
    //           return {
    //             ...data,
    //             lists: [
    //               {
    //                 title: data.lists[0].title,
    //                 items: [...data.lists[0].items],
    //                 editing: false,
    //               },
    //               {
    //                 title: data.lists[1].title,
    //                 items: [...data.lists[1].items],
    //                 editing: false,
    //               },
    //               {
    //                 title: data.lists[2].title,
    //                 items: [...data.lists[2].items],
    //                 editing: data,
    //               },
    //             ],
    //             count: data.count,
    //           };
    //         });

    //         console.log("うあ");
    //         console.log(this.state);
    //       } else console.log("ya");
    //       return;
    //     }
    //     firebase
    //   .database()
    //   .ref("Lists/")
    //   .once("value", async (snapshot) => {
    //     let data = snapshot.val();

    //       console.log(data);
    //       await this.setState({ data } => {
    //         return {
    //           ...data,
    //           lists: [
    //             {
    //               title: data.lists[0].title,
    //               items: [...data.lists[0].items],
    //               editing: false,
    //             },
    //             {
    //               title: data.lists[1].title,
    //               items: [...data.lists[1].items],
    //               editing: false,
    //             },
    //             {
    //               title: data.lists[2].title,
    //               items: [...data.lists[2].items],
    //               editing: data,
    //             },
    //           ],
    //           count: data.count,
    //         };
    //       });

    //       console.log("うあ");
    //       console.log(this.state);

    //   });
    // }
  }
  render() {
    firebase
      .database()
      .ref("Lists/")
      .once("value", (snapshot) => {
        let Dv = snapshot.val();
        this.getData(Dv);
      });
  }
  getData = (data) => {
    console.log(data);
    this.setState({ data }, (af) => {
      return {
        ...data,
        lists: [
          {
            title: data.lists[0].title,
            items: [...data.lists[0].items],
            editing: false,
          },
          {
            title: data.lists[1].title,
            items: [...data.lists[1].items],
            editing: false,
          },
          {
            title: data.lists[2].title,
            items: [...data.lists[2].items],
            editing: data,
          },
        ],
        count: data.count,
      };
      //
    });
    <Home data={this.state} />;
  };
}
export default stateHolder;
