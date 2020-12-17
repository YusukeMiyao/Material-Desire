import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebase from "./utils/firebase";
import { StylesProvider } from "@material-ui/styles";
import Header from "./components/Header.jsx";
//components
import Home from "./components/Home";
import Index from "./components/index.jsx";
import Detail from "./components/Detail.jsx";
import Form from "./components/Form.jsx";

import Auth from "./Auth";

class App extends React.Component {
  render() {
    return (
      <StylesProvider injectFirst>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={Index} />
            <Auth>
              <Switch>
                <Route exact path="/home" component={Home} />
                <Route exact path="/detail" component={Detail} />
                <Route exact path="/form" component={Form} />
                <Route render={() => <p>not found.</p>} />
              </Switch>
            </Auth>
          </Switch>
        </Router>
      </StylesProvider>
    );
  }
}

export default App;
