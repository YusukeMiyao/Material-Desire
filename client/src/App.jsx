import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { StylesProvider } from "@material-ui/styles";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
//components
import Home from "./components/Home";
import Index from "./components/index.jsx";

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
                <Route render={() => <p>not found.</p>} />
              </Switch>
            </Auth>
          </Switch>
          <Footer />
        </Router>
      </StylesProvider>
    );
  }
}

export default App;
