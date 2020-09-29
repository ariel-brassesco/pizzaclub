import { combineReducers } from "redux";
import { ownerReducer } from "./ownerReducer";
import { showcaseReducer } from "./showcaseReducer";
import { cartReducer } from "./cartReducer";
import { dashboardReducer } from "./dashboardReducer";

const appReducer = combineReducers({
  dashboard: dashboardReducer,
  owner: ownerReducer,
  showcase: showcaseReducer,
  cart: cartReducer,
});

export default appReducer;
