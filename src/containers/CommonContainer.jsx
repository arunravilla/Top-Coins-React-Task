import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions/cryptoActions";
import NavBar from "../components/common/NavBar";

export default function CommonContainer(WrappedComponent) {
  class CommonContainer extends React.Component {
    render() {
      return (
        <>
          <NavBar pathname={this.props.location.pathname} />
          <div style={{ padding: { left: 20, right: 20 } }}>
            <WrappedComponent {...this.props} />
          </div>
        </>
      );
    }
  }

  CommonContainer.propTypes = {
    actions: PropTypes.object.isRequired,
    cryptoReducer: PropTypes.object
  };

  function mapStateToProps(state) {
    return {
      cryptoReducer: state.cryptoReducer
    };
  }

  function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators(actions, dispatch)
    };
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(CommonContainer);
}
