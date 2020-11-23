import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebase from "./utils/firebase";

//components
import Home from "./components/Home";
import SignInOrUp from "./components/SignInOrUp";
import SignUp from "./components/SignUp";

import Auth from "./Auth";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/signin" component={SignInOrUp} />
          <Route exact path="/signup" component={SignUp} />
          {/* 以下認証のみ */}
          <Auth>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route render={() => <p>not found.</p>} />
            </Switch>
          </Auth>
        </Switch>
      </Router>
    );
  }
}

export default App;
