import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebase from "./utils/firebase";

//components
import Home from "./components/Home";
import Index from "./components/index.jsx";

import Auth from "./Auth";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Index} />
          {/* 以下認証のみ */}
          <Auth>
            <Switch>
              <Route exact path="/home" component={Home} />
              <Route render={() => <p>not found.</p>} />
            </Switch>
          </Auth>
        </Switch>
      </Router>
    );
  }
}

export default App;
