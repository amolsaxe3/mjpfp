import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";

import reminders from "./store/reducers";
  
  const store = createStore(reminders);

const appShell = (
  //<Provider> connects a component to the redux store, no need to subscribe() to the store explicitly
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(appShell, document.getElementById("root"));