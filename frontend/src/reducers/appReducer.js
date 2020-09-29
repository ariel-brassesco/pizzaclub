import { combineReducers } from "redux";
import { ownerReducer } from "./ownerReducer";
import { showcaseReducer } from "./showcaseReducer";
import { cartReducer } from "./cartReducer";

const appReducer = combineReducers({
  owner: ownerReducer,
  showcase: showcaseReducer,
  cart: cartReducer,
});

export default appReducer;
