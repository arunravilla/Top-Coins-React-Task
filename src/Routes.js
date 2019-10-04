/* eslint-disable import/no-named-as-default */
import React from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import { hot } from "react-hot-loader";
import { Container } from "react-bootstrap";

import CommonContainer from "./containers/CommonContainer";
import MarketOverview from "./components/MarketOverview";
import LiquidityAnalysis from "./components/LiquidityAnalysis";
import NotFoundPage from "./components/NotFoundPage";

class Routes extends React.Component {
  render() {
    return (
      <Container>
        <Switch>
          <Route exact path="/" component={CommonContainer(MarketOverview)} />
          <Route
            path="/liquidity"
            component={CommonContainer(LiquidityAnalysis)}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </Container>
    );
  }
}

Routes.propTypes = {
  children: PropTypes.element
};

export default hot(module)(Routes);
