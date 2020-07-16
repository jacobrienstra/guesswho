import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import React from "react";
import "./styles/theme.css";

import "./index.css";
import * as serviceWorker from "./serviceWorker";
import store from "./redux/store";
import App from "./App.react";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
