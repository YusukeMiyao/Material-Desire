import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import List from './list'

const app = express();
const port = 3001;
const dbUrl = "mongodb://localhost/todolist"; // dbの名前をtodolistに指定

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

mongoose.connect(
  dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (dbErr) => {
    if (dbErr) throw new Error(dbErr);
    else console.log("db connected");

    app.post("/api/lists", (request, response) => {
      console.log("receive POST request");
      console.log(request.body); // 送られてきたデータをコンソール出力
      const newWant = request.body
      new List({
        newWant
      }).save(err => {
        if (err) response.status(500)
        else response.status(200).send(`${newWant} was successfully created.`)
      })
    });
    app.listen(port, (err) => {
      if (err) throw new Error(err);
      else console.log(`listening on port ${port}`);
    });
  }
);