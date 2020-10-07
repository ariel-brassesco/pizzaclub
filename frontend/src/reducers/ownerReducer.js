import { combineReducers } from "redux";
// Import other reducers
import fetchGetDataReducer from "./fetchGetDataReducer";
// Import actions
import {
  FETCH_OWNER_PENDING,
  FETCH_OWNER_SUCCESS,
  FETCH_OWNER_ERROR,
  UPDATE_OWNER_STORED,
} from "../actions/actionsOwner";
// Import auxiliar functions
import { saveData, getData } from "../data";
// Import Constants
import { OWNER_KEY } from "../constants";

/* Define the reducer for owner
    The fetchGetDataReducer is a function how take
    usual actions for fetch data (PENDING, SUCCESS, ERROR)
    and return a reducer with the actions passed.
    It is a Reducer Generator for fetching data.
*/

const INITIAL_OWNER_STATE = {
  update: false,
  last_modified: 0
};

function ownerStatusReducer(state = INITIAL_OWNER_STATE, action) {
  switch (action.type) {
    case FETCH_OWNER_SUCCESS:
      const res = { ...state, update: true, last_modified: Date.now() };
      // Save the data in localStorage
      saveData(OWNER_KEY, {
        data: action.payload,
        pending: false,
        update: true,
        last_modified: res.last_modified,
      });
      return res;
    case FETCH_OWNER_ERROR:
      // Save the data in localStorage
      saveData(OWNER_KEY, {
        data: [],
        pending: false,
        update: false,
        last_modified: 0,
      });
      return { ...state, update: false };
    case UPDATE_OWNER_STORED:
      // Save the data in localStorage
      let data = getData(action.key);
      saveData(action.key, { ...data, update: true });
      return { ...state, update: true };
    default:
      return state;
  }
}

// Combine the reduce to fetch data with the reduce to filter
export const ownerReducer = combineReducers({
  owner: fetchGetDataReducer(
    FETCH_OWNER_PENDING,
    FETCH_OWNER_SUCCESS,
    FETCH_OWNER_ERROR,
    UPDATE_OWNER_STORED
  ),
  status: ownerStatusReducer,
});
// Define and export getters for the state
export const getOwnerData = (state) => state.owner.owner.data;
export const getOwnerPending = (state) => state.owner.owner.pending;
export const getOwnerError = (state) => state.owner.owner.error;
export const getOwnerUpdate = (state) => state.owner.status.update;
export const getOwnerLastModified = (state) => state.owner.status.last_modified;
