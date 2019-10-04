import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import cryptoReducer from "./cryptoReducer";

const rootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    cryptoReducer
  });

export default rootReducer;
