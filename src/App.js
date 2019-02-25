import React, { Component } from "react";
import { Provider } from "react-redux";
import createStore from "./store";
import ArrayHandler from "./components/array-handler";

const store = createStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ArrayHandler />
      </Provider>
    );
  }
}

export default App;
