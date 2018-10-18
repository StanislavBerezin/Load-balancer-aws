import React, { Component } from "react";

import Nav from "./Components/Navigation";
import Footer from "./Components/Footer";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Main from "./Containers/Main";
import Historyy from "./Containers/History";

class App extends Component {
  render() {
    return (
      <div>
        <Nav />

        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/history" exact component={Historyy} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
