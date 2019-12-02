import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
// import "./styles/main.css";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
// import thunk from "redux-thunk";
import reminders from "./store/reducers";

// function component() {
//     const element = document.createElement('div');
  
//     // Lodash, currently included via a script, is required for this line to work
//     element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  
//     return element;
//   }
  
//   document.body.appendChild(component());
  
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