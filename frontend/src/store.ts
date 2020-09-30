import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import appReducer from "./reducers/appReducer";

function saveState(state: Record<string, any>) {
  try {
    localStorage.setItem("storeCache", JSON.stringify(state));
  } catch (e) {
    console.warn(e);
  }
}

function loadState() {
  try {
    const state = localStorage.getItem("storeCache");
    if (state == null) {
      return undefined;
    }
    return JSON.parse(state);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

const store = createStore(
  appReducer,
  loadState(),
  composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(() => saveState(store.getState()));

export default store;
