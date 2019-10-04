/* eslint-disable import/default */

import React from "react";
import { render } from "react-dom";
import { AppContainer } from "react-hot-loader";
import "bootstrap/dist/css/bootstrap.min.css";

import configureStore, { history } from "./store/configureStore";
import App from "./App";
import "./styles/styles.scss";

const store = configureStore();

render(
  <AppContainer>
    <App store={store} history={history} />
  </AppContainer>,
  document.getElementById("app")
);

if (module.hot) {
  module.hot.accept("./App", () => {
    const NewApp = require("./App").default;
    render(
      <AppContainer>
        <NewApp store={store} history={history} />
      </AppContainer>,
      document.getElementById("app")
    );
  });
}
