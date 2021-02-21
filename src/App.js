import React from "react";
import "./App.css";
import Containers from "./containers";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./redux-store/reducers";
import "./datacache-provider/validate";
function App() {
  const store = createStore(reducers, {}, compose(applyMiddleware(thunk)));
  return (
    <div className="App">
      <Provider store={store}>
        <Containers />
      </Provider>
    </div>
  );
}

export default App;
