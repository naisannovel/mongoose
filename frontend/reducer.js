import { combineReducers } from "redux";
import * as actionTypes from "./actionTypes";

const auth = (authState = { token: null, userId: null }, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS:
      return {
          ...authState,
          token: action.payload.token,
          userId: action.payload.userId
      };
    case actionTypes.AUTH_FAILED:
      return {};

    case actionTypes.AUTH_LOADING:
      return {};

    case actionTypes.AUTH_LOGOUT:
      return {
        ...authState,
        token: null,
        userId: null
      };

    default:
      return authState;
  }
};

export const reducer = combineReducers({
  user: auth,
});
