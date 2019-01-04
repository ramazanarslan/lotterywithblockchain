import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import Collapse from "./Collapse";
import Appbar from "./Appbar";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Appbar />
        <Collapse />
      </div>
    );
  }
}

export default App;
