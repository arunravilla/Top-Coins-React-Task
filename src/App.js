import React, { Component } from "react";
import PropTypes from "prop-types";
import { ConnectedRouter } from "connected-react-router";
import { Provider as ReduxProvider } from "react-redux";

import Routes from "./Routes";

export default class App extends Component {
  render() {
    const { store, history } = this.props;
    return (
      <ReduxProvider store={store}>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </ReduxProvider>
    );
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
